---
title: "How to build a static pool, and the three choices that change the answer"
description: "A static pool is simple arithmetic and still gives four different answers depending on how you cut it. What to fix before you start — the cohort, the numerator, and the point you measure from — and what the result tells you that a portfolio NPA cannot."
metaDescription: "How to build a static pool analysis for a loan book: choosing the cohort, the numerator and the measurement point, and reading the resulting curve."
date: "2026-10-09"
category: "Operations"
author: "CS Sushil Choudhary"
tool: "npa-date-calculator"
draft: false
---

A static pool is the simplest piece of portfolio analysis there is — take the loans disbursed in one
month, follow that fixed set as it ages — and it is still the one most often built in a way that
cannot be compared with the previous version of itself.

The reason is that "static pool" names the *idea*, not the method. Three choices sit underneath it,
none of them obvious, and each changes the number. A lender who has not written them down is
producing a different analysis each quarter and reading the difference as a trend.

[Why diligence asks for it at all](/blog/due-diligence-what-lenders-ask/) covers the four requests a
bank or investor makes and what each defeats. This page is about building the thing.

## The problem it exists to solve

A book growing at 8% a month can show a **falling** overall NPA percentage while every single cohort
performs worse than the one before. The arithmetic is not subtle: new loans cannot be 90 days
overdue, so a denominator that grows faster than the delinquency can mature will always dilute the
ratio.

Concretely. Say each month's disbursement is 8% larger than the last, and each cohort ends up with
4% of its value in NPA by month 18 — but the newest cohorts are trending to 5%:

| | Book | NPA | NPA % |
|---|---|---|---|
| A lender 24 months in, growing | ₹100 crore | ₹2.1 crore | **2.1%** |
| The same book, 6 months later | ₹146 crore | ₹2.8 crore | **1.9%** |

The portfolio ratio improved. Every cohort got worse. Both statements are true, and only one of them
is about credit.

A static pool makes the dilution impossible, because the set never changes after it is formed.

## Choice one: what defines the cohort

**Disbursement month is the default and it is not the only option.** The alternatives are sanction
month and first-instalment month, and they are not interchangeable.

- **Disbursement month** — the money left on this date. This is the right cut for asking *how did
  the credit we wrote in March perform*, because disbursement is when the risk begins.
- **Sanction month** — useful when you want to test the *credit decision* rather than the book,
  since the gap between sanction and disbursement is itself a selection effect: the files that drop
  out between the two are not random.
- **First-instalment month** — aligns cohorts by where they are in their repayment life, which
  matters if your product has a long moratorium or a broken first period.

Pick one, write it down, and do not change it. A cohort set that silently moved from sanction to
disbursement month will show a one-off shift that reads exactly like a credit event.

**And be explicit about what is excluded.** Loans closed early, loans taken over, loans written off
during the window — each has a defensible treatment and an indefensible silence. The common
convention is that **a cohort is fixed at formation and nothing leaves it**: a loan foreclosed in
month 7 stays in the denominator at its original value, because removing it would let good outcomes
shrink the base and flatter the curve. That is a choice, not a rule, and it needs recording.

## Choice two: the numerator, and whether it is value or count

Four numerators are in common use, and they answer different questions:

| Numerator | Answers |
|---|---|
| **Value in NPA** | how much money is impaired |
| **Count of accounts in NPA** | how many borrowers failed |
| **Value 30+ / 60+ / 90+ dpd** | how early the trouble shows |
| **Cumulative write-off value** | what was actually lost |

**Value and count diverge, and the direction of the divergence is information.** If value-NPA is
4% and count-NPA is 2%, the failures are concentrated in larger tickets. If it is the other way
round, small tickets are failing and the large ones are holding — which points at a different part
of the credit policy.

The common mistake is reporting value-based static pool against count-based benchmarks, or quoting
one number without saying which it is. Both read as precision and neither is.

**Measure the numerator as a share of the cohort's ORIGINAL disbursed value**, not of its current
outstanding. Outstanding amortises; the denominator would shrink every month and the curve would
rise even on a book where nothing went wrong.

## Choice three: the point you measure from

This is the one that quietly breaks comparability.

A static pool curve plots the numerator at **months on book** — month 3, month 6, month 12 — and
"month 12" has to mean the same thing for every cohort. Two things get it wrong:

**Measuring at a calendar date rather than at an age.** If you run the analysis today and read each
cohort's current NPA, the March cohort is 7 months old and the January cohort is 9. Plotting both as
"NPA" compares a 7-month outcome with a 9-month one. The curve this produces slopes in whatever
direction your growth did.

