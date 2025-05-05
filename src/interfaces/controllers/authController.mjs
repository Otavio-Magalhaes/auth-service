import { loginUser } from "../../application/services/loginUser.mjs";
import { refreshAcessToken } from "../../application/services/refreshAccessToken.mjs";
import { config } from "../../config/env.mjs";
import logger from "../../config/logger.mjs";
import { prisma, UserPrismaRepository } from "../../infrastructure/database/prisma/UserPrismaRepository.mjs";
import { AuthError, ValidationError } from "../../shared/erros/CustomErrors.mjs";
import { validatesLoginUser } from "../validators/validationSchema.mjs";



const JWT_REFRESH_TOKEN_SCRET = config.jwtRefreshToken



export const login = async(request, response)=>{
  try{

    const {email,password} = request.validate
    
    const loginData = {email, password}

    const userRepository = new UserPrismaRepository()

    const {acessToken, refreshToken, user} = await loginUser(userRepository, loginData)

    response.cookie("refreshToken", refreshToken,{
      httpOnly:true,
      secure: true,
      samesite:"Strict",
      maxAge:7 * (24 * 60 * 60 * 1000) 
    })


    await prisma.user.update({
      where: {id: user.id},
      data: {refreshToken: refreshToken}
    })

    logger.info(`Usuario Logado: ${user.email}, id: ${user.id}`)

    response.status(200).json({
      msg: "login realizado com sucesso",
      user: user,
      acessToken: acessToken
    })
  }catch(err){
    logger.err("erro no login", err)
    response.status(401).json({ error: err.message });
  }
}


export const handleRefreshToken = async (request, response) => {
  try{
    const refreshToken = request.cookies.refreshToken

    const {newAccessToken, newRefreshToken} = await refreshAcessToken(refreshToken)


    if(!newAccessToken) response.status(400).json({msg: "Erro no AcessToken"})

    response.cookie
    (
      "refreshToken", newRefreshToken,{
      httpOnly:true,
      secure: true,
      samesite:"Strict",
      maxAge:7 * (24 * 60 * 60 * 1000)
    })
    .status(200)
    .json({
      token: newAccessToken,
      msg: "Novo Acess Token Gerado com sucesso."
    })

 

  }catch(err){
    if (err instanceof ValidationError) {
      response.status(err.statusCode || 400).json({ error: err.message });
    } else {
      response.status(500).json({ error: "Erro inesperado" });
    }
  }
} 


export const getCurrentUser = (request, response) => {
  const user = request.user
  response.status(200).json({user})
}


export const logout = (request, response) => {
  try {
    const token = request.cookies.refreshToken
    if(!token) 
      return response.status(401).json({error: "Usuario não está logado."})

    response.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      samesite: "Strict"
    });
    return response.status(200).json({ msg: "Logout realizado com sucesso." });
  } catch (err) {
   return response.status(500).json({ error: "Erro ao realizar logout." });
  }
}


export const getCsrfToken = (request, response) => {

  try {
    const token = request.csrfToken()
  
    
    return response.status(200).json({csrfToken: token})
    
  } catch (err) {
   return response.status(400).send({msg: "Token CSRF invalido."})
    
  }
}