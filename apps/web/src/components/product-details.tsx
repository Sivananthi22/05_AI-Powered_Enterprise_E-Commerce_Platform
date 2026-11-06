import type { Product } from "@commerce/types";
import { ProductPrice } from "./product-price";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <article className="grid gap-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
      {product.imageUrl ? (
        <img
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
          src={product.imageUrl}
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-slate-500"
        >
          Image coming soon
        </div>
      )}
      <div className="flex flex-col items-start">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          SKU {product.sku}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {product.name}
        </h1>
        <p className="mt-5 text-2xl font-semibold text-slate-900">
          <ProductPrice product={product} />
        </p>
        <p className="mt-5 leading-7 text-slate-700">{product.description}</p>
        <a
          className="mt-8 rounded-md text-sm font-medium text-sky-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          href="/"
        >
          Back to products
        </a>
      </div>
    </article>
  );
}
