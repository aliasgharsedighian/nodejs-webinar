import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCart = async ({
  userId,
  cartItems,
  address,
  description,
}: {
  userId: number;
  cartItems: any;
  address: string;
  description?: string;
}) => {
  try {
    const cart = await prisma.cart.create({
      data: {
        userId,
        address,
        description,
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

export const getCartById = async ({ userId }: { userId: number }) => {
  try {
    const cart = prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    return cart;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
    ``;
  }
};

export const updateCartItemById = async ({ cartItem }: any) => {
  try {
    const cart = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: cartItem,
    });
    return cart;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const moveCartToInvoice = async ({ userId }: { userId: number }) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    const totalArray = cart.cartItems.map(
      (item) => Number(item.quantity) * Number(item.product.price)
    );
    const initialPrice = 0;
    const totalPrice = totalArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialPrice
    );
    const invoice = await prisma.invoices.create({
      data: {
        customerId: userId,
        invoiceAddress: cart.address,
        invoiceDescription: cart.description,
        total: totalPrice,
        InvoiceItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.product.price,
          })),
        },
      },
    });
    await prisma.cart.delete({
      where: {
        userId,
      },
      include: {
        cartItems: true,
      },
    });
    return invoice;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
