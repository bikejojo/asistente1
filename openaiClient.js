// openaiClient.js
const axios = require('axios');

const apiKey = process.env.API_KEY_VISION;

const labelDetection = async (imageBuffer) => {
  try {
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        requests: [
          {
            image: {
              content: imageBuffer.toString('base64'),
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10,
              },
              {
                type: 'OBJECT_LOCALIZATION',
                maxResults: 10,
              },
              {
                type: 'WEB_DETECTION',
                maxResults: 10,
              }
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const labels = response.data.responses[0].labelAnnotations || [];
    const objects = response.data.responses[0].localizedObjectAnnotations || [];
    const webEntities = response.data.responses[0].webDetection ? response.data.responses[0].webDetection.webEntities : [];

    return { labels, objects, webEntities };
  } catch (error) {
    console.error('Error en la detección:', error.response ? error.response.data : error.message);
    return { labels: [], objects: [], webEntities: [] };
  }
};

module.exports = { labelDetection };