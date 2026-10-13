import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CommercialHub } from "@/components/commercial-hub";

export const metadata: Metadata = pageMetadata({
  title: "Enterprise — many branches, many states, many products, one system",
  description:
    "The same features behave differently once a book spreads across branches, products or a migration. What changes at that scale, and what scoping enforces.",
  path: "/enterprise/",
  // Held back in ROUTE_PAGES (`publication.ts`) — one field, not two.
});

export default function EnterpriseHub() {
  return (
    <CommercialHub
      section="enterprise"
      eyebrow="Enterprise"
      title="The features are the same. At scale the problems are not"
      intro={
        <>
          <p>
            A lender with one branch and a lender with forty need the same classification engine and
            the same returns. What differs is everything around them: who may see which borrower,
            whose approval a disbursement needs, which state&rsquo;s rules a loan was written under,
            and whether a figure rolled up from forty branches can be traced back to one of them.
          </p>
          <p className="mt-s3">
            These pages are about that, and they are written against what the{" "}
            <Link href="/security/" className="text-cta underline decoration-line-strong underline-offset-4 hover:text-ink">
              tenancy and scoping model
            </Link>{" "}
            actually enforces rather than what an architecture diagram implies.
          </p>
        </>
      }
      closing="A demo can be run against your own branch structure and approval matrix rather than a sample one."
    />
  );
}
