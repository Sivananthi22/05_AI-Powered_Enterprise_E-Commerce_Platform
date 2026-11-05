import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Product } from "@commerce/types";
import { ProductDetails } from "./product-details";

const product: Product = {
  id: "607f1f77-bc49-4a56-9c2c-bc3856eec9d9",
  sku: "HOME-MUG-001",
  slug: "ceramic-coffee-mug",
  name: "Ceramic Coffee Mug",
  description: "A stoneware mug for everyday coffee and tea.",
  priceCents: 1800,
  currency: "USD",
  imageUrl: null,
  createdAt: "2026-11-05T00:00:00.000Z",
  updatedAt: "2026-11-05T00:00:00.000Z",
};

describe("ProductDetails", () => {
  it("shows product information and a return link", () => {
    render(<ProductDetails product={product} />);

    expect(
      screen.getByRole("heading", {
        name: "Ceramic Coffee Mug",
        level: 1,
      }),
    ).toBeTruthy();
    expect(
      screen.getByText("A stoneware mug for everyday coffee and tea."),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Back to products" }).getAttribute("href"),
    ).toBe("/");
  });
});
