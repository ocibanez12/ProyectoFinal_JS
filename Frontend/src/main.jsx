import './styles/home.css'
import './styles/cards.css'
import './styles/productos.css'
import './styles/login.css'
import './styles/register.css'
import './styles/cart.css'
import './styles/proddetail.css'
import './styles/favoritos.css'
import './styles/perfil.css'
import './styles/createproduct.css'
import './styles/misproductos.css'
import './styles/mensajeinfo.css'
import './styles/edit.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
