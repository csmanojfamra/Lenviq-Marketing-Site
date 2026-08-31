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
   * Published, and checkable against the MCA register.
   *
   * These were blank for a while, on the rule that a wrong number is worse than an absent one. They
   * are not unknown any more — the CIN and the registered office are stated in the Privacy Policy,
   * the Terms and the Subscription Agreement, and CoSecOffice's own footer carries the same CIN —
   * so the About page saying "to be published" was telling a visitor a fact was unavailable while
   * two other pages on the same site printed it.
   *
   * The GSTIN is still genuinely unknown, so there is no row for it rather than a row apologising
   * for itself.
   */
  cin: "U74999RJ2018PTC060472",
  gstin: "",
  registeredOffice: "S-226, Time Square, Central Spine, Vidhyadhar Nagar, Jaipur, Rajasthan 302039",
  /** The year of incorporation, from the CIN. Used wherever the site would otherwise reach for an adjective. */
  since: 2018,
  /** The address a demo request goes to — confirmed monitored. */
  email: "hello@lenviq.in",
  /** Confirmed monitored, and the same number on WhatsApp. E.164 for the tel: and wa.me links. */
  phone: "+919664146595",
  phoneDisplay: "+91 96641 46595",
} as const;

export const absolute = (path: string) => new URL(path, SITE.url).toString();
