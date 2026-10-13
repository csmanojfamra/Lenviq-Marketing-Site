---
title: "The APR on a Key Facts Statement is a cash-flow, and three things systems leave out of it"
description: "An APR is not the interest rate with a label on it. It is the rate that discounts what the borrower actually received against what they actually pay — which makes upfront fees, the GST on those fees, and any instalment taken at disbursement part of the computation, not footnotes to it."
metaDescription: "An APR is the rate that reconciles what the borrower received with what they pay. Why upfront fees, GST on fees and advance instalments all change it."
question: "What has to go into the APR on a Key Facts Statement?"
date: "2026-10-13"
category: "Regulatory"
author: "CA Anil Agarwal"
tool: "apr-calculator"
related: "kfs-key-facts-statement-nbfc-requirement, kfs-what-goes-in-the-apr, rbi-key-facts-statement, which-rate-goes-on-which-document, flat-rate-vs-reducing-balance, frozen-terms-at-sanction, penal-charges-not-interest, nbfc-digital-lending-guide"
draft: true
---

The annual percentage rate on a Key Facts Statement is the annual cost of credit to the borrower,
taking in the interest rate and every other charge attached to the facility. It is therefore not the
contracted rate with a different name on it: it is the rate at which the money the borrower actually
received reconciles to the payments they actually make. Anything that reduces what they received, or
adds to what they pay, moves it.

Three such things are routinely left out, and each of them makes the disclosed APR lower than the
truth: the processing fee deducted at disbursal, the GST charged on that fee, and any instalment
collected up front.

## What the circular requires

The Reserve Bank's [Key Facts Statement (KFS) for Loans &
Advances](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0) circular
(RBI/2024-25/18, DOR.STR.REC.13/13.03.00/2024-25, dated 15 April 2024) applies to commercial banks,
co-operative banks and NBFCs alike, and it consolidated requirements that had previously sat in the
microfinance and digital lending instructions.

Two paragraphs do the work:

- **Paragraph 6** requires the KFS to carry an **APR computation sheet** and a **loan amortisation
  schedule**, and states that the APR includes all charges levied by the regulated entity. A
  disclosure that gives the rate without showing the working is not what the paragraph asks for.
- **Paragraph 7** deals with charges the lender recovers on behalf of third parties — insurance
  premium, legal or valuation fees. These are **part of the APR** and are additionally to be
  disclosed separately, and where the lender collects them, receipts and related documents are to be
  given to the borrower for each payment within a reasonable time.

Annex B to the circular carries a worked illustration on a hypothetical ₹20,000 retail loan whose
effective annualised rate comes out at 17.07% — materially above the nominal rate, which is the whole
point of the illustration.

## The three omissions, with the arithmetic

Take a ₹5,00,000 loan for 36 months at 14% a year, reducing balance. The instalment is about
₹17,085, so the borrower pays roughly ₹6,15,060 in all.

| Scenario | What the borrower receives at t=0 | What the APR reflects |
|---|---|---|
| The rate alone | ₹5,00,000 | 14.00% — the contracted rate, and the only case where APR equals it |
| A 2% processing fee deducted | ₹4,90,000 | Higher, because the same payment stream is now serviced on ₹10,000 less |
| …plus 18% GST on that fee, also deducted | ₹4,88,200 | Higher again. The tax is a cash outflow at disbursal whether or not it is the lender's income |
| …plus one instalment collected at disbursement | ₹4,71,115, and 35 payments remain | Higher still, and this is the one most often missed |

The advance instalment is worth dwelling on. A borrower whose first instalment comes out of the cheque
receives that much less and repays the same total over a shorter remaining stream. The annualised cost
they are actually paying is higher than the contracted one, and a KFS that ignores it understates the
cost of the loan — the disclosure half of the same concern that governs how interest may be charged,
and the half the borrower can check with a calculator.

The modelling that gets this right is straightforward once stated: money not received at t=0 is
treated as an upfront deduction, and the payment stream is shortened by the instalments already made.
Both the deduction and the shortening matter; doing one without the other produces a number that is
wrong in a different direction.

## Where the number has to agree with itself

