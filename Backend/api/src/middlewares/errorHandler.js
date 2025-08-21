export function manejadorErrores(error, req, res, next) {
  const estado = error.status || 500;
  const codigo = error.code || undefined;
  const mensaje = error.message || 'Error interno del servidor';
  if (estado >= 500) {
    console.error(error);
  }
  res.status(estado).json({ error: mensaje, code: codigo });
}

