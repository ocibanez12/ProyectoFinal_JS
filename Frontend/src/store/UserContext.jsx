import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // usuario actual
  const [error, setError] = useState(null);

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("usuario");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) setUser(parsed);
      }
    } catch {}
  }, []);

  // Registrar un nuevo usuario contra el backend
  const registerUser = async ({ nombre, apellido, email, password }) => {
    setError(null);
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const client = axios.create({ baseURL });
      await client.post("/api/usuarios", { nombre, apellido, email, password });
      return { success: true };
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Error de registro";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  // Login contra el backend
  const authLogin = async (email, password) => {
    setError(null);
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const client = axios.create({ baseURL });
      const { data } = await client.post("/api/usuarios/login", { email, password });
      const usuario = data?.usuario || null;
      if (!usuario || !usuario.id) throw new Error("Respuesta inválida del servidor");
      setUser(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      return true;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || "Usuario o contraseña incorrectos";
      setError(msg);
      return false;
    }
  };

  // Logout local
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };

  // Actualizar usuario en backend (por ejemplo, password, nombre, apellido)
  const updateUser = async (partial) => {
    if (!user?.id) return false;
    try {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const client = axios.create({ baseURL });
      const { data } = await client.patch(`/api/usuarios/${user.id}`, partial);
      const actualizado = data || {};
      const merged = { ...user, ...actualizado };
      setUser(merged);
      localStorage.setItem("usuario", JSON.stringify(merged));
      return true;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Error al actualizar usuario";
      setError(msg);
      return false;
    }
  };

  const globalUser = {
    user,
    setUser,
    error,
    authLogin,
    logout,
    registerUser,
    updateUser,
  };

  return (
    <UserContext.Provider value={globalUser}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
