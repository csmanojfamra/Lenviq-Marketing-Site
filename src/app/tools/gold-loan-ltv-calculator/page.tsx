import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { GoldLtvCalculator } from "@/components/tools/gold-ltv";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("gold-loan-ltv-calculator")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/gold-loan-ltv-calculator/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <GoldLtvCalculator />
    </ToolPage>
  );
}
