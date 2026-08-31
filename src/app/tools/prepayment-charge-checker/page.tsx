import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { PrepaymentEligibility } from "@/components/tools/prepayment";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("prepayment-charge-checker")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/prepayment-charge-checker/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <PrepaymentEligibility />
    </ToolPage>
  );
}
