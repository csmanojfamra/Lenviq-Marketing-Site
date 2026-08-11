import Link from "next/link";
import { Reveal } from "./reveal";

/** The page measure. One value, so no section is a few pixels off from its neighbour. */
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-s3 ${className}`}>{children}</div>;
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

export function Card({
  title,
  children,
  href,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  const body = (
    <div
      className={`card-hover h-full rounded-card border border-line bg-card p-s4 shadow-e1 ${className}`}
    >
      {title && <h3 className="font-display text-[17px] font-bold tracking-display text-ink">{title}</h3>}
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
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "bg-cta text-white shadow-e1 hover:bg-cta-hover active:translate-y-px"
      : "border border-line-strong bg-card text-ink hover:bg-subtle active:translate-y-px";
  const className = `inline-flex items-center justify-center rounded-input px-5 py-2.5 text-[15px] font-medium transition-colors ${cls}`;
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
