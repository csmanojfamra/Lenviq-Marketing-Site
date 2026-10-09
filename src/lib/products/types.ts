/**
 * A product page is DATA, and the page component is a skeleton.
 *
 * Two reasons, and the second is the one that matters.
 *
 * The cheap reason: a fifth product page — business lending — should be one file, not a fifth copy
 * of a layout that has since drifted from the other four.
 *
 * The real reason: **four pages spun from one template is the doorway pattern**, and it is the most
 * likely way a set like this fails. Separating the skeleton from the substance makes the failure
 * visible instead of invisible. Every field below is prose about ONE asset class, and the test
 * applied while writing each was: *could this sentence appear on another of the four with a word
 * changed?* If yes it was cut, because a paragraph that survives that swap is filler with a keyword
 * in it. The shared parts here are the heading order and the CTA — nothing a reader would notice,
 * and nothing a crawler would score.
 *
 * The claims rule (BRAND-1 §5.4) applies to every string: a capability is described only where a
 * named file in the product repository implements it, and `evidence` on each section is where that
 * file is written down. Nothing is verified from this website.
 */

/** A term and its explanation — the shape of every list on these pages. */
export type Point = readonly [term: string, body: string];

export interface ProductSection {
  /** The `<h2>`. */
  head: string;
  /** One paragraph under the heading, before the list. */
  lead?: string;
  points: readonly Point[];
  /**
   * The files in `fintrustsuite` that implement what this section claims. Not rendered — it is here
   * so the claim and its evidence live in the same place, and so a reviewer can check a section
   * without leaving it. A section with no evidence is describing regulation, not the product.
   */
  evidence?: readonly string[];
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductShot {
  /** A name in `public/shots/shots.json`. */
  name: string;
  /** What is on the screen, in a sentence a person would say. Never a keyword list. */
  alt: string;
  /** Captions are read more than body copy, so each carries a claim the prose does not. */
  caption: string;
  /** The LCP element on the page. Exactly one shot per page sets it. */
  priority?: boolean;
}

export interface RelatedLink {
  href: string;
  /** Descriptive anchor text. Never "read more". */
  label: string;
  note: string;
}

export interface ProductSpec {
  /** Permanent. A slug that changes forfeits whatever it earned. */
  slug: string;
  eyebrow: string;
  /** Search title, without the brand — the layout template appends it. */
  title: string;
  /** ~155 characters, written to be clicked. */
  description: string;
  h1: string;
  /**
   * A plain confirming line under the H1, for pages whose H1 is literary.
   *
   * THE JUDGEMENT (brief §4.1). Four of these H1s name no product — "The security drives away, and
   * keeps its own calendar" — and two already do: "Business loan software, for borrowers that are
   * not people" says it in three words. So this is set on the literary ones and LEFT UNSET on the
   * two that confirm already, because a confirming line under a confirming H1 is duplication a
   * reader notices.
   *
   * The literary line is kept in full. Nothing good is lost; what is added is the two-second
   * answer to "am I in the right place" for somebody arriving from a search for the plain term.
   * This affects BOUNCE and not CTR — the titles are untouched — so it is deliberately the
   * smallest change that addresses the question rather than a rewrite.
   */
  subhead?: string;
  /** Two paragraphs: what this is, who it is for. */
  intro: readonly string[];
  lifecycle: ProductSection;
  /** The section that carries the page — what is true of THIS asset class and no other. */
  specific: ProductSection;
  compliance: ProductSection;
  documents: ProductSection;
  reports: ProductSection;
  /**
   * Placed through the page, not clustered at the end.
   *
   * OPTIONAL, and the reason is a refusal rather than a convenience. A page is published without
   * them when no *honest* shot exists for it: the microfinance page needs a group-loan screen and
   * the capture set has none, and the nearest candidates were a Loan Against Property approvals
   * queue (wrong asset class on a microfinance page — the doorway pattern this file's header warns
   * about) and a field collection screen carrying a borrower name and phone number. Reusing either
   * would have cost more credibility than the missing image does.
   *
   * A page without shots is a page waiting for a capture, and `docs/SHOTS_WANTED.md` says which.
   */
  shots?: {
    afterIntro: ProductShot;
    afterSpecific: ProductShot;
  };
  faqs: readonly ProductFaq[];
  related: readonly RelatedLink[];
}
