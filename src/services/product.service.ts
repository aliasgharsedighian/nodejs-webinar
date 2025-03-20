import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllProducts = async () => {
  try {
    // const products = await client.query(
    //   "SELECT id, title, description, price, created_at, updated_at from product ORDER BY created_at DESC"
    // );
    // return products.rows;
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const findProductById = async (productId: number) => {
  try {
    // const product = await client.query(
    //   `SELECT id, title, description, price, created_at, updated_at from product where id = ${productId}`
    // );
    // return product.rows[0];
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const createProduct = async ({
  title,
  description,
  price,
  images,
  stock,
  show,
  userId,
}: {
  userId: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  show: boolean;
}) => {
  try {
    // const createProduct = await client.query(
    //   `insert into product (title, description, price) values ('${title}', '${description}', ${price})`
    // );
    // const insertedProduct = await client.query(
    //   `select id, title, description, price, created_at, updated_at from product order by id desc limit 1`
    // );
    // return insertedProduct.rows[0];
    const createProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        images,
        stock,
        show,
        userId,
      },
    });
    return createProduct;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const updateProductById = async ({
  title,
  description,
  price,
  images,
  stock,
  show,
  productId,
  userId,
}: {
  title: string;
  description: string;
  price: any;
  images: string[];
  stock: number;
  show: boolean;
  productId: number;
  userId: number;
}) => {
  try {
    // const updateProduct = await client.query(
    //   `update product set "title" = '${title}', "description" = '${description}', "price" = ${price}
    //      where id = ${productId}`
    // );
    // if (!updateProduct) {
    //   return { status: 500 };
    // }
    // return { status: 200 };
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        title,
        description,
        price,
        images,
        stock,
        show,
        userId,
      },
    });
    return updateProduct;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};

export const removeProductById = async (productId: number) => {
  try {
    // const removeProduct = await client.query(
    //   `delete from product where id = ${productId}`
    // );
    // if (!removeProduct) {
    //   return { status: 500 };
    // }
    // return { status: 200 };
    const removeProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return removeProduct;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
