import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async ({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: any;
}) => {
  const User = await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });
  return User;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const findUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};
