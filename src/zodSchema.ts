import { z } from "zod";

export const CreateProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export const UpdateProductSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number().nullable(),
});
