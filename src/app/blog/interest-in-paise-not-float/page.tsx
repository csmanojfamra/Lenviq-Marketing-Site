import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Section } from "@/components/ui";
import { RedirectTo } from "./redirect";

const TARGET = "/blog/reconciliation-off-by-rupees/";

/**
 * A SLUG THAT MOVED, AND THE 404 IT LEFT BEHIND.
 *
 * This post was renamed on 30 Aug 2026 — it was titled around how money is stored, which is an
 * engineering framing of a question a lender asks the other way round. The rename was right. What
 * went with it was the old URL, which anybody who linked it still holds.
 *
 * `deploy/nginx-cache.conf` prescribes a 301 for exactly this path and **that file has never been
 * applied to the server**, so the URL has been returning 404 ever since. A static export cannot
 * emit a 301 of its own — `output: "export"` means `next.config`'s `redirects()` never runs — so
 * this page is the fallback a static host leaves you: a canonical pointing at the real post, a
 * meta refresh, and a link for anyone whose browser ignores both.
 *
 * It is weaker than a 301 and it is not a reason to leave the nginx config unapplied. If that
 * `location =` block is ever added, it matches before nginx reaches the filesystem and this page
 * stops being served — no conflict, and the better answer wins.
 */
export const metadata: Metadata = {
  // Built through the one helper, like every other page — and `path` is the TARGET, so the canonical
  // points at the post rather than at this shim, which is the whole purpose of a moved page.
  ...pageMetadata({
    title: "Moved — why a reconciliation is off by a few rupees",
    description: "This post moved to /blog/reconciliation-off-by-rupees/.",
    path: TARGET,
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <Section className="pt-s7">
      <RedirectTo href={TARGET} />
      <h1 className="text-[28px] font-extrabold tracking-display-tight text-ink">This post moved</h1>
      <p className="mt-s3 max-w-prose text-[17px] leading-prose text-slate-mid">
        It is now at{" "}
        <Link href={TARGET} className="underline decoration-line-strong underline-offset-4 hover:text-cta">
          why a reconciliation is off by a few rupees
        </Link>
        . The title changed because the old one asked an engineering question — how money is stored —
        rather than the one a lender actually has.
      </p>
    </Section>
  );
}
