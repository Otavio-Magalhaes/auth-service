import request from "supertest";
import app from "../../app.mjs";

describe("Logout", () => {
  it("Deve deslogar o usuário com sucesso e remover o token", async () => {

    const responseLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@email.com",
        password: "Otavio123*",
      });

    expect(responseLogin.statusCode).toBe(200);

    const loginCookies = responseLogin.headers["set-cookie"];
    const refreshTokenCookie = loginCookies.find(cookie => cookie.includes("refreshToken="));
  
    const csrfResponse = await request(app)
      .get("/api/auth/csrf-token")
      .set("Cookie", loginCookies);

    expect(csrfResponse.statusCode).toBe(200);
    const csrfToken = csrfResponse.body.csrfToken;
    const csrfCookies = csrfResponse.headers["set-cookie"];

    const allCookies = [...loginCookies, ...(csrfCookies)];
 
    const responseLogout = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", [...allCookies, refreshTokenCookie])
      .set("csrf-token", csrfToken); 

    expect(responseLogout.statusCode).toBe(200);
    expect(responseLogout.body.msg).toBe("Logout realizado com sucesso.");
  });
});