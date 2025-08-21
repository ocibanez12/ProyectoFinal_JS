import { Router } from 'express';
import { finalizarCompra, listarOrdenesUsuario } from '../controllers/orden.controller.js';

export const enrutador = Router();

enrutador.post('/finalizar-compra', finalizarCompra);
enrutador.get('/usuario/:usuario_id', listarOrdenesUsuario);
