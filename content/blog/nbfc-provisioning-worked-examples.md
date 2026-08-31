---
title: "NBFC asset classification and provisioning: when a loan turns, and how much you set aside"
description: "A loan is standard until it is ninety days overdue. On day 91 it becomes an NPA and is sub-standard. It stays there twelve months in the Middle and Upper Layers, eighteen in the Base Layer, and then turns doubtful. This works through each stage — what triggers it, what the layer changes, when security matters and when it does not — and then follows one ₹40 lakh loan through all of them."
metaDescription: "When a loan turns standard, sub-standard, doubtful or loss — and how much has to be provided at each stage, with one loan followed through all of them."
date: "2026-08-30"
updated: "2026-08-31"
category: "Accounting"
author: "CA Anil Agarwal"
tool: "nbfc-provisioning-calculator"
draft: false
---

A loan sits in one of four boxes, and the box decides how much money you set aside against it. The
short version, in order:

| Stage | When it starts | Provision |
| --- | --- | --- |
| **Standard** | From disbursement until the loan is 90 days overdue | 0.25% or 0.40% |
| **Sub-standard** | Day 91 — this is the day it becomes an NPA | 10% of the whole outstanding |
| **Doubtful** | After 12 months as sub-standard (18 in the Base Layer) | 20–50% of the secured part, 100% of the rest |
| **Loss** | Whenever it is identified as unrecoverable | 100% |

The rest of this explains each line: what actually moves a loan from one box to the next, what your
layer changes, when the security you hold matters and when it makes no difference at all, and then
one real loan followed from disbursement to write-off.

One thing to get out of the way first, because it is the most common error in this subject.
**These are not the bank percentages.** A bank provides 25%, 40% and 100% on the secured part of a
doubtful loan. An NBFC provides 20%, 30% and 50%. Published summaries mix the two tables regularly,
and the gap is widest where the amounts are largest.

## What is asset classification?

Asset classification is the label your NBFC puts on each loan to say how likely it is to be repaid.
There are four labels, and every loan on the book carries exactly one.

Only the first — **standard** — is a performing loan. The other three are collectively the
**non-performing assets**, the NPAs. So when a report says gross NPA, it means everything in the
bottom three boxes added together.

Classification comes first and provisioning follows from it. If a loan is in the wrong box, no
amount of care with the percentages will produce the right provision.

**Nothing about the label depends on judgement.** Not on the borrower's promise to pay, not on a
restructuring conversation in progress, not on how good the security looks. With the single
exception of a loss asset, the label follows the number of days the money has been overdue.

## When does a loan move from one stage to the next?

This is the part that is hardest to hold in the head, so here it is on a calendar. Take a borrower
with a Base Layer NBFC who makes their last payment and then stops, with the next instalment falling
due on 1 April 2026.

| Date | Days overdue | Classification |
| --- | --- | --- |
| 1 April 2026 | 1 | **Standard** — an instalment is missed, but the loan is still performing |
| 30 June 2026 | 90 | **Standard** — the last day it is |
| **1 July 2026** | **91** | **Sub-standard.** The loan is now an NPA |
| 1 January 2028 | — | **Doubtful.** 18 months as sub-standard have passed |
| 1 January 2029 | — | Still doubtful, now in the **1-to-3-year** band |
| 1 January 2031 | — | Still doubtful, now in the **over-3-year** band |

Three things worth pulling out of that table.

**Day 91, not day 90.** The rule is *more than* ninety days past due, so an account ninety days
overdue is still standard. Classification then starts in the day-end process for the day it crosses.

**The clock never pauses for a conversation.** A part payment that does not clear the arrears does
not stop it either. Only clearing the overdue amount does — at which point the loan goes back to
standard.

**The doubtful bands count from entry into doubtful**, not from the day the borrower first stopped
paying. In the table above the loan had already been overdue for a year and a half before its first
day as doubtful. It is still in the *up-to-one-year* band for the whole of 2028.

You will also meet these bands written as **DA1, DA2 and DA3** — doubtful year one, one to three,
and beyond three. Same thing, shorter.

**Loss is the exception to all of it.** A loan is a loss asset when the NBFC, its auditor or an
inspection identifies it as unrecoverable. There is no waiting period, and a loan can go straight
there from sub-standard without ever sitting in doubtful.

## What does your layer change?

