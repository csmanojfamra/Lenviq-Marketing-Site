---
title: "NBFC provisioning, worked line by line: standard, sub-standard, doubtful, loss"
description: "A standard asset is provided at 0.25% or 0.40%, a sub-standard asset at 10% of the whole outstanding, a doubtful asset at 20/30/50% on the secured portion and 100% on the unsecured, and a loss asset in full. Five accounts taken through the arithmetic, and the one table that is copied from the wrong rulebook more often than any other."
metaDescription: "Standard 0.25–0.40%, sub-standard 10%, doubtful 20/30/50% secured and 100% unsecured, loss 100% — with five accounts worked through in full."
date: "2026-08-30"
category: "Accounting"
author: "CA Anil Agarwal"
draft: false
---

An NBFC provides **0.25% or 0.40% on a standard asset**, **10% of the whole outstanding on a
sub-standard asset**, **20%, 30% or 50% on the secured portion of a doubtful asset depending on how
long it has been doubtful, and 100% on the unsecured portion**, and **100% on a loss asset**. Those
are the numbers. Everything below is where they come from, which one applies to which account, and
five accounts taken through the arithmetic in full.

One warning before any of it, because it is the single most common error in this area: **these are
not the bank percentages.** A bank provides 25%, 40% and 100% on the secured portion of a doubtful
asset. An NBFC provides 20%, 30% and 50%. Published summaries mix the two tables regularly, and the
gap is widest exactly where the amounts are largest.

## Where the rules live now

The Reserve Bank consolidated the income recognition, asset classification and provisioning rules
into a single instrument — the **RBI (Non-Banking Financial Companies — Income Recognition, Asset
Classification and Provisioning) Directions, 2025**, in force from **28 November 2025**. Before that,
an NBFC read the same rules out of the Scale Based Regulation Master Direction and a run of
circulars around it.

One thing changed under the reader's feet in the same period and it is worth stating plainly. The
Base Layer used to recognise a non-performing asset at a longer overdue period than the Middle and
Upper Layers did. That glide path **ended on 31 March 2026**. Every NBFC, in every layer, now
classifies an account as non-performing on the same basis: **more than ninety days past due**.

If you are working from a note written before that date, check it. The classification date drives
everything on this page, and a note that still carries the old Base Layer period will produce the
wrong provision on every account it touches.

## The four classifications, and what moves an account between them

Provisioning is downstream of classification. Get the classification wrong and no amount of care
with the percentages helps.

**Standard.** Not overdue beyond ninety days. Nothing about this account is in doubt, and it is still
provided for — see the next section, because a standard asset attracting a provision surprises people.

**Sub-standard.** The account is non-performing: more than ninety days past due. It stays
sub-standard for a fixed period — **twelve months in the Middle and Upper Layers, eighteen months in
the Base Layer** — and then, if the arrears have not been cleared, it moves on.

**Doubtful.** Sub-standard for longer than that period. The provision now splits: the part covered by
realisable security is provided at a rate that rises with how long the account has been doubtful, and
everything not covered by security is provided in full immediately.

**Loss.** Identified as unrecoverable — by the NBFC itself, by its auditor, or on inspection. There
is no waiting period. An account can be written straight to loss without ever sitting in doubtful, if
that is the honest assessment, and holding security does not reduce the provision: a loss asset is
one where recovery is not expected whatever is held.

Note what is *not* in that list. Nothing here turns on the borrower's intentions, on a promise to
pay, or on a restructuring conversation in progress. Classification follows the account.

## Standard assets are not provision-free

The most frequent misunderstanding on a small book. A standard asset carries a **general provision**,
made against the performing portfolio as a whole:

| Layer | Standard-asset provision |
| --- | --- |
| Base Layer | 0.25% |
| Middle Layer | 0.40% |
| Upper Layer — individual housing, small enterprise | 0.25% |
| Upper Layer — commercial real estate, residential housing | 0.75% |
| Upper Layer — commercial real estate, other | 1.00% |
| Upper Layer — everything else | 0.40% |

Two points that follow from it. First, only the Upper Layer splits the rate by what the exposure
actually is; a Base or Middle Layer NBFC applies one rate to its whole standard book. Second, the
general provision is **not** deducted in arriving at net non-performing assets — it sits against the
good book, not the bad one, and netting it off overstates asset quality.

## The five accounts

Each of these can be reproduced in the
[provisioning calculator](/tools/nbfc-provisioning-calculator/) by typing in the same figures.

### 1. A performing personal loan, Base Layer NBFC

