import { Router } from 'express';
import { listar, obtenerPorId, crear, actualizar, eliminar, login } from '../controllers/usuarios.controller.js';

export const enrutador = Router();

enrutador.get('/', listar);
enrutador.post('/', crear);
enrutador.post('/login', login);
enrutador.get('/:id', obtenerPorId);
enrutador.patch('/:id', actualizar);
enrutador.delete('/:id', eliminar);

