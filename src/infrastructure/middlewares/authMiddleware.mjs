import jwt from "jsonwebtoken"
import {config} from "../../config/env.mjs"

export const authenticateToken = (request, response, next)=>{
  const authHeader = request.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if(!token){
    return response.status(401).json({error:"Token nao fornecido"})
  }

  jwt.verify(token, config.jwtSecret, (err, user)=>{
    if(err){
      return response.status(403).json({error:"Token invalido ou expirado"})
    }

    request.user = user
    next()
  })
}