import { Router } from 'express';
import { listar, obtenerPorId, crear, actualizar, eliminar } from '../controllers/productos.controller.js';

export const enrutador = Router();

enrutador.get('/', listar);
enrutador.post('/', crear);
enrutador.get('/:id', obtenerPorId);
enrutador.patch('/:id', actualizar);
enrutador.delete('/:id', eliminar);

