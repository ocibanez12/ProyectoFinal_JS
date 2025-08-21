import { pool } from '../db/pool.js';

export async function agregarAlCarrito({ usuario_id, producto_id, cantidad = 1 }) {
  console.log('Modelo: agregarAlCarrito llamado con:', { usuario_id, producto_id, cantidad });
  const sql = `INSERT INTO carrito (usuario_id, producto_id, cantidad)
               VALUES ($1, $2, $3)
               ON CONFLICT (usuario_id, producto_id) DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad
               RETURNING id, usuario_id, producto_id, cantidad`;
  console.log('Modelo: ejecutando SQL:', sql);
  const { rows } = await pool.query(sql, [usuario_id, producto_id, cantidad]);
  console.log('Modelo: resultado de la inserción:', rows[0]);
  return rows[0];
}

export async function actualizarCantidad({ usuario_id, producto_id, cantidad }) {
  const { rows } = await pool.query(
    'UPDATE carrito SET cantidad = $3 WHERE usuario_id = $1 AND producto_id = $2 RETURNING id, usuario_id, producto_id, cantidad',
    [usuario_id, producto_id, cantidad]
  );
  return rows[0] || null;
}

export async function eliminarDelCarrito({ usuario_id, producto_id }) {
  const { rowCount } = await pool.query('DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2', [usuario_id, producto_id]);
  return rowCount > 0;
}

export async function vaciarCarrito({ usuario_id }) {
  const { rowCount } = await pool.query('DELETE FROM carrito WHERE usuario_id = $1', [usuario_id]);
  return rowCount;
}

export async function listarCarrito({ usuario_id, pagina = 1, tamanoPagina = 20 }) {
  console.log('Modelo: listarCarrito llamado con:', { usuario_id, pagina, tamanoPagina });
  const limit = Math.max(1, Math.min(100, Number(tamanoPagina)));
  const offset = (Math.max(1, Number(pagina)) - 1) * limit;
  console.log('Modelo: limit y offset calculados:', { limit, offset });
  
  const totalQuery = 'SELECT COUNT(*)::int AS total FROM carrito WHERE usuario_id = $1';
  const { rows: totalRows } = await pool.query(totalQuery, [usuario_id]);
  const total = totalRows[0].total;
  console.log('Modelo: total de items en carrito:', total);
  
  const dataQuery = `SELECT c.id, c.usuario_id, c.producto_id, c.cantidad,
                            p.nombre, p.precio, p.tipo, p.imagen_url
                     FROM carrito c
                     JOIN productos p ON p.id = c.producto_id
                     WHERE c.usuario_id = $1
                     ORDER BY c.id DESC
                     LIMIT $2 OFFSET $3`;
  const { rows } = await pool.query(dataQuery, [usuario_id, limit, offset]);
  console.log('Modelo: rows obtenidas de la base de datos:', rows);
  
  const resultado = { rows, total, page: Math.max(1, Number(pagina)), pageSize: limit };
  console.log('Modelo: resultado final:', resultado);
  return resultado;
}

