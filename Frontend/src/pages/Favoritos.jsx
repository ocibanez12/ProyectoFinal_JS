import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MensajeInfo from "../components/MensajeInfo";
import { UserContext } from '../store/UserContext';
import { FavoritoContext } from '../store/FavoritoContext';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../store/CartContext";

const Favoritos = () => {
  const { addToCart } = useContext(CartContext);
  const { favoritos, eliminarFavorito } = useContext(FavoritoContext);
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <>
        <Navbar />
        <MensajeInfo
          emoji="🚫"
          mensaje="Debes iniciar sesión"
          botonTexto="Ir a Login"
          botonLink="/login"
          color="red"
        />
      </>
    );
  }

  const handleComprar = (producto) => {
      if (!user) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes Iniciar sesión",
        });
        return;
      }
      addToCart(producto);
  
      Swal.fire({
        icon: "success",
        title: "Agregado al carrito",
        text: `"${producto.nombre}" fue agregado a tu carrito.`,
        timer: 1500,
        showConfirmButton: false,
      })
    };

  return (
    <div className="favorites-page">
      <Navbar />
      <header className="favorites-header">
        <h1>Mis Favoritos</h1>
        <p>Estos son los productos que más te gustan</p>
      </header>

      <section className="favorites-grid">
        {favoritos.length > 0 ? (
          favoritos.map(fav => (
            <div className="product-card" key={fav.id}>
              <img src={fav.imagen} alt={fav.nombre} />
              <h3>{fav.nombre}</h3>
              <p className="tipo">{fav.tipo}</p>
              <p className="price">${fav.precio.toLocaleString()}</p>
              
              <div className="card-actions">
                <button
                  className="btn-comprar"
                  onClick={() => handleComprar(fav)}> 
                  Comprar
                </button>
                <Link to={`/producto/${fav.id}`}>
                  <button className="btn-vermas">Ver más</button>
                </Link>
              </div>

              <button className="remove-btn" onClick={() => eliminarFavorito(fav.id)}>✖ Quitar</button>
            </div>
          ))
        ) : (
          <p className="empty-message">No tienes productos en favoritos.</p>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Favoritos;
