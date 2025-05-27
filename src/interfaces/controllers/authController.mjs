import { loginUser } from "../../application/services/loginUser.mjs";
import { refreshAcessToken } from "../../application/services/refreshAccessToken.mjs";
import { config } from "../../config/env.mjs";
import logger from "../../config/logger.mjs";
import { AuthError, ValidationError } from "../../shared/erros/CustomErrors.mjs";
import { validatesLoginUser } from "../validators/validationSchema.mjs";



const JWT_REFRESH_TOKEN_SCRET = config.jwtRefreshToken

 

export const login = async(request, response)=>{
  try{

    const {email,password} = request.validate
    
    const loginData = {email, password}

    const {acessToken, refreshToken, user} = await loginUser(loginData)


    response.cookie("refreshToken", refreshToken,{
      httpOnly:true,
      secure: true,
      samesite:"Strict",
      maxAge:7 * (24 * 60 * 60 * 1000) 
    })

    //lembrar de criar um middleware para salvar o token no banco do user.
    // await prisma.user.update({
    //   where: {id: user.id},
    //   data: {refreshToken: refreshToken}
    // })

    logger.info(`Usuario Logado: ${user.email}, id: ${user.id}`)
    logger.info(`RefreshToken Gerado ${refreshToken}`)
    response.status(200).json({
      msg: "login realizado com sucesso",
      user: user,
      accessToken: acessToken
    })
  }catch(err){
    logger.error("erro no login", err)
    response.status(401).json({ error: err.message });
  }
}


export const handleRefreshToken = async (request, response) => {
  try{
    const refreshToken = request.cookies.refreshToken

    const {newAccessToken, newRefreshToken} = await refreshAcessToken(refreshToken)


    if(!newAccessToken) response.status(400).json({msg: "Erro no AcessToken"})

    logger.info(`O Usuário gerou um Novo Acess Token: ${newAccessToken}`)
    
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
    logger.error("erro na geração do Token", err)
    return response.status(401).json({ error: err.message });
  }
} 


export const getCurrentUser = (request, response) => {
  try{
    const user = request.user
    if(!user){
      throw new Error("Nao tem usuario logado")
      return response.status(400).json({msg:"Sem usuario logado."})
    }
    return response.status(200).json({user})
  }catch(err){
    return  response.status(500).json({err})
  }
}


export const logout = async(request, response) => {
  try {
    const token = request.cookies.refreshToken
    if(!token) 
      return response.status(401).json({error: "Usuario não está logado."})
    
    logger.info(`O Usuário deslogou`)
    response.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      samesite: "Strict"
    });

    return response.status(200).json({ msg: "Logout realizado com sucesso." });
  } catch (err) {
    logger.error("tentativa de logout sem cookie, sem sessão válida etc.", err)
    return response.status(500).json({ error: err.message });
  }
  
}


export const getCsrfToken = (request, response) => {

  try {
    const token = request.csrfToken()
  
    logger.info(`Token CSRF ${token}`)
    return response.status(200).json({csrfToken: token})
    
  } catch (err) {
    logger.info(`Erro: ${err}`)
   return response.status(400).send({msg: "Token CSRF invalido."})
    
  }
}