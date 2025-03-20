import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCart = async ({
  userId,
  cartItems,
}: {
  userId: number;
  cartItems: any;
}) => {
  try {
    const cart = await prisma.cart.create({
      data: {
        userId,
        cartItems: {
          create: cartItems.map((item) => {
            return { productId: item.productId, quantity: item.quantity };
          }),
        },
      },
    });
    return cart;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
