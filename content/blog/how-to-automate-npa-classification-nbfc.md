---
title: "How to automate NPA classification in an NBFC"
description: "Automating SMA and NPA staging under RBI norms: what has to be computed nightly, why overdue means demanded-and-unpaid, the upgrade rule that catches most systems out, and how to check whether your classification and your ledger read the same rows."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

To automate NPA classification, compute days-past-due every night from the account's own due events,
derive SMA and NPA staging from that number, and remove every path by which a human can set the
classification directly. That is the whole of it — and the difficulty is not the ninety-day
arithmetic, it is making sure the number the classification reads and the number the statement reads
are the same number.

This is a practical guide: what to compute, in what order, what to check, and where implementations
usually break.

## What has to be computed, and when?

The RBI's clarification of 15 November 2021 on prudential norms on income recognition and asset
classification put the timing beyond argument: an account is flagged overdue as part of the **day-end
process for the due date itself**. Not the next morning, not on the reporting date, not when somebody
opens a report.

That single sentence decides the architecture. Classification is a **scheduled job**, not a
request-time computation. If it runs when asked, two people asking at different times get different
answers, and the one who asked at quarter-end gets the one that goes in the return.

The nightly sequence that works:

1. **Apply money already held.** Any advance or unapplied receipt sitting on the account is set
   against instalments that have now fallen due — before anything is judged overdue. A borrower who
   paid ahead must not be marked overdue on a due their own money covers.
2. **Recompute days-past-due** for every live account, from the oldest unpaid due event.
3. **Derive the stage** from the DPD.
4. **Apply income recognition consequences** of any account that has just crossed into NPA.
5. **Levy penal charges** — after classification, so an account that turned NPA overnight is handled
   on its new basis in the same run.
6. **Write the day's position** for reporting.

Order matters in both directions. Applying advances after classification marks a paid-up borrower
overdue; levying penal before classification charges an account that should have stopped.

## What counts as overdue?

An amount is overdue when it was not paid on the date the lender fixed for it. Two consequences that
systems get wrong:

**Accrued is not due.** Interest that has accrued but has not yet been demanded is not overdue. This
is what makes an interest-servicing or bullet product behave correctly — the clock starts on the date
the sanction says money is payable, not on the date interest began to build.

**Grace does not move it.** A lender may choose not to *levy* a penal charge for the first few days
of a default. That is a commercial decision about a charge. It does not change the date the amount
became overdue, and it must not delay classification, SMA staging, NPA or the DPD reported to the
credit bureaus. Two separate settings, never one doing both.

## What are the stages?

| Stage | Days overdue | Note |
|---|---|---|
| Standard | 0 | |
| SMA-0 | 1–30 | Early warning. Not impairment |
| SMA-1 | 31–60 | |
| SMA-2 | 61–90 | Reported to CRILC for large borrowers |
| Sub-standard (NPA) | > 90 | |
| Doubtful | 12 months as sub-standard | Sub-categorised by further ageing |
| Loss | Identified as such | |

## The upgrade rule that catches most systems out

An account classified as NPA is upgraded to standard **only when the entire arrears of interest and
principal are paid**. Not when a payment brings the DPD below ninety. Not when the oldest instalment
is settled.

Many systems implement classification as a pure function of DPD in both directions, which quietly
upgrades an account the moment a part-payment moves the oldest unpaid due forward. That is the wrong
answer, and it is the wrong answer in the direction that flatters the book.

The implementation is a one-way gate: DPD determines *downgrade*; full clearance of arrears
determines *upgrade*.

## One engine, not one per product

The most damaging design error is a per-product classification path — a gold engine and a term-loan
engine, each with its own idea of what is overdue.

Products differ in the **due events they generate**, not in how days-past-due is counted. A term loan
generates instalments. A gold loan generates interest-servicing dates and a maturity. A demand loan
generates a maturity. Feed all of them into one engine and every product classifies identically. Give
each its own path and they diverge — usually silently, usually for years, and usually discovered by
somebody outside the company.

A specific case worth checking: does a gold loan in your system generate any due event at all? Where
gold is treated as having "no schedule", the classification engine finds nothing unpaid and the
account reads as current forever, however far past maturity it is.

## What happens to income at classification?

Crossing into NPA is not only a label. Interest accrued but not collected must be **reversed** out of
income into a suspense account, and from that date interest is recognised only as it is received.

The half that is usually missing is the second one. The reversal happens because it shows in the
P&L; the receipt-basis recognition does not, because nothing forces it. The symptom is a suspense
balance that only ever grows while the borrower's payments reduce principal.

