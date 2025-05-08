import request from 'supertest'
import app from '../../app.mjs'
import jwt from 'jsonwebtoken'
import { config } from '../../src/config/env.mjs'
import { prisma}  from "../../src/infrastructure/database/prisma/UserPrismaRepository.mjs"

describe('POST /api/auth/refresh', () => {
  it('deve retornar o AcessToken e RefreshToken válidos', async () => {

    const mockUser = {
      //crie esse usuario exemplo no banco para fazer o teste da rota.
      id: 'fdf7156c-190d-4fbe-8c1a-b404d30c83d3', 
      email: 'user@example.com'
    }

    const refreshToken = jwt.sign(mockUser, config.jwtRefreshToken, {
      expiresIn: '7d'
    })

    await prisma.user.update({
      where: { id: mockUser.id },
      data: { refreshToken }
    });
    const csrfResponse = await request(app).get('/api/auth/csfr-token');
    const csrfToken = csrfResponse.body.csrfToken;
    const cookies = csrfResponse.headers['set-cookie'] || [];
    const csrfCookie = cookies.find(cookie => cookie.includes('_csrf='));

    const response = await request(app)
      .post('/api/auth/refresh')
      .set('Cookie', [`${csrfCookie}`, `refreshToken=${refreshToken}`])
      .set('x-csrf-token', csrfToken);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');

    const responseCookies = response.headers['set-cookie'];
    expect(Array.isArray(responseCookies)).toBe(true);
    expect(responseCookies.some(cookie => cookie.startsWith('refreshToken='))).toBe(true);
  });
});