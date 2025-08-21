import { Router } from 'express';
import { listar, crear, actualizarCantidadCtrl, eliminarItem, eliminar } from '../controllers/carrito.controller.js';

export const enrutador = Router();

enrutador.get('/', listar);
enrutador.post('/', crear);
enrutador.patch('/', actualizarCantidadCtrl);
enrutador.delete('/item', eliminarItem);
enrutador.delete('/', eliminar);

