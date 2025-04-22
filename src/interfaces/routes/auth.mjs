import { Router } from "express";
import { login } from "../controllers/authController.mjs";
import { authenticateToken } from "../middlewares/authMiddleware.mjs";



const router = Router()

router.post("/api/auth/login", login)

router.get("/api/auth/check", authenticateToken, (request,response)=>{
  response.json({
    msg: "Voce acessou a rota protegida",
    user: request.user
  })
})

export default router