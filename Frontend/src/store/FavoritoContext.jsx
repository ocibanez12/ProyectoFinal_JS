import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { baseURL } from '../config/constant.js';

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritoContext = createContext();

const FavoritoProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos del backend cuando hay usuario
  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!user?.id) {
        setFavoritos([]);
        return;
      }
      try {
        const client = axios.create({ baseURL });
        const { data } = await client.get('/api/favoritos', { params: { usuario_id: user.id, pagina: 1, tamanoPagina: 100 } });
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped = items.map(f => ({
          id: f.producto_id, // usamos id del producto para integrarnos con el UI
          nombre: f.nombre,
          precio: Number(f.precio),
          tipo: f.tipo,
          imagen: f.imagen_url || '',
        }));
        setFavoritos(mapped);
      } catch (err) {
        console.error('Error cargando favoritos', err);
        setFavoritos([]);
      }
    };
    fetchFavoritos();
  }, [user?.id]);

  const agregarFavorito = async (producto) => {
    if (!user?.id) return;
    try {
      const client = axios.create({ baseURL });
      await client.post('/api/favoritos', { usuario_id: user.id, producto_id: producto.id });
      setFavoritos(prev => {
        if (prev.find(p => p.id === producto.id)) return prev;
        return [...prev, { id: producto.id, nombre: producto.nombre, precio: Number(producto.precio), tipo: producto.tipo, imagen: producto.imagen }];
      });
    } catch (err) {
      console.error('Error agregando favorito', err);
    }
  };

  const eliminarFavorito = async (productoId) => {
    if (!user?.id) return;
    try {
      const client = axios.create({ baseURL });
      await client.delete('/api/favoritos', { data: { usuario_id: user.id, producto_id: productoId } });
    } catch (err) {
      console.error('Error eliminando favorito', err);
    } finally {
      setFavoritos(prev => prev.filter(p => p.id !== productoId));
    }
  };

  const estaEnFavoritos = (productoId) => {
    return favoritos.some(p => p.id === productoId);
  };

  const globalFavorito = { favoritos, agregarFavorito, eliminarFavorito, estaEnFavoritos };

  return (
    <FavoritoContext.Provider value={globalFavorito}>
      {children}
    </FavoritoContext.Provider>
  );
};

export default FavoritoProvider
