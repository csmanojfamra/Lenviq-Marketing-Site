---
title: "How to track loan collections in an NBFC without losing the audit trail"
description: "Building a collections process that holds up: demand generated from due events, allocation that reflects risk, field receipts that appropriate identically to branch receipts, and a record that survives the question of who was contacted and how."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Tracking collections means three things being true at once: **demand is generated from the book
rather than typed, every receipt appropriates by the same rule wherever it was taken, and every
contact with a borrower leaves a record**. Most collections problems in an NBFC are one of those
three failing, and the third is the one that turns an operational problem into a regulatory one.

## Where does demand come from?

From the due events, computed at day-end — not from a list somebody maintains.

The day's demand is: instalments falling due today, plus everything that fell due earlier and is
unpaid, plus charges outstanding. That is a query over the schedule, and it should not be capable of
disagreeing with the borrower's statement of account, because it is built from the same rows.

Where a collections module keeps its own idea of what is due, two things follow. Payments taken in
the field do not clear the branch's list until a sync. And the two lists diverge on edge cases —
a part-paid instalment, a charge waived yesterday, an advance received last week — which is exactly
where a borrower gets chased for money they have already paid.

## How should accounts be allocated?

Allocation is a risk decision, not an alphabetical one. The variables that matter:

| Variable | Why |
|---|---|
| Bucket | An SMA-0 account needs a reminder; an SMA-2 account needs a visit |
| Amount | Large exposures justify senior attention |
| Geography | A field agent's day is a route, not a list |
| History | A borrower who always pays on the 5th is not a defaulter on the 2nd |
| Channel preference | Some borrowers respond to a call, some only to a visit |

Two rules worth building in from the start:

**One owner at a time.** An account allocated to a branch officer and an agency simultaneously gets
contacted twice by people who do not know about each other, which is where complaints come from.

**Reallocation is recorded.** Moving an account between agents mid-cycle is normal; not knowing who
had it when a borrower complains is not.

## What has to be true of a field receipt?

That it is indistinguishable from a branch receipt in every respect except where it was taken.

- **Same appropriation order.** Charges, interest, principal — in whatever order the loan's own
  snapshotted terms specify. Two borrowers who paid the same amount must end up with the same
  balances regardless of who took the money.
- **A receipt number from the same series**, issued at the moment of collection, not on sync.
- **Immediate effect on the account.** A receipt that sits in a queue means the borrower is overdue
  in the system while holding a receipt.
- **Recorded against the collector**, so cash in hand can be reconciled against deposits.

The cash-handling control is the one that gets skipped. A collection recorded but not yet deposited
is a receivable from the agent, and if the system does not carry that position, the reconciliation
happens on a spreadsheet or not at all.

## What must be recorded about contact?

Every attempt: the date, the time, who made it, the channel, the outcome, and what was promised. Two
reasons, and only the first is operational.

**The operational reason:** a promise to pay is the most useful signal in collections, and a promise
broken twice is a different account from one broken once.

**The regulatory reason:** the fair practices expectations around recovery — contact only within
permitted hours, no intimidation, the recovery agent disclosed to the borrower — are all things a
lender may be asked to evidence. "We do not do that" is a policy. A contact log is evidence.

This applies with particular force where recovery is outsourced. The agency's conduct is the
lender's responsibility, and the record of who was contacted, when and by whom needs to be in the
lender's system rather than the agency's.

## Common mistakes

- **A separate demand list.** Diverges from the book on exactly the edge cases that matter.
- **Field receipts appropriating differently.** Two identical payments, two different outcomes.
- **Receipts effective on sync rather than on collection.** The borrower holds a receipt and the
  system says overdue.
- **Two owners on one account.** Duplicate contact, and a complaint.
- **No contact log.** Nothing to answer a conduct question with.
- **Cash-in-hand not tracked as a position.** Reconciled on a spreadsheet, if at all.
- **Chasing SMA-0 and SMA-2 the same way.** Wastes effort at one end and loses money at the other.
- **Commission computed on collections without a clawback rule.** A collection that later reverses
  should reverse the commission with it.

## A worked example

An agent visits a borrower and collects ₹15,000 against a loan with ₹2,800 of penal charges
outstanding and an instalment of ₹13,300.

**Correct:** the receipt is issued on the spot from the shared series. The appropriation order on
that loan's snapshotted terms is charges, then interest, then principal — so ₹2,800 clears the penal
charges (and reaches the general ledger at that moment, being receipt-basis income), ₹1,500 clears the
interest component, and ₹10,700 reduces principal. The instalment is part-paid, the account's days
past due is recomputed that night, and ₹15,000 sits as cash in hand against the agent until deposited.

**What goes wrong without the discipline:** the field app applies interest first because that is what
its own logic does, the penal charge stays outstanding and attracts more charge, the borrower's next
statement shows a balance they dispute, and the agent's cash is reconciled from a WhatsApp photo of a
receipt book.

## How Lenviq handles this

Demand is derived from the same due events the statement and the classification read. A receipt
posted anywhere runs through one appropriation engine using the order snapshotted onto that loan, so
a field receipt and a branch receipt produce identical outcomes. Receipt numbers come from one
series. Collection agents are first-class: accounts are allocated to them, collections are recorded
against them, and commission is computed on what was actually collected with clawback where a receipt
is later reversed or the loan closes early. Every contact and every allocation change is recorded.

## Frequently asked questions

### Should collections use a separate system from the loan book?

It can, provided it reads the book's due events rather than maintaining its own, and posts receipts
through the same appropriation engine. The moment it holds its own idea of what is due or how a
payment is applied, the two will disagree, and the borrower is the one who finds out.

### How should a part payment be applied?

By the appropriation order that the loan was sanctioned on — typically charges, then interest, then
principal, but it is a policy decision that must be stated in the agreement and applied consistently.
The important property is that it comes from the loan's own snapshotted terms rather than a master
that can be edited.

### What records are needed if recovery is outsourced?

The same records as for in-house collection, held by the lender: who was allocated the account, every
contact attempt with date, time and outcome, and what was collected. The agency's conduct is the
lender's responsibility, so the evidence needs to be in the lender's system.

### How do you reconcile cash collected in the field?

By treating it as a position — cash in hand against the collecting agent — from the moment the
receipt is issued until it is deposited and the deposit is matched. If the system does not carry that
position, the reconciliation is happening somewhere it cannot be audited.

### What is the most useful collections metric?

Promise-to-pay kept rate, by agent and by bucket. Collection efficiency tells you what came in;
promise kept rate tells you whether your contact is doing anything, which is the part you can manage.

---

**Related reading:** [How to manage an NBFC loan portfolio](/blog/how-to-manage-nbfc-loan-portfolio/) ·
[How to calculate penal charges](/blog/how-to-calculate-penal-charges-rbi-2024/) ·
[SMA-0, 1 and 2](/blog/sma-classification-what-it-signals/) ·
[What counts as an audit trail](/blog/audit-trail-what-counts/)

[Ask for a walk-through](/contact/) — take a field receipt and a branch receipt for the same amount
and compare the outcomes.
