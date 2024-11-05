

const questions = [
    { id: 49, text: 'Entidad', type: 'text' },
    { id: 50, text: 'Nit', type: 'number' },
    { id: 51, text: 'Correo', type: 'text' },
      { id: 1, text: 'Procedimiento objeto de la información', type: 'select', options: ['Informe de actualización de datos de la persona', 'Envío del informe de atención de urgencias','Solicitud de autorización de servicios y tecnologías en salud','Autorización de servicios y tecnologías en salud','Referencia','Contrarreferencia'] },
      { id: 2, text: 'Consecutivo del procedimiento objeto de la información', type: 'datetime' },
      { id: 3, text: 'Fecha y hora', type: 'text' },
      { id: 4, text: 'Número de solicitud de la autorización o referencia', type: 'text' },
      { id: 5, text: 'Fecha y hora de la solicitud de autorización', type: 'text' },
      { id: 6, text: 'Número de identificación del obligado a reporta', type: 'text' },
      { id: 7, text: 'Código del prestador de servicios de salud o del obligado a reportar', type: 'text' },
      { id: 8, text: 'Código entidad responsable de Pago', type: 'text' },
      { id: 9, text: 'Primer apellido de la persona', type: 'text' },
      { id: 10, text: 'Segundo apellido de la persona', type: 'text' },
      { id: 11, text: 'Primer nombre de la persona', type: 'text' },
      { id: 12, text: 'Segundo nombre de la persona', type: 'text' },
      { id: 13, text: 'Tipo de documento de identificación de la persona', type: 'text' },
      { id: 14, text: 'Número de documento de identificación de la persona', type: 'text' },
      { id: 15, text: 'Fecha de nacimiento de la persona', type: 'date' },
      { id: 16, text: 'Dirección de la persona', type: 'text' },
      { id: 17, text: 'Teléfono de la persona', type: 'text' },
      { id: 18, text: 'Municipio de residencia habitual de la persona', type: 'text' },
      { id: 19, text: 'Correo electrónico de la persona', type: 'text' },
      { id: 20, text: 'Dirección alternativa para la atención', type: 'text' },
      { id: 21, text: 'Nombre del contacto de emergencia', type: 'text' },
      { id: 22, text: 'Teléfono de contacto de emergencia', type: 'text' },
      { id: 23, text: 'Causa que motiva la atención', type: 'text' },
      { id: 24, text: 'Clasificación triage', type: 'text' },
      { id: 25, text: 'Fecha y hora de ingreso de la persona', type: 'datetime' },
      { id: 26, text: 'Vía de ingreso de la persona al servicio de salud', type: 'text' },
      { id: 27, text: 'Código del prestador que remite', type: 'text' },
      { id: 28, text: 'Diagnóstico principal código', type: 'text' },
      { id: 29, text: 'Diagnóstico relacionado 1 código', type: 'text' },
      { id: 30, text: 'Diagnóstico relacionado 2 código', type: 'text' },
      { id: 31, text: 'Diagnóstico relacionado 3 código', type: 'text' },
      { id: 32, text: 'Condición y destino de la persona', type: 'text' },
      { id: 33, text: 'Prioridad de la atención', type: 'text' },
      { id: 34, text: 'Tipo de atención solicitada', type: 'text' },
      { id: 35, text: 'Grupo de servicios', type: 'text' },
      { id: 36, text: 'Modalidad de realización de la tecnología de salud', type: 'text' },
      { id: 37, text: 'Código del servicio para el cual se solicita la referencia', type: 'text' },
      { id: 38, text: 'Código CUPS del procedimiento requerido', type: 'text' },
      { id: 39, text: 'Cantidad requerida del procedimiento', type: 'number' },
      { id: 40, text: 'Finalidad de la tecnología de salud', type: 'text' },
      { id: 41, text: 'Código del Identificador Único de Medicamento — IUM o el Código Único de Medicamento — CUM', type: 'text' },
      { id: 42, text: 'Cantidad requerida de la tecnología (Medicamentos)', type: 'number' },
      { id: 43, text: 'Código de otros servicios', type: 'text' },
      { id: 44, text: 'Cantidad requerida de la tecnología (Otros servicios y dispositivos médicos)', type: 'number' },
      { id: 45, text: 'Tipo de pago compartido', type: 'text' },
      { id: 46, text: 'Nivel de la persona', type: 'text' },
      { id: 47, text: 'Valor en pesos del pago compartido', type: 'number' },
      { id: 48, text: 'Tope máximo copagos', type: 'number' },
    ];
    

  const parameters2 = [
        {
          id: 1,
          name: 'Informe de actualización de datos de la persona',
          applicableQuestions: [49,50,51,1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], // IDs de preguntas aplicables
        },
        {
          id: 2,
          name: 'Envío del informe de atención de urgencias',
          applicableQuestions: [49,50,51,1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], // IDs de preguntas aplicables
        },
        {
          id: 3,
          name: 'Solicitud de autorización de servicios y tecnologías en salud',
          applicableQuestions: [49,50,51,1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 28, 29, 30, 31, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44], // IDs de preguntas aplicables
        },
        {
          id: 4,
          name: 'Autorización de servicios y tecnologías en salud',
          applicableQuestions: [49,50,51,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 35, 36, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], // IDs de preguntas aplicables
        },
        {
          id: 5,
          name: 'Referencia',
          applicableQuestions: [49,50,51, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39
          ], // IDs de preguntas aplicables
        },
        {
          id: 6,
          name: 'Contrarreferencia',
          applicableQuestions: [49,50,51,1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], // IDs de preguntas aplicables
        },
        // Define los otros parámetros con sus preguntas aplicables
      ];

      module.exports = { questions, parameters2 };