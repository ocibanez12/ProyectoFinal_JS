import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MensajeInfo from "../components/MensajeInfo";
import { UserContext } from '../store/UserContext';
import { CartContext } from '../store/CartContext';
import Swal from 'sweetalert2';

const Cart = () => {
  const { user } = useContext(UserContext);
  const { cartItems, removeFromCart, updateQuantity, finalizarCompra, total } = useContext(CartContext);

  const handleFinalizarCompra = async () => {
    try {
      // Mostrar loading
      Swal.fire({
        title: 'Procesando compra...',
        text: 'Por favor espera mientras procesamos tu orden',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const resultado = await finalizarCompra();
      
      if (resultado) {
        // Formatear fecha
        const fecha = new Date(resultado.orden.fecha_creacion).toLocaleString('es-ES');
        
        // Crear HTML para los productos
        const productosHTML = resultado.items.map(item => 
          `<div style="text-align: left; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <strong>${item.nombre}</strong><br>
            Cantidad: ${item.cantidad} | Precio: $${item.precio} | Subtotal: $${item.subtotal}
          </div>`
        ).join('');

        // Mostrar SweetAlert con los detalles de la orden
        Swal.fire({
          icon: 'success',
          title: '¡Compra Finalizada Exitosamente!',
          html: `
            <div style="text-align: left;">
              <h3>Detalles de la Orden</h3>
              <p><strong>ID de Orden:</strong> #${resultado.orden.id}</p>
              <p><strong>ID de Usuario:</strong> ${resultado.orden.usuario_id}</p>
              <p><strong>Fecha:</strong> ${fecha}</p>
              <p><strong>Estado:</strong> ${resultado.orden.estado}</p>
              
              <h4>Productos:</h4>
              ${productosHTML}
              
              <h3 style="color: #10846f; margin-top: 20px;">
                Total: $${resultado.orden.total.toLocaleString()}
              </h3>
            </div>
          `,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#10846f',
          width: '600px'
        });
      } else {
        throw new Error('No se pudo procesar la orden');
      }
    } catch (error) {
      console.error('Error al finalizar compra:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al Finalizar Compra',
        text: 'Hubo un problema al procesar tu orden. Por favor intenta nuevamente.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33'
      });
    }
  };

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

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <MensajeInfo
          emoji="🛒"
          mensaje="Tu carrito está vacío."
          botonTexto="Ir a productos"
          botonLink="/productos"
          color="#ff9800"
        />
      </>
    );
  }

  // Sumar cantidades de todos los productos en el carrito
  const cantidadTotal = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <h2>Tu Carrito</h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imagen} alt={item.nombre} />
                <div className="item-details">
                  <h4>{item.nombre}</h4>
                  <p className="tipo">{item.tipo}</p>
                  <p className="price">
                    Total: ${(item.precio * item.cantidad).toLocaleString()}
                  </p>

                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✖</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumen</h3>
            <p>Cantidad: <strong>{cantidadTotal}</strong></p>
            <p>Total: <strong>${total.toLocaleString()}</strong></p>
            <button 
              className="checkout-btn" 
              onClick={handleFinalizarCompra}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
