import  request  from "supertest";
import app from "../../app.mjs";
import { response } from "express";


describe('Rate Limit - Login', ()=>{
  it('bloqueia o login apos 5 tentativas', 
    async() =>{
      const tentativas = 5
      for(let i = 0; i< tentativas; i++){
        const response = await request(app)
        .post('/api/auth/login')
        .send({email: "user@exemple.com", password: "senhaErrada0*"})

        expect(response.status).not.toBe(429)
      }
    const resFinal= await request(app)
    .post("/api/auth/login")
    .send({email: "user@exemple.com", password: "senhaErrada0*"})
    
    expect(resFinal.status).toBe(429);
    expect(resFinal.text).toMatch("Muitas tentativas de login. Tente novamente mais tarde.")
    }
  )
})