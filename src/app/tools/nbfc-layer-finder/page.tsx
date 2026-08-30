import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { SbrLayerFinder } from "@/components/tools/sbr-layer";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("nbfc-layer-finder")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/nbfc-layer-finder/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <SbrLayerFinder />
    </ToolPage>
  );
}
