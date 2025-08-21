import fs from 'fs';
import pool from '../db/pool.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runDDL() {
    try {
        console.log('🚀 Inicializando base de datos TCGMoon...');
        
        // Leer el archivo DDL
        const ddlPath = path.join(__dirname, '../db/schema/DDL.sql');
        const ddl = fs.readFileSync(ddlPath, 'utf8');
        
        // Ejecutar el DDL
        await pool.query(ddl);
        console.log("✅ Tablas creadas o ya existentes");
        
        // Verificar que las tablas existen
        const tables = ['usuarios', 'productos', 'favoritos', 'carrito'];
        for (const table of tables) {
            const result = await pool.query(`SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = $1
            )`, [table]);
            
            if (result.rows[0].exists) {
                console.log(`✅ Tabla ${table} existe`);
            } else {
                console.log(`❌ Tabla ${table} no existe`);
            }
        }
        
        // Insertar datos de prueba si las tablas están vacías
        const userCount = await pool.query('SELECT COUNT(*) FROM usuarios');
        if (userCount.rows[0].count === '0') {
            console.log('📝 Insertando usuario de prueba...');
            await pool.query(`
                INSERT INTO usuarios (nombre, apellido, email, password) 
                VALUES ('Admin', 'User', 'admin@tcgmoon.com', '$2b$10$dummy.hash.for.testing')
            `);
            console.log('✅ Usuario de prueba creado');
        }
        
        const productCount = await pool.query('SELECT COUNT(*) FROM productos');
        if (productCount.rows[0].count === '0') {
            console.log('📝 Insertando productos de prueba...');
            await pool.query(`
                INSERT INTO productos (nombre, precio, tipo, imagen_url, usuario_id) 
                VALUES 
                ('Carta Mágica', 15.99, 'Carta', 'https://via.placeholder.com/300x400', 1),
                ('Mazo Básico', 29.99, 'Mazo', 'https://via.placeholder.com/300x400', 1),
                ('Pack Premium', 49.99, 'Pack', 'https://via.placeholder.com/300x400', 1)
            `);
            console.log('✅ Productos de prueba creados');
        }
        
        console.log('🎉 Base de datos inicializada correctamente');
        
    } catch (err) {
        console.error("❌ Error ejecutando DDL:", err.message);
        console.error("💡 Verifica que PostgreSQL esté ejecutándose y las credenciales sean correctas");
    } finally {
        await pool.end();
        console.log('🔌 Conexión a la base de datos cerrada');
    }
}

runDDL();
