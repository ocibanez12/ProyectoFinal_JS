import { Router } from 'express';
import { listar, obtenerPorId, crear, actualizar, eliminar, login } from '../controllers/usuarios.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

export const enrutador = Router();

// Rutas públicas
enrutador.post('/', crear);
enrutador.post('/login', login);

// Rutas protegidas
enrutador.get('/', authenticateToken, listar);
enrutador.get('/:id', authenticateToken, obtenerPorId);
enrutador.patch('/:id', authenticateToken, actualizar);
enrutador.delete('/:id', authenticateToken, eliminar);

