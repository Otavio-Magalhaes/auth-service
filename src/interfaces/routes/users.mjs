import { Router } from "express";
import { register } from "../controllers/userController.mjs";

const router = Router()

router.post("/api/users", register)

export default router