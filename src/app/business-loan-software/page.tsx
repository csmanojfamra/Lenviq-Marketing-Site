import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { BUSINESS } from "@/lib/products/business";

export const metadata: Metadata = pageMetadata({
  title: BUSINESS.title,
  description: BUSINESS.description,
  path: "/business-loan-software/",
});

export default function Page() {
  return <ProductPage spec={BUSINESS} />;
}
