import bcrypt from 'bcrypt'

export const verifyUserCredentials = async (userRepository, loginData)=>{

  const user = await userRepository.findByEmail(loginData.email)
  if(!user){
    throw new Error("Usuário não encontrado.")
  }
  const passwordMatch = await bcrypt.compare(loginData.password, user.password)

  if(!passwordMatch){
    throw new Error("Senha incorreta!")
  }
  const userWithoutPassword = {
    id: user.id,
    email: user.email
  }

  return userWithoutPassword
}