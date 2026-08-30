import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { AprCalculator } from "@/components/tools/apr";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("apr-calculator")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/apr-calculator/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <AprCalculator />
    </ToolPage>
  );
}
