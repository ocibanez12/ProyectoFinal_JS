import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ProductContext } from '../store/ProductContext';
import { UserContext } from '../store/UserContext';
import { CartContext } from '../store/CartContext';
import { FavoritoContext } from '../store/FavoritoContext';
import MensajeInfo from '../components/MensajeInfo';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';

const tiposDisponibles = ['Carta', 'Mazo', 'Pack'];

const Productos = () => {
  const { products } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const { agregarFavorito, estaEnFavoritos } = useContext(FavoritoContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const filtroQuery = query.get('filtro'); // filtro desde URL

  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [filtros, setFiltros] = useState(filtroQuery ? [filtroQuery] : []);
  const [ordenPrecio, setOrdenPrecio] = useState('');

  useEffect(() => {
    if (filtroQuery) {
      setFiltros([filtroQuery]);
    }
  }, [filtroQuery]);

  const toggleFiltro = (tipo) => {
    setFiltros(
      filtros.includes(tipo)
        ? filtros.filter((f) => f !== tipo)
        : [...filtros, tipo]
    );
  };

  const handleAgregarFavorito = (producto) => {
    if (!user) {
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
      return;
    }
    agregarFavorito(producto);
    Swal.fire({
      icon: 'success',
      title: 'Favorito agregado',
      text: `"${producto.nombre}" fue agregado a tus favoritos.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleComprar = (producto) => {
    if (!user) {
      console.log('No hay usuario logueado, redirigiendo a login');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes Iniciar sesión',
      });
      return;
    }
    console.log('Usuario logueado, agregando producto al carrito:', producto);
    addToCart(producto);
    Swal.fire({
      icon: 'success',
      title: 'Agregado al carrito',
      text: `"${producto.nombre}" fue agregado a tu carrito.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Filtrado de productos
  let productosFiltrados = products.filter(
    (p) => filtros.length === 0 || filtros.includes(p.tipo)
  );

  if (ordenPrecio === 'asc') {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (ordenPrecio === 'desc') {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
  }

  return (
    <div className="products-page">
      <Navbar />

      {mostrarMensaje && (
        <MensajeInfo
          emoji="🚫"
          mensaje="Debes iniciar sesión para guardar en favoritos."
          botonTexto="Ir a Login"
          botonLink="/login"
          color="red"
        />
      )}

      <header className="products-header">
        <h1>Nuestros Productos</h1>
        <p>Encuentra las cartas y colecciones más exclusivas para tu mazo.</p>
      </header>

      <div className="products-layout">
        <aside className="filter-panel">
          <h3>Filtrar</h3>
          <div className="filter-options">
            {tiposDisponibles.map((tipo) => (
              <label key={tipo} className="filter-option">
                <input
                  type="checkbox"
                  checked={filtros.includes(tipo)}
                  onChange={() => toggleFiltro(tipo)}
                />
                {tipo}
              </label>
            ))}
          </div>

          <div className="filter-sort">
            <label>Ordenar por precio: </label>
            <select
              value={ordenPrecio}
              onChange={(e) => setOrdenPrecio(e.target.value)}
            >
              <option value="">Sin ordenar</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
        </aside>

        <section className="products-grid">
          {productosFiltrados.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.imagen} alt={p.nombre} />
              <h3>
                {p.nombre}{' '}
                <button
                  className="btn-favorito"
                  onClick={() => handleAgregarFavorito(p)}
                  disabled={estaEnFavoritos(p.id)}
                  title={
                    estaEnFavoritos(p.id)
                      ? 'Ya está en favoritos'
                      : 'Guardar en favoritos'
                  }
                >
                  {estaEnFavoritos(p.id) ? '❤' : '❤'}
                </button>
              </h3>
              <p className="tipo">{p.tipo}</p>
              <p className="price">${p.precio.toLocaleString()}</p>

              <div className="product-actions">
                <button
                  className="btn-comprar"
                  onClick={() => handleComprar(p)}
                >
                  Comprar
                </button>
                <Link to={`/producto/${p.id}`}>
                  <button className="btn-vermas">Ver más</button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Productos;
