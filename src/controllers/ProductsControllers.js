import { client } from "../config/db.pgsql.js";

export const getAllProducts = async (request, response, next) => {
  try {
    const res = await client.query("SELECT * from product");
    return response.status(200).json({
      status: 200,
      message: "get all products successfully",
      data: res.rows,
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
    const productSlug = request.params.slug;

    const res = await client.query(
      `SELECT * from product where id = ${productSlug}`
    );

    return response.status(200).json({
      status: 200,
      message: "get product successfully",
      data: res.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while geting single product: ${error}`,
    });
  }
};

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
