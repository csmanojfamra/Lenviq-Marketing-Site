import { SITE } from "./site";
import { publishedPosts } from "./content";
import { publishedHelp } from "./help";
import { TERMS } from "./glossary";
import { PRODUCTS } from "./products";

/**
 * What each page is FOR, in search terms — the map that stops two pages competing for one query.
 *
 * ## Why this is code and not a spreadsheet
 *
 * A keyword map in a document is correct on the day it is written and wrong by the third new page,
 * because nothing connects it to the routes. Here the map is data, a test asserts every indexable
 * route has an entry, and a second test asserts no two entries claim the same primary keyword. Add
 * a page without deciding what it is for and the suite fails; add one that competes with an
 * existing page and the suite says which.
 *
 * Cannibalisation is the specific failure this prevents. It is not hypothetical for this site: the
 * four product pages, the platform page and the home page all live within one topic, and it would
 * take one careless title for two of them to start answering the same query and split their own
 * signal.
 *
 * ## Editorial versus derived
 *
 * The nineteen fixed pages carry hand-written entries, because their intent is a commercial
 * decision. The blog, glossary and help entries are DERIVED from the content itself — a glossary
 * term's primary keyword is the term, a help guide's is the task. Writing sixty of those by hand
 * would produce sixty guesses that drift from the pages they describe.
 */
export type PageType =
  | "Homepage" | "Platform" | "Loan product" | "Compliance" | "Reporting" | "Security"
  | "Glossary" | "Blog" | "Help" | "Company" | "Conversion" | "Legal";

export type Intent = "Commercial" | "Informational" | "Transactional" | "Navigational";

export interface IntentEntry {
  /** Path with a trailing slash, as the canonical uses. */
  url: string;
  type: PageType;
  intent: Intent;
  /** The one query this page exists to answer. Unique across the whole site — asserted by a test. */
  primary: string;
  secondary: string[];
  /** 1 highest. Drives the Search Console submission order, not the sitemap's own priority field. */
  priority: 1 | 2 | 3 | 4;
}

/** The pages whose intent is a commercial decision rather than a property of their content. */
const FIXED: IntentEntry[] = [
  { url: "/", type: "Homepage", intent: "Commercial", priority: 1,
    primary: "NBFC loan management software",
    secondary: ["lending software for NBFCs", "loan management system India", "NBFC software"] },
  { url: "/platform/", type: "Platform", intent: "Commercial", priority: 1,
    primary: "loan origination and management system",
    secondary: ["LOS and LMS", "loan lifecycle management", "lending workflow software"] },
  { url: "/compliance/", type: "Compliance", intent: "Commercial", priority: 1,
    primary: "NBFC compliance software",
    secondary: ["RBI lending compliance", "IRAC classification software", "NBFC regulatory reporting"] },
  { url: "/reports/", type: "Reporting", intent: "Commercial", priority: 2,
    primary: "NBFC reporting software",
    secondary: ["loan portfolio reports", "collection reports", "asset quality reporting"] },
  { url: "/security/", type: "Security", intent: "Commercial", priority: 3,
    primary: "secure lending software",
    secondary: ["lending data security", "role-based access", "tenant isolation"] },
  { url: "/about/", type: "Company", intent: "Navigational", priority: 4,
    primary: "FastLegal Technologies",
    secondary: ["who builds Lenviq", "Lenviq company"] },
  { url: "/contact/", type: "Conversion", intent: "Transactional", priority: 2,
    primary: "Lenviq demo request",
    secondary: ["NBFC software demo", "lending software demonstration"] },
  { url: "/signup/", type: "Conversion", intent: "Transactional", priority: 2,
    primary: "Lenviq account signup",
    secondary: ["NBFC software trial", "create a Lenviq tenant"] },
  { url: "/blog/", type: "Blog", intent: "Informational", priority: 3,
    primary: "NBFC lending and RBI compliance notes",
    secondary: ["NBFC blog", "lending regulation writing"] },
  { url: "/glossary/", type: "Glossary", intent: "Informational", priority: 3,
    primary: "NBFC lending glossary",
    secondary: ["lending terms India", "RBI lending terminology"] },
  { url: "/help/", type: "Help", intent: "Informational", priority: 4,
    primary: "Lenviq help guides",
    secondary: ["how to use Lenviq", "NBFC software documentation"] },
  { url: "/privacy/", type: "Legal", intent: "Navigational", priority: 4,
    primary: "Lenviq privacy policy",
    secondary: ["DPDP Act data handling"] },
  { url: "/terms/", type: "Legal", intent: "Navigational", priority: 4,
    primary: "Lenviq terms of service",
    secondary: ["lending software licence terms"] },
];

/**
 * The four product pages, from the product specs themselves.
 *
 * The primary keyword is the slug read back as a phrase — `gold-loan-software` is
 * "gold loan software" — which is deliberate: the slug, the title, the H1 and the keyword are one
 * decision, so they cannot drift apart into four.
 */
const productEntries = (): IntentEntry[] =>
  PRODUCTS.map((p) => ({
    url: `/${p.slug}/`,
    type: "Loan product" as const,
    intent: "Commercial" as const,
    priority: 1 as const,
    primary: p.slug.replace(/-/g, " "),
    secondary: [`${p.eyebrow.toLowerCase()} for NBFCs`, "NBFC lending software"],
  }));

const glossaryEntries = (): IntentEntry[] =>
  TERMS.map((t) => ({
    url: `/glossary/${t.slug}/`,
    type: "Glossary" as const,
    intent: "Informational" as const,
    priority: 3 as const,
    primary: t.term.toLowerCase(),
    secondary: [t.question.toLowerCase().replace(/\?$/, ""), "NBFC lending"],
  }));

const blogEntries = (): IntentEntry[] =>
  publishedPosts().map((p) => ({
    url: `/blog/${p.slug}/`,
    type: "Blog" as const,
    intent: "Informational" as const,
    priority: 3 as const,
    primary: p.slug.replace(/-/g, " "),
    secondary: [p.category.toLowerCase(), "NBFC lending"],
  }));

const helpEntries = (): IntentEntry[] =>
  publishedHelp().map((p) => ({
    url: `/help/${p.slug}/`,
    type: "Help" as const,
    intent: "Informational" as const,
    priority: 4 as const,
    primary: p.slug.replace(/-/g, " "),
    secondary: ["Lenviq how-to", "NBFC lending operations"],
  }));

/** Every indexable URL, with what it is for. Ordered by priority, then by URL. */
export function intentMap(): IntentEntry[] {
  return [...FIXED, ...productEntries(), ...glossaryEntries(), ...blogEntries(), ...helpEntries()]
    .sort((a, b) => a.priority - b.priority || a.url.localeCompare(b.url));
}

export const absoluteFor = (e: IntentEntry) => new URL(e.url, SITE.url).toString();
