import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { COMPANY, SITE } from "@/lib/site";

/**
 * The closing block on every page a stranger arrives at from a search result.
 *
 * ## Why it exists
 *
 * These pages are good enough to be mistaken for a consultancy's. A reader finishes a worked
 * provisioning example or a glossary definition, agrees with it, and leaves — never having learnt
 * that the people who wrote it sell the software that does it. That is a page doing half its job.
 *
 * ## Why it is shaped like this and not like a banner
 *
 * The standard practice on a content page is one block at the end: what the product is, one action,
 * and a way to reach a person. Not an interstitial, not a sticky bar, not a repeated mid-article
 * ask — those cost the thing these pages exist for, which is being the page somebody keeps open and
 * sends on to a colleague.
 *
 * **Contact details in plain sight** is the part most B2B sites get wrong. A prospect evaluating
 * lending software wants to know a real company with a real phone number is behind it, and a form
 * is not that. The number, the WhatsApp link and the address are all here, unhidden, alongside the
 * demo button rather than behind it.
 *
 * `line` is per-page: the connection between what was just read and what the product does about it.
 * A generic line reads as a footer and gets skipped.
 */
export function ProductCta({
  line,
  heading = `${SITE.name} does this on your whole book`,
  secondary = { href: "/platform/", label: "What the platform covers" },
}: {
  line: string;
  heading?: string;
  secondary?: { href: string; label: string } | null;
}) {
  const wa = `https://wa.me/${COMPANY.phone.replace("+", "")}?text=${encodeURIComponent(
    "Hi — I'd like to know more about Lenviq for our NBFC.",
  )}`;

  return (
    <section className="mt-s6 rounded-card border border-line bg-subtle p-s5">
      <p className="text-[13px] uppercase tracking-wide text-muted">From the people who wrote this</p>
      <h2 className="mt-s2 font-display text-[22px] font-bold leading-tight tracking-display text-ink">
        {heading}
      </h2>
      <p className="mt-s3 max-w-prose text-[16px] leading-prose text-slate-mid">{line}</p>
      <p className="mt-s3 max-w-prose text-[15px] leading-relaxed text-slate-mid">
        {SITE.name} is {SITE.tagline.charAt(0).toLowerCase() + SITE.tagline.slice(1)}, built by{" "}
        {COMPANY.shortName}.
      </p>

      <div className="mt-s4 flex flex-wrap gap-s3">
        <ButtonLink href="/contact/">Book a demo</ButtonLink>
        {secondary && (
          <ButtonLink href={secondary.href} variant="secondary">
            {secondary.label}
          </ButtonLink>
        )}
      </div>

      <div className="mt-s4 flex flex-wrap items-center gap-x-s4 gap-y-s2 border-t border-line pt-s4 text-[15px] text-slate-mid">
        <span className="text-[13px] uppercase tracking-wide text-muted">Or just ask</span>
        <a href={`tel:${COMPANY.phone}`} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta">
          {COMPANY.phoneDisplay}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta">
          WhatsApp
        </a>
        <a href={`mailto:${COMPANY.email}`} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta">
          {COMPANY.email}
        </a>
        <Link href="/compliance/" className="text-muted underline underline-offset-4 hover:text-cta">
          What it implements, and the direction each one comes from
        </Link>
      </div>
    </section>
  );
}

/**
 * The same ask, compressed — for the sticky rail beside a long article, and for the one inline
 * placement partway down it.
 *
 * ## Why there is a second placement at all
 *
 * The end-of-page block only converts readers who reach the end, and on a two-thousand-word
 * regulatory piece most do not. The answer used across the content-heavy sites this competes with
 * is a rail that stays in view on desktop and a single inline card on narrow screens, where a rail
 * cannot stick. Not a bar, not an interstitial, and not one every few paragraphs.
 *
 * `variant` decides the framing, because the two placements are read differently: the rail is
 * glanced at, so it is quiet and small; the inline card interrupts the reading column, so it has to
 * earn the interruption by connecting to what was just read.
 */
export function ProductCtaCompact({
  line,
  variant = "rail",
}: {
  line: string;
  variant?: "rail" | "inline";
}) {
  const wa = `https://wa.me/${COMPANY.phone.replace("+", "")}?text=${encodeURIComponent(
    "Hi — I'd like to know more about Lenviq for our NBFC.",
  )}`;

  if (variant === "rail") {
    return (
      <aside className="rounded-card border border-line bg-subtle p-s4">
        <p className="font-display text-[16px] font-bold leading-tight tracking-display text-ink">
          {SITE.name}
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-slate-mid">{SITE.tagline}.</p>
        <p className="mt-s3 text-[14px] leading-relaxed text-slate-mid">{line}</p>
        <ButtonLink href="/contact/" className="mt-s3 w-full justify-center">
          Book a demo
        </ButtonLink>
        <p className="mt-s3 text-[13px] leading-relaxed text-muted">
          Or call{" "}
          <a href={`tel:${COMPANY.phone}`} className="font-medium text-ink underline underline-offset-2 hover:text-cta">
            {COMPANY.phoneDisplay}
          </a>
          {" · "}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-2 hover:text-cta">
            WhatsApp
          </a>
        </p>
      </aside>
    );
  }

  return (
    <aside className="my-s5 rounded-card border border-line border-l-[3px] border-l-cta bg-subtle p-s4">
      <p className="text-[13px] uppercase tracking-wide text-muted">While you are here</p>
      <p className="mt-s2 max-w-prose text-[16px] leading-relaxed text-slate-mid">{line}</p>
      <div className="mt-s3 flex flex-wrap items-center gap-x-s3 gap-y-s2">
        <ButtonLink href="/contact/">Book a demo</ButtonLink>
        <a href={`tel:${COMPANY.phone}`} className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta">
          {COMPANY.phoneDisplay}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-cta">
          WhatsApp
        </a>
      </div>
    </aside>
  );
}
