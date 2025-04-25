import { loginUser } from "../../application/services/loginUser.mjs";
import { refreshAcessToken } from "../../application/services/refreshAccessToken.mjs";
import { config } from "../../config/env.mjs";
import { UserPrismaRepository } from "../../infrastructure/database/prisma/UserPrismaRepository.mjs";

const JWT_REFRESH_TOKEN_SCRET = config.jwtRefreshToken



export const login = async(request, response) =>{
  try{
    const {email,password} = request.body
    const loginData = {email, password}

    const userRepository = new UserPrismaRepository()

    const {acessToken, refreshToken, user} = await loginUser(userRepository, loginData)


    response.cookie("refreshToken", refreshToken,{
      httpOnly:true,
      secure: true,
      samesite:"Strict",
      maxAge:7 * (24 * 60 * 60 * 1000) // 7 * 1 dia = 7 dias
    })

    response.status(200).json({
      msg: "login realizado com sucesso",
      user: user,
      acessToken: acessToken
    })
  }catch(err){
    response.status(401).json({error: err.message})
  }
}


export const handleRefreshToken = (request, response) => {
  try{
    const refreshToken = request.cookies.refreshToken

    const newAccessToken = refreshAcessToken(refreshToken)

    response.status(200).json({
      token: newAccessToken,
      msg: "Novo Acess Token Gerado com sucesso."
    })
  }catch(err){
    response.status(401).json({
      error: err.message
    })
  }
} 


export const getCurrentUser = (request, response) => {

  const user = request.user
  console.log(user)
  response.status(200).json({user})
}


export const logout = (request, response) => {
  try {
    const token = request.cookies.refreshToken
    console.log(token)
    if(!token) 
      return response.status(401).json({error: "Usuario não está logado."})

    response.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      samesite: "Strict"
    });
    return response.status(200).json({ msg: "Logout realizado com sucesso." });
  } catch (err) {
    console.log(err)
   return response.status(500).json({ error: "Erro ao realizar logout." });
  }
}