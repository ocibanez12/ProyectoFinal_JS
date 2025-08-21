import { aHateoasColeccion, aHateoasRecurso } from '../helpers/hateoas.js';
import { hashearContrasena, verificarContrasena } from '../helpers/crypto.js';
import {
  crearUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  listarUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from '../models/usuarios.model.js';

export async function crear(req, res, next) {
  try {
    const { nombre, apellido, email, password } = req.body || {};
    if (!nombre || !email || !password) {
      throw Object.assign(new Error('nombre, email y password son requeridos'), { status: 400 });
    }
    const existente = await buscarUsuarioPorEmail(email);
    if (existente) {
      throw Object.assign(new Error('Email ya registrado'), { status: 409 });
    }
    const hashed = await hashearContrasena(password);
    const creado = await crearUsuario({ nombre, apellido, email, password: hashed });
    res.status(201).json(aHateoasRecurso(req, 'usuarios', creado));
  } catch (err) {
    next(err);
  }
}

export async function listar(req, res, next) {
  try {
    const { pagina = 1, tamanoPagina = 10 } = req.query;
    const datos = await listarUsuarios({ pagina: Number(pagina), tamanoPagina: Number(tamanoPagina) });
    res.json(aHateoasColeccion(req, 'usuarios', datos.rows, { pagina: datos.pagina, tamanoPagina: datos.tamanoPagina, total: datos.total }));
  } catch (err) {
    next(err);
  }
}

export async function obtenerPorId(req, res, next) {
  try {
    const { id } = req.params;
    const encontrado = await buscarUsuarioPorId(id);
    if (!encontrado) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
    res.json(aHateoasRecurso(req, 'usuarios', encontrado));
  } catch (err) {
    next(err);
  }
}

export async function actualizar(req, res, next) {
  try {
    const { id } = req.params;
    const datos = { ...req.body };
    if (datos.password) datos.password = await hashearContrasena(String(datos.password));
    const actualizado = await actualizarUsuario(id, datos);
    if (!actualizado) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
    res.json(aHateoasRecurso(req, 'usuarios', actualizado));
  } catch (err) {
    next(err);
  }
}

export async function eliminar(req, res, next) {
  try {
    const { id } = req.params;
    const ok = await eliminarUsuario(id);
    if (!ok) throw Object.assign(new Error('Usuario no encontrado'), { status: 404 });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) throw Object.assign(new Error('email y password requeridos'), { status: 400 });
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
    const ok = await verificarContrasena(password, usuario.password);
    if (!ok) throw Object.assign(new Error('Credenciales inválidas'), { status: 401 });
    const seguro = { id: usuario.id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, fecha_creacion: usuario.fecha_creacion };
    res.json({ usuario: aHateoasRecurso(req, 'usuarios', seguro) });
  } catch (err) {
    next(err);
  }
}

