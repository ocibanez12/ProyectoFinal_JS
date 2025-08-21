import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import ProdDetail from './pages/ProdDetail'
import Favoritos from './pages/Favoritos'
import Perfil from './pages/Perfil'
import CrearProducto from './pages/CreateProduct'
import ProductProvider from './store/ProductContext'
import MisProductos from './pages/MisProductos'
import EditProducto from './pages/EditarProducto'

function App() {
  return (
    <BrowserRouter>
        <ProductProvider>
        
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Productos" element={<Productos />} /> 
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Carrito" element={<Cart />} />
            <Route path="/Producto/:id" element={<ProdDetail />} />
            <Route path="/Favoritos" element={<Favoritos />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Nuevo" element={<CrearProducto />} />
            <Route path='/MisProductos' element={<MisProductos />}/>
            <Route path='/EditarProducto/:id' element={<EditProducto />}/>
            </Routes>
        </ProductProvider>
    </BrowserRouter>
  )
}

export default App
