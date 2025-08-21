// Perfil.jsx
import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserContext } from '../store/UserContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Perfil = () => {
  const { user, updateUser } = useContext(UserContext)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: '🚫 Debes iniciar sesión',
        text: 'Accede con tu cuenta para ver tu perfil.',
        confirmButtonColor: '#28a745'
      }).then(() => {
        navigate('/login')
      })
    }
  }, [user, navigate])

  if (!user) {
    return (
      <div>
        <Navbar />
        <Footer />
      </div>
    )
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.trim().length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'La contraseña debe tener al menos 8 caracteres',
        confirmButtonColor: '#dc3545'
      })
      return
    }

    const ok = await updateUser({ password })
    if (ok) {
      Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada correctamente',
        timer: 1500,
        showConfirmButton: false
      })
      setPassword('')
    }
  }

  return (
    <div>
      <div className="perfil-container">
        <Navbar />
        <h2>Perfil de Usuario</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Nombre</label>
            <p className="user-info">{user.nombre} {user.apellido}</p>
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <p className="user-info">{user.email}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa nueva contraseña"
              value={password}
              onChange={handleChangePassword}
            />
          </div>

          <button
            type="submit"
            className="btn-submit"
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Perfil
