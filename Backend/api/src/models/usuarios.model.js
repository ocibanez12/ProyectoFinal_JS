import { pool } from '../db/pool.js';

export async function crearUsuario({ nombre, apellido, email, password }) {
  const sql = `INSERT INTO usuarios (nombre, apellido, email, password)
               VALUES ($1, $2, $3, $4)
               RETURNING id, nombre, apellido, email, fecha_creacion`;
  const values = [nombre, apellido || null, email, password];
  const { rows } = await pool.query(sql, values);
  return rows[0];
}

export async function buscarUsuarioPorEmail(email) {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return rows[0] || null;
}

export async function buscarUsuarioPorId(id) {
  const { rows } = await pool.query('SELECT id, nombre, apellido, email, fecha_creacion FROM usuarios WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function listarUsuarios({ pagina = 1, tamanoPagina = 10 } = {}) {
  const limite = Math.max(1, Math.min(100, Number(tamanoPagina)));
  const desplazamiento = (Math.max(1, Number(pagina)) - 1) * limite;
  const { rows: filasTotal } = await pool.query('SELECT COUNT(*)::int AS total FROM usuarios');
  const total = filasTotal[0].total;
  const { rows } = await pool.query(
    'SELECT id, nombre, apellido, email, fecha_creacion FROM usuarios ORDER BY id LIMIT $1 OFFSET $2',
    [limite, desplazamiento]
  );
  return { rows, total, pagina: Math.max(1, Number(pagina)), tamanoPagina: limite };
}

export async function actualizarUsuario(id, datos) {
  const permitidos = ['nombre', 'apellido', 'email', 'password'];
  const entradas = Object.entries(datos).filter(([k, v]) => permitidos.includes(k) && v !== undefined);
  if (entradas.length === 0) return await buscarUsuarioPorId(id);

  const sets = entradas.map(([k], i) => `${k} = $${i + 1}`).join(', ');
  const values = entradas.map(([, v]) => v);
  values.push(id);
  const sql = `UPDATE usuarios SET ${sets} WHERE id = $${values.length} RETURNING id, nombre, apellido, email, fecha_creacion`;
  const { rows } = await pool.query(sql, values);
  return rows[0] || null;
}

export async function eliminarUsuario(id) {
  const { rowCount } = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  return rowCount > 0;
}

