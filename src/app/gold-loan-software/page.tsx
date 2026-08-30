import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { GOLD } from "@/lib/products/gold";

export const metadata: Metadata = pageMetadata({
  title: GOLD.title,
  description: GOLD.description,
  path: "/gold-loan-software/",
});

export default function Page() {
  return <ProductPage spec={GOLD} />;
}
