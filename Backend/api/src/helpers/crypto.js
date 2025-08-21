import bcrypt from 'bcrypt';

export async function hashearContrasena(contrasenaPlano) {
  if (!contrasenaPlano || typeof contrasenaPlano !== 'string') {
    throw Object.assign(new Error('Password inválida'), { status: 400 });
  }
  const rondas = process.env.BCRYPT_ROUNDS ? Number(process.env.BCRYPT_ROUNDS) : 10;
  const sal = await bcrypt.genSalt(rondas);
  const hash = await bcrypt.hash(contrasenaPlano, sal);
  return hash; // formato bcrypt, p.ej. $2b$10$...
}

export async function verificarContrasena(contrasenaPlano, almacenado) {
  try {
    return await bcrypt.compare(contrasenaPlano, String(almacenado));
  } catch {
    return false;
  }
}


