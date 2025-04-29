import jwt from "jsonwebtoken"
import { config } from "../../config/env.mjs"
import { ValidationError } from "../../shared/erros/CustomErrors.mjs"
import { prisma}  from "../../infrastructure/database/prisma/UserPrismaRepository.mjs"

const JWT_REFRESH_TOKEN_SCRET =  config.jwtRefreshToken
const JWT_ACCESS_TOKEN_SCRET  = config.jwtSecret

export const refreshAcessToken = async(refreshTokenFromCookie) =>{
  if(!refreshTokenFromCookie){
    throw new ValidationError("Refresh Token não fornecido")
  }

  try {
    const decoded = jwt.verify(refreshTokenFromCookie, JWT_REFRESH_TOKEN_SCRET)

    const user = await prisma.user.findUnique({where:{id: decoded.id}})

    if(!user || user.refreshToken !== refreshTokenFromCookie){
      throw new ValidationError("Token não corresponde ao registrado.")
    }

    const newAcessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      JWT_ACCESS_TOKEN_SCRET,
      {expiresIn: "1h"}
    )

    const newRefreshToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      JWT_REFRESH_TOKEN_SCRET,
      {expiresIn: "7d"}
    )
    
    await prisma.user.update({
      where:{id: decoded.id},
      data: { refreshToken: newRefreshToken }
    })
    console.log("salvo no banco o novo refresh token")
    return newAcessToken
  } catch (err) {
    throw new ValidationError("Refresh Token Invalido ou expirado.")
  }
}