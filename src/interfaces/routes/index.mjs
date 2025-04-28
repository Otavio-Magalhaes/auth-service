import { Router } from "express";
import authRoutes from "./auth.mjs"
import usersRoutes from "./users.mjs"
import swaggerDocs from '../docs/swaggerDocs.mjs';

const router = Router()


router.use(authRoutes)
router.use(usersRoutes)
router.use('/api-docs', swaggerDocs);

export default router