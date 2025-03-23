import { z } from "zod";

export const CreateProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(z.string()).nonempty(),
  stock: z.number(),
  show: z.boolean(),
  categories: z.array(z.number()),
});

export const UpdateProductSchema = z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  images: z.array(z.string()).optional().nullable(),
  stock: z.number().optional().nullable(),
  show: z.boolean().optional().nullable(),
  categories: z.array(z.number().optional().nullable()).optional(),
});

export const CreateProductCategory = z.object({
  name: z.string(),
});

export const UpdateProductCategory = z.object({
  name: z.string().optional().nullable(),
});

export const CreateUserSchema = z.object({
  email: z.string().email({ message: "Wrong Email!" }),
  password: z.string().min(8, { message: "at least 8 characters" }),
  role: z.string().optional().nullable(),
});

export const LoginUserSchema = z.object({
  email: z.string().email({ message: "Wrong Email!" }),
  password: z.string().min(8, { message: "at least 8 characters" }),
});

export const UpdateUserSchema = z.object({
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  profile: z.object({
    firstname: z.string().optional().nullable(),
    lastname: z.string().optional().nullable(),
  }),
});

export const CartStoreSchema = z.object({
  description: z.string().optional(),
  address: z.string(),
  cartItems: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
    })
  ),
});

export const UpdateCartSchema = z.object({
  description: z.string().optional(),
  address: z.string().optional(),
  updateItem: z.object({
    id: z.number(),
    productId: z.number(),
    quantity: z.number(),
  }),
});
