import { pool } from '../db/pool.js';

export async function crearOrden({ usuario_id, items, total }) {
  console.log('Modelo: crearOrden llamado con:', { usuario_id, items, total });
  
  try {
    // Iniciar transacción
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Crear la orden
      const ordenQuery = `
        INSERT INTO ordenes (usuario_id, total, fecha_creacion, estado)
        VALUES ($1, $2, NOW(), 'pendiente')
        RETURNING id, usuario_id, total, fecha_creacion, estado
      `;
      const { rows: ordenRows } = await client.query(ordenQuery, [usuario_id, total]);
      const orden = ordenRows[0];
      
      console.log('Orden creada:', orden);
      
      // Crear los items de la orden
      const itemsOrden = [];
      for (const item of items) {
        const itemQuery = `
          INSERT INTO orden_items (orden_id, producto_id, nombre, precio, cantidad, subtotal)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, orden_id, producto_id, nombre, precio, cantidad, subtotal
        `;
        const subtotal = item.precio * item.cantidad;
        const { rows: itemRows } = await client.query(itemQuery, [
          orden.id, 
          item.id, 
          item.nombre, 
          item.precio, 
          item.cantidad, 
          subtotal
        ]);
        itemsOrden.push(itemRows[0]);
      }
      
      // Vaciar el carrito del usuario
      await client.query('DELETE FROM carrito WHERE usuario_id = $1', [usuario_id]);
      
      await client.query('COMMIT');
      
      return {
        orden: {
          id: orden.id,
          usuario_id: orden.usuario_id,
          total: orden.total,
          fecha_creacion: orden.fecha_creacion,
          estado: orden.estado
        },
        items: itemsOrden
      };
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error en crearOrden:', error);
    throw error;
  }
}

export async function obtenerOrdenesUsuario(usuario_id) {
  const query = `
    SELECT o.id, o.total, o.fecha_creacion, o.estado,
           oi.producto_id, oi.nombre, oi.precio, oi.cantidad, oi.subtotal
    FROM ordenes o
    LEFT JOIN orden_items oi ON o.id = oi.orden_id
    WHERE o.usuario_id = $1
    ORDER BY o.fecha_creacion DESC
  `;
  
  const { rows } = await pool.query(query, [usuario_id]);
  
  // Agrupar items por orden
  const ordenes = {};
  rows.forEach(row => {
    if (!ordenes[row.id]) {
      ordenes[row.id] = {
        id: row.id,
        total: row.total,
        fecha_creacion: row.fecha_creacion,
        estado: row.estado,
        items: []
      };
    }
    
    if (row.producto_id) {
      ordenes[row.id].items.push({
        producto_id: row.producto_id,
        nombre: row.nombre,
        precio: row.precio,
        cantidad: row.cantidad,
        subtotal: row.subtotal
      });
    }
  });
  
  return Object.values(ordenes);
}
