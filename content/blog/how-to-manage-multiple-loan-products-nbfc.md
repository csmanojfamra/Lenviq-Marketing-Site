---
title: "How to manage multiple loan products in one NBFC system"
description: "Running gold, property, vehicle and unsecured lending on one platform without four code paths — what varies by product, what must never vary, and how to tell configuration from a hard-coded product name."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Run every product on **one engine with different parameters**, never on a code path per product. A
gold loan, a loan against property, a vehicle loan and an unsecured business loan differ in how
interest accrues, what falls due and when, and what security has to be tracked — but they must not
differ in how days-past-due is counted, how a receipt is appropriated, or how an asset is classified.
The moment those diverge, they diverge silently, and what diverges is NPA classification.

## What actually varies between products?

Less than most systems assume, and it is worth being precise about which axis each difference sits
on.

| Axis | Gold | LAP | Vehicle | Unsecured |
|---|---|---|---|---|
| Interest method | Daily, on balance | Reducing monthly | Reducing monthly | Reducing or flat |
| What falls due | Servicing dates + maturity | Instalments | Instalments | Instalments |
| Security | Physical custody, revalued daily | Mortgage, revalued periodically | Hypothecation, endorsement | None |
| Valuation moves | Yes, daily | Rarely | Depreciates | n/a |
| Documents | Pledge acknowledgment | Mortgage instruments | RC endorsement, insurance | Agreement only |
| Closure | Ornaments returned in 7 working days | Charge satisfied, deeds released | Endorsement removed, NOC | NOC |

Every row is a **parameter or a module**. None of them is a reason for a second classification
engine, a second appropriation order or a second accrual path.

## What must never vary?

- **How overdue is counted.** From the date the sanction made an amount payable.
- **How days-past-due maps to a stage.** Ninety days is ninety days.
- **Upgrade.** Arrears cleared in full, whatever the product.
- **Appropriation.** The order comes from the loan's own snapshotted terms; the mechanism is one.
- **Income recognition.** Accrual to NPA, receipt basis after.
- **Charge treatment.** Penal is a charge, not interest, in every product.
- **The audit trail.** Same record, same fields, same immutability.

A useful way to hold it: **products differ in the due events they generate, never in what a due event
means.**

## How do you tell configuration from a hard-coded product?

Three tests, in increasing order of severity.

**1. Search the code for product names.** If "gold", "LAP" or "two-wheeler" appears in a conditional
in the servicing engine, behaviour is bound to a name. Names change; a lender renames "Gold Loan" to
"Swarna Suraksha" for marketing, and something breaks.

**2. Add a product without a release.** Can a new scheme with a different interest method and charge
set go live as configuration? If it needs a developer, every product is a project.

**3. Follow one number through two products.** Take days-past-due. Is it computed by the same function
for a gold loan and a term loan? If there are two functions, there are two answers, and the second one
is maintained by whoever last worked on that product.

The durable pattern is to bind behaviour to an **asset-class or facility behaviour code** — GOLD,
PROPERTY, VEHICLE, NONE; TERM, OD, CC, DEMAND — and to make the product name a label with no logic
attached to it.

## What does that mean for the scheme master?

That a scheme carries only the fields its shape can use, and refuses the ones it cannot.

An overdraft with a monthly EMI type is a contradiction. A gold loan with a foreclosure lock-in
counted in instalments it will never generate is a term that can never be satisfied. An unsecured
loan with a maximum loan-to-value has no denominator. None of these fails at save; they fail later,
quietly, when something reads a term the product can never produce — or when a person reads the form
and believes it.

The fix is a single table of what applies to what shape, read by both the form that offers the fields
and the repository that stores them. Encoding those rules twice is how the screen and the engine come
to disagree.

## Common mistakes

- **A module per product.** Four modules, four classification behaviours, four sets of bugs.
- **Product names in servicing logic.** Renaming a product breaks the engine.
- **A scheme form that offers every field for every product.** Saves contradictions.
- **A product with no due events.** It can never be overdue — the gold loan case.
- **Separate accrual code per product.** They will round differently, and the difference compounds.
- **One product's edge case fixed in that product's path.** The others still have it.
- **A new product requiring a release.** The strongest signal that behaviour is code, not data.

## A worked example

An NBFC adds gold lending to an existing LAP and unsecured book.

**The wrong shape:** a gold module. It has its own accrual (daily, slab-priced), its own idea of what
is due (nothing — gold has "no schedule"), and its own screens. Six months later an audit asks why no
gold loan has ever been classified NPA. The answer is that the classification engine reads due
events, the gold module generates none, and so every gold loan reads as current forever, however far
past maturity.

**The right shape:** gold is a security behaviour code and a facility behaviour code. Its scheme
carries a slab schedule, a maximum tenure in days and a servicing frequency. Activation generates due
events — servicing dates where the scheme has them, and a maturity in every case, because every loan
falls wholly due at maturity whatever else the scheme demands. The same classification engine reads
those events. The gold-specific work is real — valuation, custody, part-release, auction — and it sits
in modules of its own. What does not sit there is anything that decides whether a loan is overdue.

## How Lenviq handles this

Behaviour binds to an asset-class or facility behaviour code, never to a product name — the rule is
explicit in the codebase, and a test fails if a product name appears where behaviour is decided.
Products are data: a new scheme is configuration.

One classification engine serves every product and takes no per-product branch; products differ only
in the due events they generate. One appropriation engine applies whatever order the loan's own
snapshotted terms specify. One accrual path per interest method, shared across products that use it.

The scheme form and the scheme repository read the same applicability table, so a field that does not
apply to a shape is neither offered nor stored — an overdraft cannot be saved with a monthly EMI
type, and a gold scheme cannot carry a foreclosure lock-in it could never serve.

## Frequently asked questions

### Can one system handle gold loans and term loans properly?

Yes, if behaviour is bound to an asset class rather than to a product name. They differ in accrual
method, in what falls due and in the security work around them — but not in how overdue is counted or
how classification follows from it, and building those twice is what creates the divergence.

### How do you add a new loan product?

As configuration: a scheme with an interest method, a collection frequency, a charge set and the
security behaviour it lends against. If adding one requires a code change, behaviour is hard-coded
and every future product is a project.

### Should each product have its own NPA logic?

No. The ninety-day basis is general, and per-product classification paths diverge silently — which is
the worst way for a classification to be wrong, because nothing looks broken until an inspection asks
why one product's numbers behave differently.

### What if a product genuinely needs different behaviour?

Then it needs a different **parameter**, and the question is which axis it sits on. Daily versus
monthly accrual is an interest method. Servicing dates versus instalments is a due-event pattern.
Physical custody is a security module. Almost every real requirement lands on one of those; the ones
that do not are worth examining closely, because they are usually a product name in disguise.

### How do you stop a scheme being saved with contradictory settings?

One table of what applies to what shape, read by both the form and the repository. The form hides
what does not apply; the repository refuses to store it. Writing those rules in two places is how the
screen and the engine come to disagree.

---

**Related reading:** [NBFC software: the complete guide](/blog/nbfc-software-complete-guide/) ·
[Gold loan management software](/blog/gold-loan-management-software-nbfc/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/)

[Ask for a demonstration](/contact/) against your own product mix — including the one you are
thinking of adding.
