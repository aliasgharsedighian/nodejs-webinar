import { Request, Response } from "express";
import { CreateProductSchema, UpdateProductSchema } from "../zodSchema.js";
import {
  createProduct,
  findAllProducts,
  findProductById,
  removeProductById,
  updateProductById,
} from "../services/product.service.js";
import { findUserById } from "../services/user.service.js";

// @access  Public
export const getAllProducts = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const products = await findAllProducts();
    if (!products) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "products not found",
        data: [],
      });
    }
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "get all products successfully",
      data: products,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while geting all products: ${error}`,
    });
  }
};

export const getSingleProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const productId = Number(request.params.id);
    const product = await findProductById(productId);
    if (!product) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "product not found",
        data: {},
      });
    }

    return response.status(200).json({
      status: 200,
      message: "get product successfully",
      data: product,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while geting single product: ${error}`,
    });
  }
};
// @access  Private/Admin
export const addProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = request.userId;
    const user = await findUserById(userId);
    if (user.role !== "ADMIN") {
      const statusCode = 422;
      return response.status(statusCode).json({
        status: statusCode,
        message:
          "you not allowed to add product. tell admin to change your role!",
      });
    }
    const productBody = CreateProductSchema.safeParse(request.body);
    if (!productBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: productBody.error?.errors.map((item) => item.message),
      });
    }
    const product = createProduct({
      title: productBody.data.title,
      description: productBody.data.description,
      price: productBody.data.price,
      images: productBody.data.images,
      stock: productBody.data.stock,
      show: productBody.data.show,
      userId,
    });
    if (!product) {
      const statusCode = 500;
      return response.status(statusCode).json({
        status: statusCode,
        message: "error when query on product table",
        data: {},
      });
    }
    const getNewProduct = await product;

    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product created successfully.",
      data: getNewProduct,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while create product: ${error}`,
    });
  }
};

export const editProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const userId = request.userId;
    const user = await findUserById(userId);
    if (user.role !== "ADMIN") {
      const statusCode = 422;
      return response.status(statusCode).json({
        status: statusCode,
        message:
          "you not allowed to edit product. tell admin to change your role!",
      });
    }
    const productBody = UpdateProductSchema.safeParse(request.body);
    const productId = Number(request.params.id);
    if (!productBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: productBody.error?.errors.map((item) => item.message),
      });
    }
    const product = await findProductById(productId);
    if (!product) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "product not found",
        data: {},
      });
    }
    let valuesForUpdate = {
      title: productBody.data.title || product.title,
      description: productBody.data.description || product.description,
      price: productBody.data.price || product.price,
      images: productBody.data.images || product.images,
      stock: productBody.data.stock || product.stock,
      show: productBody.data.show || product.show,
      productId,
      userId,
    };
    const updateProduct = await updateProductById(valuesForUpdate);
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product edited successfully.",
      data: updateProduct,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while edit product: ${error}`,
    });
  }
};

export const removeProduct = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const productId = request.params.id;
    // const product = await client.query(
    //   `SELECT * from product where id = ${productId}`
    // );
    // if (!product || product.rows.length === 0) {
    //   const statusCode = 404;
    //   return response.status(statusCode).json({
    //     status: statusCode,
    //     message: "product not found",
    //   });
    // }
    const deleteProduct = await removeProductById(productId);
    if (deleteProduct.status !== 200) {
      const statusCode = 500;
      return response.status(statusCode).json({
        status: statusCode,
        message: "error when query on delete product",
        data: {},
      });
    }
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product deleted successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while remove product: ${error}`,
    });
  }
};
