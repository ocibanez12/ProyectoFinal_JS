import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../store/UserContext'

const Navbar = () => {
  const { user, logout } = useContext(UserContext)

  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg fixed-top shadow custom-navbar">
        <div className="container-fluid">
          {/* LOGO a la izquierda MODIFICAR NAVBAR POR UNA IMG LOGO*/}
          <Link className="navbar-brand" to="/">
            {/* Aquí pon tu logo con <img src="..." alt="Logo" /> o texto */}
            TcgMoon
          </Link>

          {/* Boton solo en mobile */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú para mobile */}
          <div
            className="offcanvas offcanvas-end d-lg-none"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Productos">Productos</Link>
                </li>

                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/carrito">Carrito</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/perfil">Perfil</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/misproductos">Mis Productos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/favoritos">Favoritos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Nuevo">Crear producto</Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={logout}>Cerrar sesión</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Login">Iniciar Sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Register">Registrar</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Menú desktop a la derecha del logo dentro de un div */}
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center">
            <div className="nav-right">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Productos">Productos</Link>
                </li>

                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/carrito">Carrito</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/perfil">Perfil</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/misproductos">Mis Productos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/favoritos">Favoritos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Nuevo">Crear producto</Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={logout}>Cerrar sesión</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Login">Iniciar Sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Register">Registrar</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
