require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const aiRoutes = require('./routes/aiRoutes');
const db = require('./models');
const cors = require('cors');

app.use(cors());
const app = express();
const port = process.env.PORT || 6000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

app.use(bodyParser.json());
app.use('/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
