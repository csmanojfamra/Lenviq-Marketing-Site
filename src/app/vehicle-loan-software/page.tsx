import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ProductPage } from "@/components/product-page";
import { VEHICLE } from "@/lib/products/vehicle";

export const metadata: Metadata = pageMetadata({
  title: VEHICLE.title,
  description: VEHICLE.description,
  path: "/vehicle-loan-software/",
});

export default function Page() {
  return <ProductPage spec={VEHICLE} />;
}
