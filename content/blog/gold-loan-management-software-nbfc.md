---
title: "Gold loan management software for NBFCs: what the 2025 directions require"
description: "What gold loan software has to handle after the RBI's 2025 directions — the valuation reference, LTV monitoring, dual custody, the seven-working-day return clock, part-release, renewal and auction — and the questions to ask a vendor."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Gold loan management software for an NBFC has to do four things nothing else in the stack does:
value pledged ornaments on the basis the RBI prescribes, hold every item under dual custody with an
auditable record, monitor loan-to-value against a moving gold price, and run the release, renewal and
auction paths correctly. The Reserve Bank of India (Lending Against Gold and Silver Collateral)
Directions, 2025 made the first of those prescriptive, and most systems built before them value gold
on a basis that no longer meets it.

This guide covers what has to be implemented and how to test a vendor's version of it.

## How must gold collateral be valued?

The directions fix the method rather than leaving it to the lender:

> The reference is the **lower** of the 30-day average closing price and the **previous day's**
> closing price of 22-carat gold, as published by IBJA or a SEBI-recognised exchange, with lower
> purities adjusted proportionately.

Four things follow, and each breaks a common implementation:

**"Latest rate on file" is not the basis.** A branch that has not keyed the rate for a fortnight is
valuing that morning's pledge at a fortnight-old price. On a falling market that over-lends against
security worth less than the book says; on a rising one it short-changes the borrower. Neither is
defensible afterwards, because no basis was recorded.

**Both limbs read closes strictly before today.** "Previous day's closing price" means a day that has
closed. A price keyed this morning cannot decide the valuation of a loan sanctioned an hour later.

**Purity is scaled, not looked up per karat.** The reference is the 22-carat price; an 18-carat item
is valued at 18/22 of it. Systems holding a separate rate per karat can mix a 24-carat price from
last week with a 22-carat price from this morning, and — worse — value at zero any purity the branch
never keyed a rate for.

**The basis has to be recorded.** Which limb bound, on what date, from which source. An inspection
asks how a valuation was arrived at, and "the system used the current rate" is not an answer.

| Weight | Purity | 22K-equivalent | At ₹5,500/g |
|---|---|---|---|
| 30 g | 22K | 30.000 g | ₹1,65,000 |
| 20 g | 18K | 16.364 g | ₹90,002 |
| **50 g** | mixed | **46.364 g** | **₹2,55,002** |

## What else did the 2025 directions change?

| Area | Requirement |
|---|---|
| Return of collateral | Same day, or within 7 working days of full repayment |
| Delay in return | Compensation payable to the borrower for each day of delay |
| Loss or damage in custody | The lender compensates |
| Auction surplus | Returned to the borrower within 7 working days |
| Unclaimed collateral | Treated as unclaimed after two years from full repayment |

The return deadline is the requirement that creates a liability by inaction. The loan is closed, the
borrower has their no-dues certificate, and the packet sits on the shelf while a compensation clock
runs that nobody is watching. A system that closes the loan and says nothing more has left that
entirely to memory.

## What has to be true about custody?

Gold is the only collateral an NBFC physically holds, and the controls are correspondingly specific.

- **Dual custody.** Two different people, both authorised, on the packet — at pledge, at part-release,
  at full release and at auction. A system that allows the same user in both roles has not
  implemented dual custody, it has recorded it.
- **Item-level records, not packet-level.** Description, gross weight, deductions, net weight, purity
  and test method for each ornament. A packet total cannot support a part-release.
- **A photograph per item.** A packet photographed once proves nothing about any single piece after
  part of it has been released, and "bangle, plain" identifies nothing when two come back and one is
  disputed.
- **Items are never deleted.** A released or auctioned item keeps its row with a status and a date.
  It is a regulatory record of something the lender held.
- **The borrower holds paper.** A pledge acknowledgment describing the ornaments, their weights and
  purity, the valuation and the release terms — the only document the customer has against gold now
  in someone else's vault.

## How should LTV be monitored?

Loan-to-value on a gold loan moves without anybody doing anything, because the denominator is a
market price. Three things follow:

- **The cap is the lower of the scheme's and the regulator's.** A scheme may be more conservative
  than the regulatory ceiling; it may not be less.
- **Breach is a daily question, not a sanction-time one.** A margin call sweep should run nightly
  against the current reference rate and flag accounts where the outstanding has risen above the cap.
- **The borrower must be told honestly.** A margin call is not a bounced payment and not a default —
  it is a request for additional security or a part payment. A notification that tells the borrower
  their payment failed, or announces a charge that was never levied, is worse than none.

