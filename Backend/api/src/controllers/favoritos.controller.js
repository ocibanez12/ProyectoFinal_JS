import { aHateoasColeccion } from '../helpers/hateoas.js';
import { agregarFavorito, eliminarFavorito, listarFavoritos } from '../models/favoritos.model.js';

export async function crear(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const creado = await agregarFavorito({ usuario_id, producto_id });
    res.status(creado ? 201 : 200).json({ created: Boolean(creado) });
  } catch (err) {
    next(err);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { usuario_id, producto_id } = req.body || {};
    if (!usuario_id || !producto_id) throw Object.assign(new Error('usuario_id y producto_id requeridos'), { status: 400 });
    const eliminado = await eliminarFavorito({ usuario_id, producto_id });
    res.status(200).json({ removed: eliminado });
  } catch (err) {
    next(err);
  }
}

export async function listar(req, res, next) {
  try {
    const { usuario_id, pagina = 1, tamanoPagina = 10 } = req.query || {};
    if (!usuario_id) return res.status(400).json({ error: 'usuario_id requerido' });
    const datos = await listarFavoritos({ usuario_id, pagina: Number(pagina), tamanoPagina: Number(tamanoPagina) });
    res.json(aHateoasColeccion(req, 'favoritos', datos.rows, { pagina: datos.page, tamanoPagina: datos.pageSize, total: datos.total }));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
}

