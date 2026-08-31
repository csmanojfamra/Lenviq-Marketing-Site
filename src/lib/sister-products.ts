import { COMPANY } from "./site";

/**
 * The other things this company builds.
 *
 * ## Why they are on the About page at all
 *
 * The page asserted domain expertise and offered nothing behind it — "professionals whose domain is
 * Indian lending", "an engineering team with more than a decade on systems of this kind". Neither
 * is checkable, and this site's whole argument elsewhere is that a claim you cannot check is worth
 * less than a fact you can.
 *
 * Four shipped products for Indian regulated entities, since 2018, IS the evidence. It is also the
 * answer to the question an NBFC actually has about a small vendor, which is whether it will still
 * be here in three years.
 *
 * ## Why the order is this order
 *
 * Nearest to the reader first. A company secretary using CoSecOffice is often the same person
 * advising an NBFC; Cred produces the bank lending documents. Nidhi companies and charitable trusts
 * are further away, and leading with them would read as a generalist shop rather than a track
 * record — which is the real risk in listing siblings at all.
 */
export interface SisterProduct {
  name: string;
  /** Omitted where the public page is a login form and nothing else — a link there says nothing. */
  url?: string;
  what: string;
}

export const SISTER_PRODUCTS: SisterProduct[] = [
  {
    name: "CoSecOffice",
    url: "https://cosecoffice.com",
    what: "Entity master, board process, compliance calendar and statutory drafting, for company secretaries in practice and in-house.",
  },
  {
    name: "Cred",
    url: "https://cred.fastlegal.in",
    what: "Bank-ready project reports for MUDRA, PMEGP and PM Vishwakarma lending, with the DSCR and CMA workings behind them.",
  },
  {
    name: "NidhiExpert",
    what: "Compliance for Nidhi companies.",
  },
  {
    name: "Sanstha ERP",
    url: "https://sanstha.fastlegal.in",
    what: "Receipts, accounts and reporting for trusts, temples and other charitable institutions.",
  },
];

/** "since 2018" — one place, so the About page and any future mention cannot disagree. */
export const SINCE = COMPANY.since;
