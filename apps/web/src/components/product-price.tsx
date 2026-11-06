import type { Product } from "@commerce/types";

export function ProductPrice({ product }: { product: Product }) {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100);

  return <span>{amount}</span>;
}
