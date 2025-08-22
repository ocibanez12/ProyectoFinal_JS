
export const serverConfig = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || [
      'https://proyectofinal-front.onrender.com',
      'https://proyecto-final-js-six-dun.vercel.app',
      'http://localhost:5173' // Para desarrollo local
    ],
    credentials: true
  }
};
