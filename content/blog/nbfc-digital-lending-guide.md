---
title: "Digital lending for NBFCs: what the guidelines require of your systems"
description: "The RBI digital lending guidelines in operational terms — who may hold the money, what a lending service provider may and may not do, the KFS and cooling-off requirements, co-lending mechanics, and what each of these means in the loan management system."
date: "2026-08-12"
category: "Guide"
author: "FastLegal Technologies"
draft: false
---

Digital lending is not a product category — it is a delivery channel with its own rulebook. For an
NBFC the practical effect of the RBI's digital lending framework is a set of constraints on **who
touches the money, what the borrower must be told and when, and what the lender remains
accountable for even when a partner does the work**. Almost all of it lands in systems rather than in
policy.

This guide covers what the framework requires operationally, how co-lending changes the picture, and
what each requirement means for a loan management system.

## What is a digital lending platform under the RBI framework?

The framework distinguishes three roles, and keeping them straight is the whole of the compliance
position.

| Role | What it is | What it may not do |
|---|---|---|
| Regulated entity (RE) | The bank or NBFC whose balance sheet the loan sits on | Delegate accountability |
| Lending service provider (LSP) | An agent doing one or more lending functions for the RE — sourcing, underwriting support, collections | Hold the money |
| Digital lending app (DLA) | The customer-facing app, of the RE or of an LSP acting for it | Present itself as the lender if it is not |

The rule with the most operational consequence: **all disbursements and repayments flow directly
between the borrower's bank account and the regulated entity's bank account**, without passing
through a pool account of the LSP or any third party. Where money moves through an intermediary's
account, the arrangement is outside the framework however it is documented.

Two further constraints matter:

- **The borrower must know who the lender is.** The DLA discloses the regulated entity up front, not
  in a footer.
- **Fees to the LSP are the lender's cost, not the borrower's.** Any charge payable to a lending
  service provider is paid by the regulated entity, not collected from the borrower.

## What must the borrower be told, and when?

**Before execution: the Key Facts Statement.** The KFS carries the all-in cost as an annual
percentage rate, computed from the loan's own terms, and — the clause with teeth — charges not
disclosed in it cannot be recovered later. In a digital flow this means the KFS has to be generated
from the sanctioned terms at the moment of sanction, not assembled from a template.

**At sanction: a cooling-off period.** The borrower may exit the loan within a defined window by
repaying the principal and the proportionate annual percentage cost, without a prepayment penalty.
Systems have to be able to compute that figure — proportionate, not the full contracted interest —
and to distinguish a cooling-off exit from an ordinary foreclosure, because the charges differ.

**Throughout: what data was taken and why.** Data collection must be need-based, with the borrower's
explicit consent, and the borrower must be able to see it and to have it deleted where retention is
not required.

**On default: who is contacting them.** The recovery agent acting on the account must be disclosed to
the borrower.

## How does co-lending work operationally?

Co-lending arrangements — an NBFC originating alongside a bank, with the exposure shared — add a
second lender's requirements to every loan without adding a second system.

The mechanics that a system has to hold:

- **Share at origination.** The split is fixed when the loan is made, and each side's share of
  principal, interest and charges follows it for the life of the account.
- **Both sides classify.** Each partner classifies its own share on its own norms. A system that
  computes classification once and shares it will eventually be wrong for one partner.
- **Collections are apportioned.** A receipt splits by the agreed share, in the agreed order, and
  each side's ledger reflects only its own portion.
- **Reporting is separate.** Each lender reports its own exposure to the bureaus and to the regulator.
  The borrower has one loan; the regulator sees two exposures.

Where this goes wrong in practice is the reconciliation cadence: the partner receives a file, posts
it to their own system, and the two books drift by rounding, timing or charge treatment until
somebody reconciles them manually.

## What does the outsourcing framework require?

Digital lending is usually delivered with partners, which brings the RBI's directions on outsourcing
of information technology services into scope. Three things follow for the systems:

**Some functions cannot be outsourced at all** — the core decision-making, the internal audit
function, and compliance itself. A partner may support underwriting; the credit decision remains the
lender's.

**The regulator's access must survive the arrangement.** The contract has to give the RBI, and the
lender's own auditors, the right to inspect the service provider's books and records relating to the
lender. That is a contractual term, but it has a systems consequence: the data has to be
identifiable, extractable and auditable.

**Continuity and exit.** The lender must be able to get its data back in a usable form and continue
operating if the arrangement ends.

## Common mistakes

- **A pool account in the flow.** The most consequential single error, and the easiest to introduce
  by accident when a payment partner is added.
- **A DLA that reads like the lender.** If the borrower cannot tell who is lending, the disclosure
  has failed regardless of what the footer says.
- **LSP fees recovered from the borrower.** Sometimes done as a "convenience fee". It is not
  permitted.
- **A cooling-off exit priced as a foreclosure.** Different computation, different charges; a system
  that has only one closure path will get it wrong.
- **Co-lending with one shared classification.** Each partner classifies its own share.
- **A KFS produced after sanction.** It is a pre-execution disclosure. Producing it afterwards
  inverts its purpose and forfeits the protection of the non-recovery clause.

## How Lenviq handles this

Lenviq is the lender's system, not a lending service provider: it holds the book, the accounting and
the reporting on the regulated entity's side.

What that means for a digital flow: the Key Facts Statement is generated from the loan's own
sanctioned terms at sanction, with the APR computed rather than typed, so the document that governs
recovery of charges is created at the right moment and says what the loan actually is. Terms are
snapshotted onto the loan, so a partner-driven product change cannot restate loans already made.
Every mutation carries an append-only audit record of who, when and what it was before, which is what
makes an inspection of an outsourced arrangement answerable. Disbursement and repayment are recorded
against the lender's own bank ledgers.

What Lenviq does not do: it is not a DLA, it does not source borrowers, and it takes no position in
the money flow. Those are the lender's arrangements, and whether they meet the framework is a
question about the arrangement rather than about the software.

## Frequently asked questions

### Can loan money flow through a lending service provider's account?

No. The framework requires disbursement and repayment to move directly between the borrower's bank
account and the regulated entity's, without a pool account held by an LSP or any other third party.
This is the constraint most often broken inadvertently when a payments partner is introduced.

### Who pays the lending service provider?

The regulated entity. Fees payable to an LSP are the lender's cost and may not be recovered from the
borrower, whether directly or under another name.

### What is the cooling-off period in digital lending?

A window after sanction in which the borrower may exit by repaying the principal and the
proportionate annual percentage cost, without a prepayment penalty. It is a distinct closure path
from foreclosure — the amount payable is computed differently — so a system with only one closure
route will misprice it.

### How is classification handled in a co-lending arrangement?

Each lender classifies its own share under its own applicable norms, and reports its own exposure. A
shared classification computed once and passed to the partner will diverge from what the partner's
own norms require, and the divergence surfaces in reporting.

### Does the RBI's outsourcing framework apply to a SaaS lending platform?

Where a service provider handles the lender's data or supports a material function, the directions on
outsourcing of IT services are relevant, and the contract needs the audit, inspection, continuity and
exit terms they require. It is worth asking a prospective vendor for those clauses during the
evaluation rather than at contracting.

---

**Related reading:** [RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[What the KFS APR includes](/blog/kfs-what-goes-in-the-apr/) ·
[Co-lending: what each side owns](/blog/co-lending-what-each-side-owns/) ·
[What cannot be outsourced](/blog/outsourcing-what-cannot-be-outsourced/)

[Ask for a demonstration](/contact/) if you want to see how these are held in the system.
