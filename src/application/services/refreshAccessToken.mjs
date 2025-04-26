import jwt from "jsonwebtoken"
import { config } from "../../config/env.mjs"

const JWT_REFRESH_TOKEN_SCRET =  config.jwtRefreshToken
const JWT_ACCESS_TOKEN_SCRET  = config.jwtSecret

export const refreshAcessToken = (refreshTokenFromCookie) =>{
  if(!refreshAcessToken){
    throw new Error("Refresh Token nao fornecido")
  }

  try {
    const decoded = jwt.verify(refreshTokenFromCookie, JWT_REFRESH_TOKEN_SCRET)
    const newAcessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      JWT_ACCESS_TOKEN_SCRET,
      {expiresIn: "1h"}
    )
  
    return newAcessToken
  
  } catch (err) {
    throw new Error ("Refresh Token Invalido ou expirado.")
  }

}