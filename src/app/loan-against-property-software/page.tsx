import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { LAP } from "@/lib/products/lap";

export const metadata: Metadata = pageMetadata({
  title: LAP.title,
  description: LAP.description,
  path: "/loan-against-property-software/",
});

export default function Page() {
  return <ProductPage spec={LAP} />;
}
