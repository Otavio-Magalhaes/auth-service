import { loginUser } from "../../application/services/loginUser.mjs";
import { userRepository } from "../../infrastructure/database/userRepository.mjs";
import { refreshAcessToken } from "../../application/services/refreshAccessToken.mjs";

export const login = async(request, response) =>{
  try{
    const {email,password} = request.body
    const loginData = {email, password}

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