import { Router } from "express";
import { login } from "../controllers/authController.mjs";



const router = Router()

router.post("/api/auth/login", login)

export default router