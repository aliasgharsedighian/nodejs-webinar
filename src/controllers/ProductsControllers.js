import { client } from "../config/db.pgsql.js";

// @access  Public
export const getAllProducts = async (request, response, next) => {
  try {
    const products = await client.query("SELECT * from product");
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
      data: products.rows,
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while geting all products: ${error}`,
    });
  }
};

export const getSingleProduct = async (request, response, next) => {
  try {
    const productId = request.params.slug;
    const product = await client.query(
      `SELECT * from product where id = ${productId}`
    );
    if (!product || product.rows.length === 0) {
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
      data: product.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while geting single product: ${error}`,
    });
  }
};
// @access  Private/Admin
export const addProduct = async (request, response, next) => {
  try {
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while create product: ${error}`,
    });
  }
};

export const removeProduct = async (request, response, next) => {
  try {
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while remove product: ${error}`,
    });
  }
};

export const editProduct = async (request, response, next) => {
  try {
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while edit product: ${error}`,
    });
  }
};
