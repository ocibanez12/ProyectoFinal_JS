# 🎴 TCGMoon - Proyecto Final

> **E-commerce de cartas Pokémon y trading card games**  
> Desarrollado con React, Node.js y PostgreSQL

## 📋 ¿Qué es TCGMoon?

TCGMoon es una tienda online especializada en cartas de Pokémon y otros juegos de cartas coleccionables. Los usuarios pueden comprar, vender y gestionar productos relacionados con trading card games.

## ✨ ¿Qué hace la aplicación?

### 🛒 **Carrito de Compras**
- Agregar productos al carrito
- Ver el total de la compra
- Eliminar productos

### ❤️ **Favoritos**
- Guardar productos que te gustan
- Ver tu lista de favoritos

### 👤 **Usuarios**
- Registrarte e iniciar sesión
- Ver tu perfil
- Crear y vender tus propios productos

### 📦 **Productos**
- Ver catálogo completo
- Filtrar por tipo (Cartas, Mazos, Packs)
- Ordenar por precio
- Crear nuevos productos

## 🚀 Cómo usar la aplicación

### 1. **Instalar dependencias**
```bash
# Backend
cd Backend/api
npm install

# Frontend  
cd Frontend
npm install
```

### 2. **Configurar base de datos**
```sql
CREATE DATABASE tcgmoon;
```

### 3. **Ejecutar la aplicación**
```bash
# Terminal 1 - Backend
cd Backend/api
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### 4. **Abrir en el navegador**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🛠️ Tecnologías utilizadas

- **Frontend**: React, Vite, Bootstrap
- **Backend**: Node.js, Express
- **Base de datos**: PostgreSQL
- **Estado**: Context API

## 📁 Estructura del proyecto

```
ProyectoFinal_JS/
├── Backend/api/          # Servidor y API
├── Frontend/             # Aplicación web
└── README.md
```

## 🔧 Funcionalidades principales

- ✅ Registro e inicio de sesión
- ✅ Catálogo de productos con filtros
- ✅ Carrito de compras funcional
- ✅ Sistema de favoritos
- ✅ Crear y editar productos
- ✅ Perfil de usuario
- ✅ Diseño responsive

## 🚨 Problemas comunes

**El carrito no funciona:**
- Verifica que estés logueado
- Asegúrate de que el backend esté corriendo

**Error de base de datos:**
- Verifica que PostgreSQL esté activo
- Confirma que la base de datos `tcgmoon` exista

## 📝 Variables de entorno

### Backend (.env)
```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_DATABASE=tcgmoon
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🎯 Próximos pasos

1. Ejecutar `npm run init-db` en el backend
2. Iniciar backend y frontend
3. Crear una cuenta de usuario
4. Probar todas las funcionalidades

---

**Desarrollado como Proyecto Final de Desarrollo Web** 🚀

