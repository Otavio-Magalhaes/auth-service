import { Router } from "express";
import authRoutes from "./auth.mjs"
import usersRoutes from "./users.mjs"


const router = Router()


router.use(authRoutes)
router.use(usersRoutes)


export default router