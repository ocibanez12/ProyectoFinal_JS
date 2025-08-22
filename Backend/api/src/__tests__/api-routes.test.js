const request = require('supertest');
const server = require('../../server.js');

describe('Tests Básicos de API', () => {

  // Test 1: Probar que la API responde
  it('GET / - La API responde correctamente', async () => {
    const response = await request(server).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('TCGMoon API');
  });

  // Test 2: Probar usuarios
  it('GET /api/usuarios - Requiere autenticación', async () => {
    const response = await request(server).get('/api/usuarios');

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe('Token requerido');
  });

  // Test 3: Probar validación de datos
  it('POST /api/usuarios - Requiere datos completos', async () => {
    const response = await request(server)
      .post('/api/usuarios')
      .send({ nombre: 'Solo nombre' }); // Datos incompletos

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test 4: Probar post productos
  it('POST /api/productos - Requiere datos válidos', async () => {
    const response = await request(server)
      .post('/api/productos')
      .send({
        nombre: 'Carta test'
        // Faltan datos requeridos
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
