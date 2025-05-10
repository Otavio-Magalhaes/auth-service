import request from "supertest"; 
import app from "../../app.mjs"



describe("Auth Routes", () => {
  it("deve logar com sucesso com credenciais válidas", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "user@exemple.com",
      password: "sernhaErrada0*"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});