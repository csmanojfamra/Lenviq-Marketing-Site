import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { MICROFINANCE } from "@/lib/products/microfinance";

export const metadata: Metadata = pageMetadata({
  title: MICROFINANCE.title,
  description: MICROFINANCE.description,
  path: "/microfinance-software/",
});

export default function Page() {
  return <ProductPage spec={MICROFINANCE} />;
}
