---
title: "The 2025 gold loan Directions: what they say, and what they deliberately do not"
description: "LTV maintained on an ongoing basis, a 12-month cap on bullet consumption loans, renewal only on a standard account with accrued interest paid, and a prescribed valuation reference. Also: the provision that was in the draft and was dropped, and the subject the Directions do not address at all."
date: "2026-08-11"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

The [Reserve Bank of India (Lending Against Gold and Silver Collateral) Directions,
2025](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=12859) (RBI/2025-26/47, 6 June 2025)
consolidated three decades of scattered circulars into one instrument. The four provisions with the
most operational consequence are the prescribed **valuation reference**, **LTV maintained on an
ongoing basis**, the **conditions on renewal**, and the **return of collateral within seven working
days**. Reading a summary is not the same as reading the instrument, and on several points the
difference matters.

## How must the collateral be valued?

The reference is the **lower of the 30-day average closing price and the previous day's closing
price of 22-carat gold**, as published by IBJA or a SEBI-recognised exchange, with lower purities
adjusted proportionately.

This is prescriptive where practice had been varied, and it invalidates two common implementations:

- **Valuing at the latest rate on file.** A branch that has not keyed the rate for a fortnight values
  that morning's pledge at a fortnight-old price. Neither limb of the prescribed test is satisfied,
  and the basis cannot be evidenced afterwards.
- **Holding a separate rate per karat.** The reference is the 22-carat price and other purities scale
  from it. A per-karat table can mix a 24-carat quote from last week with a 22-carat quote from this
  morning, and can value at nothing a purity that was never keyed.

## Renewal is conditional, and the conditions are specific

Paragraph 11: *"A lender may renew an existing loan or sanction a top-up loan upon a formal request
from the borrower and subject to a credit assessment... Such renewal or top-up shall be permitted
only within the permissible LTV, and provided the loan is classified as **standard**. Further,
renewal of bullet repayment loan shall be allowed only after **payment of accrued interest**, if
any."*

Three separate tests, and a system that enforces one of them enforces none of them:

1. Within the permissible LTV.
2. The loan classified as standard.
3. For a bullet loan, accrued interest paid.

Renewing an overdue loan resets its maturity date and moves the arrears off the live account — which
is evergreening, and it is the first thing an examiner looks for in a gold book.

## Tenor

Paragraph 15 caps consumption bullet repayment loans at 12 months, renewable under paragraph 11.

## LTV is continuous, not a sanction-time test

Paragraph 20, in full: *"The prescribed LTV ratio shall be maintained on an ongoing basis throughout
the tenor of the loan."*

For a bullet loan that is a live obligation, because accrued interest counts toward the exposure. A
loan sanctioned comfortably inside the cap drifts toward it on unpaid interest alone, with the
principal untouched — and the gold price can move against it at the same time, from the other
direction.

The operational consequence is a **daily** test rather than a check at sanction: recompute the
exposure, revalue the security at the current reference, compare against the cap, and act where it is
breached.

## What must happen when the loan is repaid?

| Event | Requirement |
|---|---|
| Full repayment | Collateral returned the same day, and in any event within 7 working days |
| Delay in return | Compensation payable to the borrower for each day of delay |
| Loss or damage in custody | The lender compensates |
| Auction surplus | Returned to the borrower within 7 working days |
| Not collected | Treated as unclaimed after two years from full repayment |

The return deadline is the requirement that creates a liability by inaction. The loan is closed, the
borrower holds a no-dues certificate, and the packet sits on a shelf while a compensation clock runs
that nobody is watching. A system that closes the loan and says nothing further has left that
entirely to somebody's memory.

## What is not in there

The draft Directions of April 2025 had proposed additional standard-asset provisioning on an LTV
breach. **The final instrument dropped it**, leaving the action to the lender. Anyone implementing
from the draft, or from commentary written against it, is implementing a rule that was not made.

More significantly for anyone building or buying software: the Directions contain **no provision on
asset classification at all**. The words "default" and "90 days" do not appear. Classification of a
gold loan is governed by IRACP like any other advance — ninety days past due — and a system that
marks a gold loan NPA at its maturity date is overstating NPA by ninety days. Conservative-looking,
still wrong, and harder to explain for looking careful.

The converse error is worse and commoner: a system that treats a gold loan as having no schedule
generates no due events at all, so the classification engine finds nothing unpaid and the account
reads as current forever, however far past maturity it is.

## Common mistakes

- **Valuing at the latest rate on file.** Not either limb of the prescribed test.
- **A rate per karat instead of one reference scaled by purity.** Mixes dates; can value an unpriced
  purity at zero.
- **LTV checked only at sanction.** Paragraph 20 says on an ongoing basis.
- **Renewing an overdue loan.** Fails the standard-asset condition, and looks like evergreening.
- **Renewing a bullet loan without collecting accrued interest.** Fails the third condition.
- **Provisioning on an LTV breach because the draft said so.** The final instrument dropped it.
- **NPA at the maturity date.** Overstates by ninety days.
- **A gold loan with no due events.** Never overdue, never NPA.
- **Closing the loan and forgetting the ornaments.** A compensation clock nobody watches.

## How Lenviq handles this

Valuation goes through one reference-rate computation — the lower of the 30-day average and the
previous close, both read strictly before the valuation date, with the source recorded — and the same
computation serves the application and the loan account so a packet cannot be worth two amounts. A
price too old to use is refused with its date rather than silently applied.

Gold generates due events like any other product: servicing dates where the scheme has them, and a
maturity in every case, because every loan falls wholly due at maturity whatever else the scheme
demands. Classification then runs on the same engine as everything else, on the ninety-day basis.
Renewal checks all three of paragraph 11's conditions. A nightly margin-call sweep tests LTV against
the current reference. Closure starts the seven-working-day return clock, and a sweep reports packets
past it.

## Frequently asked questions

### What LTV applies to gold loans?

The permissible ratio is set by the applicable regulatory cap, and a lender's own scheme may be more
conservative. The operative point of the 2025 Directions is paragraph 20: whatever the ratio, it must
be maintained on an ongoing basis throughout the tenor, not merely tested at sanction.

### How should a gold loan be classified for NPA purposes?

On the ordinary ninety-days-past-due basis under IRACP. The Directions contain no asset-classification
provision, so nothing in them displaces the general norm. What differs is the due events: servicing
dates and a maturity rather than instalments.

### Can a gold loan be renewed if interest is outstanding?

Not for a bullet repayment loan — paragraph 11 requires accrued interest to be paid first, and
separately requires the loan to be classified as standard and to be within the permissible LTV. All
three conditions apply together.

### How quickly must pledged gold be returned?

The same day where possible, and within seven working days of full repayment in any event, with
compensation payable for each day of delay beyond that. Auction surplus is likewise returnable within
seven working days.

### Did the final Directions require extra provisioning on an LTV breach?

No. That appeared in the April 2025 draft and was dropped from the instrument issued in June. The
action on a breach is left to the lender, which makes the margin-call process a policy question
rather than a prescribed one.

---

**Related reading:** [Gold loan management software](/blog/gold-loan-management-software-nbfc/) ·
[What the 2024 gold review found](/blog/what-the-2024-gold-review-found/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/)

[Ask for a walk-through](/contact/) against your own packet and rate data.
