const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { questions, parameters2 } = require('./data'); 
const JSON = require("./proyecto-440803-c7d093dd667d.json")

const app = express();
const port = 5000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(cors());

// Configura tu transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio como 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,

//(considera usar OAuth2 para mayor seguridad)
  }
});

// Endpoint para recibir los datos del formulario
app.post('/submit', (req, res) => {
  const { parameter, responses } = req.body; // Extrae el ID del parámetro y las respuestas
  // console.log(req.body); // Para ver qué datos se están recibiendo
  
  // Busca el parámetro por ID
  const parameterBE = parameters2.find(param => param.id === parameter);

  if (!parameterBE) {
    console.error(`No se encontró el parámetro con ID: ${parameter}`);
    return res.status(400).json({ message: 'Parámetro no válido' }); // Retorna y sale
  }

  // Aquí puedes procesar las respuestas
  const formattedResponses = formatResponses(parameterBE, responses); // Asegúrate de que esta función esté definida

  // Agregar las respuestas a Google Sheets
  addToGoogleSheet(formattedResponses)
  /* .then(() => {
    // Enviar el correo electrónico
    return sendEmail(parameterBE.name, formattedResponses); // Asegúrate de pasar los parámetros correctos
  }) */
    .then(() => {
      return res.status(200).json({ message: 'Datos guardados correctamente' }); // Retorna y sale
    })
    .catch(error => {
      console.error('Error al guardar datos:', error);
      return res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message }); // Retorna y sale
    });
});

// Función para dar formato a las respuestas
const formatResponses = (parameterId, responses) => {
  // Verificar si se encuentra el parámetro
  const parameter = parameters2.find(param => param.id === parameterId.id);
  
  if (!parameter) {
    console.error(`No se encontró el parámetro con ID: ${parameterId}`);
    return; // Salir si no se encuentra el parámetro
  }

  const applicableQuestions = parameter.applicableQuestions;

  // Crear un arreglo para almacenar las respuestas, inicializando con 'N/A'
  const formatted = new Array(questions.length).fill('N/A');

  applicableQuestions.forEach(questionId => {
    // Obtener la respuesta usando el ID de la pregunta
    const response = responses[questionId];

    // Encontrar el índice de la pregunta en el arreglo questions
    const questionIndex = questions.findIndex(q => q.id === questionId);
    
    if (questionIndex !== -1) {
      // Si hay una respuesta, usarla; de lo contrario, 'N/A'
      formatted[questionIndex] = response !== undefined ? response : 'N/A';
    }
  });

  return formatted;
};

// Función para añadir datos a Google Sheets
const addToGoogleSheet = async (/* parameter,  */responses) => {
  /* console.log(parameter);
   */
  
  const auth = new google.auth.GoogleAuth({
    keyFile: './proyecto-440803-c7d093dd667d.json', // Cambia esta línea
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '1I-bggwWkA2lHKwHqfSJwPPQRRVIJFTAipX2aqc1MtDM'; // Cambia por el ID de tu hoja de cálculo
  const range = 'Sheet1!A2'; // Cambia por el rango donde quieres añadir los datos

  const values = [
    Object.values(responses), // Aquí tomamos todos los valores del objeto responses
  ];

  const resource = {
    values, // Este es el recurso que se envía a la API
  };
console.log(responses);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource,
  });
};

// Función para enviar el correo electrónico
const sendEmail = async (parameter, responses) => {
  // Verificar que responses sea un objeto válido
  if (typeof responses !== 'object' || responses === null) {
    throw new Error('Responses must be a valid object');
  }

  const mailOptions = {
    from: 'juanjose250699@gmail.com', // Cambia por tu correo electrónico
    to: 'enlacesetta2024@gmail.com', // Cambia por el correo del destinatario
    subject: 'Formulario Enviado',
    text: `Se ha enviado un nuevo formulario con el parámetro: ${parameter} y las respuestas: https://docs.google.com/spreadsheets/d/1I-bggwWkA2lHKwHqfSJwPPQRRVIJFTAipX2aqc1MtDM/edit?gid=0#gid=0`,
  };

  return transporter.sendMail(mailOptions);
};

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});