---
title: "A payoff quote is an arithmetic promise with a date on it, and most of them double-count"
description: "A borrower asking what it costs to close early is asking for a figure the lender will have to honour. It has to be computed as at a date, it must not charge the same interest twice under two names, it rounds down rather than to nearest, and whether a charge applies at all depends on who is asking."
metaDescription: "A payoff quote is computed as at a date, must not double-count interest, rounds down, and whether a charge applies depends on who is asking."
question: "How is a loan foreclosure or payoff amount calculated?"
kind: artefact
author: "CA Anil Agarwal"
updated: "2026-10-13"
related: "prepayment-charges-2025, kfs-software-nbfc, which-rate-goes-on-which-document, frozen-terms-at-sanction, reconciliation-off-by-rupees, flat-rate-vs-reducing-balance, nbfc-income-recognition-rbi-rules, dpd-calculation-software-nbfc"
priority: 0.8
draft: true
---

A borrower asking what it would cost to close their loan today is asking for a number the lender
will have to honour. That makes a payoff quote different from a report: it is a statement the lender
is bound by for as long as it is valid, and a figure that is wrong by a thousand rupees is either a
loss or an argument.

Four properties decide whether a quote is defensible, and three of them are arithmetic rather than
policy.

## It is computed as at a date, and the date is an input

A payoff figure is only meaningful for a stated date, because interest accrues daily. "What do I owe"
has no answer; "what do I owe if I pay on the 20th" has exactly one.

So the date is supplied to the computation rather than read from the clock, and two consequences
follow that systems get wrong:

- **A quote cannot be dated before the loan was disbursed.** It sounds absurd until a system computes
  one, because nothing stopped it — the quote routine happily priced a loan that did not yet exist.
- **A past-dated quote cannot know about money received after it.** A receipt banked on the 25th is
  not a reduction in a quote dated the 20th. A system that nets every receipt regardless of date
  produces a quote lower than the borrower actually owed on the day.

## It must not charge the same interest twice

This is the specific defect worth naming because it is invisible in a total that looks plausible.

A quote has to include interest the borrower owes and has not paid. That interest can be reached by
two routes: as the **accrued interest** sitting on the account, and as the **interest component of
overdue instalments** already demanded. They overlap. A quote that adds both lines charges the same
money twice, under two names, on the same page — and the borrower who adds up the components finds
it.

The resolution is that both figures come off **one read**, as at the date being quoted, so they
cannot disagree with each other. Two independent queries against the same underlying amount is how a
quote ends up internally inconsistent while each half is individually correct.

## It rounds down, not to nearest

Every amount a borrower is asked to pay is a whole rupee. A schedule can round each instalment to the
nearest rupee and let the residue fall into the last one, because there is a later instalment to
absorb it.

**A quote has nothing after it.** Round a payoff up and the lender collects a few paise more than the
loan owed, which strands an unapplied balance on an account that closed in the same transaction —
a credit balance on a closed loan, which somebody then has to explain. So a payoff **rounds down**,
and the sub-rupee shortfall is absorbed by the round-off head that exists for it.

## Whether a charge applies depends on who is asking

A foreclosure or prepayment charge is not simply a scheme parameter. Whether it may be levied at all
turns on facts about the borrower and the loan:

| What it depends on | Why |
|---|---|
| Whether the borrower is an individual | The protections differ, and a company prepaying is not in the same position as a person |
| Whether the facility is at a floating rate | The position on floating-rate loans to individuals is not the position on fixed |
| The purpose — business or otherwise | A loan taken for business purposes is treated differently from one that was not |
| What the **snapshot** says | The scheme as it stood at sanction, never the live master — editing a scheme today cannot create a charge on a loan written last year |

The fourth row is the one with teeth. A charge a lender wants on new business belongs on a new scheme
*version*, which new loans snapshot at sanction.
[The prepayment position and what moved in 2025](/blog/prepayment-charges-2025/) is the detail; the
system requirement is that eligibility is evaluated against the loan's own frozen terms plus facts
about the borrower, and that both are recorded with the quote.

## The quote is a document, and its validity is part of it

A quote the borrower can act on has to say when it stops being true. Without a validity date the
lender is bound indefinitely by a figure that changes daily, and with one the borrower knows what
they are paying by when.

And the quote should be reproducible. A dispute three months later asks what was quoted and on what
basis; a system that recomputes gives today's answer to a question about March.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The date | Take it as an input; refuse a date before disbursement | Read the clock, or quote a loan that did not exist on the date |
| Receipts | Count only those dated on or before the quote date | Net every receipt regardless of date |
| Interest | Reach it through one read, so accrued and overdue-instalment interest cannot overlap | Add both lines, charging the same money twice under two names |
| Rounding | Floor the payoff to the rupee | Round to nearest, stranding a credit on a closed loan |
| Charge eligibility | Evaluate against the scheme snapshot plus the borrower's own facts | Read the live scheme master, which lets an edit reprice an existing loan |
| The document | Stamp it with a validity date and keep it | Recompute on demand, which answers March's question with today's figure |
| Part payment | Treat it as a different question with its own eligibility and its own effect on the schedule | Treat a part payment as a small foreclosure |
| What the borrower should do | Nothing | Advise on whether closing early is worth it. That is the borrower's arithmetic against their own alternatives |

## Frequently asked questions

### Why does the quote change if I pay two days later?

Because interest accrues daily, so a payoff dated the 22nd is larger than one dated the 20th. That is
also why a quote carries a validity date — beyond it the figure is no longer the figure.

### Does the quote include penal charges?

Any penal already levied and unpaid is part of what the borrower owes, so yes. What it does not
include is penal that has not been levied, and it does not compound anything — a penal amount is a
charge rather than interest, so no interest is computed on it.

### Is a part payment the same as a foreclosure for charge purposes?

No. They are separate eligibility tests with separate charge bases — one is computed on the amount
being paid, the other on the outstanding principal being extinguished — and they have different
effects afterwards: a part payment leaves a loan that has to be re-amortised, either on tenure or on
instalment, and that choice belongs to the sanction.

### Can a quote be given for a past date?

Yes, and it should be able to be, for a dispute or a reconciliation. What it must do is ignore
anything that happened after the date being quoted, which is the property that makes it an answer to
the question asked rather than to today's.

### Where does Lenviq stand on this?

The quote takes the date as an input and refuses a date before disbursement. Accrued interest and
the interest component of overdue instalments come off one read so they cannot double-count — that
was a real defect, quoting both lines for the same money, and it is the reason the page says so
plainly. Receipts dated after the quote date are excluded. The payoff floors to the rupee rather
than rounding to nearest, with the sub-rupee shortfall absorbed by the round-off head. Charge
eligibility is evaluated from the scheme snapshot together with the borrower's own facts — whether
an individual, the rate basis, and the purpose — rather than from the live master. Part payment and
foreclosure are separate eligibility tests with separate charge bases. What the platform does not do
is advise a borrower whether to close early.
