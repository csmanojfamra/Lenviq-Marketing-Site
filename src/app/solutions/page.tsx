import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { CommercialHub } from "@/components/commercial-hub";

export const metadata: Metadata = pageMetadata({
  title: "Solutions — what an NBFC has to do, and what the software does about it",
  description:
    "One page per event a lender has to handle — classification, provisioning, bureau reporting, auctions. What goes wrong, and what a system must not pretend to do.",
  path: "/solutions/",
  // Held back in ROUTE_PAGES (`publication.ts`) — one field, not two.
});

export default function SolutionsHub() {
  return (
    <CommercialHub
      section="solutions"
      eyebrow="Solutions"
      title="What you have to do, and what the software does about it"
      intro={
        <>
          <p>
            The{" "}
            <Link href="/platform/" className="text-cta underline decoration-line-strong underline-offset-4 hover:text-ink">
              product pages
            </Link>{" "}
            are organised by the kind of loan you write — a gold book, a vehicle book, a property
            book. These pages are organised the other way round: by the thing you have to do, which
            is usually the same whichever book it happens in. A bureau submission is a bureau
            submission.
          </p>
          <p className="mt-s3">
            Each one answers the practitioner&rsquo;s question — what the artefact is, where the
            dates come from, what goes wrong — and then says what a lending system has to do about
            it, and what it must not pretend to do. The last part is the one worth reading.
          </p>
        </>
      }
      closing="A demo works through your own products, schemes and classification rules rather than a generic tour."
    />
  );
}