Outstanding ₹10,00,000. Not overdue. The NBFC is in the Base Layer.

```
₹10,00,000 × 0.25%  =  ₹2,500
```

**Provision ₹2,500.** Nothing about the security matters, and nothing about the borrower matters. The
rate is the layer's rate.

### 2. The same loan, ninety-one days past due

Outstanding still ₹10,00,000. The account is now non-performing, so it is sub-standard.

```
₹10,00,000 × 10%  =  ₹1,00,000
```

**Provision ₹1,00,000.** Note what does *not* happen here: the secured and unsecured parts are not
separated. Sub-standard is ten per cent of the whole outstanding whatever is held against it. A
lender who holds property worth twice the loan provides exactly the same as one who holds nothing.

That is deliberate, and it catches people out. Security starts to matter at the next stage, not this
one.

### 3. A loan against property that has gone doubtful

Outstanding ₹40,00,000. It went non-performing, sat sub-standard for the full period, and has now
been doubtful for **eight months**. The property is realistically worth ₹28,00,000 today.

```
Secured portion    ₹28,00,000 × 20%   =  ₹5,60,000
Unsecured portion  ₹12,00,000 × 100%  =  ₹12,00,000
                                         ──────────
                                         ₹17,60,000
```

**Provision ₹17,60,000 — 44% of the outstanding.** The unsecured portion is doing almost all the work.
That is the general shape of a doubtful asset: the shortfall against security is provided in full
from the first day in the category, and the rate on the secured part only creeps up from there.

The word *realisable* is carrying weight in "realisable security". It is what the security would
actually fetch, now, not the valuation taken at sanction. On a property that has been sitting through
a default, those are rarely the same number, and an inflated figure here understates the provision
twice over — it shrinks the 100% slice and it shrinks it in favour of the 20% one.

### 4. The same account, three and a half years later

Outstanding ₹40,00,000, security still realistically ₹28,00,000, and it has now been doubtful for
more than three years.

```
Secured portion    ₹28,00,000 × 50%   =  ₹14,00,000
Unsecured portion  ₹12,00,000 × 100%  =  ₹12,00,000
                                         ──────────
                                         ₹26,00,000
```

**Provision ₹26,00,000 — 65% of the outstanding.**

Here is where the bank table does its damage. Read 100% instead of 50% on that first line and the
provision comes out at ₹40,00,000 — the entire outstanding, against an account where ₹28,00,000 of
realisable security is held. Over-providing by ₹14,00,000 on one account is not a conservative
choice; it is a wrong number in a filed return.

The age band, incidentally, is time **in the doubtful category** — not time since the account first
went overdue. An account that spent eighteen months sub-standard before turning doubtful is in the
*up to one year* band for its first year as doubtful, not past it.

### 5. A written-off unsecured loan

Outstanding ₹2,00,000. No security. The borrower is untraceable and the auditor has identified it as
unrecoverable.

```
₹2,00,000 × 100%  =  ₹2,00,000
```

**Provision ₹2,00,000.** No waiting period, no age band, no split. Identification is what triggers it.

## Two things that regularly go wrong

**Provisioning off the wrong balance.** The provision is computed on the total outstanding — principal
plus whatever interest has been recognised and remains uncollected. It is not computed on principal
alone. On an account that ran for a year before defaulting the difference is material.

**Interest that keeps accruing after the account turns.** Once an account is non-performing, income on
it moves to a receipt basis, and interest already accrued but not collected is reversed. A book that
keeps accruing into the profit and loss account on a non-performing loan and *then* provides against
the resulting balance is reporting a number that means nothing. The reversal comes first.

## What a system should be doing with this

None of the arithmetic above is hard. The part that is hard is that it has to be right on every
account, on the same day, every month — and that the inputs it runs on are moving. Days past due move
daily. Classification follows from them. The doubtful age band follows from the classification date.
The realisable security value has to come from somewhere and be current.

Lenviq computes days past due at day-end for every account on the book, moves the classification when
the period is reached, reverses income on the accounts that turned, and carries the provision that
falls out of it — with the layer and the security position it used recorded against each account, so
an auditor asking "why this number" gets an answer rather than a spreadsheet.

The [calculator](/tools/nbfc-provisioning-calculator/) answers one account. The point of the platform
is that nobody has to.

---

*The rates and periods here are from the RBI (Non-Banking Financial Companies — Income Recognition,
Asset Classification and Provisioning) Directions, 2025. Your board-approved policy may be stricter,
and it is entitled to be; it may not be looser. Nothing here is advice on a particular account.*
