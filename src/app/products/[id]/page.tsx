import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/ui/product-detail-page";
import { getProductById, getAllProducts } from "@/data/products";
import { Metadata } from "next";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | RayoRise",
    };
  }

  return {
    title: `${product.title} | RayoRise B2B Tracksuits`,
    description: product.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
