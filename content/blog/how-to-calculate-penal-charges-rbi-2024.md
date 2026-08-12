---
title: "How to calculate penal charges under the RBI 2024 rules"
description: "Penal charges after 1 April 2024: how to compute them, why they are not interest, what that means for capitalisation, compounding and the general ledger, and how the borrower's statement and the trial balance can honestly show different numbers."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Since 1 April 2024, a penal amount on a defaulted loan is a **charge**, not interest. Calculate it on
the amount in default for the period of the default, at a rate or fee your board has approved and
your loan agreement and Key Facts Statement disclose. Do not add it to principal, do not compute
interest on it, and do not recognise it as income until it is received.

That is the rule. What follows is how to implement it without producing two contradictory numbers.

## What changed on 1 April 2024?

The RBI's circular on fair lending practice and penal charges in loan accounts (RBI/2023-24/53, dated
18 August 2023) took effect for new loans from 1 April 2024, and for existing loans at their next
review or renewal.

Before it, most lenders charged "penal interest" — an additional rate applied to the overdue amount,
which then behaved like interest: it capitalised, it compounded, and it accrued into income. The
circular ended that.

| | Penal interest (before) | Penal charges (after) |
|---|---|---|
| Nature | An additional rate | A charge |
| Added to principal | Usually | No |
| Interest computed on it | Yes | No |
| Income recognised | On accrual | On receipt |
| Disclosure | Often in the fine print | Agreement and KFS, with quantum and circumstances |
| Same default charged twice | Sometimes, under two names | Not permitted |

The circular also requires that the quantum be **reasonable and commensurate** with the default, and
that penal charges on loans to individuals for purposes other than business are not higher than those
on comparable non-individual borrowers.

## How do you calculate a penal charge?

Two forms are common, and both are compliant if disclosed.

**A percentage of the overdue amount, per period of default.** For example 2% per month on the
overdue instalment. On an instalment of ₹1,33,273 that is thirty-one days overdue:

```
1,33,273 × 24% per annum ÷ 365 × 31 days = ₹2,716
```

**A flat fee per default event.** For example ₹500 per bounced instalment. Simpler and increasingly
common for small-ticket lending.

Three details decide whether the implementation is right:

**Charge on the amount in default, not the whole loan.** The overdue instalment, or the overdue
amount — not the principal outstanding.

**Charge for the period of the default, and only once for each day.** An instalment that remains
unpaid keeps attracting the charge for as long as it stays unpaid. But a day already charged must not
be charged again — a system that recomputes from day one each time it runs will inflate the charge
every night.

**Stop at NPA.** From the date an account is classified non-performing, income is recognised on a
receipt basis. Continuing to levy fresh charges on it is inconsistent with that treatment; the
convention is to stop new levy and suspend what is outstanding.

## Why the borrower's statement and the trial balance differ

This is the part that confuses implementers, and it is not a contradiction.

- **The borrower's liability arises when the charge is levied.** They owe it from that date, and
  their statement of account should show it, because a statement that hides a charge until it is
  collected is a statement they cannot reconcile.
- **The lender's income arises when the charge is received.** Under the receipt basis, nothing
  reaches the general ledger until money arrives, so the trial balance does not show it.

One number cannot serve both. The correct implementation carries the levy as a **shadow entry** —
recorded against the account, visible on the statement, forming part of what is owed — and posts to
the general ledger only on collection.

A useful check: levy a charge and then look at the trial balance. If it moved, the treatment is
accrual-based and inconsistent with the receipt basis.

## What about the principal outstanding?

The penal charge does not go into it.

This matters more than it sounds, because the principal outstanding is what feeds the foreclosure
quote, the loan-to-value ratio, the provisioning computation and the balance quoted to the borrower.
A penal charge folded into principal inflates every one of them, and inflates the interest computed
thereafter — which is the compounding the circular prohibits, arriving by a side door.

Keep three balances distinct: principal outstanding, interest (accrued or in suspense), and charges
(penal, bounce, costs). The total payable is their sum; none of them is inside another.

## Waiving a penal charge

Waivers are ordinary in collections, and the two things that make them defensible are authority and a
record.

- **Authority should be tiered.** A partial waiver within a board-approved cap is one level; a full
  or above-cap waiver is another. The system should enforce the tier rather than rely on a
  convention.
