import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductList } from "@commerce/types";
import { getProducts } from "@/lib/catalog-api";
import HomePage from "./page";

vi.mock("@/lib/catalog-api", () => ({
  getProducts: vi.fn(),
}));

const productList: ProductList = {
  items: [
    {
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
    },
  ],
  pageInfo: {
    hasNextPage: false,
    nextCursor: null,
  },
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.mocked(getProducts).mockResolvedValue(productList);
  });

  it("renders catalog products from the API", async () => {
    render(await HomePage());

    expect(
      screen.getByRole("heading", { name: "Products", level: 1 }),
    ).toBeTruthy();
    expect(screen.getByText("Ceramic Coffee Mug")).toBeTruthy();
    expect(screen.getByText("$18.00")).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /Ceramic Coffee Mug/ })
        .getAttribute("href"),
    ).toBe("/products/607f1f77-bc49-4a56-9c2c-bc3856eec9d9");
  });
});
