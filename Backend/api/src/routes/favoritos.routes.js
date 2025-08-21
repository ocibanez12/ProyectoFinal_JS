import { Router } from 'express';
import { listar, crear, eliminar } from '../controllers/favoritos.controller.js';

export const enrutador = Router();

enrutador.get('/', listar);
enrutador.post('/', crear);
enrutador.delete('/', eliminar);

