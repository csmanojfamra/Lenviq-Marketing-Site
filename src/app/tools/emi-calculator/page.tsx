import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { EmiCalculator } from "@/components/tools/emi";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("emi-calculator")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/emi-calculator/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <EmiCalculator />
    </ToolPage>
  );
}
