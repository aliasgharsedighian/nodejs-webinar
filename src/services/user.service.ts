import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        profile: {
          create: {
            firstname: "",
            lastname: "",
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return User;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const findUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const updateUserById = async ({
  userId,
  firstname,
  lastname,
  role,
}: {
  userId: number;
  firstname: string;
  lastname: string;
  role: any;
}) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
        profile: {
          update: {
            firstname,
            lastname,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
