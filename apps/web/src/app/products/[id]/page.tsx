import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product-details";
import { getProduct } from "@/lib/catalog-api";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <ProductDetails product={product} />
    </main>
  );
}
