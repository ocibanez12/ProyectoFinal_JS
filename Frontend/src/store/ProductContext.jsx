import React, { createContext, useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import { productos as productosMock } from '../components/productos';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const client = axios.create({ baseURL });
        const { data } = await client.get('/api/productos', { params: { pagina: 1, tamanoPagina: 50 } });
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped = items.map(p => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion || '',
          precio: Number(p.precio),
          imagen: p.imagen_url || '',
          tipo: p.tipo,
          usuarioId: p.usuario_id || null,
        }));
        setProducts(mapped);
        setLogo("https://i.postimg.cc/5t2JfFDk/Logo.png");
      } catch (err) {
        console.error('Error cargando productos, usando datos locales', err);
        setProducts(productosMock);
        setLogo("https://i.postimg.cc/5t2JfFDk/Logo.png");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (nuevoProducto) => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const client = axios.create({ baseURL });
    const payload = {
      nombre: nuevoProducto.nombre,
      precio: Number(nuevoProducto.precio),
      tipo: nuevoProducto.tipo,
      imagen_url: nuevoProducto.imagen || null,
      usuario_id: nuevoProducto.usuarioId || nuevoProducto.usuario_id || 1,
    };
    try {
      const { data } = await client.post('/api/productos', payload);
      const creado = data;
      const mapped = {
        id: creado.id,
        nombre: creado.nombre,
        descripcion: nuevoProducto.descripcion || '',
        precio: Number(creado.precio),
        imagen: creado.imagen_url || nuevoProducto.imagen || '',
        tipo: creado.tipo,
        usuarioId: creado.usuario_id || nuevoProducto.usuarioId || null,
      };
      setProducts((prev) => [mapped, ...prev]);
    } catch (err) {
      // Fallback local
      const local = {
        ...nuevoProducto,
        id: nuevoProducto.id || Date.now(),
        precio: Number(nuevoProducto.precio),
      };
      setProducts((prev) => [local, ...prev]);
    }
  };

  const updateProduct = async (productoEditado) => {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const client = axios.create({ baseURL });
    const payload = {
      nombre: productoEditado.nombre,
      precio: Number(productoEditado.precio),
      tipo: productoEditado.tipo,
      imagen_url: productoEditado.imagen || null,
    };
    try {
      const { data } = await client.patch(`/api/productos/${productoEditado.id}`, payload);
      const actualizado = data;
      setProducts((prev) =>
        prev.map((prod) => 
          prod.id === productoEditado.id
            ? {
                ...prod,
                nombre: actualizado.nombre,
                precio: Number(actualizado.precio),
                tipo: actualizado.tipo,
                imagen: actualizado.imagen_url || productoEditado.imagen || '',
              }
            : prod
        )
      );
    } catch (err) {
      // Fallback local
      setProducts((prev) =>
        prev.map((prod) => 
          prod.id === productoEditado.id
            ? {
                ...prod,
                nombre: productoEditado.nombre,
                precio: Number(productoEditado.precio),
                tipo: productoEditado.tipo,
                imagen: productoEditado.imagen || prod.imagen,
              }
            : prod
        )
      );
    }
  };


  const removeProduct = async (id) => {
    const baseURL = import.meta.env.VITE_API_URL || '';
    const client = axios.create({ baseURL });
    try {
      await client.delete(`/api/productos/${id}`);
      setProducts((prev) => prev.filter(prod => prod.id !== id));
    } catch (err) {
      // Fallback local
      setProducts((prev) => prev.filter(prod => prod.id !== id));
    }
  };

  const globalProduct = {
    logo, 
    products, 
    addProduct, 
    removeProduct,
    updateProduct 
  }

  return (
    <ProductContext.Provider value={globalProduct}>
      {loading ? (
        <div className="loading-container">
          <SyncLoader margin={3} size={40} speedMultiplier={0.7} color="#ececec" />
        </div>
      ) : (
        children
      )}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
