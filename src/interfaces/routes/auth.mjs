import { Router } from "express";
import { getCurrentUser, handleRefreshToken, login, logout } from "../controllers/authController.mjs";
import { authenticateToken } from "../middlewares/authMiddleware.mjs";



const router = Router()

router.post("/api/auth/login", login)

router.get("/api/auth/check", authenticateToken, (request,response)=>{
  response.json({
    msg: "Voce acessou a rota protegida",
    user: request.user
  })
})


router.get("/api/auth/refresh", handleRefreshToken)

router.get("/api/auth/me", authenticateToken,  getCurrentUser)

router.post("/api/auth/logout", logout)

export default router 