import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { baseURL } from "../config/constant.js";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde backend cuando hay usuario
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.id) {
        console.log('No hay usuario, carrito vacío');
        setCartItems([]);
        return;
      }
      try {
        console.log('Intentando cargar carrito desde:', baseURL);
        const client = axios.create({ baseURL });
        const { data } = await client.get('/api/carrito', { params: { usuario_id: user.id, pagina: 1, tamanoPagina: 100 } });
        console.log('Respuesta del carrito:', data);
        // El backend usa HATEOAS que transforma rows en items
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped = items.map(it => ({
          id: it.producto_id,
          nombre: it.nombre,
          precio: Number(it.precio),
          tipo: it.tipo,
          imagen: it.imagen_url || '',
          cantidad: Number(it.cantidad) || 1,
        }));
        console.log('Items mapeados:', mapped);
        setCartItems(mapped);
      } catch (err) {
        console.error('Error cargando carrito', err);
        setCartItems([]);
      }
    };
    fetchCart();
  }, [user?.id]);

  const addToCart = async (producto) => {
    if (!user?.id) {
      console.log('No hay usuario para agregar al carrito');
      return;
    }
    try {
      console.log('Agregando al carrito:', producto);
      const client = axios.create({ baseURL });
      await client.post('/api/carrito', { usuario_id: user.id, producto_id: producto.id, cantidad: 1 });
      console.log('Producto agregado al carrito exitosamente');
      
      // Recargar el carrito desde el backend para mantener consistencia
      const { data } = await client.get('/api/carrito', { params: { usuario_id: user.id, pagina: 1, tamanoPagina: 100 } });
      const items = Array.isArray(data?.items) ? data.items : [];
      const mapped = items.map(it => ({
        id: it.producto_id,
        nombre: it.nombre,
        precio: Number(it.precio),
        tipo: it.tipo,
        imagen: it.imagen_url || '',
        cantidad: Number(it.cantidad) || 1,
      }));
      setCartItems(mapped);
    } catch (err) {
      console.error('Error agregando al carrito', err);
    }
  };

  const removeFromCart = async (id) => {
    if (!user?.id) return;
    try {
      const client = axios.create({ baseURL });
      await client.delete('/api/carrito/item', { data: { usuario_id: user.id, producto_id: id } });
      
      // Recargar el carrito desde el backend para mantener consistencia
      const { data } = await client.get('/api/carrito', { params: { usuario_id: user.id, pagina: 1, tamanoPagina: 100 } });
      const items = Array.isArray(data?.items) ? data.items : [];
      const mapped = items.map(it => ({
        id: it.producto_id,
        nombre: it.nombre,
        precio: Number(it.precio),
        tipo: it.tipo,
        imagen: it.imagen_url || '',
        cantidad: Number(it.cantidad) || 1,
      }));
      setCartItems(mapped);
    } catch (err) {
      console.error('Error eliminando del carrito', err);
    }
  };

  const updateQuantity = async (id, cantidad) => {
    if (!user?.id) return;
    if (cantidad <= 0) {
      await removeFromCart(id);
      return;
    }
    try {
      const client = axios.create({ baseURL });
      await client.patch('/api/carrito', { usuario_id: user.id, producto_id: id, cantidad });
      
      // Recargar el carrito desde el backend para mantener consistencia
      const { data } = await client.get('/api/carrito', { params: { usuario_id: user.id, pagina: 1, tamanoPagina: 100 } });
      const items = Array.isArray(data?.items) ? data.items : [];
      const mapped = items.map(it => ({
        id: it.producto_id,
        nombre: it.nombre,
        precio: Number(it.precio),
        tipo: it.tipo,
        imagen: it.imagen_url || '',
        cantidad: Number(it.cantidad) || 1,
      }));
      setCartItems(mapped);
    } catch (err) {
      console.error('Error actualizando cantidad', err);
    }
  };

  const finalizarCompra = async () => {
    if (!user?.id) {
      console.log('No hay usuario para finalizar compra');
      return null;
    }
    
    if (cartItems.length === 0) {
      console.log('Carrito vacío, no se puede finalizar compra');
      return null;
    }
    
    try {
      console.log('Finalizando compra para usuario:', user.id);
      const client = axios.create({ baseURL });
      
      const payload = {
        usuario_id: user.id,
        items: cartItems,
        total: total
      };
      
      console.log('Payload de finalizar compra:', payload);
      
      const { data } = await client.post('/api/ordenes/finalizar-compra', payload);
      console.log('Compra finalizada exitosamente:', data);
      
      // Limpiar el carrito local
      setCartItems([]);
      
      return data.data;
      
    } catch (err) {
      console.error('Error finalizando compra:', err);
      return null;
    }
  };

  // Calcula el total del carrito sumando precio * cantidad de cada producto
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const globalCart = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    finalizarCompra,
    total,
  };

  return (
    <CartContext.Provider value={globalCart}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;