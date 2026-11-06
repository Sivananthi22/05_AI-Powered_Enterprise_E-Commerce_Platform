import { describe, expect, it } from "vitest";
import { ProductSchema } from "./product";

describe("ProductSchema", () => {
  it("accepts a valid catalog product", () => {
    const product = {
      id: "607f1f77-bc49-4a56-9c2c-bc3856eec9d9",
      sku: "HOME-MUG-001",
      slug: "ceramic-coffee-mug",
      name: "Ceramic Coffee Mug",
      description: "A stoneware mug.",
      priceCents: 1800,
      currency: "USD",
      imageUrl: null,
      createdAt: "2026-11-05T00:00:00.000Z",
      updatedAt: "2026-11-05T00:00:00.000Z",
    };

    expect(ProductSchema.parse(product)).toEqual(product);
  });

  it("rejects negative prices", () => {
    expect(() =>
      ProductSchema.parse({
        id: "607f1f77-bc49-4a56-9c2c-bc3856eec9d9",
        sku: "HOME-MUG-001",
        slug: "ceramic-coffee-mug",
        name: "Ceramic Coffee Mug",
        description: "A stoneware mug.",
        priceCents: -1,
        currency: "USD",
        imageUrl: null,
        createdAt: "2026-11-05T00:00:00.000Z",
        updatedAt: "2026-11-05T00:00:00.000Z",
      }),
    ).toThrow();
  });
});
