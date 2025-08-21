export function registroSolicitudes(req, res, next) {
  const inicio = Date.now();
  res.on('finish', () => {
    const transcurridoMs = Date.now() - inicio;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${transcurridoMs}ms`);
  });
  next();
}

