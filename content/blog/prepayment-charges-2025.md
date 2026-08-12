---
title: "Prepayment charges after the 2025 Directions: read the limbs separately"
description: "Paragraph 5(i) binds every lender. Paragraph 5(ii) names entity classes and omits the Base Layer. And 'MSE' is not the same as 'not an individual'."
date: "2026-08-11"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

No prepayment charge may be levied on a loan to an **individual for a non-business purpose** —
whatever the rate type, part or full, lock-in or none. For **business** loans to individuals and
micro and small enterprises the bar is tiered by lender class, and a Base Layer NBFC is named in
neither tier. Those are two separate limbs with different scopes, and reading them as one rule about
floating-rate loans is the standard mistake.

The [Reserve Bank of India (Pre-payment Charges on Loans) Directions,
2025](https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12878&Mode=0) (RBI/2025-26/64, 2 July
2025) are short, and are read wrongly in a predictable way: as a single rule about floating-rate
loans. They are two limbs with different scopes, and the difference decides real money.

## Paragraph 5(i) — the one that binds everyone

No prepayment charge on a loan to an **individual for a purpose other than business**, part or full,
with or without a lock-in, **whatever the rate type**. That is most retail lending, and no layer of
NBFC gets relief from it.

The common error is to attach this to floating-rate loans. It does not turn on the rate.

## Paragraph 5(ii) — tiered, and by name

For **business** loans to individuals and micro and small enterprises, the bar is stated by
enumerating entity classes:

- **5(ii)(a)** — commercial banks (excluding SFBs, RRBs and LABs), Tier 4 urban co-operative banks,
  **NBFC-UL** and All India Financial Institutions: no prepayment charges at all.
- **5(ii)(b)** — SFBs, RRBs, Tier 3 UCBs, State and Central Co-operative banks and **NBFC-ML**: no
  prepayment charges on sanctioned amounts up to ₹50 lakh.

The Base Layer is not named in either limb. Paragraph 6 catches everything paragraph 5 does not:
charges as per the approved policy of the regulated entity.

That is a proportionality design, not an oversight — the same enumeration also omits Tier 1 and
Tier 2 UCBs. A Base Layer NBFC applying the Middle Layer rule to itself is not being cautious; it is
enforcing on itself a restriction the regulator declined to impose.

## The word "MSE" is doing work

Paragraph 5(ii) reaches individuals **and MSEs**. A medium enterprise is not an MSE. Its business
loan falls to paragraph 6 at any layer — including the Upper Layer, which is otherwise barred with
no threshold.

Systems commonly encode "not an individual" as "MSE", which is wrong in both directions. Where the
Udyam classification has actually been captured, use it. Where it has not, treating the borrower as
an MSE is the defensible default — that is the one place the asymmetry argument genuinely holds.

## Two conditions that are easy to get right and easy to miss

Paragraph 6 also says how a permitted charge must be computed: on a term loan, **based on the amount
being prepaid**; on a cash credit or overdraft, on an amount **not exceeding the sanctioned limit**.
A foreclosure charge computed on the payoff total — principal plus accrued interest plus charges —
is a percentage of a figure that already includes charges.

## Who is barred from charging what

| Lender class | Individual, non-business | Business, individual or MSE |
|---|---|---|
| Commercial banks (ex SFB/RRB/LAB), Tier 4 UCB, **NBFC-UL**, AIFI | No charge | No charge, no threshold |
| SFB, RRB, Tier 3 UCB, State/Central co-op, **NBFC-ML** | No charge | No charge up to ₹50 lakh sanctioned |
| **NBFC-BL**, Tier 1 and 2 UCB | No charge | Per the lender's approved policy (para 6) |
| Any lender, **medium** enterprise borrower | No charge if individual | Per approved policy — an ME is not an MSE |

Read the rows carefully: the first column is the same for everybody, and it is the one that covers
most retail lending.

## A worked example

A Base Layer NBFC has two borrowers wanting to foreclose.

**Borrower one** is an individual with a ₹5,00,000 personal loan for a wedding. Paragraph 5(i)
applies regardless of rate type. **No charge.** The system must not levy one even though the scheme
is configured with a 4% foreclosure charge, and the quote must say why it is nil — ₹0 with no
explanation is indistinguishable from a calculation that failed.

**Borrower two** is a proprietor with a ₹15,00,000 business loan, Udyam-registered as a small
enterprise. Paragraph 5(ii) enumerates lender classes and the Base Layer is not among them, so
paragraph 6 applies: the charge is per the lender's approved policy. It is computed **on the amount
being prepaid**, not on the payoff total — a 4% charge on ₹15,00,000 of principal, not on
₹15,42,000 including interest and charges.

Now change one fact: borrower two is a **medium** enterprise. Paragraph 5(ii) reaches individuals and
MSEs; a medium enterprise is neither. The same answer at Base Layer, but at Upper Layer — otherwise
barred with no threshold — the charge would still be permitted, which is counter-intuitive enough
that systems encode it wrongly.

## Common mistakes

- **Attaching paragraph 5(i) to floating-rate loans.** It does not turn on the rate.
- **Applying the Middle Layer threshold at Base Layer.** Enforcing a restriction the regulator
  declined to impose.
- **Encoding "not an individual" as "MSE".** Wrong in both directions.
- **Charging on the payoff total.** Paragraph 6 says on the amount being prepaid.
- **A nil charge with no reason on the quote.** Looks like a bug, and invites the borrower to ask
  twice.
- **Applying a lock-in that the loan can never satisfy.** A lock-in counted in instalments paid, on a
  product that generates no instalments, is a term that can never be met.
- **Not recording which limb applied.** The reason a charge was or was not levied is part of the
  file.

## Frequently asked questions

### Can an NBFC charge foreclosure charges on a personal loan?

Not where the borrower is an individual and the purpose is not business. Paragraph 5(i) of the 2025
Directions bars it outright — part or full prepayment, with or without a lock-in, and whatever the
rate type.

### Does the bar apply only to floating-rate loans?

No. That is the commonest misreading. Paragraph 5(i) is expressed without reference to the rate type,
which is what makes it much wider than the earlier position that applied to floating-rate loans to
individuals.

### Can a Base Layer NBFC levy prepayment charges on a business loan?

Paragraph 5(ii) enumerates the lender classes that are barred, and the Base Layer is not among them,
so paragraph 6 applies: charges per the lender's board-approved policy, disclosed in the sanction
letter and the Key Facts Statement. Applying the Middle Layer's ₹50 lakh threshold to yourself is a
choice, not a requirement.

### How must a permitted prepayment charge be computed?

On a term loan, on the amount being prepaid. On a cash credit or overdraft, on an amount not
exceeding the sanctioned limit. Computing it on the payoff total — principal plus accrued interest
plus outstanding charges — makes it a percentage of a figure that already contains charges.

### Is a medium enterprise covered by the bar?

No. Paragraph 5(ii) reaches individuals and micro and small enterprises. A medium enterprise falls to
paragraph 6 at every layer, including the Upper Layer, which is otherwise barred without a threshold.

---

**Related reading:** [Scale-based regulation layers](/blog/scale-based-regulation-layers/) ·
[The Key Facts Statement requirement](/blog/kfs-key-facts-statement-nbfc-requirement/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/)

[Ask for a walk-through](/contact/) — foreclose an individual's non-business loan and read the quote.
