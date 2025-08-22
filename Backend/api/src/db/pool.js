import pg from 'pg';
import dotenv from 'dotenv';
import { dbConfig } from '../config/database.js';

dotenv.config();

const pool = new pg.Pool(dbConfig);

const testConnection = async () => {
  try {
    await pool.connect();
    const res = await pool.query('SELECT NOW()');
    console.log('✅ DB Conectada a Supabase:', res.rows[0].now);
  } catch (error) {
    console.error('❌ Error conectando a Supabase:', error);
  }
};

testConnection();


export { pool };
