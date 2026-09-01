import type { ProductSpec } from "./types";

/**
 * Cash credit and overdraft — one page, because they are one module and one behaviour.
 *
 * What is true here and on none of the other pages: there is no schedule. A term loan knows what is
 * due and when; a limit does not. Everything specific below follows from that — drawing power,
 * stock statements, ad-hoc limits, and three ways to turn non-performing that have nothing to do
 * with a missed instalment.
 */
export const CASH_CREDIT: ProductSpec = {
  slug: "cash-credit-software",
  eyebrow: "Working capital",
  title: "Cash credit and overdraft software for NBFCs",
  description:
    "Cash credit software for NBFCs: drawing power from stock statements, ad-hoc limits, renewal, and the three ways a limit turns non-performing.",
  h1: "Cash credit and overdraft, where there is no instalment to miss.",
  intro: [
    "A working-capital limit has no repayment schedule. The borrower draws and repays as the business needs, interest accrues on whatever was outstanding that day, and the lender's question is never “did the instalment arrive” — it is whether the account is being operated, whether the security still supports what has been drawn, and whether the interest is being serviced. A system built around an EMI schedule answers none of those.",
    "For NBFCs running cash credit and overdraft limits against stock and book debts, or clean, where the limit is renewed annually and the drawing power moves every month.",
  ],
  lifecycle: {
    head: "The limit, from sanction to renewal",
    points: [
      ["Sanction of a limit", "A limit is sanctioned, not disbursed. What is sanctioned and what is drawn are different numbers, and both are on the account from the first day."],
      ["Drawdown and repayment", "Drawn as the borrower asks and repaid as they choose, each movement recorded against the account with the balance after it — and posted to the ledger as it happens, so the bank account in the books matches the bank."],
      ["Interest", "Accrued daily on the balance actually outstanding that day, on an actual/365 basis, and written to the books monthly. Whether it compounds into the outstanding or is billed for the borrower to service is the scheme's decision."],
      ["Renewal", "A limit expires. Renewal is an event on the account with its own dates, and an expired limit that stays expired is one of the ways it turns non-performing."],
    ],
    evidence: ["src/lib/repos/od-cc.ts", "src/lib/lms/od-cc.ts"],
  },
  specific: {
    head: "Drawing power, and the things that only exist on a limit",
    lead: "The sanctioned limit is a ceiling. What the borrower may actually draw is the drawing power, and it moves.",
    points: [
      ["Stock statements", "Submitted periodically and accepted by the lender, with the drawing power computed from the stock and debtors declared, each at its own margin, net of creditors."],
      ["An overdue statement", "A statement that does not arrive is swept for, because a drawing power computed from a statement nobody checked is a number the lender made up."],
      ["Excess over drawing power", "Drawing beyond the drawing power is recorded from the day it starts, and the excess carries a penal element at the contracted rate plus the penal spread — on the excess alone, not on the whole balance."],
      ["Ad-hoc limits", "A temporary increase with its own validity, and an expiry sweep that ends it — so an ad-hoc that was meant for one season does not quietly become permanent."],
      ["Three ways to turn non-performing", "Ninety days in excess over the sanctioned limit; ninety days with interest unserviced; ninety days past an expired limit. None of them is a missed instalment, because there are none."],
      ["Suspension without closure", "A limit can be suspended, reinstated or cancelled while the account stays open, which is what a lender does when it wants the exposure to stop growing without calling the facility."],
    ],
    evidence: ["src/lib/repos/od-cc.ts", "src/lib/lms/od-cc.ts"],
  },
  compliance: {
    head: "What the regulation asks of a limit",
    points: [
      ["Out of order", "An account continuously in excess, or with no credits enough to cover the interest debited, is out of order — which is the working-capital route to non-performing, and it is computed rather than judged."],
      ["Day-end classification", "The three triggers are evaluated in the day-end batch, so the classification of a limit is the position at the close of a named day and not a figure recomputed on request."],
      ["Interest on an impaired limit", "Once the account is non-performing, interest accrued on it goes to suspense rather than income, and reaches the profit and loss only when it is actually received."],
      ["Borrower-wise", "A limit that is non-performing makes the same borrower's term loans non-performing too, and the other way round."],
    ],
    evidence: ["src/lib/repos/od-cc.ts", "src/lib/repos/npa.ts", "src/lib/lms/jobs.ts"],
  },
  documents: {
    head: "The pack a limit needs",
    points: [
      ["Sanction letter", "Carrying the limit, the margin, the drawing-power basis and the review date — the terms a working-capital borrower is actually held to."],
      ["Hypothecation of stock and book debts", "The charge document for the security the drawing power is computed from."],
      ["Renewal letter", "Generated at renewal from the revised terms rather than the original ones."],
    ],
    evidence: ["src/lib/documents/html/templates/letters.ts"],
  },
  reports: {
    head: "What it produces",
    points: [
      ["Its own book", "Overdraft and cash credit post to their own control and income accounts, separately from term lending, so the working-capital book can be read on its own."],
      ["Limit utilisation", "Sanctioned against drawn against available, per account and across the book — the number a working-capital lender is actually managing."],
      ["Classification and provisioning", "Day-end classification against the three triggers, and the provision that follows at the NBFC rates."],
    ],
    evidence: ["src/lib/lms/coa-defaults.ts", "src/lib/repos/od-cc.ts", "src/lib/repos/npa.ts"],
  },
  shots: {
    afterIntro: {
      name: "loan-account",
      priority: true,
      alt: "A loan account record in Lenviq showing the outstanding position and the account's history",
      caption: "Sanctioned, drawn and available are three numbers on a limit. A term loan has one.",
    },
    afterSpecific: {
      name: "accounting",
      alt: "The accounting section in Lenviq showing vouchers generated from loan events",
      caption: "Every drawdown and repayment posts as it happens, so the bank balance in the books is the bank balance.",
    },
  },
  faqs: [
    {
      q: "How is a cash credit limit different from a term loan in the system?",
      a: "It has no schedule. There is no instalment, so nothing is ever “overdue” in the term-loan sense — the account turns non-performing through excess over the limit, unserviced interest, or an expired limit, each measured over ninety days. Interest accrues daily on what was drawn rather than on an amortisation table.",
    },
    {
      q: "Where does drawing power come from?",
      a: "From the accepted stock statement: stock and book debts at their own margins, net of creditors, capped at the sanctioned limit. Until a statement is accepted the drawing power is the limit, and a statement that goes overdue is swept for rather than assumed.",
    },
    {
      q: "Does interest compound into the outstanding?",
      a: "That is the scheme's decision, and both are supported. With compounding it is added to the outstanding monthly or quarterly; without it the interest is billed for the borrower to service, and interest left unserviced for ninety days is itself one of the ways the limit turns non-performing.",
    },
    {
      q: "What happens to a limit that is not renewed?",
      a: "It expires, and an expired limit ninety days past its expiry is non-performing. The account is not closed by that — a limit can be suspended or cancelled while the account stays open, which is a different decision from calling the facility.",
    },
  ],
  related: [
    { href: "/business-loan-software/", label: "Business loan software", note: "The term facility the same borrower usually runs alongside a limit." },
    { href: "/platform/", label: "The whole system", note: "Origination, servicing and the accounting under both." },
    { href: "/tools/npa-date-calculator/", label: "Work out an NPA date", note: "Including what ninety days means when there is no instalment." },
  ],
};
