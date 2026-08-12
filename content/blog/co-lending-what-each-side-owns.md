---
title: "Co-lending: two lenders, one borrower, and two sets of books that must agree"
description: "The arrangement is commercially attractive and operationally unforgiving. The share, the classification and the customer interface all have to be unambiguous before the first disbursement."
date: "2026-08-11"
category: "Operations"
author: "FastLegal Technologies"
draft: false
---

In a co-lending arrangement each partner **classifies its own share on its own norms, reports its own
exposure, and receives its own portion of every recovery**. The borrower has one loan; the regulator
sees two exposures. Almost every operational difficulty in co-lending comes from a system that models
it as one.

Co-lending lets a bank and an NBFC fund one loan in an agreed proportion, with the NBFC usually
originating and servicing. It solves a real problem on both sides. It also creates a set of
questions that are cheap to answer in the agreement and expensive to answer afterwards.

## The share is not one number

There is the funding share, and there is everything that follows it: interest income, charges,
recovery, and loss. An arrangement that specifies the first and leaves the rest to be worked out is
specifying the easy part.

The recovery waterfall is where this bites. A partial recovery on a stressed account has to split
somehow, and "pro rata" is ambiguous the moment one party has also charged fees.

## Classification has to be identical on both sets of books

The same borrower, the same days past due, and two lenders who must reach the same answer. If the
NBFC services the loan and the bank relies on its reporting, then the NBFC's day-end position is the
bank's classification too — and any difference in how the two compute overdue days produces two
different classifications of one loan.

That is not a reconciliation problem to be cleaned up monthly. It is two regulated entities
reporting different facts about the same asset.

## The borrower has one relationship

From the borrower's side there is one loan, one instalment and one place to complain. The
grievance route has to be stated in terms the borrower can act on without knowing which entity holds
which share — and the escalation has to work when the answer lies with the party they did not deal
with.

## What to settle before the first disbursement

- Whose customer interface, and whose name on the sanction letter, KFS and statement.
- Which system is the book of record for DPD, and how the other reconciles to it rather than
  computing its own.
- How charges split, and whether either party may levy one the other does not see.
- What happens on prepayment, foreclosure and settlement — including who may waive.
- The recovery waterfall, in rupees, worked through on a partial recovery.

Every item on that list is answerable in an afternoon at the start, and becomes a negotiation
between two compliance teams once there is a portfolio.

## What has to be agreed, beyond the share

| Item | Why it needs stating |
|---|---|
| Funding share | The easy part, and usually the only part specified |
| Interest apportionment | Each side's yield on its own share |
| Charge apportionment | Processing, penal, foreclosure — who books what |
| Recovery waterfall | How a partial recovery splits, especially where one party has charged fees |
| Loss sharing | Pro rata, or first-loss, and to what limit |
| Classification | Each side on its own norms — not one computed and shared |
| Servicing obligations | Who collects, who communicates, whose grievance officer |
| Reporting | Each side reports its own exposure to the bureaus and the regulator |
| Data and reconciliation cadence | How often, in what format, and who reconciles |

## Why can classification not simply be shared?

Because each partner is answerable for its own book under its own applicable norms, and a shared
figure computed by the servicer is the servicer's answer, not the partner's.

In practice the two will usually agree, because the underlying facts are the same. The risk is in the
edges — a different treatment of a partial payment, a different appropriation order, a charge one
side recognises and the other does not — and the edges are where classification changes.

What a servicing system should provide is not a shared classification but **shared facts**: the due
events, the receipts, and the days past due computed from them, at a stated date. Each partner
classifies from those.

## Where the reconciliation actually drifts

- **Rounding.** A share of 20% on an odd rupee amount does not divide cleanly. Whoever rounds, rounds
  consistently, and the rule is written down.
- **Timing.** A receipt taken on the 31st and posted by the partner on the 2nd sits in different
  months on the two books.
- **Charges.** Penal charges are receipt-basis income. If one side accrues them and the other does
  not, the yield differs on identical facts.
- **Reversals.** A bounced payment reverses on both books or the shares diverge permanently.

None of these is large per transaction. All of them compound, which is why the reconciliation cadence
is worth agreeing before the first disbursement rather than after the first disagreement.

## Common mistakes

- **Specifying the funding share and nothing else.**
- **One classification computed and passed to the partner.** Each side classifies its own share.
- **"Pro rata" as a recovery waterfall.** Ambiguous the moment one party has charged fees.
- **No agreed rounding rule.** Small, permanent, and irritating to unwind.
- **Monthly file exchange with no reconciliation.** The drift is invisible until it is large.
- **One grievance route for a borrower with two lenders.** The borrower needs to know whom to
  complain to, and the answer is usually the originator — but it has to be stated.

## Frequently asked questions

### Who classifies a co-lent account as NPA?

Each lender, for its own share, under its own applicable norms. The servicer supplies the facts —
what was due, what was received, days past due as at a date — and each partner classifies from them.

### How is a partial recovery split between co-lenders?

By the recovery waterfall in the agreement, which needs to say more than "pro rata" — particularly
where one party has charged fees or where charges and interest are apportioned differently from
principal.

### Does the borrower deal with one lender or two?

Operationally, usually one — the originator services the loan and is the borrower's point of contact.
Legally there are two exposures, and the borrower must be told who the lenders are and where to
complain.

### How often should co-lending books be reconciled?

Frequently enough that a drift is small when it is found. Monthly is common; the argument for more
often is that rounding, timing and charge-treatment differences compound, and unwinding six months of
them is much harder than unwinding one.

### What causes co-lending reconciliation differences?

Almost always one of four: rounding on the share, timing of posting, charge treatment where one side
accrues and the other recognises on receipt, and reversals applied on one book but not the other.

---

**Related reading:** [Digital lending for NBFCs](/blog/nbfc-digital-lending-guide/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[How to calculate penal charges](/blog/how-to-calculate-penal-charges-rbi-2024/) ·
[What cannot be outsourced](/blog/outsourcing-what-cannot-be-outsourced/)

[Ask for a walk-through](/contact/) of how shares, classification and recovery are held separately.
