import bcrypt from 'bcrypt'
import { AuthError } from '../../shared/erros/CustomErrors.mjs'
import { config} from '../../config/env.mjs'

export const verifyUserCredentials = async (loginData)=>{
  const email = loginData.email
  const response = await fetch("http://user-service:3000/api/users/email", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'x-internal-token': config.internalAPIKey
    },
    body: JSON.stringify({email})
  })

  
  if(!response.ok){
    throw new AuthError()
  }
  const user = await response.json();
  const passwordMatch = await bcrypt.compare(loginData.password, user.password)

  if(!passwordMatch){
    throw new AuthError("Senha incorreta!")
  }
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  return userWithoutPassword
}