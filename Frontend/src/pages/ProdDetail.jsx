import React, { useContext } from "react";
import { useParams } from "react-router-dom"; // Para leer parámetros URL
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProductContext } from '../store/ProductContext';
import { UserContext } from '../store/UserContext';
import { CartContext } from '../store/CartContext';
import Swal from "sweetalert2";

const ProdDetail = () => {
  const { id } = useParams(); // id viene de la URL
  const { products } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);

  // Buscar producto según id (parseInt porque id viene como string)
  const producto = products.find(p => p.id === parseInt(id));

  if (!producto) {
    return (
      <div>
        <Navbar />
        <p>Producto no encontrado.</p>
        <Footer />
      </div>
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
    <div className="product-detail-page">
      <Navbar />

      <div className="product-detail-container">
        <div className="product-image">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="product-info">
          <h1>{producto.nombre}</h1>
          <p className="product-type">{producto.tipo}</p>
          <p className="product-price">${producto.precio.toLocaleString()}</p>
          <p className="product-description">{producto.descripcion || "Sin descripción"}</p>

          <div className="product-actions">
            <button className="custom-btn" onClick={() => handleComprar(producto)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProdDetail;
