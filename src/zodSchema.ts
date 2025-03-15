import { z } from "zod";

export const CreateProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(z.string()).nonempty(),
  stock: z.number(),
  show: z.boolean(),
});

export const UpdateProductSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number().nullable(),
  images: z.array(z.string()).nullable(),
  stock: z.number().nullable(),
  show: z.boolean().nullable(),
});

export const CreateUserSchema = z.object({
  email: z.string().email({ message: "Wrong Email!" }),
  password: z.string().min(8, { message: "at least 8 characters" }),
  role: z.string().optional(),
});
