import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../store/UserContext';
import Swal from 'sweetalert2';

const Login = () => {
  const { authLogin, error } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await authLogin(email, password);
    setLoading(false);

    if (result) {
      // Login exitoso, redirige al home
      navigate('/');
    } else {
      // Login fallido, mostrar SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: error || 'Correo o contraseña incorrectos',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-left"></div>
        <div className="login-right">
          <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  placeholder="Tu contraseña" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? 'Cargando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
