import Link from "next/link";
import { Reveal } from "./reveal";

/** The page measure. One value, so no section is a few pixels off from its neighbour. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  /**
   * 1280px, not 1152px.
   *
   * The measure was `max-w-6xl` and it made the site look smaller than it is. On a 1920px monitor
   * — the most common desktop this audience opens it on — 1152px of content left 400px of empty
   * shoulder on each side; at 2560px the page was a narrow island using 45% of the screen, and the
   * header logo sat 720px in from the left, which reads as centred even though it is pinned to the
   * container's left edge.
   *
   * The fix is the measure rather than the header. Making the header full-bleed on its own would
   * put the logo at the screen edge and leave the content island floating below it — more obviously
   * wrong, not less. Widening here moves the header, the footer and every page together, and keeps
   * the property worth keeping: the header logo, the page H1 and the footer logo sit on exactly the
   * same x-position at every width.
   *
   * Reading length is unaffected — prose is capped separately by `max-w-prose`, so the extra
   * 128px goes to grids and tables, which is where it is useful.
   */
  return <div className={`mx-auto max-w-7xl px-s3 ${className}`}>{children}</div>;
}

/**
 * A band of the page. `tone` alternates the ground between white and the warm neutral so a long
 * page has rhythm without a second hue — and without a dark hero, which the brief rules out.
 */
export function Section({
  children,
  tone = "light",
  id,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "sand" | "slate";
  id?: string;
  className?: string;
}) {
  const bg = tone === "sand" ? "bg-sand" : tone === "slate" ? "bg-slate text-white" : "bg-card";
  return (
    <section id={id} className={`${bg} py-s7 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-[13px] font-semibold uppercase tracking-wide text-cta">{eyebrow}</p>
      )}
      <h2 className="mt-s2 max-w-3xl text-[30px] font-bold leading-[1.15] tracking-display text-ink sm:text-[36px]">
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-s3 max-w-prose text-[17px] leading-prose text-slate-mid ${center ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/**
 * A card's title is a real heading, so its LEVEL has to be a caller's decision.
 *
 * It was always `<h3>`, which is right when the card sits inside a `SectionHead`'s `<h2>` — the
 * common case. But four pages put cards directly under the `<h1>` with no section between, and
 * those shipped an H1 → H3 jump: the blog index, the contact page, the reports groups and the
 * signup steps. A skipped level is not a styling detail. A screen reader user navigating by
 * heading is told a level is missing and cannot tell what it was, and the outline a crawler builds
 * of the page is wrong in the same way.
 *
 * `as` fixes the level without touching a single class, so the cards look exactly as they did.
 */
export function Card({
  title,
  as: Heading = "h3",
  children,
  href,
  className = "",
}: {
  title?: string;
  as?: "h2" | "h3" | "h4";
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const body = (
    <div
      className={`card-hover h-full rounded-card border border-line bg-card p-s4 shadow-e1 ${className}`}
    >
      {title && <Heading className="font-display text-[17px] font-bold tracking-display text-ink">{title}</Heading>}
      <div className={`text-[15px] leading-relaxed text-slate-mid ${title ? "mt-s2" : ""}`}>{children}</div>
    </div>
  );
  return href ? (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  ) : (
    body
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className: extra = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  /** For the few places the button has to fill its container — a sidebar card, a narrow panel. */
  className?: string;
}) {
  const cls =
    variant === "primary"
      ? "bg-cta text-white shadow-e1 hover:bg-cta-hover active:translate-y-px"
      : "border border-line-strong bg-card text-ink hover:bg-subtle active:translate-y-px";
  const className = `inline-flex items-center justify-center rounded-input px-5 py-2.5 text-[15px] font-medium transition-colors ${cls} ${extra}`;
  return external ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** A definition row — used on the compliance and security pages, where specificity is the product. */
export function Spec({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-s3 md:grid md:grid-cols-[minmax(0,15rem)_1fr] md:gap-s4">
      <dt className="font-display text-[15px] font-bold tracking-display text-ink">{term}</dt>
      <dd className="mt-1 text-[15px] leading-relaxed text-slate-mid md:mt-0">{children}</dd>
    </div>
  );
}
