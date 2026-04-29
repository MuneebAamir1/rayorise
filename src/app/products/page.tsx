import type { Metadata } from "next";
import ProductsShowcase from "@/components/products/ProductsShowcase";

export const metadata: Metadata = {
  title: "Our Products | RayoRise — Premium Tracksuits, Jackets & Pants",
  description:
    "Explore RayoRise's premium product range: custom tracksuits, retro-cut track jackets, and bespoke track pants. Built for UK streetwear brands.",
  openGraph: {
    title: "Our Products | RayoRise",
    description: "Premium custom tracksuits, jackets, and pants for streetwear brands.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsShowcase />;
}
