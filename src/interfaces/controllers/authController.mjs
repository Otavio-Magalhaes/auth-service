import { loginUser } from "../../application/services/loginUser.mjs";
import { userRepository } from "../../infrastructure/database/userRepository.mjs";

export const login = async(request, response) =>{
  try{
    const {email,password} = request.body

    const loginData = {email, password}

    const result = await loginUser(userRepository, loginData)

    response.status(200).json({
      msg: "login realizado com sucesso",
      user: result.user,
      token: result.token
    })
  }catch(err){
    response.status(401).json({error: err.message})
  }
}