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
  /**
   * What the product is, in one line — the meta description, the Open Graph card, and anywhere
   * else the site introduces itself in a sentence.
   *
   * **One string, and it is shared with the product.** It said three different things in three
   * places: this, "Lending platform for Indian lenders" in the transactional email, and a third
   * wording in the proposal PDF. The old line also repeated itself — *lending* and *lenders* —
   * leaned on *platform*, which is a category word that says nothing, and spent a word on *Indian*
   * telling an Indian NBFC something it knows.
   *
   * The product's copy lives in `src/lib/platform/email-layout.ts` as `PRODUCT_DESCRIPTOR`. Two
   * repositories means two copies (see SITE-2); both are pinned by a test, so they cannot drift
   * quietly.
   */
  tagline: "Loan origination, servicing and accounting for NBFCs",
  /** For places too narrow for the full line. Says less, nothing wrong. */
  taglineShort: "Lending software for NBFCs",
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
