import React, { useContext } from "react";
import { ProductContext } from "../store/ProductContext";
import { UserContext } from "../store/UserContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MensajeInfo from "../components/MensajeInfo";
import Footer from "../components/Footer";

const MisProductos = () => {
  const { products, removeProduct } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  // Si no hay usuario logeado
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

  // Evitar error si products es undefined
  const misProductos = products?.filter(
    (p) => p.usuarioId === user.id
  ) || [];

  if (misProductos.length === 0) {
    return (
      <>
        <Navbar />
        <MensajeInfo
          emoji="📦"
          mensaje="No tienes productos publicados."
          botonTexto="Agregar producto"
          botonLink="/Nuevo"
          color="#ff9800"
        />
      </>
    );
  }

  return (
    <div>
      <Navbar />
        <div className="misprod-container">
          <div className="container mt-4">
            <h2 className="mb-4">Mis Productos</h2>
            <div className="row">
              {misProductos.map((producto) => (
                <div className="col-md-4 mb-3" key={producto.id}>
                  <div className="card shadow-sm h-100">
                    <img
                      src={producto.imagen}
                      className="card-img-top"
                      alt={producto.nombre}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text text-muted">{producto.descripcion}</p>
                      <div className="mt-auto d-flex justify-content-between">
                        <Link
                          to={`/producto/${producto.id}`}
                          className="btn btn-success btn-sm"
                        >
                          Ver más
                        </Link>
                        <Link
                          to={`/editarproducto/${producto.id}`}
                          className="btn btn-success btn-sm"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeProduct(producto.id)}
                        >
                          Eliminar
                        </button>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default MisProductos;