- **A reason is not optional.** "Customer requested" tells an auditor nothing. The record should show
  who waived what, when, and why.
- **A waived shadow charge posts nothing.** If the charge never reached the general ledger, waiving it
  does not either. A waiver expense entry against a charge that was never booked is a fabricated
  movement.

## Common mistakes

- **Penal amounts inside the principal outstanding.** The most common, and it breaks LTV,
  foreclosure quotes and provisioning at once.
- **Recognising the charge as income when levied.** Accrual treatment under a receipt-basis rule.
- **Recomputing the whole charge each night.** Charges the same days repeatedly.
- **Charging once and then stopping.** The opposite error: once an instalment's charge has been
  collected, a system that will not open a new period lets the account stay overdue indefinitely for
  free.
- **Continuing to levy after NPA.** Inconsistent with receipt-basis recognition.
- **Calling it penal interest in the agreement.** The label matters: it is what a borrower's counsel
  will quote back.
- **Two charges for one default.** A "late fee" and a "penal charge" for the same missed instalment
  is the double-charging the circular prohibits.

## A worked example

A loan against property with a monthly instalment of ₹1,33,273. The scheme's penal charge is 24% per
annum on the overdue instalment, no grace, GST as applicable.

- **Instalment 1 falls due 12 July, unpaid.** On 12 August, the day-end job computes 31 days of
  default: ₹2,716.
- **Instalment 2 falls due 12 August, unpaid.** One day of default on 12 August: ₹88.
- **The account carries ₹2,804 of penal charges** as a shadow balance. The borrower's statement shows
  both levies. The trial balance shows nothing.
- **The borrower pays one instalment on 12 August.** The appropriation order puts charges before
  interest and principal, so ₹2,804 is collected. *Now* it reaches the general ledger, as penal
  income, with the GST split to the output register.
- **Instalment 2 remains unpaid.** By 1 September it is twenty days into default. The system levies
  for the days since the last charged period — not from day one again — and the new charge is the
  difference.

The last point is the one that bites both ways. A system that never opens a second period lets an
instalment stay unpaid for a year having been charged once, for one day.

## How Lenviq handles this

Penal amounts are levied by the nightly job as shadow entries against the instalment they arose on,
never capitalised to principal and never compounded. They reach the general ledger only when
collected, with the GST split by place of supply and written to the output register. A still-unpaid
instalment keeps attracting charges for the days beyond those already levied, never for days already
charged. Levy stops at NPA and outstanding charges are suspended. Waivers are tiered by permission
against the scheme's own cap, require a reason, and post nothing where nothing was booked.

The [compliance page](/compliance/) states the position with its citation.

## Frequently asked questions

### Can penal charges be added to the principal outstanding?

No. Under RBI/2023-24/53 penal amounts are charges, not interest, and are not capitalised. Adding
them to principal also produces compounding indirectly, since interest is then computed on a balance
that includes them.

### Should penal charges appear on the borrower's statement before they are collected?

Yes. The borrower's liability arises on levy, so a statement that omits the charge until collection
is one they cannot reconcile. What should not appear until collection is the entry in the general
ledger — the borrower's statement and the books are answering different questions, and both are
right.

### Can an NBFC charge penal charges on an account that has become NPA?

The consistent treatment is to stop new levy at classification and suspend what is outstanding, since
income on the account is recognised on a receipt basis from that date. What has already been levied
remains owed by the borrower and remains claimable.

### Is GST payable on penal charges?

Where GST applies to the charge, it is collected with it and, being a charge rather than interest,
should be split by place of supply and written to the output register that the GST returns are built
from. A charge whose GST lands in a catch-all ledger with no register entry will not reconcile to the
return.

### What is a reasonable penal charge?

The circular requires the quantum to be reasonable and commensurate with the default, and not
discriminatory against individual borrowers taking loans for non-business purposes. It does not
prescribe a number. What it does require is that the quantum and the circumstances of levy are
disclosed in the loan agreement and the Key Facts Statement — and a charge not disclosed there cannot
be recovered.

---

**Related reading:** [Penal charges are charges](/blog/penal-charges-not-interest/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[What goes into the KFS APR](/blog/kfs-what-goes-in-the-apr/)

[Ask for a walk-through](/contact/) if you want to see the shadow entry and the receipt-basis posting
side by side.