**Measuring at month end versus at the day the classification was computed.** Asset classification
is a day-end event for the relevant date, and an NPA upgrade requires the **entire arrears** to be
cleared ([RBI/2021-2022/125](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
12 November 2021). So a cohort's month-12 NPA figure depends on *which* day-end you read, and a
figure recomputed later from current balances will not reproduce it —
[why that is](/blog/irac-day-end-classification/).

**The consequence is practical: a static pool has to be built from retained day-end positions, not
recalculated from today's book.** A lender who cannot reproduce last quarter's static pool exactly
does not have a static pool; they have a report that happens to run.

## Reading the result

Lay the cohorts out as rows and months-on-book as columns. What you are looking for is not a level
but a **shape**.

| Cohort | M3 | M6 | M9 | M12 |
|---|---|---|---|---|
| Jan | 0.4% | 1.6% | 2.9% | 3.8% |
| Feb | 0.5% | 1.7% | 3.1% | 4.0% |
| Mar | 0.9% | 2.4% | 4.1% | — |
| Apr | 1.1% | 2.8% | — | — |

Three things this says, and none of them is visible in a portfolio ratio:

1. **The curves are steepening from March.** Whatever changed, changed in the March credit.
2. **It shows up by month 3.** Early delinquency moving means underwriting or onboarding, not
   collections — collections problems bite later in the curve.
3. **The gap widens with age.** If March's M3 were high but M12 converged with January's, you would
   be looking at a collections catch-up, not a credit deterioration.

**A rising M3 with a flat M12 is an operational problem. A flat M3 with a rising M12 is a credit
problem.** That distinction is the whole reason to build the thing.

## What it still cannot tell you

A static pool is blind to anything that is not a function of age.

- **A regulatory change mid-window** affects every cohort at once, so it appears as a level shift
  rather than a cohort difference, and it looks like nothing.
- **A single large exposure** moves a value-based curve on its own. Run count alongside value, or a
  one-borrower default reads as a cohort failing.
- **Restructuring** flatters it exactly as much as it flatters everything else, unless restructured
  accounts are tagged and shown separately.
- **Seasonality** is real and is not a credit signal. A monthly cohort grid shows it; a quarterly one
  hides it.

And it says nothing about the *flow* between buckets — whether an account 30 days overdue tends to
cure or to deteriorate. That is a different analysis:
[bucket movement and flow rates](/blog/bucket-movement-and-flow-rates/).

## The minimum you need to build one

Four fields per loan, retained historically:

1. Disbursement date and original disbursed value — fixes the cohort and the denominator.
2. The **day-end** classification and dpd for each month end, retained rather than recomputed.
3. Closure date and reason, so early closures and write-offs can be treated explicitly.
4. A restructuring flag, so the restructured can be shown separately.

The first and fourth are easy. **The second is where most books fail**, because it requires the
position to have been stored at the time rather than derived later — and derivation is what makes
two runs of the same analysis disagree.


## Frequently asked questions

### Should a static pool be built on disbursement month or sanction month?

Disbursement month answers "how did the credit we wrote perform", because disbursement is when the
risk begins. Sanction month tests the credit decision instead, and the difference between the two
populations is itself a selection effect — the files that drop out between sanction and disbursement
are not a random sample. Pick one and never change it; a cohort definition that moves produces a
one-off shift that reads exactly like a credit event.

### Why measure against original disbursed value rather than current outstanding?

Outstanding amortises. If the denominator shrinks every month, the ratio rises even on a book where
nothing went wrong, and the curve measures amortisation rather than credit.

### Can a static pool be rebuilt from today's book?

Not reliably. Classification is computed in the day-end process for the relevant date, so a position
re-derived from current balances will not reproduce the one that existed then — particularly on any
account that has taken a backdated receipt. A static pool has to be built from retained month-end
positions, and the test of whether yours is sound is whether last quarter's reproduces exactly.

### What does a rising month-3 figure with a flat month-12 figure mean?

Early delinquency is moving and the book is still catching up by the end of the curve. That points
at onboarding or collections rather than at credit quality. The reverse — flat at month 3, rising at
month 12 — is the credit signal.

---

**Related:** [What diligence asks for, and what each request defeats](/blog/due-diligence-what-lenders-ask/) ·
[Collection efficiency: four numbers from one book](/blog/collection-efficiency-how-to-compute/) ·
[Bucket movement and flow rates](/blog/bucket-movement-and-flow-rates/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[NPA date calculator](/tools/npa-date-calculator/) ·
[The loan management system the retained positions come from](/loan-management-system/)
