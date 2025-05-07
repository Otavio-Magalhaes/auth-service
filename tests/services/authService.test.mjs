import supertest from "supertest"; 
import app from "../../app.mjs"

const request = supertest;

describe("Auth Routes", () => {
  it("deve logar com sucesso com credenciais válidas", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "otavio@gmail.com",
      password: "Oivato1018*"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});