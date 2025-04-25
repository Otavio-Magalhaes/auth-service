import jwt from 'jsonwebtoken'
import { verifyUserCredentials } from '../../domain/usecases/verifyUserCredential.mjs'
import { config } from '../../config/env.mjs'

const JWT_ACCESS_TOKEN_SCRET = config.jwtSecret
const JWT_REFRESH_TOKEN_SCRET = config.jwtRefreshToken


export const loginUser = async (userRepository, loginData) =>{
  const user = await verifyUserCredentials(userRepository, loginData)
  
  const payload = {
    id:user.id,
    email:user.email
  }

  const acessToken = jwt.sign(
    payload, 
    JWT_ACCESS_TOKEN_SCRET, 
    { expiresIn: "1h" }
  )

  const refreshToken = jwt.sign(
    payload,
    JWT_REFRESH_TOKEN_SCRET,
    { expiresIn: "7d" }
  )

  return{
    user,
    acessToken,
    refreshToken
  }
}