Test it: take an NPA account with interest in suspense, post a payment, and check that it meets the
suspended interest before principal, that suspense falls, and that income is recognised on the date
of receipt.

## How to check your own system

Six questions, in ascending order of how much they reveal.

1. **Where did this DPD come from?** You should be able to see the unpaid due events it was computed
   from, not just the number.
2. **Can anyone type a classification?** If yes, the classification and the ledger can disagree, and
   one day they will.
3. **Take an account to 91 days and check the ledger.** Was accrued interest reversed to suspense?
4. **Pay that account.** Is income recognised on receipt, or did the money go to principal?
5. **Part-pay an NPA account until DPD falls below 90.** Did it upgrade? It should not have.
6. **Compare a gold loan and a term loan, both 100 days overdue.** Same DPD, same stage, same
   treatment? If not, you have two engines.

## A worked example

A gold loan of ₹3,00,000 is disbursed on 15 January with monthly interest servicing. The borrower
pays nothing.

- **15 February** — the first servicing due date passes unpaid. Day-end that night: DPD 1, SMA-0.
- **17 March** — DPD 31, SMA-1.
- **16 April** — DPD 61, SMA-2. If this borrower is a large exposure, it goes to CRILC at this stage.
- **16 May** — DPD 91. The account becomes sub-standard. That night, the interest accrued since
  disbursement — about ₹23,000 at 1% a month — is reversed out of income into suspense.
- **June** — the borrower pays ₹23,350, clearing the interest. It meets the suspended interest first,
  suspense goes to nil, and income of ₹23,350 is recognised on the date of receipt. The arrears of
  interest are now fully paid, so the account upgrades to standard.

Note what did *not* happen: the account did not upgrade in May when a partial payment might have
moved the DPD, and the reversed interest did not vanish — the borrower still owed it, and paying it
recognised it.

## Common mistakes

- **Classifying on demand rather than at day-end.** Different answers depending on when you ask.
- **An editable classification field.** The ledger and the label diverge.
- **Upgrading on DPD.** Flatters the book; contrary to the 2021 clarification.
- **Penal grace delaying classification.** Two settings, one purpose each.
- **A product with no due events.** It can never be overdue, so it can never be NPA.
- **Reversing interest but never recognising it on receipt.** Understates income permanently.
- **Applying advance payments after classification instead of before.** Marks paid-up borrowers
  overdue.

## How Lenviq handles this

One classification engine serves every product and takes no per-product branch — products differ only
in the due events they generate. Classification runs in the day-end job, after held advances are
applied and before penal is levied. The DPD on the screen can be traced to the due events it came
from. Upgrade requires arrears cleared in full, not a DPD below ninety. On classification, accrued
interest is reversed to suspense and from that date receipts meet suspended interest before
principal, recognising income on the date the money arrives.

The positions and their citations are on the [compliance page](/compliance/).

## Frequently asked questions

### Can NPA classification be run weekly instead of nightly?

No. The 2021 clarification requires the overdue flag to be applied in the day-end process for the due
date itself, which makes the ninety-day count start on day one. A weekly run means an account can be
up to six days into a default before the system notices, and the DPD reported to the bureaus is wrong
by the same amount.

### Does a penal charge grace period delay NPA classification?

It must not. A grace period is a commercial decision about when to *levy* a charge. The date an
amount became overdue is fixed by the sanction, and classification, SMA staging and bureau reporting
all run from that date regardless of whether a charge was levied.

### When can an NPA account be upgraded to standard?

Only when the entire arrears of interest and principal are paid. A part-payment that reduces
days-past-due below ninety does not upgrade the account, which is a change many systems built before
November 2021 never implemented.

### How should gold loans be classified?

On the same basis as everything else — ninety days past due. The gold directions contain no separate
asset-classification rule. What differs is the due events: a gold loan generates interest-servicing
dates and a maturity rather than instalments, and every gold loan falls wholly due at maturity
whatever else the scheme demands.

### What is the difference between SMA and NPA?

SMA is an early-warning classification for accounts overdue up to ninety days, in three stages
(SMA-0, 1 and 2). NPA begins after ninety days and carries the income recognition and provisioning
consequences. SMA status for large borrowers is reported to CRILC, which is why the staging matters
operationally even though it is not impairment.

---

**Related reading:** [RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[Income reversal on NPA](/blog/npa-income-reversal/) ·
[What SMA signals](/blog/sma-classification-what-it-signals/)

Want to see the classification traced back to the rows it was computed from?
[Ask for a walk-through](/contact/).
