import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { PenalCalculator } from "@/components/tools/penal";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("penal-charge-calculator")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/penal-charge-calculator/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <PenalCalculator />
    </ToolPage>
  );
}
