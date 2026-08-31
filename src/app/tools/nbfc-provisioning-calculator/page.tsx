import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { ProvisioningCalculator } from "@/components/tools/provisioning";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("nbfc-provisioning-calculator")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/nbfc-provisioning-calculator/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <ProvisioningCalculator />
    </ToolPage>
  );
}
