const express = require('express');
const axios = require('axios');
const multer = require('multer');
const { labelDetection } = require('./../openaiClient');
const { saveTextQueryLog, saveImageQueryLog } = require('../models/queries');
const FormData = require('form-data');
const router = express.Router();
const prompts = require('../prompts');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const openApiKey = process.env.API_KEY_OPEN; // Asegúrate de que esto esté correcto
console.log('Clave API utilizada:', openApiKey); // Agrega este log
const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';
const openaiApiUrl_i = 'https://api.openai.com/v1/images/';


router.get('/test', (req, res) => {
  res.json({ message: 'Microservicio Node.js está funcionando' });
});


router.post('/text', async (req, res) => {
  const { userId,promptKey, context } = req.body;

  try {
    const prompt = prompts[promptKey];
    if (!prompt) {
      return res.status(400).send('Prompt key inválida.');
    }

    const messages = context ? [...context, { role: 'user', content: prompt }] : [{ role: 'user', content: prompt }];

    const response = await axios.post(
      openaiApiUrl,
      {
        model: 'gpt-4',
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`, // Usa la clave API aquí
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    await saveTextQueryLog(userId, prompt, aiResponse);

    res.json({ response: aiResponse, context: messages });
  } catch (error) {
    console.error('Error al contactar con OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).send('Error al obtener la respuesta de OpenAI');
  }
});


router.post('/image', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  try {
    const { labels, objects, webEntities } = await labelDetection(req.file.buffer);

    const description = labels.length > 0
      ? labels.map(label => label.description.toLowerCase()).join(', ')
      : 'No se encontraron etiquetas en la imagen proporcionada.';

    const objectDescriptions = objects.length > 0
      ? objects.map(object => object.name.toLowerCase()).join(', ')
      : 'No se encontraron objetos específicos en la imagen proporcionada.';

    const webEntityDescriptions = webEntities.length > 0
      ? webEntities.map(entity => entity.description.toLowerCase()).join(', ')
      : 'No se encontraron entidades web relacionadas.';

    const analysisSummary = {
      labels: description,
      objects: objectDescriptions,
      webEntities: webEntityDescriptions
    };

    // Genera un prompt para OpenAI basado en los resultados de análisis
    const prompt = generateDynamicPrompt(analysisSummary);

    // Llama a OpenAI con el prompt generado
    const openAiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // Asegúrate de usar el modelo correcto
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    //console.log(response.data);
    //const openAiContent = openAiResponse.data.choices[0].message.content;

    const aiResponse = openAiResponse.data.choices[0].message.content;
    await saveImageQueryLog(userId, req.file.buffer.toString('base64'), aiResponse);

    //res.json({ analysis: analysisSummary, response: openAiContent });
    res.json({ analysis: analysisSummary, response: aiResponse });
  } catch (error) {
    console.error('Error al analizar la imagen o generar respuesta:', error.response ? error.response.data : error.message);
    res.status(500).send('Error al analizar la imagen o generar respuesta');
  }
});

function generateDynamicPrompt(analysis) {
  let prompt = '';

  const labels = analysis.labels || '';
  const objects = analysis.objects || '';
  const webEntities = analysis.webEntities || '';

  prompt += `La imagen muestra: ${labels}. `;
  if (objects) prompt += `Los objetos detectados son: ${objects}. `;
  if (webEntities) prompt += `Las entidades web relacionadas son: ${webEntities}. `;
  //prompt += `Por favor, proporciona una evaluación detallada de la salud de la mascota basada en esta información mencionando la enfermedad y modo de cura del paciente , se preciso y no pongas mucho texto.`;
  prompt += `Con los datos proporcionados dame la posible enfermedad y el tratamiento que se debe aplicar al paciente para el entendimiento de un veterinario, porfavor`;

  return prompt;
}

module.exports = router;
