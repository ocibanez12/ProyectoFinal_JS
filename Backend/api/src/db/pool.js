import pg from 'pg';
import dotenv from 'dotenv';
import { dbConfig } from '../config/database.js';

dotenv.config();

const pool = new pg.Pool(dbConfig);

const testConnection = async () => {
  try {
    await pool.connect();
    const res = await pool.query('SELECT NOW()');
    console.log('✅ DB Conectada:', res.rows[0].now);
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    console.log('💡 Asegúrate de que PostgreSQL esté ejecutándose y las credenciales sean correctas');
    console.log('💡 Configuración actual:', dbConfig);
  }
};

testConnection();

export { pool };
