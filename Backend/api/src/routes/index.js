import { Router } from 'express';
import { registroSolicitudes } from '../middlewares/logger.js';
import { manejadorErrores } from '../middlewares/errorHandler.js';
import { noEncontrado } from '../middlewares/notFound.js';

import { enrutador as enrutadorUsuarios } from './usuarios.routes.js';
import { enrutador as enrutadorProductos } from './productos.routes.js';
import { enrutador as enrutadorFavoritos } from './favoritos.routes.js';
import { enrutador as enrutadorCarrito } from './carrito.routes.js';
import { enrutador as enrutadorOrdenes } from './orden.routes.js';

export const enrutador = Router();

enrutador.use(registroSolicitudes);

enrutador.use('/usuarios', enrutadorUsuarios);
enrutador.use('/productos', enrutadorProductos);
enrutador.use('/favoritos', enrutadorFavoritos);
enrutador.use('/carrito', enrutadorCarrito);
enrutador.use('/ordenes', enrutadorOrdenes);

enrutador.use(noEncontrado);
enrutador.use(manejadorErrores);

