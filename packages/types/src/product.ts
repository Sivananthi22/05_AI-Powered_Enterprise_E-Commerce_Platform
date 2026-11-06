import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().length(3),
  imageUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductListSchema = z.object({
  items: z.array(ProductSchema),
  pageInfo: z.object({
    hasNextPage: z.boolean(),
    nextCursor: z.string().uuid().nullable(),
  }),
});

export type ProductList = z.infer<typeof ProductListSchema>;
