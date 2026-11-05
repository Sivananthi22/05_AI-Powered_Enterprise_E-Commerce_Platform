import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/catalog-api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const productList = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-800">
          Commerce
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Products
        </h1>
        <p className="mt-2 text-slate-600">
          Explore the latest products in our catalog.
        </p>
      </header>
      <ProductGrid products={productList.items} />
    </main>
  );
}
