import { Request, Response } from "express";
import { CartStoreSchema } from "../zodSchema";
import { createCart } from "../services/cart.service";

export const cartStore = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = Number(request.userId);
    const userBody = CartStoreSchema.safeParse(request.body);
    if (!userBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: userBody.error?.errors.map((item) => item.message),
      });
    }
    // console.log({ userId, ...userBody.data.cartItems });
    const cart = createCart({ userId, cartItems: userBody.data.cartItems });
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "cart store successfully",
      data: cart,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while create cart: ${error}`,
    });
  }
};
