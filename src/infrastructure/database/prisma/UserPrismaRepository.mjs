import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../../../domain/repositories/user.repository.mjs";

export const prisma = new PrismaClient

export class UserPrismaRepository extends UserRepository{
  async findByEmail(email){
    return await prisma.user.findUnique({
      where: {email}
    })
  }

  async create (userData){
    return await prisma.user.create({
      data: userData
    })
  }

}

