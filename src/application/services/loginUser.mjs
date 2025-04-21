import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verifyUserCredentials } from '../../domain/usecases/verifyUserCredential.mjs'
import { config } from '../../config/env.mjs'

const JWT_SECRET = config.jwtSecret

export const loginUser = async (userRepository, loginData) =>{
  const user = await verifyUserCredentials(userRepository, loginData)
  
  const payload = {
    id:user.id,
    email:user.email
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h"
  })

  return{
    user,
    token
  }
}