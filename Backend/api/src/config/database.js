// Configuración de base de datos con valores por defecto
/*export const dbConfig = {
host: process.env.DB_HOST || 'localhost',
 port: parseInt(process.env.DB_PORT) || 5432,
 user: process.env.DB_USER || 'postgres',
 password: process.env.DB_PASSWORD || 'postgres',
 database: process.env.DB_DATABASE || 'tcgmoon',
 allowExitOnIdle: true
 connectionString: DB_URL
};*/
export const dbConfig = {
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  },
  allowExitOnIdle: true
};