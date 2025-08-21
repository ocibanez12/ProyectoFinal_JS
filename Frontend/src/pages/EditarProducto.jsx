import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../store/ProductContext';
import { UserContext } from '../store/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MensajeInfo from '../components/MensajeInfo';
import Swal from 'sweetalert2';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const productoExistente = products.find(p => p.id === Number(id));
  const [productoEditado, setProductoEditado] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    tipo: '',
  });

  useEffect(() => {
    if (productoExistente) {
      setProductoEditado(productoExistente);
    }
  }, [productoExistente]);

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

  if (!productoExistente) {
    return (
      <>
        <Navbar />
        <MensajeInfo
          emoji="❓"
          mensaje="Producto no encontrado"
          botonTexto="Volver"
          botonLink="/mis-productos"
          color="orange"
        />
      </>
    );
  }

  const handleChange = (e) => {
    setProductoEditado({
      ...productoEditado,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateProduct(productoEditado);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el producto',
    })
    return
  }

  Swal.fire({
    icon: "success",
    title: "Producto actualizado",
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    navigate('/MisProductos');
  });
};

  return (
    <div>
      <Navbar />
      <div className="edit-container">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow card-contain">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              value={productoEditado.descripcion}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <select
              name="tipo"
              value={productoEditado.tipo}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="Carta">Carta</option>
              <option value="Sobre">Sobre</option>
              <option value="Pack">Pack</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleChange}
              className="form-control"
              min="0"
              step="any"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">URL Imagen</label>
            <input
              type="text"
              name="imagen"
              value={productoEditado.imagen}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditarProducto;