Two things, and it is worth knowing which two, because most of the rules are the same in every
layer.

**How long a loan stays sub-standard before it turns doubtful.**

| Layer | Sub-standard for |
| --- | --- |
| Base Layer | 18 months |
| Middle and Upper Layers | 12 months |

The same defaulted loan therefore reaches the doubtful stage six months earlier at a Middle Layer
NBFC — and, because doubtful is where the provision jumps, six months earlier is real money.

**The rate on the standard book.**

| Layer | Standard-asset provision |
| --- | --- |
| Base Layer | 0.25% |
| Middle Layer | 0.40% |
| Upper Layer — individual housing, small enterprise | 0.25% |
| Upper Layer — commercial real estate, residential housing | 0.75% |
| Upper Layer — commercial real estate, other | 1.00% |
| Upper Layer — everything else | 0.40% |

Only the Upper Layer splits that rate by what the exposure actually is. A Base or Middle Layer NBFC
applies one rate across its whole standard book.

**What the layer does not change** is everything else on this page: the ninety-day trigger, the
sub-standard rate, the doubtful percentages and the treatment of security are identical in every
layer. Not sure which layer you are in? The
[layer finder](/tools/nbfc-layer-finder/) works it out.

One recent change is worth a line. The Base Layer used to recognise an NPA at a longer overdue
period than the other layers. That glide path **ended on 31 March 2026**, so every NBFC now uses the
same ninety days. If you are working from a note written before that date, check it — it will produce
the wrong classification date on every account it touches.

## When does the security matter?

This surprises people, so it gets its own answer: **security only changes the provision at the
doubtful stage.** Nowhere else.

| Stage | Does holding security reduce the provision? |
| --- | --- |
| Standard | **No.** The rate applies to the outstanding, secured or not |
| Sub-standard | **No.** 10% of the whole outstanding either way |
| Doubtful | **Yes — this is the whole calculation.** The secured part is provided at 20–50%, everything else at 100% |
| Loss | **No.** 100%, whatever is held |

So a lender holding property worth twice the loan provides exactly the same as one holding nothing,
for as long as the loan is sub-standard. That is deliberate. Security starts to count once the loan
is doubtful, and from then on it is the single biggest factor in the number.

**“Secured” here means realisable, today.** Not the valuation taken at sanction. On a property that
has been sitting through a default those are rarely the same figure, and an optimistic number
understates the provision twice over — it shrinks the slice provided at 100% and grows the slice
provided at 20%.

## How much is provided at each stage?

Everything above, as numbers.

| Stage | Provision |
| --- | --- |
| Standard | 0.25% or 0.40% of the outstanding, by layer |
| Sub-standard | **10%** of the total outstanding |
| Doubtful — secured part, first year | **20%** |
| Doubtful — secured part, 1 to 3 years | **30%** |
| Doubtful — secured part, over 3 years | **50%** |
| Doubtful — unsecured part | **100%**, from the first day |
| Loss | **100%** |

A standard-asset provision is a *general* provision: it is made against the performing book as a
whole, and it is **not** deducted in arriving at net NPA. Netting it off overstates asset quality.

## One loan, followed all the way through

Every figure below can be reproduced in the
[provisioning calculator](/tools/nbfc-provisioning-calculator/) by typing in the same numbers.

**The loan.** A Base Layer NBFC lends ₹40,00,000 against a property. The borrower stops paying. The
property would realistically fetch **₹28,00,000** today, which leaves **₹12,00,000** not covered by
security.

### While it is performing

```
₹40,00,000 × 0.25%  =  ₹10,000
```

**₹10,000.** Nothing about the property matters here, and nothing about the borrower matters. The
rate is the layer's rate, applied to the outstanding.

### Day 91 — sub-standard

```
₹40,00,000 × 10%  =  ₹4,00,000
```

**₹4,00,000.** The provision has gone up forty times, and the property has still made no difference
to it. Ten per cent of the whole outstanding is the rule, whatever is held.

### Eighteen months later — doubtful, first year

```
Secured    ₹28,00,000 × 20%   =   ₹5,60,000
Unsecured  ₹12,00,000 × 100%  =  ₹12,00,000
                                 ──────────
                                 ₹17,60,000
```

**₹17,60,000 — 44% of the outstanding.** This is the stage where the number changes character. Look
at which line is doing the work: the ₹12,00,000 shortfall against security is provided *in full*,
immediately, and it is more than twice the provision on the secured part.

