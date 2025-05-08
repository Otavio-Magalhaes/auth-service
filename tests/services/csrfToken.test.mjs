import request from 'supertest';
import app from '../../app.mjs'; 

describe('GET /api/auth/csfr-token', () => {
  it('deve retornar um token CSRF válido', async () => {
    const response = await request(app).get('/api/auth/csfr-token');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('csrfToken');
    expect(typeof response.body.csrfToken).toBe('string');
    expect(response.body.csrfToken.length).toBeGreaterThan(10); // opcional
  });
});