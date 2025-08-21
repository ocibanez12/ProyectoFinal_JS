# Configuración del Backend TCGMoon

## Requisitos Previos

1. **PostgreSQL** instalado y ejecutándose
2. **Node.js** versión 16 o superior
3. **npm** o **yarn**

## Configuración de Base de Datos

### 1. Crear Base de Datos
```sql
CREATE DATABASE tcgmoon;
```

### 2. Configurar Variables de Entorno (Opcional)
Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_DATABASE=tcgmoon
CORS_ORIGIN=http://localhost:5173
```

**Nota**: Si no creas el archivo `.env`, se usarán los valores por defecto:
- Puerto: 3000
- Base de datos: localhost:5432/tcgmoon
- Usuario: postgres
- Password: postgres

### 3. Inicializar Base de Datos
```bash
npm run init-db
```

## Instalación y Ejecución

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```

### 3. Ejecutar en Producción
```bash
npm start
```

## Verificación

1. El servidor debe mostrar: `✅ DB Conectada`
2. La API debe estar disponible en: `http://localhost:3000`
3. Los endpoints deben responder correctamente

## Endpoints Disponibles

- **Usuarios**: `/api/usuarios`
- **Productos**: `/api/productos`
- **Favoritos**: `/api/favoritos`
- **Carrito**: `/api/carrito`
- **Órdenes**: `/api/ordenes`

### Endpoints de Órdenes

- `POST /api/ordenes/finalizar-compra` - Finalizar una compra
- `GET /api/ordenes/usuario/:usuario_id` - Obtener órdenes de un usuario

## Solución de Problemas

### Error de Conexión a BD
- Verifica que PostgreSQL esté ejecutándose
- Verifica las credenciales en `.env` o usa las por defecto
- Verifica que la base de datos `tcgmoon` exista

### Error de CORS
- Verifica que el frontend esté en el puerto correcto (5173 por defecto)
- Ajusta `CORS_ORIGIN` en `.env` si es necesario

### Error en Órdenes
- Verifica que las tablas `ordenes` y `orden_items` existan
- Ejecuta `npm run init-db` para recrear las tablas si es necesario
