import { Router } from "express";
import { getCurrentUser, handleRefreshToken, login, logout } from "../controllers/authController.mjs";
import { authenticateToken } from "../../infrastructure/middlewares/authMiddleware.mjs";
import { loginLimiter } from "../../infrastructure/middlewares/rateLimiters/loginLimiter.mjs";
import { validatesLoginUser } from "../validators/validationSchema.mjs";
import { validateRequest } from "../../infrastructure/middlewares/validateRequest.mjs";



const router = Router()

router.post("/api/auth/login", validatesLoginUser, validateRequest, loginLimiter ,login)

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