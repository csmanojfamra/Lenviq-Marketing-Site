/**
 * The one place a domain is written down.
 *
 * Canonical URLs, Open Graph URLs, the sitemap and every "Login" affordance read from here, so a
 * future domain change is one value rather than twenty — and, more usefully, so it is impossible
 * for the sitemap to disagree with the canonical tag about what this site is called.
 *
 * **There is no .com.** Not in a canonical URL, not in an OG tag, not in the sitemap, not in the
 * footer, not in copy. `tests/site-domains.test.ts` asserts it, because "we all know that" is how
 * a wrong domain reaches a prospect's browser bar.
 */
export const SITE = {
  /** The marketing site. */
  url: "https://lenviq.in",
  /** The product. Every login link points here; nothing else about it lives in this app. */
  appUrl: "https://app.lenviq.in",
  name: "Lenviq",
  /** One line a lending head would recognise. Used as the default meta description. */
  tagline: "Lending platform for Indian NBFCs — origination, servicing, accounting and RBI reporting.",
  locale: "en-IN",
} as const;

/** The company. Real registration details; a company you can look up is itself a trust signal. */
export const COMPANY = {
  legalName: "FastLegal Technologies Private Limited",
  shortName: "FastLegal Technologies",
  /**
   * Left blank deliberately rather than invented. The CIN and GSTIN are real numbers that a
   * prospect will check against the MCA and GST portals, and a wrong one is worse than an absent
   * one — see DECISIONS_PENDING.md, BRAND-1 open item.
   */
  cin: "",
  gstin: "",
  registeredOffice: "",
  /** The address a demo request goes to — confirmed monitored. */
  email: "hello@lenviq.in",
  /** Confirmed monitored, and the same number on WhatsApp. E.164 for the tel: and wa.me links. */
  phone: "+919664146595",
  phoneDisplay: "+91 96641 46595",
} as const;

export const absolute = (path: string) => new URL(path, SITE.url).toString();