## What about renewal, part-release and auction?

**Renewal.** Gold loans are commonly rolled at maturity. The account being renewed should be standard
— renewing an overdue loan moves the overdue history off the live account, which is exactly what the
directions are designed to prevent.

**Part-release.** The borrower repays part and takes back some ornaments. The test is whether the
remaining gold still covers the remaining loan at the applicable cap; the system should compute that
before the items leave, not after.

**Auction.** After the notice period, with the reserve related to the outstanding, dual custody at
handover, and — the step most often missing — the accounting. An auction moves an asset off the books
and produces either a surplus payable to the borrower within seven working days or a shortfall that
remains recoverable. If nothing posts to the general ledger, the auction happened only in the
operations record.

## How gold loans should be classified

On the same basis as everything else: ninety days past due. The gold directions contain no separate
asset-classification rule, and IRACP applies.

What differs is the **due events**. A gold loan generates interest-servicing dates and a maturity
rather than instalments — and every gold loan falls wholly due at maturity whatever else the scheme
demands. A system that treats gold as "having no schedule" generates nothing for the classification
engine to read, and the account reads as current forever, however far past maturity it is.

## Questions to ask a gold loan software vendor

1. Show me how today's valuation rate was arrived at — which limb bound, from what data.
2. Value a packet with an 18-carat item in it. What did that item contribute?
3. Take a gold loan 100 days past maturity. What is its DPD and its classification?
4. Close a gold loan by paying it off. Where is the customer's no-dues certificate, and what starts
   the return clock?
5. Show me a part-release. What stopped it if the remaining gold no longer covered the loan?
6. Run an auction. Show me the vouchers.
7. Can the same user be both custodians?
8. What does the borrower physically receive when they pledge?

## Common mistakes

- **Valuing at the latest rate on file.** Not the prescribed basis.
- **A rate per karat rather than one reference scaled by purity.** Mixes dates, and can value an
  unpriced purity at zero.
- **No record of the valuation basis.** Unanswerable in an inspection.
- **Gold with no due events.** Never overdue, never NPA.
- **Closing the loan and forgetting the ornaments.** A compensation clock nobody is watching.
- **A no-dues certificate that says the gold was released when it is still in the vault.**
- **Margin calls sent as payment-failure messages.** Tells the borrower something untrue.
- **An auction with no accounting entries.**

## How Lenviq handles this

Valuation goes through one reference-rate computation — the lower of the 30-day average and the
previous close, both read strictly before the valuation date — and the same computation serves the
application and the loan account, so a packet cannot be worth two different amounts. Purity scales
from the 22-carat reference. The rate's source is recorded with it, and a price too old to use is
refused with its date rather than silently applied.

Gold generates due events like any other product and classifies on the same engine, so a gold loan
past maturity ages exactly as a term loan does. Closure produces the no-dues certificate and starts
the seven-working-day return clock, which a nightly sweep watches. Release is a separate act
requiring two custodians. Item photographs are captured at the counter and printed on the pledge
acknowledgment the borrower keeps.

## Frequently asked questions

### What gold rate should be used to value collateral?

The lower of the 30-day average closing price and the previous day's closing price of 22-carat gold,
published by IBJA or a SEBI-recognised exchange, with lower purities adjusted proportionately. Both
figures must come from days that have closed.

### How quickly must gold be returned after a loan is repaid?

On the same day where possible, and in any event within seven working days of full repayment. Delay
beyond that carries compensation payable to the borrower for each day, which makes it a liability the
lender accrues by doing nothing.

### How are gold loans classified for NPA purposes?

On the ordinary ninety-days-past-due basis. The gold directions contain no separate classification
rule. The practical difference is that a gold loan's dues are servicing dates and a maturity rather
than instalments — and maturity is not optional, so every gold loan has at least one due event.

### Can a gold loan be renewed if it is overdue?

Renewal is for a standard account. Rolling an overdue loan into a fresh one moves the overdue history
off the live account and defeats the classification, which is precisely the practice the directions
address.

### What must a borrower be given when they pledge ornaments?

An acknowledgment describing the ornaments — count, gross and net weight, purity and test method —
together with the valuation, the custody arrangement and the release terms. It is the only document
the borrower holds against property the lender is physically keeping.

---

**Related reading:** [The 2025 gold directions](/blog/gold-loan-directions-2025/) ·
[What the 2024 gold review found](/blog/what-the-2024-gold-review-found/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/)

[Ask for a demonstration](/contact/) against your own packet and rate data.
