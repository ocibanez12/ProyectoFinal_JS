import { pool } from '../db/pool.js';

export async function agregarFavorito({ usuario_id, producto_id }) {
  const sql = `INSERT INTO favoritos (usuario_id, producto_id)
               VALUES ($1, $2)
               ON CONFLICT (usuario_id, producto_id) DO NOTHING
               RETURNING id, usuario_id, producto_id`;
  const { rows } = await pool.query(sql, [usuario_id, producto_id]);
  return rows[0] || null; // null if already existed
}

export async function eliminarFavorito({ usuario_id, producto_id }) {
  const { rowCount } = await pool.query('DELETE FROM favoritos WHERE usuario_id = $1 AND producto_id = $2', [usuario_id, producto_id]);
  return rowCount > 0;
}

export async function listarFavoritos({ usuario_id, pagina = 1, tamanoPagina = 10 }) {
  const limit = Math.max(1, Math.min(100, Number(tamanoPagina)));
  const offset = (Math.max(1, Number(pagina)) - 1) * limit;
  const totalQuery = 'SELECT COUNT(*)::int AS total FROM favoritos WHERE usuario_id = $1';
  const { rows: totalRows } = await pool.query(totalQuery, [usuario_id]);
  const total = totalRows[0].total;
  const dataQuery = `SELECT f.id, f.usuario_id, f.producto_id, p.nombre, p.precio, p.tipo, p.imagen_url
                     FROM favoritos f
                     JOIN productos p ON p.id = f.producto_id
                     WHERE f.usuario_id = $1
                     ORDER BY f.id DESC
                     LIMIT $2 OFFSET $3`;
  const { rows } = await pool.query(dataQuery, [usuario_id, limit, offset]);
  return { rows, total, page: Math.max(1, Number(pagina)), pageSize: limit };
}

