# TCGMoon - Proyecto Final

Sistema de comercio electrónico para cartas de trading card games (TCG) con funcionalidades de carrito, favoritos y gestión de productos.

## 🚀 Configuración Rápida

### 1. Requisitos Previos
- **PostgreSQL** instalado y ejecutándose
- **Node.js** versión 16 o superior
- **npm** o **yarn**

### 2. Configurar Base de Datos
```sql
CREATE DATABASE tcgmoon;
```

### 3. Configurar Backend
```bash
cd Backend/api
npm install
npm run init-db
npm run dev
```

### 4. Configurar Frontend
```bash
cd Frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
Proyecto_Final1/
├── Backend/
│   └── api/
│       ├── src/
│       │   ├── controllers/     # Controladores de la API
│       │   ├── models/          # Modelos de datos
│       │   ├── routes/          # Rutas de la API
│       │   ├── db/              # Configuración de base de datos
│       │   └── config/          # Configuraciones del servidor
│       └── SETUP.md             # Instrucciones del backend
├── Frontend/
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── pages/               # Páginas de la aplicación
│   │   ├── store/               # Contextos de estado
│   │   └── styles/              # Estilos CSS
│   └── SETUP.md                 # Instrucciones del frontend
└── README.md                    # Este archivo
```

## 🔧 Funcionalidades Principales

### 🛒 Carrito de Compras
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Cálculo automático del total
- Persistencia en base de datos

### ❤️ Sistema de Favoritos
- Agregar productos a favoritos
- Lista de productos favoritos
- Persistencia en base de datos

### 👤 Gestión de Usuarios
- Registro de usuarios
- Inicio de sesión
- Perfil de usuario
- Gestión de productos del usuario

### 📦 Gestión de Productos
- Lista de productos
- Filtros por tipo
- Ordenamiento por precio
- Detalles de productos
- Crear y editar productos

## 🌐 Endpoints de la API

- **Usuarios**: `/api/usuarios`
- **Productos**: `/api/productos`
- **Carrito**: `/api/carrito`
- **Favoritos**: `/api/favoritos`

## 🚨 Solución de Problemas Comunes

### El carrito no funciona
1. Verifica que estés logueado
2. Verifica que el backend esté ejecutándose en puerto 3000
3. Verifica que la base de datos esté configurada
4. Revisa la consola del navegador para errores

### Error de conexión a base de datos
1. Verifica que PostgreSQL esté ejecutándose
2. Verifica que la base de datos `tcgmoon` exista
3. Verifica las credenciales (por defecto: postgres/postgres)

### Error de CORS
1. Verifica que el backend esté configurado correctamente
2. Asegúrate de que el frontend esté en puerto 5173

## 📝 Variables de Entorno

### Backend (.env)
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_DATABASE=tcgmoon
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

**Nota**: Si no creas los archivos .env, se usarán los valores por defecto.

## 🎯 Próximos Pasos

1. **Configurar base de datos** con `npm run init-db`
2. **Ejecutar backend** con `npm run dev`
3. **Ejecutar frontend** con `npm run dev`
4. **Registrar usuario** en la aplicación
5. **Probar funcionalidades** del carrito y favoritos

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs del backend
2. Revisa la consola del navegador
3. Verifica la configuración de la base de datos
4. Consulta los archivos SETUP.md en cada carpeta