The APR is one figure with several places to appear, and they are generated at different times by
different code paths. That is where disclosures drift apart.

- The **screen** the credit officer prices the file on
- The **scheme snapshot** frozen onto the loan at sanction, which is what the loan is then serviced
  against — because a scheme that is edited afterwards must not retrospectively change
  [the terms an existing borrower agreed to](/blog/frozen-terms-at-sanction/)
- The **sanction letter**
- The **Key Facts Statement** itself

A charge renamed in the master after sanction, or a rate read from the live scheme rather than the
snapshot, produces a KFS that disagrees with the sanction letter for the same file. The borrower has
both documents. Deciding
[which rate belongs on which document](/blog/which-rate-goes-on-which-document/) is a design
decision, and leaving it to whichever query ran last is how two documents for one loan end up
quoting different numbers.

## What an APR is not

- **Not the flat rate.** A flat rate computes interest on the original principal for the whole
  tenure, so its nominal figure is roughly half the equivalent reducing-balance rate for the same
  money. [The two are not comparable](/blog/flat-rate-vs-reducing-balance/) and an APR computed from
  a flat rate without converting the basis is simply wrong.
- **Not the effective rate on the lender's books.** Income recognition answers a different question
  and uses the lender's own accounting basis.
- **Not inclusive of penal charges.** A penal amount is a contingent charge for a default that may
  never happen, so it is disclosed among contingent charges rather than built into the rate —
  which follows from penal amounts
  [being charges rather than interest](/blog/penal-charges-not-interest/).

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The computation | Discount the actual cash-flow: amount received net of deductions, against the payments due | Annualise the contracted rate and label it APR |
| Upfront charges | Include fees and the tax on them as deductions at t=0 | Disclose them in a list beside an APR that excludes them |
| Advance instalments | Treat them as both a deduction and a shortening of the stream | Ignore them because the schedule still shows the full count |
| Non-monthly schedules | Take the number of periods in a year as an input | Price a hundred daily instalments as a hundred months |
| User-defined instalments | Where the file agreed an instalment amount, treat that as the contract and derive the rate from it | Recompute an instalment the borrower never agreed to |
| The sheet | Produce the computation sheet and the amortisation schedule the paragraph requires | Treat the APR as a single number on a page |
| Third-party charges | Include them in the APR and disclose them separately | Leave them out because the lender is only collecting them |

## Frequently asked questions

### Does GST on a processing fee go into the APR?

It is a cash outflow the borrower bears at disbursal, so leaving it out understates what the credit
cost them. The conservative and defensible treatment is to include it; a lender taking a different
view should be able to state the reasoning, because the borrower can see the deduction on their own
bank statement.

### Is the APR the same as the interest rate when there are no charges?

Yes — that is the only case in which they coincide, and it is why a KFS showing the APR equal to the
nominal rate on a loan that carried a processing fee is an arithmetic error rather than a presentation
choice.

### What about a loan where the instalment was negotiated rather than computed?

Some schemes fix the instalment and let the rate follow. Where the file agreed an instalment, that
amount is the contract and the APR is derived from it. Computing a theoretical instalment and
disclosing a rate from that discloses a number the loan will never collect.

### Does the APR change if the borrower prepays?

The disclosed APR is computed on the contracted schedule at the outset. A prepayment changes the
realised cost, and where a
[foreclosure or prepayment charge](/blog/prepayment-charges-2025/) applies it is disclosed among the
contingent charges rather than folded into the headline figure.

### Where does Lenviq stand on this?

The APR is computed from the cash-flow rather than annualised from the rate: upfront charges and the
tax on them are treated as deductions at disbursal, an instalment collected at disbursement is
modelled as both a deduction and a shortening of the remaining stream, the number of periods in a
year is an input so a weekly or daily schedule is priced as one, and where a scheme fixes the
instalment the rate is derived from the agreed instalment rather than recomputed. The Key Facts
Statement is generated from the application's own pricing and is available as a document before
sanction. What this page does not claim is a field-by-field account of that document — charge naming
reaches several consumers and the right place to check it is the generated KFS for your own scheme.
