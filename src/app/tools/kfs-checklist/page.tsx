import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { KfsChecker } from "@/components/tools/kfs";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("kfs-checklist")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/kfs-checklist/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <KfsChecker />
    </ToolPage>
  );
}
