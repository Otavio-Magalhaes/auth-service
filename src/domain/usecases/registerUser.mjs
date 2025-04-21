import bcrypt from "bcrypt"

export const registerUser = async (userRepository, userData) => {
  const existingUser = await userRepository.findByEmail(userData.email);
  if(existingUser){
    throw new Error("Usuario ja existe")
  }
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds)

  const newUser = {
    ...userData,
    password: hashedPassword
  }
  return userRepository.create(newUser)
}