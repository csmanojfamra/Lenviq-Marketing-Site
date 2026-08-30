import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { NpaDateCalculator } from "@/components/tools/npa-date";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("npa-date-calculator")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/npa-date-calculator/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <NpaDateCalculator />
    </ToolPage>
  );
}
