
export const serverConfig = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://proyectofinal-front.onrender.com',
    credentials: true
  }
};
