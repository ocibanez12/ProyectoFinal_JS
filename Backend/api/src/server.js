import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { serverConfig } from './config/server.js';

import { enrutador } from './routes/index.js';

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

const PORT = serverConfig.port;
app.listen(PORT, () => {
  console.log(`TCGMoon API running on http://localhost:${PORT}`);
  console.log(`CORS configurado para: ${serverConfig.cors.origin}`);
});

