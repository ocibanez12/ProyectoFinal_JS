import { pool } from '../db/pool.js';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log('Seeding datos básicos...');

    // Crear usuario base si no existe
    const email = 'admin@tienda.com';
    const plainPassword = 'admin1234';
    const hashed = await bcrypt.hash(plainPassword, 10);
    const { rows: userRows } = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, email, password)
       VALUES ('Admin', 'Tienda', $1, $2)
       ON CONFLICT (email) DO UPDATE SET nombre = EXCLUDED.nombre
       RETURNING id`,
      [email, hashed]
    );
    const usuarioId = userRows[0]?.id || (await pool.query('SELECT id FROM usuarios WHERE email=$1', [email])).rows[0].id;

    // Insertar algunos productos si no existen
    const productos = [
      { nombre: 'Zekrom EX', precio: 19990, tipo: 'Carta', imagen_url: 'https://i.postimg.cc/bvBwzzgQ/SV10pt5-ZSV-ES-34.png' },
      { nombre: 'Pikachu VMAX', precio: 14990, tipo: 'Carta', imagen_url: 'https://i.postimg.cc/tgqpBsrz/Reshiram-EX.png' },
      { nombre: 'Mewtwo GX', precio: 17990, tipo: 'Mazo', imagen_url: 'https://i.postimg.cc/DZDhfB7C/Fulgor-Negro.jpg' },
    ];

    for (const p of productos) {
      await pool.query(
        `INSERT INTO productos (nombre, precio, tipo, imagen_url, usuario_id)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        [p.nombre, p.precio, p.tipo, p.imagen_url, usuarioId]
      );
    }

    console.log('✅ Seed completado');
  } catch (err) {
    console.error('❌ Error en seed:', err);
  } finally {
    await pool.end();
  }
}

seed();


