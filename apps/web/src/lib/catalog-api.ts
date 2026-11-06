import {
  ProductListSchema,
  ProductSchema,
  type Product,
  type ProductList,
} from "@commerce/types";
import type { ZodType } from "zod";

const defaultApiBaseUrl = "http://localhost:3001/api/v1";

export class CatalogApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "CatalogApiError";
  }
}

function getApiUrl(path: string): URL {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl;
  const baseUrl = configuredBaseUrl.endsWith("/")
    ? configuredBaseUrl
    : `${configuredBaseUrl}/`;

  return new URL(path, baseUrl);
}

async function fetchCatalogResponse<T>(
  path: string,
  schema: ZodType<T>,
): Promise<T> {
  const response = await fetch(getApiUrl(path), { cache: "no-store" });
  if (!response.ok) {
    throw new CatalogApiError(
      response.status,
      `Catalog request failed with status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();
  return schema.parse(payload);
}

export function getProducts(): Promise<ProductList> {
  return fetchCatalogResponse("products", ProductListSchema);
}

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(getApiUrl(`products/${encodeURIComponent(id)}`), {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new CatalogApiError(
      response.status,
      `Catalog request failed with status ${response.status}.`,
    );
  }

  const payload: unknown = await response.json();
  return ProductSchema.parse(payload);
}
