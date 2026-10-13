---
title: "Seven kinds of lending on one system: where the behaviour differs, and where it must not"
description: "A gold loan, an overdraft and a microfinance group loan behave nothing alike — different security, different servicing, different due dates. What a lender running several of them needs is for exactly those things to differ and for classification, provisioning and bureau reporting not to."
metaDescription: "A gold loan, an overdraft and a group loan behave nothing alike. What must differ between loan types, and what must never differ."
question: "How does one system run several different kinds of loan without them drifting apart?"
kind: situation
updated: "2026-10-13"
related: "how-to-manage-multiple-loan-products-nbfc, frozen-terms-at-sanction, irac-day-end-classification, gold-loan-directions-2025, /platform/|The platform, flat-rate-vs-reducing-balance, which-rate-goes-on-which-document, nbfc-software-complete-guide"
priority: 0.8
draft: true
---

A lender writing gold loans, vehicle loans and a cash credit line is running three businesses that
share a borrower list. The security is different, the servicing rhythm is different, the documents
are different, and the due dates arise for different reasons — a gold loan may have no instalment
at all and still fall wholly due at maturity.

So a system has to let those differ. The harder requirement, and the one that decides whether a
multi-product book is auditable, is the list of things that must **not** differ: how late an account
is, what classification follows from that, what provision follows from the classification, and what
the credit bureaus are told. One of those diverging quietly between two loan types is how a lender
ends up reporting two different standards of delinquency under one registration.

## Behaviour is a code on the master, not a branch in the engine

The design rule is that a product is **data**. There is no gold-loan module and no vehicle-loan
module; there are masters that carry a behaviour code, and the engine reads it.

Two separate axes, because security and servicing are independent questions:

| Axis | Values | What it decides |
|---|---|---|
| **Security behaviour** | `NONE`, `PROPERTY`, `GOLD`, `VEHICLE` | What is taken as collateral, how it is valued, what happens on default — a pledge released over a counter is not a property under mortgage |
| **Facility behaviour** | `TERM`, `OD`, `CC`, `FLEXI`, `DEMAND` | How the money is drawn and serviced — an instalment schedule, a limit with a drawing power, a demand loan falling due on call |

The combination is what a product actually is. A gold loan is `GOLD` security on a `DEMAND` or
`TERM` facility; a cash credit line against stock is `NONE` security on `CC`. A lender adding a new
product is choosing a combination and writing a scheme, not commissioning a module.

**Three security behaviours are reserved and not built** — a fixed-deposit lien, machinery, and a
share pledge. They exist in the model as named future work. A system that offered them because the
enum mentions them would be describing an intention as a feature.

## Where the behaviour legitimately differs

- **Due events.** Every loan falls wholly due at maturity whatever else its scheme demands, so every
  loan generates a maturity due event. Periodic servicing is the optional part. That is why a gold
  loan with no instalments is not a loan with no due dates.
- **Pricing over time.** A gold loan's rate may rise with the age of the loan while a borrower who
  services on time is held at the rate they started on — a rebate rather than a penalty, and
  [the 2025 directions are what govern it](/blog/gold-loan-directions-2025/).
- **The documents.** A pledge acknowledgment, a memorandum of entry, a vehicle detail form, a
  guarantee deed. Different products generate different paper and there is no sense in which one
  template serves all of them.
- **The collateral record.** Gold purity and weight, a vehicle's engine and chassis, a property's
  survey number. These are not one table with optional columns.

## Where it must not, and why

**One days-past-due engine.** Products differ by the due events they generate, never by having their
own path to a delinquency figure. Two paths to one number is the arrangement that silently diverges,
and what diverges is the classification —
[which is decided in a day-end process on a date the circular fixes](/blog/irac-day-end-classification/),
not by whichever product module got there first.

**One classification and provisioning basis.** The ninety-days-past-due basis is the lender's, not
the product's. A gold book and a vehicle book on different bases is one lender with two standards.

**One bureau submission.** The days-past-due figure reported for an account is the same figure the
classification was cut from. An account shown as current internally and thirty days late in the
submission is a contradiction that outlives the loan, because the bureau keeps it.

**One scheme snapshot rule.** A loan is serviced against the terms frozen onto it at sanction, never
against the live master — so editing a scheme prices new business and
[cannot restate an existing borrower's loan](/blog/frozen-terms-at-sanction/). The same rule for all
seven, or the exceptions become the thing nobody can explain to an auditor.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| A new product | A combination of behaviour codes plus a scheme | Require code. A product that needs a release is a product the lender cannot pilot |
| Delinquency | One engine, fed by whatever due events a product generates | Give a product its own DPD path |
| Classification | One basis for the whole book | Let a product carry its own |
| Scheme change | A new version, which new loans snapshot at sanction | Apply a changed rate to loans already written |
| Collateral | A record shaped like the asset | One table of optional columns, where nothing is required and nothing is reliable |
| Reserved behaviours | Say plainly which are built | Offer a fixed-deposit lien, machinery or a share pledge. They are named future work, not features |
| Product strategy | Nothing | Tell you which products to write. The engine should not have an opinion about your book |

## Frequently asked questions

### Does adding a product mean a software release?

It should not. A product is a combination of security and facility behaviour plus a scheme carrying
the commercial terms, and a lender should be able to configure and pilot one without waiting for
anybody's release train. What does require development is a behaviour that does not exist yet —
which is why knowing which are built matters more than knowing how many are listed.

### If one engine serves all products, how does a gold loan work without instalments?

By generating a different set of due events, not by taking a different path to the answer. The
maturity event is the one every loan has; instalments are the optional part. The engine asks what is
demanded and unpaid, and that question has an answer whether or not there is a schedule.

### Can two products share a borrower and still be classified separately?

Each facility is classified on its own conduct, and there is a separate question — whether one
non-performing facility makes the borrower non-performing across the rest — which is a borrower-level
rule rather than a product-level one, and has to be applied after every facility has been assessed.

### Where does Lenviq stand on this?

Products are data: a security behaviour code and a facility behaviour code on the masters, read by
one engine, with the commercial terms in a versioned scheme that each loan snapshots at sanction.
Four security behaviours are built — none, property, gold, vehicle — and three are reserved and not
built. Five facility behaviours are built. There is one days-past-due engine serving every product
and taking no per-product branch, and the same figure feeds classification, provisioning and the
bureau file. What the platform has no view on is which products a lender should write.
