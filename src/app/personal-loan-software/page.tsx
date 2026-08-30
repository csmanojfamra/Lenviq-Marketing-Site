import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { PERSONAL } from "@/lib/products/personal";

export const metadata: Metadata = pageMetadata({
  title: PERSONAL.title,
  description: PERSONAL.description,
  path: "/personal-loan-software/",
});

export default function Page() {
  return <ProductPage spec={PERSONAL} />;
}
