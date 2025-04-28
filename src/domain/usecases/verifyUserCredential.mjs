import bcrypt from 'bcrypt'
import { AuthError } from '../../shared/erros/CustomErrors.mjs'

export const verifyUserCredentials = async (userRepository, loginData)=>{

  const user = await userRepository.findByEmail(loginData.email)
  if(!user){
    throw new AuthError()
  }
  const passwordMatch = await bcrypt.compare(loginData.password, user.password)

  if(!passwordMatch){
    throw new AuthError("Senha incorreta!")
  }
  const userWithoutPassword = {
    id: user.id,
    email: user.email
  }

  return userWithoutPassword
}