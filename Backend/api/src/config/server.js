
export const serverConfig = {
  port: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || true, // Permite todos los orígenes
    credentials: true
  }
};
