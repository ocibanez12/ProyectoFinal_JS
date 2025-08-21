import { aHateoasColeccion } from '../helpers/hateoas.js';
import { agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, listarCarrito } from '../models/carrito.model.js';

export async function crear(req, res, next) {
  try {
    const { usuario_id, producto_id, cantidad = 1 } = req.body || {};
    console.log('Creando item en carrito:', { usuario_id, producto_id, cantidad });
    if (!usuario_id || !producto_id) return res.status(400).json({ error: 'usuario_id y producto_id requeridos' });
    const item = await agregarAlCarrito({ usuario_id, producto_id, cantidad });
    console.log('Item agregado al carrito:', item);
    res.status(201).json(item);
  } catch (err) {
    console.error('Error al agregar al carrito:', err);
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
}

export async function actualizarCantidadCtrl(req, res, next) {
  try {
    const { usuario_id, producto_id, cantidad } = req.body || {};
    if (!usuario_id || !producto_id || typeof cantidad === 'undefined') {
      return res.status(400).json({ error: 'usuario_id, producto_id y cantidad requeridos' });
    }
    const item = await actualizarCantidad({ usuario_id, producto_id, cantidad });
    if (!item) return res.status(404).json({ error: 'Item no encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
}

export async function eliminarItem(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) return res.status(400).json({ error: 'usuario_id y producto_id requeridos' });
    const eliminado = await eliminarDelCarrito({ usuario_id, producto_id });
    res.status(200).json({ removed: eliminado });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar item del carrito' });
  }
}

export async function eliminar(req, res, next) {
  try {
    const { usuario_id } = req.body || {};
    if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
    const cantidadEliminada = await vaciarCarrito({ usuario_id });
    res.status(200).json({ removedCount: cantidadEliminada });
  } catch (err) {
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
}

export async function listar(req, res, next) {
  try {
    const { usuario_id, pagina = 1, tamanoPagina = 20 } = req.query || {};
    console.log('Listando carrito para usuario:', usuario_id, 'página:', pagina, 'tamaño:', tamanoPagina);
    if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
    const datos = await listarCarrito({ usuario_id, pagina: Number(pagina), tamanoPagina: Number(tamanoPagina) });
    console.log('Datos del carrito obtenidos:', datos);
    const respuesta = aHateoasColeccion(req, 'carrito', datos.rows, { pagina: datos.page, tamanoPagina: datos.pageSize, total: datos.total });
    console.log('Respuesta HATEOAS:', respuesta);
    res.json(respuesta);
  } catch (err) {
    console.error('Error en listar carrito:', err);
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
}

