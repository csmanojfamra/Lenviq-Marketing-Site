---
title: "Flat rate and reducing balance: why 10% flat is really about 18%"
description: "A flat rate is charged on the original principal for the whole tenure, however much has been repaid. The reducing-balance equivalent is close to 1.8 times it — and that ratio barely moves with the amount or the tenure."
metaDescription: "Flat rate vs reducing balance: why 10% flat works out near 18% reducing, how to convert, and which rate a Key Facts Statement has to carry."
date: "2026-10-09"
category: "Accounting"
author: "CA Himanshu Sharma"
tool: "emi-calculator"
draft: false
---

Two lenders quote the same borrower. One says **10%**, the other says **18%**, and the instalment
is the same to within a few rupees. Neither is lying.

The first is quoting a **flat** rate and the second a **reducing-balance** rate, and the gap between
them is not a margin or a negotiation — it is the same money described two ways. A borrower who
compares the two numbers rather than the two instalments reaches the wrong answer every time, and so
does a lender who prices against a competitor's quoted rate without asking which basis it is on.

## What each one actually charges

**Reducing balance** charges interest on what is still owed. Month one's interest is computed on the
full principal; by month thirty-six it is computed on whatever is left, which is very little. This
is how an ordinary EMI loan works and it is what the word "interest" means in almost every
regulatory text.

**Flat** charges interest on the **original principal for the whole tenure**, regardless of how much
has been repaid. A borrower who has repaid 95% of the loan is still paying interest on 100% of it in
the final month.

That single difference is the whole of it.

## The arithmetic, on a real loan

₹1,00,000 for three years at **10% flat**:

- Interest = ₹1,00,000 × 10% × 3 = **₹30,000**
- Total repayable = ₹1,30,000
- EMI = ₹1,30,000 ÷ 36 = **₹3,611.11**

Now ask the other question: *what reducing-balance rate produces that same instalment?*

| Reducing rate | EMI on ₹1,00,000 over 36 months |
|---|---|
| 10.00% | ₹3,226.72 |
| 17.00% | ₹3,565.27 |
| 17.50% | ₹3,590.21 |
| **17.92%** | **₹3,611.11** |

**10% flat is 17.92% reducing.** Not approximately, not arguably — the same cash flows.

## The ratio is remarkably stable, which makes it a usable rule

The multiple barely moves across amounts and tenures:

| Loan | Flat | Tenure | EMI | Reducing equivalent | Multiple |
|---|---|---|---|---|---|
| ₹1,00,000 | 10% | 3 years | ₹3,611.11 | **17.92%** | ×1.79 |
| ₹1,00,000 | 12% | 2 years | ₹5,166.67 | **21.57%** | ×1.80 |
| ₹5,00,000 | 8% | 5 years | ₹11,666.67 | **14.13%** | ×1.77 |
| ₹2,00,000 | 14% | 1 year | ₹19,000.00 | **24.91%** | ×1.78 |

**Multiply a flat rate by about 1.8 and you have the reducing-balance rate**, near enough for a
conversation. It drifts a little with tenure — longer tenures sit slightly lower because more of the
principal is outstanding for longer — but between one and five years it stays close to 1.8.

The ratio is not a coincidence. Over the life of an amortising loan the average outstanding balance
is a little over half the original principal, so charging on the full principal throughout costs
roughly twice what charging on the balance would. The 1.8 is that "roughly twice", pulled down a
little by the time value of the instalments.

## Where this stops being arithmetic and becomes disclosure

Flat-rate quoting is not prohibited and it is not dishonest in itself. What matters is **which rate
the borrower is told, in the document that is meant to tell them.**

The Key Facts Statement exists precisely because a headline rate is not a comparable number. It
requires an **annual percentage rate** computed on a prescribed basis, which folds in the fees as
well as the interest — see [what the KFS must contain](/blog/kfs-key-facts-statement-nbfc-requirement/)
and [what goes into the APR](/blog/kfs-what-goes-in-the-apr/).

Two consequences follow for a lender writing flat-rate business:

**The APR on the KFS will not be the flat rate, and it should not be.** A loan quoted at 10% flat
with a processing fee will disclose an APR north of 18%. That is the correct disclosure, and a KFS
showing 10% against a flat-rate loan is wrong.

**The sanction letter, the agreement and the KFS must agree.** If one carries the flat rate as
though it were the interest rate and another carries the effective rate, the file contradicts
itself. Which rate belongs on which document is its own question —
[the four rates on one loan](/blog/which-rate-goes-on-which-document/).

## Three places it goes wrong inside a system

**1. Storing the quoted rate without storing the basis.** A rate field containing `10` with nothing
saying whether that is flat or reducing is a figure that will eventually be read the wrong way — by
a report, by a return, or by whoever opens the record in two years.

**2. Computing a schedule on one basis and disclosing on the other.** The schedule is built from the
flat calculation, the KFS is generated from a rate field, and the two describe different loans.

**3. Treating flat-rate interest as if it amortised.** On a flat loan the interest in every
instalment is identical by construction — total interest divided by the number of instalments —
because it was never computed on a balance. A system that splits a flat-rate EMI using a
reducing-balance formula produces a schedule whose components are wrong even though its totals are
right, and every downstream figure built on that split inherits it.

## The honest way to quote

If you quote flat, say *flat*. If a borrower asks what it works out to, the answer is the
reducing-balance equivalent and you should be able to produce it without hesitating — it is on the
Key Facts Statement anyway.

The conversation a lender does not want is the one where the borrower works out the multiple
themselves, three months in.

---

## Frequently asked questions

### Is a flat rate the same as a reducing-balance rate?

No. A flat rate charges interest on the original principal for the full tenure however much has been
repaid; a reducing-balance rate charges it on what is still owed. The same loan quoted both ways
gives very different-looking numbers for identical cash flows.

### How do I convert a flat rate to a reducing-balance rate?

Multiply by roughly **1.8** for a usable estimate. Exactly: compute the EMI from the flat
calculation — principal plus flat interest, divided by the number of instalments — then solve for
the reducing-balance rate that produces that same instalment. 10% flat over three years is 17.92%
reducing.

### Why is the multiple about 1.8 and not 2?

Over an amortising loan's life the average outstanding is a little over half the original principal,
so charging on the full principal throughout costs close to twice as much. The time value of the
instalments pulls that down slightly, landing it near 1.8 for ordinary tenures.

### Can an NBFC quote a flat rate?

Quoting flat is not prohibited. What is required is that the Key Facts Statement disclose an annual
percentage rate on the prescribed basis, which will be far above the flat figure — and that the
sanction letter, the agreement and the KFS do not contradict each other.

### Does the interest component change each month on a flat-rate loan?

No. It is identical in every instalment by construction, because it was never computed on a balance.
Splitting a flat-rate EMI with a reducing-balance formula produces a schedule whose components are
wrong even where its totals are right.

---

**Related:** [What the Key Facts Statement must contain](/blog/kfs-key-facts-statement-nbfc-requirement/) ·
[What goes into the APR](/blog/kfs-what-goes-in-the-apr/) ·
[Which rate goes on which document](/blog/which-rate-goes-on-which-document/) ·
[Why a loan keeps the terms it was sanctioned under](/blog/frozen-terms-at-sanction/) ·
[EMI calculator](/tools/emi-calculator/)
