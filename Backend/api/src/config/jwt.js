import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secreto-basico';

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Token inválido');
  }
};
