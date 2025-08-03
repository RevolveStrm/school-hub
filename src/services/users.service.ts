import { Role, type User } from "@prisma/client";
import { prisma } from "../database/database";

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string,
): Promise<User> => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: Role.STUDENT,
    },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const confirmUserEmail = async (userId: string) => {
  await prisma.user.update({
    data: {
      is_email_verified: true,
    },
    where: {
      id: userId,
    },
  });
};
