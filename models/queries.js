const { QueryLog } = require('./index');
const { Prevaloration } = require('./index'); // Asegúrate de importar Prevaloration


// Guarda consultas de texto
const saveTextQueryLog = async (userId, query, response) => {
  try {
    await QueryLog.create({
      userId,
      query,
      response,
      type: 'text',
      imageUrl: null
    });
  } catch (err) {
    console.error('Error guardando el log de la consulta de texto:', err);
    throw err;
  }
};

// Guarda consultas de imagen
const saveImageQueryLog = async (userId, imageUrl, response) => {
  try {
    await QueryLog.create({
      userId,
      query: 'Image Query',
      response,
      type: 'image',
      imageUrl
    });
  } catch (err) {
    console.error('Error guardando el log de la consulta de imagen:', err);
    throw err;
  }
};

// Guardar prevaloraciones
const savePrevaloration = async (userId, input, assessment) => {
  try {
    await Prevaloration.create({
      reason,
      result,
      createdAt,
      updatedAd,
      inputType,
      inputText,
      inputImageUrl
    });
  } catch (err) {
    console.error('Error guardando la prevaloración:', err);
    throw err;
  }
};

module.exports = {
  saveTextQueryLog,
  saveImageQueryLog,
  savePrevaloration
};
