import { pool } from '../db/pool.js';

export async function crearProducto({ nombre, precio, tipo, imagen_url, usuario_id }) {
  const sql = `INSERT INTO productos (nombre, precio, tipo, imagen_url, usuario_id)
               VALUES ($1, $2, $3, $4, $5)
               RETURNING id, nombre, precio, tipo, imagen_url, usuario_id`;
  const values = [nombre, precio, tipo, imagen_url || null, usuario_id];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

export async function buscarProductoPorId(id) {
  const { rows } = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function listarProductos({ pagina = 1, tamanoPagina = 10, tipo, usuario_id } = {}) {
  const limit = Math.max(1, Math.min(100, Number(tamanoPagina)));
  const offset = (Math.max(1, Number(pagina)) - 1) * limit;
  const where = [];
  const params = [];
  if (tipo) {
    params.push(tipo);
    where.push(`tipo = $${params.length}`);
  }
  if (usuario_id) {
    params.push(usuario_id);
    where.push(`usuario_id = $${params.length}`);
  }
  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const totalQuery = `SELECT COUNT(*)::int AS total FROM productos ${whereSql}`;
  const { rows: totalRows } = await pool.query(totalQuery, params);
  const total = totalRows[0].total;
  params.push(limit, offset);
  const dataQuery = `SELECT * FROM productos ${whereSql} ORDER BY id DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;
  const { rows } = await pool.query(dataQuery, params);
  return { rows, total, page: Math.max(1, Number(pagina)), pageSize: limit };
}

export async function actualizarProducto(id, datos) {
  const permitidos = ['nombre', 'precio', 'tipo', 'imagen_url'];
  const entradas = Object.entries(datos).filter(([k, v]) => permitidos.includes(k) && v !== undefined);
  if (entradas.length === 0) return await buscarProductoPorId(id);
  const sets = entradas.map(([k], i) => `${k} = $${i + 1}`).join(', ');
  const values = entradas.map(([, v]) => v);
  values.push(id);
  const sql = `UPDATE productos SET ${sets} WHERE id = $${values.length} RETURNING *`;
  const { rows } = await pool.query(sql, values);
  return rows[0] || null;
}

export async function eliminarProducto(id) {
  const { rowCount } = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
  return rowCount > 0;
}

