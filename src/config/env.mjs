import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.ACCESS_TOKEN_SCRET,
  jwtRefreshToken: process.env.REFRESH_TOKEN_SCRET
}