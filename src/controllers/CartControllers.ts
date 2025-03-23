import { Request, Response } from "express";
import { CartStoreSchema, UpdateCartSchema } from "../zodSchema";
import {
  createCart,
  getCartById,
  moveCartToInvoice,
  updateCartItemById,
} from "../services/cart.service";

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
        message: userBody.error?.errors.map(
          (item, index) => `${item.path[0]} ${item.message}`
        ),
      });
    }
    // console.log({ userId, ...userBody.data.cartItems });
    const cart = await createCart({
      userId,
      address: userBody.data.address,
      description: userBody.data.description,
      cartItems: userBody.data.cartItems,
    });
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

export const getCart = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = Number(request.userId);
    const cart = await getCartById({
      userId,
    });
    if (!cart) {
      return response.status(404).json({
        status: 404,
        message: "user with given id have not any cart",
      });
    }
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "cart store successfully",
      data: cart,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while getting cart: ${error}`,
    });
  }
};

export const updateCart = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = Number(request.userId);
    const userBody = UpdateCartSchema.safeParse(request.body);
    if (!userBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: userBody.error?.errors.map(
          (item, index) => `${item.path[0]} ${item.message}`
        ),
      });
    }
    const cart = await getCartById({ userId });
    if (cart.userId !== userId) {
      const statusCode = 422;
      return response.status(statusCode).json({
        status: statusCode,
        message: "cart not blongs to you",
      });
    }
    // console.log({ userId, ...userBody.data.cartItems });
    const updatedItem = await updateCartItemById({
      cartItem: userBody.data.updateItem,
    });
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "cart update successfully",
      data: updatedItem,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while update cart: ${error}`,
    });
  }
};

export const registrationCart = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = Number(request.userId);

    const registerationCart = await moveCartToInvoice({ userId });
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "cart moved to invoice successfully",
      data: registerationCart,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while registration cart: ${error}`,
    });
  }
};
