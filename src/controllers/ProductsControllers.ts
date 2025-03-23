import { Request, Response } from "express";
import {
  CreateProductCategory,
  CreateProductSchema,
  UpdateProductSchema,
} from "../zodSchema.js";
import {
  createProduct,
  findAllProducts,
  findProductById,
  removeProductById,
  updateProductById,
  createProductCategory,
} from "../services/product.service.js";
import { findUserById } from "../services/user.service.js";

// @access  Public
export const getAllProducts = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const page = +request.query.page || 1;
    const limit = +request.query.limit || 12;

    const products = await findAllProducts({ page, limit });
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
        message: productBody.error?.errors.map(
          (item, index) => `${item.path[0]} ${item.message}`
        ),
      });
    }
    const product = await createProduct({
      title: productBody.data.title,
      description: productBody.data.description,
      price: productBody.data.price,
      images: productBody.data.images,
      stock: productBody.data.stock,
      show: productBody.data.show,
      userId,
      categoryId: productBody.data.categories,
    });
    if (!product) {
      const statusCode = 500;
      return response.status(statusCode).json({
        status: statusCode,
        message: "error when query on product table",
        data: {},
      });
    }

    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product created successfully.",
      data: product,
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
        message: productBody.error?.errors.map(
          (item, index) => `${item.path[0]} ${item.message}`
        ),
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
      categoryId:
        productBody.data.categories ||
        product.categories.map((item) => item.id),
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
    const deleteProduct = await removeProductById(productId);

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

export const addProductCategory = async (
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
          "you not allowed to add product category. tell admin to change your role!",
      });
    }
    const categoryBody = CreateProductCategory.safeParse(request.body);
    if (!categoryBody.success) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: categoryBody.error?.errors.map(
          (item, index) => `${item.path[0]} ${item.message}`
        ),
      });
    }
    const productCategory = await createProductCategory({
      name: categoryBody.data.name,
    });
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product category created successfully.",
      data: productCategory,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while add product category: ${error}`,
    });
  }
};
