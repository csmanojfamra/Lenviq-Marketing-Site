import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ToolPage } from "@/components/tools/tool-page";
import { ReturnsCalendar } from "@/components/tools/returns-calendar";
import { toolBySlug } from "@/lib/tools";

const TOOL = toolBySlug("nbfc-returns-calendar")!;

export const metadata: Metadata = pageMetadata({
  title: TOOL.title,
  description: TOOL.description,
  path: "/tools/nbfc-returns-calendar/",
});

export default function Page() {
  return (
    <ToolPage tool={TOOL}>
      <ReturnsCalendar />
    </ToolPage>
  );
}
