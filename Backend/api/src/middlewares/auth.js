import { verifyToken } from '../config/jwt.js';

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    }
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido' });
  }
};
