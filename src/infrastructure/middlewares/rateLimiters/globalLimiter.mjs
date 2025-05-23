import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições. Tente novamente em alguns minutos.'
})