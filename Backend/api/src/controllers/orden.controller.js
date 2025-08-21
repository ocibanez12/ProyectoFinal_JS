import { crearOrden, obtenerOrdenesUsuario } from '../models/orden.model.js';

export async function finalizarCompra(req, res, next) {
  try {
    const { usuario_id, items, total } = req.body || {};
    console.log('Finalizando compra para usuario:', usuario_id);
    
    if (!usuario_id || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'usuario_id, items y total son requeridos. Items debe ser un array no vacío.' 
      });
    }
    
    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ 
        error: 'total debe ser un número mayor a 0' 
      });
    }
    
    const resultado = await crearOrden({ usuario_id, items, total });
    console.log('Compra finalizada exitosamente:', resultado);
    
    res.status(201).json({
      success: true,
      message: 'Orden creada exitosamente',
      data: resultado
    });
    
  } catch (err) {
    console.error('Error al finalizar compra:', err);
    res.status(500).json({ 
      error: 'Error interno del servidor al finalizar la compra',
      details: err.message 
    });
  }
}

export async function listarOrdenesUsuario(req, res, next) {
  try {
    const { usuario_id } = req.params || {};
    console.log('Listando órdenes para usuario:', usuario_id);
    
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id es requerido' });
    }
    
    const ordenes = await obtenerOrdenesUsuario(usuario_id);
    console.log('Órdenes obtenidas:', ordenes);
    
    res.json({
      success: true,
      data: ordenes
    });
    
  } catch (err) {
    console.error('Error al listar órdenes:', err);
    res.status(500).json({ 
      error: 'Error interno del servidor al listar las órdenes',
      details: err.message 
    });
  }
}
