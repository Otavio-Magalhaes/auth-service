import { registerUser } from "../../domain/usecases/registerUser.mjs";
import { userRepository } from "../../infrastructure/database/userRepository.mjs";

export const register = async (request, response)=>{
  try{
    const newUser = await registerUser(userRepository, request.body)

    response.status(201).json({msg: "Usuario criado com sucesso", user:newUser})
  }catch(err){
    console.log(err)
    response.status(400).json({error: err.message})
  }
}