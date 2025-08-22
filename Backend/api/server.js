require('dotenv/config');
const express = require('express');
const cors = require('cors');
const { serverConfig } = require('./src/config/server.js');

const { enrutador } = require('./src/routes/index.js');

const app = express();

app.use(cors(serverConfig.cors));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'TCGMoon API',
    version: '1.0.0',
    endpoints: {
      usuarios: '/api/usuarios',
      productos: '/api/productos',
      favoritos: '/api/favoritos',
      carrito: '/api/carrito',
      ordenes: '/api/ordenes'
    }
  });
});

app.use('/api', enrutador);

// Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  const PORT = serverConfig.port;
  app.listen(PORT, () => {
    console.log(`TCGMoon API running on http://localhost:${PORT}`);
    console.log(`CORS configurado para: ${serverConfig.cors.origin}`);
  });
}

module.exports = app;

