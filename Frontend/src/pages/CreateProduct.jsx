import React, { useState, useContext } from 'react'
import { ProductContext } from '../store/ProductContext'
import { UserContext } from '../store/UserContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MensajeInfo  from '../components/MensajeInfo'
import Swal from 'sweetalert2'

const CrearProducto = () => {
  const { addProduct } = useContext(ProductContext)
  const { user } = useContext(UserContext)

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    tipo: '',
  })
  
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


  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.imagen || !nuevoProducto.tipo) {
      Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor completa todos los campos obligatorios',
  });
  return;
}

    const productoConId = {
      ...nuevoProducto,
      id: Date.now(),
      precio: Number(nuevoProducto.precio),
      usuarioId: user?.id || null,
  }

    try {
      await addProduct(productoConId)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el producto',
      })
      return
    }

    setNuevoProducto({
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
      tipo: '',
    })

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

    Swal.fire({
            icon: "success",
            title: "Producto creado",
            text: 'Producto creado con exito',
            timer: 1500,
            showConfirmButton: false,
          })
  }

  return (
    <div>
      <Navbar />
      <div className='container-prod'>
        <div className="container mt-5 mb-5 pt-5">
            <h2 className="mb-4">Crear Producto</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
            <div className="mb-3">
                <label className="form-label">Nombre del producto</label>
                <input
                type="text"
                name="nombre"
                className="form-control"
                value={nuevoProducto.nombre}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                name="descripcion"
                className="form-control"
                value={nuevoProducto.descripcion}
                onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                name="tipo"
                className="form-select"
                value={nuevoProducto.tipo}
                onChange={handleChange}
                required
                >
                <option value="" disabled>Selecciona un tipo</option>
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
                className="form-control"
                value={nuevoProducto.precio}
                onChange={handleChange}
                required
                min="0"
                step="any"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">URL de la imagen</label>
                <input
                type="text"
                name="imagen"
                className="form-control"
                value={nuevoProducto.imagen}
                onChange={handleChange}
                required
                />
            </div>

            <button type="submit" className="btn btn-success">
                Agregar Producto
            </button>
            </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CrearProducto
