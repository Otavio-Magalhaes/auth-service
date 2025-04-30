import rateLimit from "express-rate-limit"

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Muitas tentativas de login. Tente novamente mais tarde.',
  keyGenerator: (request, response) => {
    return request.ip
  }
})