### A year on — the 1-to-3-year band

```
Secured    ₹28,00,000 × 30%   =   ₹8,40,000
Unsecured  ₹12,00,000 × 100%  =  ₹12,00,000
                                 ──────────
                                 ₹20,40,000
```

**₹20,40,000 — 51%.** Only the secured rate moved. The unsecured line was already at 100% and has
nowhere further to go.

### Past three years

```
Secured    ₹28,00,000 × 50%   =  ₹14,00,000
Unsecured  ₹12,00,000 × 100%  =  ₹12,00,000
                                 ──────────
                                 ₹26,00,000
```

**₹26,00,000 — 65%.**

This is where reading the bank table costs money. Take 100% instead of 50% on that first line and
the provision comes out at ₹40,00,000 — the entire outstanding, on a loan where ₹28,00,000 of
realisable property is held. Over-providing by ₹14,00,000 on one account is not conservatism; it is
a wrong number in a filed return.

### If it is written off

```
₹40,00,000 × 100%  =  ₹40,00,000
```

**₹40,00,000.** No band, no split, no credit for the property. A loss asset is one where recovery is
not expected whatever is held.

## The same journey with no security at all

Change one thing — an unsecured personal loan of ₹2,00,000 instead — and the shape of the whole
thing changes.

| Stage | Provision | % |
| --- | --- | --- |
| Standard | ₹500 | 0.25% |
| Sub-standard | ₹20,000 | 10% |
| Doubtful — **any band** | ₹2,00,000 | **100%** |
| Loss | ₹2,00,000 | 100% |

On an unsecured loan the doubtful bands never bite. There is no secured part for the 20/30/50 rates
to apply to, so the day the loan turns doubtful it is provided in full — and stays there.

That is the practical difference between a secured and an unsecured book, and it is worth seeing as
a jump rather than a percentage: the secured loan above went from 10% to 44% at the doubtful stage.
The unsecured one goes from 10% to 100% on the same day.

## Two things that regularly go wrong

**Provisioning on the wrong balance.** The provision is computed on the *total outstanding* —
principal plus any interest that has been recognised and is still uncollected. Not on principal
alone. On a loan that ran for a year before defaulting, the difference is material.

**Interest that keeps accruing after the loan turns.** Once a loan is non-performing, income on it
moves to a receipt basis, and interest already booked but not collected is reversed. A book that
keeps accruing into the profit and loss account on a defaulted loan and *then* provides against the
resulting balance is reporting a number that means nothing. The reversal comes first.

## Frequently asked questions

### When exactly does a loan become an NPA?

On the day it becomes more than ninety days past due — day 91. At ninety days it is still standard.
Since 31 March 2026 this is the same for every NBFC, in every layer.

### Is a standard loan really provisioned?

Yes. 0.25% in the Base Layer, 0.40% in the Middle Layer, and by exposure type in the Upper Layer. It
is a general provision made against the performing book as a whole, and it is not deducted in
arriving at net NPA.

### Does holding property reduce the provision on a sub-standard loan?

No. Sub-standard is 10% of the whole outstanding whether the loan is fully secured or entirely
unsecured. Security only changes the number once the loan is doubtful.

### What happens if the borrower clears the arrears?

The loan goes back to standard, and the provision drops to the standard rate. Classification follows
the arrears, so clearing them reverses it. A part payment that leaves any amount still overdue does
not.

### How long does a loan stay sub-standard?

Twelve months in the Middle and Upper Layers, eighteen months in the Base Layer. After that, if the
arrears still stand, it becomes doubtful.

### What are DA1, DA2 and DA3?

The three doubtful bands: up to one year in the doubtful category, one to three years, and beyond
three. They set the rate on the secured part — 20%, 30% and 50%. The unsecured part is 100% in all
three.

### Are these the same as the bank provisioning rates?

No, and this is the most common error in the subject. On the secured part of a doubtful loan a bank
provides 25%, 40% and 100%. An NBFC provides 20%, 30% and 50%. The unsecured part and loss assets are
100% under both.

---

*Rates and periods here are from the RBI (Non-Banking Financial Companies — Income Recognition, Asset
Classification and Provisioning) Directions, 2025. Your board-approved policy may be stricter, and is
entitled to be; it may not be looser. Nothing here is advice on a particular account.*
