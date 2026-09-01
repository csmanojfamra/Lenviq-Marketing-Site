import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { CASH_CREDIT } from "@/lib/products/cashcredit";

export const metadata: Metadata = pageMetadata({
  title: CASH_CREDIT.title,
  description: CASH_CREDIT.description,
  path: "/cash-credit-software/",
});

export default function Page() {
  return <ProductPage spec={CASH_CREDIT} />;
}
