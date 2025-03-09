import { client } from "../config/db.pgsql.js";

// @access  Public
export const getAllProducts = async (request, response, next) => {
  try {
    const products = await client.query(
      "SELECT * from product ORDER BY created_at DESC"
    );
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
    const productId = request.params.id;
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
    const { title, description, price } = request.body;
    if (!title || !description || !price) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: "title ,description and price is required!",
      });
    }
    const createproduct = await client.query(
      `insert into product (title, description, price) values ('${title}', '${description}', ${price})`
    );
    if (!createproduct) {
      const statusCode = 500;
      return response.status(statusCode).json({
        status: statusCode,
        message: "error when query on product table",
        data: {},
      });
    }
    const insertedProduct = await client.query(
      `select * from product order by id desc limit 1`
    );
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product created successfully.",
      data: insertedProduct.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while create product: ${error}`,
    });
  }
};

export const editProduct = async (request, response, next) => {
  try {
    const id = request.params.id;
    const { title, description, price } = request.body;
    if (!title || !description || !price) {
      const statusCode = 403;
      return response.status(statusCode).json({
        status: statusCode,
        message: "title ,description and price is required!",
      });
    }
    const product = await client.query(
      `SELECT * from product where id = ${id}`
    );
    if (!product || product.rows.length === 0) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "product not found",
        data: {},
      });
    }
    const updateProduct = await client.query(
      `update product set "title" = '${title}', "description" = '${description}', "price" = ${price} where id = ${id}`
    );
    if (!updateProduct) {
      const statusCode = 500;
      return response.status(statusCode).json({
        status: statusCode,
        message: "error when query on product table",
        data: {},
      });
    }
    const updatedProduct = await client.query(
      `SELECT * from product where id = ${id}`
    );
    if (!updatedProduct) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "product not found",
        data: {},
      });
    }
    const statusCode = 200;
    return response.status(statusCode).json({
      status: statusCode,
      message: "product edited successfully.",
      data: updatedProduct.rows[0],
    });
  } catch (error) {
    return response.status(500).json({
      status: 500,
      message: `An Error occured while edit product: ${error}`,
    });
  }
};

export const removeProduct = async (request, response, next) => {
  try {
    const productId = request.params.id;
    const product = await client.query(
      `SELECT * from product where id = ${productId}`
    );
    if (!product || product.rows.length === 0) {
      const statusCode = 404;
      return response.status(statusCode).json({
        status: statusCode,
        message: "product not found",
      });
    }
    const deleteProduct = await client.query(
      `delete from product where id = ${productId}`
    );
    if (!deleteProduct) {
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
