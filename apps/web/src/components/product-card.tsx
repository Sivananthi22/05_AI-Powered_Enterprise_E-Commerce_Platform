import type { Product } from "@commerce/types";
import { ProductPrice } from "./product-price";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <a
        className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        href={`/products/${encodeURIComponent(product.id)}`}
      >
        {product.imageUrl ? (
          <img
            alt={product.name}
            className="aspect-[4/3] w-full object-cover"
            src={product.imageUrl}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-sm text-slate-500"
          >
            Image coming soon
          </div>
        )}
        <div className="space-y-2 p-4">
          <h2 className="text-lg font-semibold text-slate-900">{product.name}</h2>
          <p className="line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>
          <p className="font-medium text-slate-900">
            <ProductPrice product={product} />
          </p>
        </div>
      </a>
    </article>
  );
}
