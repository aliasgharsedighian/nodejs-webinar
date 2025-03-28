import prisma from "../prisma";

export const findAllProducts = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    // const products = await client.query(
    //   "SELECT id, title, description, price, created_at, updated_at from product ORDER BY created_at DESC"
    // );
    // return products.rows;
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
      },
    });
    const totalCount = await prisma.product.count();

    return {
      products,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
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
      include: { categories: true },
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
  categoryId,
}: {
  userId: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  show: boolean;
  categoryId: any;
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
        categories: {
          connect: categoryId.map((item) => {
            return { id: item };
          }),
        },
      },
      include: {
        categories: true,
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
  categoryId,
}: {
  title: string;
  description: string;
  price: any;
  images: string[];
  stock: number;
  show: boolean;
  productId: number;
  userId: number;
  categoryId: any;
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
        categories: {
          set: categoryId.map((item) => {
            return { id: item };
          }),
        },
      },
      include: {
        categories: true,
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

export const createProductCategory = async ({ name }: { name: string }) => {
  try {
    const addCategory = await prisma.productCategory.create({
      data: {
        name,
      },
    });
    return addCategory;
  } catch (error) {
    throw new Error(`Service Error: ${error.message}`);
  }
};
