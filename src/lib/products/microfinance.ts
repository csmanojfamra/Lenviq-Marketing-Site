import type { ProductSpec } from "./types";

/**
 * Microfinance. The clearest gap found in the competitor sweep, and the page where the honesty
 * constraint bites hardest.
 *
 * THE GAP: allcloud's microfinance page — the strongest competitor's — contains no regulation at
 * all. No 2022 Directions, no household income assessment, no collateral-free requirement, no
 * pricing disclosure, and it never says JLG. The others are thinner. So this page enters on their
 * vocabulary (JLG, group loan, centre) and proves on the Directions, which is the inversion
 * `docs/COMPETITOR_MAP.md` §4.1 argues for.
 *
 * THE CONSTRAINT: `NBFC_MFI` and `SECTION_8_MFI` are provisioned regimes
 * (`fintrustsuite/prisma/schema.prisma:289-296`), so regulatory handling may be described. But the
 * product does NOT compute the 50% repayment cap — there is no repayment-capacity arithmetic
 * against household income anywhere in `src/lib`, and the only trace of the cap is a comment
 * explaining why the income figure is collected. What is true, and what this page says, is that
 * origination is REFUSED for a member with no assessment on file. See `docs/VOCABULARY_MAP.md` §3.
 */
export const MICROFINANCE: ProductSpec = {
  slug: "microfinance-software",
  eyebrow: "Microfinance and JLG",
  title: "Microfinance software for NBFC-MFI and Section 8 lenders",
  description:
    "JLG and group loan software built to the 2022 Microfinance Directions: one sanction becomes N loan accounts, with the household income assessment and the bureau consent enforced per member.",
  h1: "One approval for the centre. An ordinary loan account for each member.",
  intro: [
    "This is the loan origination and management software an NBFC-MFI or a Section 8 microfinance company runs a group book on: centres and groups, a joint liability group proposal that carries every member's amount, one four-eyes decision for the whole centre, and then N separate loan accounts — each with its own schedule, its own scheme snapshot and its own classification.",
    "It is built for lenders regulated under the Master Direction – Reserve Bank of India (Regulatory Framework for Microfinance Loans) Directions, 2022, and for Section 8 companies doing the same lending outside RBI registration. It is not a microfinance loan, and we are not a lender; this is the system the lender runs.",
  ],

  lifecycle: {
    head: "How a round runs, from centre meeting to disbursement",
    lead:
      "Group lending compresses the ACT and not the RECORD. Forty women borrowing ₹30,000 each is one decision to make and forty files to keep, and a system that collapses the second along with the first is one an inspection takes apart.",
    points: [
      ["Centre and group", "A centre carries its meeting day, its meeting time and the officer responsible. Groups sit under it, members under the group, and the leader is marked on the membership record rather than inferred."],
      ["The proposal", "One proposal names every member and the amount each is asking for, against one scheme and one tenure. It is a draft until it is submitted, and a draft can be edited or discarded — the member list is REPLACED on edit, so a dropped member is really gone."],
      ["Preflight, before anybody is asked to approve", "Every member is checked and every failure is named: KYC not verified, no bank account, an invalid IFSC, a live loan already running, no household income assessment on file, no bureau enquiry, no recorded consent, an amount outside the scheme range. The officer fixes the list before a checker ever sees it."],
      ["One four-eyes decision", "The whole centre is approved or rejected once, with the date the group signed. The maker cannot be the checker."],
      ["Execution", "The approved proposal becomes N loan applications and N sanctions. Anybody who fails at this point fails individually and is reported individually — the round does not fall over because one member's bank details changed."],
      ["Release", "Disbursement is released for the group in one act, against a funded account. A lender whose books say the account is empty is refused before the money moves, not after."],
      ["Servicing and collection", "Each member's loan services on its own schedule — weekly, fortnightly or monthly — and the demand sheet for a centre meeting is produced from those schedules."],
    ],
    evidence: [
      "fintrustsuite/src/lib/repos/mfi-group-loans.ts — proposeGroupLoan, groupLoanPreflight, submitGroupLoan, decideGroupLoan, executeGroupLoan, releaseGroupDisbursements",
      "fintrustsuite/src/lib/repos/mfi-groups.ts — centre, group and membership",
      "fintrustsuite/src/lib/repos/mfi-demand-sheet.ts — the centre meeting demand sheet",
      "fintrustsuite/tests/mfi-group-loan-origination.test.ts — drives one group through to five loan accounts",
    ],
  },

  specific: {
    head: "What a group book has to do that no other book does",
    lead:
      "Four of these exist only in microfinance. The fifth is the one that decides whether the rest of the system can read the book at all.",
    points: [
      ["The approval is once, and that is deliberate", "Maker-checker applies to the group sanction, not to each member. Per-member approval would put forty files of ₹30,000 in front of a checker who stops reading by the fifth, and a control nobody exercises is not a control. One decision, on a list the officer has already had to clean."],
      ["Each member gets an ORDINARY loan account", "Not a row inside a group record — a loan account with its own EMI schedule, its own scheme snapshot frozen at sanction, and its own classification. This is the claim worth proving rather than asserting: a second class of loan the LMS only half understands is how a book becomes unreportable. The group link lives on the microfinance side and adds no column to the loan."],
      ["A member cannot be originated without the household income assessment", "Paragraph 4.1 of the 2022 Directions requires a board-approved policy for assessing household income, and the figure is not optional detail. Preflight refuses a member with no income recorded, and an income cannot be recorded without an occupation behind it."],
      ["The bureau enquiry and its consent are both required, per member", "An indebtedness check with no recorded consent is not a lawful enquiry. Both the enquiry and the consent are preflight conditions, so a round cannot be executed on a member for whom either is missing."],
      ["Failure is per member, not per round", "One member's invalid IFSC does not stop thirty-nine disbursements. Execution reports who originated and who failed, with the reason, and the proposal moves to awaiting release carrying both."],
    ],
    evidence: [
      "fintrustsuite/src/lib/repos/mfi-group-loans.ts:348-378 — the preflight conditions, each with its own refusal",
      "fintrustsuite/src/lib/repos/mfi-group-loans.ts:371 — \"No income recorded — the household income assessment is missing.\"",
      "fintrustsuite/src/lib/repos/mfi-group-loans.ts:373-374 — bureau enquiry and recorded consent",
      "fintrustsuite/src/lib/policy/approval-policy.ts — GROUP_LOAN_SANCTION is not relaxable to self-approval",
      "fintrustsuite/src/lib/platform/mfi-pack.ts:53-91 — JLG schemes seeded on provisioning",
    ],
  },

  compliance: {
    head: "The 2022 Directions, and which parts land in software",
    lead:
      "Master Direction – Reserve Bank of India (Regulatory Framework for Microfinance Loans) Directions, 2022 — RBI/DOR/2021-22/89, DoR.FIN.REC.95/03.10.038/2021-22, dated 14 March 2022, effective 1 April 2022, updated as on 17 July 2025. These are the provisions that stop being policy and start being records.",
    points: [
      ["The definition itself (para 3.1)", "A microfinance loan is a collateral-free loan to a household with annual household income up to ₹3,00,000. Both limbs are part of the definition, so the income figure decides whether the Directions apply at all — not merely how much may be lent."],
      ["Collateral-free, and no lien (paras 3.1, 3.3)", "The loan is collateral-free, and para 3.3 adds that it shall not be linked with a lien on the borrower's deposit account."],
      ["The household income assessment (paras 4.1, 4.3)", "A board-approved policy is required for assessing household income, and household income must be reported to the credit information companies. Annex I describes capturing household profile, income sources and expenses, with self-reported income corroborated."],
      ["The repayment cap (paras 5.1, 5.2)", "Repayment obligations are limited to a maximum of 50 per cent of monthly household income, and the cap covers repayments on all existing loans plus the one under consideration. SEE THE NOTE BELOW — the software does not compute this."],
      ["Pricing and its disclosure (paras 6.1, 6.2, 6.7)", "A board-approved pricing policy with an interest rate model and a ceiling; rates that are not usurious; and prominent display of the minimum, maximum and average rates charged on microfinance loans."],
      ["The Key Facts Statement (paras 6A.2, 6A.4)", "A KFS to every prospective borrower, including an APR computation sheet and an amortisation schedule. Annex II gives the illustrative factsheet."],
      ["What the software does NOT do, stated plainly", "It does not compute or enforce the 50% repayment cap. It requires the household income assessment to exist before a member can be originated, and refuses the member if it does not — which is a different and smaller thing. A lender applying the cap is applying its own board-approved policy, not a calculation this system performs."],
    ],
    evidence: [
      "Master Direction RBI/DOR/2021-22/89, paras 3.1, 3.3, 4.1, 4.3, 5.1, 5.2, 6.1, 6.2, 6.7, 6A.2, 6A.4, Annex I, Annex II",
      "fintrustsuite — no repayment-capacity computation against household income exists; searched across src/lib",
      "fintrustsuite/prisma/schema.prisma:292-295 — NBFC_MFI and SECTION_8_MFI are provisioned regimes",
    ],
  },

  documents: {
    head: "What the round produces on paper",
    lead:
      "A group round generates per-member paper and centre-level paper, and the two are not interchangeable when somebody asks for a file.",
    points: [
      ["A sanction per member", "Each member's sanction is its own record with its own terms, because each is its own loan."],
      ["A Key Facts Statement per member", "Required by para 6A.2 for every prospective borrower, with the APR sheet and the amortisation schedule the paragraph calls for."],
      ["The demand sheet for the meeting", "What each member owes at the next centre meeting, produced from the schedules rather than typed."],
      ["The signing date is recorded where it is typed", "A group's acceptance date is checked against the sanction it accepts — a date before the sanction was drawn up, or one in the future, is refused."],
    ],
    evidence: [
      "fintrustsuite/src/lib/repos/mfi-demand-sheet.ts",
      "fintrustsuite/src/lib/documents/ — the KFS and sanction builders",
      "fintrustsuite/tests/mfi-group-loan-origination.test.ts — the signing date is checked where it is typed",
    ],
  },

  reports: {
    head: "Reading a group book",
    lead:
      "Because each member is an ordinary loan account, a group book reports through the same engine as everything else rather than through a parallel one.",
    points: [
      ["One DPD engine", "Days past due are computed for a group member's loan by the same engine that serves every other product, from the same due events. A separate path for group loans is how a book ends up with two answers to whether a borrower is in arrears."],
      ["Classification follows the same rules", "IRACP's ninety-days-past-due basis, computed in the day-end process for the relevant date."],
      ["Collections from the field", "A collector's round is a list of accounts, and the day-end reconciles what was collected against what was carried."],
    ],
    evidence: [
      "fintrustsuite/src/lib/lms/dpd.ts — recalcLoanDpd serves every product and takes no per-product branch",
      "fintrustsuite/src/lib/repos/collector.ts — the field collection round",
      "fintrustsuite/CLAUDE.md LMS hard rule 19 — one DPD engine",
    ],
  },

  faqs: [
    {
      q: "Does the software enforce the 50% of household income cap?",
      a: "No. It requires the household income assessment to be on file and refuses to originate a member without it, but it does not compute the cap or test a member's obligations against it. Applying the cap is the lender's board-approved policy under paragraphs 5.1 and 5.2 of the 2022 Directions. We would rather say this than let the page imply otherwise.",
    },
    {
      q: "Is a group loan one account or one account per member?",
      a: "One per member. Each is an ordinary loan account with its own EMI schedule, its own scheme snapshot and its own classification; the group link lives on the microfinance side and adds nothing to the loan record. What the group compresses is the decision, not the record.",
    },
    {
      q: "How many approvals does a round of forty loans need?",
      a: "One. Maker-checker applies to the group sanction rather than to each member, because a checker asked to approve forty files of ₹30,000 stops reading by the fifth. The preflight is what makes one approval safe: every member is checked and every failure named before the checker sees the list.",
    },
    {
      q: "What happens if one member fails at disbursement?",
      a: "That member fails and the rest proceed. Execution and release both report who succeeded and who did not, with the reason, so a changed bank account does not hold up thirty-nine disbursements.",
    },
    {
      q: "Does it work for a Section 8 company as well as an NBFC-MFI?",
      a: "Both are provisioned regimes. The difference the system itself records is that a Section 8 microfinance company is exempt from RBI registration and therefore files no RBI returns, so the returns module does not apply to it.",
    },
  ],

  related: [
    { href: "/loan-origination-software/", label: "Loan origination system", note: "The origination side a group proposal executes into." },
    { href: "/loan-management-system/", label: "Loan management system", note: "What each member's loan account runs on after disbursement." },
    { href: "/blog/kfs-key-facts-statement-nbfc-requirement/", label: "What the Key Facts Statement must contain", note: "Required for every microfinance borrower under para 6A.2." },
    { href: "/blog/irac-day-end-classification/", label: "Classification is a day-end event", note: "Why a group member's NPA figure depends on which day-end you read." },
    { href: "/blog/collection-efficiency-how-to-compute/", label: "Collection efficiency, four ways", note: "The metric a centre's performance is usually reported on, and its four definitions." },
  ],
};
