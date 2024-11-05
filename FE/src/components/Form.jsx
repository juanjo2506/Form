import { useState } from 'react'
import { questions } from "../questions"
import { parameters } from '../parameters';



function form() {

  const [selectedParam, setSelectedParam] = useState(null);
  const [responses, setResponses] = useState({});

  const handleParamChange = (event) => {
    const paramId = parseInt(event.target.value);
    const param = parameters.find((p) => p.id === paramId);
    
    if (param) {
      setSelectedParam(param);
      // Inicializar respuestas con "N/A" para preguntas que no aplican
      const initialResponses = {};
      questions.forEach((question) => {
        initialResponses[question.id] = param.applicableQuestions.includes(question.id)
          ? '' // Asigna vacío si la pregunta es aplicable
          : 'N/A'; // Asigna "N/A" si la pregunta no es aplicable
      });
      setResponses(initialResponses);
    } else {
      setSelectedParam(null); // Si no se encuentra el parámetro, se reinicia
      setResponses({}); // Limpia las respuestas
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Crear el objeto que enviarás al servidor
    const data = {
      parameter: selectedParam.id, // Cambia a .id para enviar el ID del parámetro
      responses: responses,
    };
    
    // Enviar la solicitud POST al servidor
    fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // Convertir el objeto data a JSON
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error('Error en la respuesta del servidor: ' + JSON.stringify(errData));
          });
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then((responseData) => {
        alert('Formulario enviado con éxito: ' + JSON.stringify(responseData));
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
        alert('Ocurrió un error al enviar el formulario: ' + error.message); // Mostrar mensaje de error
      });
  };
  return (
    <div>
      <h2>Formulario Dinámico</h2>
      <label>Seleccione un parámetro:</label>
      <select onChange={handleParamChange}>
        <option value="">Seleccione...</option>
        {parameters.map((param) => (
          <option key={param.id} value={param.id}>
            {param.name}
          </option>
        ))}
      </select>
      {selectedParam && (
        <form onSubmit={handleSubmit}>
          {questions.map((question) => {
            // Solo mostrar preguntas aplicables
            if (!selectedParam.applicableQuestions.includes(question.id)) {
              return null;
            }
            return (
              <div key={question.id}>
                <label>{question.text}</label>
                {question.type === 'text' && (
                  <input
                    type="text"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                )}
                {question.type === 'number' && (
                  <input
                    type="number"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                )}
                {question.type === 'date' && (
                  <input
                    type="date"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                )}
                {question.type === 'datetime' && (
                  <input
                    type="datetime-local"
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  />
                )}
                {question.type === 'select' && (
                  <select
                    value={responses[question.id] || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {question.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}

export default form