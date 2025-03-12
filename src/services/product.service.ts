import { client } from "../config/db.pgsql.js";

export const findAllProducts = async () => {
  const products = await client.query(
    "SELECT id, title, description, price, created_at, updated_at from product ORDER BY created_at DESC"
  );
  return products.rows;
};

export const findProductById = async (productId: string) => {
  const product = await client.query(
    `SELECT id, title, description, price, created_at, updated_at from product where id = ${productId}`
  );
  return product.rows[0];
};

export const createProduct = async ({
  title,
  description,
  price,
}: {
  title: string;
  description: string;
  price: number;
}) => {
  const createProduct = await client.query(
    `insert into product (title, description, price) values ('${title}', '${description}', ${price})`
  );
  const insertedProduct = await client.query(
    `select * from product order by id desc limit 1`
  );
  return insertedProduct.rows[0];
};

export const updateProductById = async ({
  title,
  description,
  price,
  productId,
}: {
  title: string | null;
  description: string | null;
  price: number | null;
  productId: string;
}) => {
  const updateProduct = await client.query(
    `update product set "title" = '${title}', "description" = '${description}', "price" = ${price}
       where id = ${productId}`
  );
  if (!updateProduct) {
    return { status: 500 };
  }
  return { status: 200 };
};

export const removeProductById = async (productId: string) => {
  const removeProduct = await client.query(
    `delete from product where id = ${productId}`
  );
  if (!removeProduct) {
    return { status: 500 };
  }
  return { status: 200 };
};
