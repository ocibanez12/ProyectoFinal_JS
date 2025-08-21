import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../store/UserContext";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres",
      });
      return;
    }

    const newUser = {
      nombre,
      apellido,
      email,
      password,
    };

    const result = await registerUser(newUser); // Usamos la función del contexto

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada",
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: result.message,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <div className="register-left"></div>
        <div className="register-right">
          <div className="register-form">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input
                  type="text"
                  placeholder="Apellidos"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  placeholder="Correo"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-register">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
