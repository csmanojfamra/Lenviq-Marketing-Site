---
title: "Auctioning pledged gold: thirty days' notice, two custodians, and the surplus you owe back"
description: "An auction is the one event in a gold book where the lender holds someone else's property and sells it. The notice period is a floor, the custody has to be provable, the reserve is the full dues and not a round number, and a surplus is the borrower's money with a deadline on it."
metaDescription: "Thirty days' notice is a floor, custody has to be provable, and an auction surplus is the borrower's money with a deadline on it."
question: "What does an NBFC have to do before auctioning pledged gold?"
kind: artefact
author: "CS Sushil Choudhary"
updated: "2026-10-13"
related: "gold-loan-directions-2025, what-the-2024-gold-review-found, /gold-loan-software/|Gold loan software, audit-trail-what-counts, dpd-calculation-software-nbfc, frozen-terms-at-sanction, nbfc-compliance-calendar, due-diligence-what-lenders-ask"
priority: 0.8
draft: true
---

An auction is the only event in a gold book where the lender takes property it has been holding for
somebody else and sells it. Everything about the process is therefore about proof rather than
efficiency: proof that the borrower was told and when, proof of who had the packet and when, proof
that what it fetched was fairly arrived at, and proof that any money left over went back.

Four things carry that, and three of them have deadlines.

## The notice is a floor, not a target

The auction date must be **at least thirty days after the notice**. That is a minimum and nothing
reduces it — not the borrower's consent, not a longer default, not a falling gold price.

Which means a system has to treat the notice as the event that starts a clock, and the auction date
as derived from it rather than chosen. A notice issued on the 3rd cannot support an auction on the
28th, and a lender who schedules the auction first and the notice second has inverted the
dependency.

The notice itself is a document with a delivery record, not an email somebody sent:

| What the notice has to carry | Why |
|---|---|
| A reference, and the date it was issued | It is the start of the clock, and the clock will be examined |
| The amount outstanding as at that date | The borrower's chance to redeem is only real if they know the figure |
| The scheduled auction date | At least thirty days out, derived from the notice date |
| The mode of delivery, and the delivery status | "Sent" and "delivered" are different facts, and only one of them is evidence |

## Custody has to be provable, and two people have to say so

A gold packet moves — into the vault at disbursement, out for an auction, into an auctioneer's hands
— and each movement is an opportunity for the lender to be unable to say who had it.

The control is **dual custody**: two named custodians, both recorded, for the movements that matter.
It is not a workflow nicety. The question an auditor asks after an auction is who took the packet out
of the vault, and a single name is an answer that cannot be corroborated. A system that records one
custodian has made the control unverifiable while appearing to implement it.

## The reserve price is the dues, and the arithmetic is specific

The reserve is not a round number and not a valuation. It is what the borrower owes as at the auction
date, which is the sum of four things:

- outstanding principal
- accrued interest
- penal charges outstanding
- bounce charges outstanding

Two consequences. First, the reserve **moves with the date**, because interest accrues until the
auction. Second, the outcome is determined by comparing the hammer price against that figure and not
against a target: hammer above reserve produces a **surplus**, hammer below produces a **deficit**,
and these are different events with different obligations.

## The surplus is the borrower's money, with a deadline

This is the part most often got wrong, and the one with the clearest obligation: a surplus must reach
the borrower **within seven days**.

It is their money. The lender held the gold as security for a debt, the debt has been satisfied, and
what is left over belongs to the person whose gold it was. A lender carrying surpluses as a credit
balance on a closed loan — which is what happens when nobody built the payment step — is holding
somebody else's funds, and the fact that nobody has asked for it is not a defence.

A deficit is the other outcome and the obligation runs the other way: the borrower still owes the
shortfall, the loan does not close by virtue of the auction, and the recovery position continues.

## The auction is the end of a sequence, not an event on its own

An auction is only lawful at the end of a process the system has to have recorded: the loan became
overdue on a date fixed by the day-end run, it was classified, renewal and part-release were
available and not taken, a demand was made, the notice was issued, thirty days passed. Each of those
is a date somebody will ask for.

Which is why
[the gold directions are worth reading as a sequence](/blog/gold-loan-directions-2025/) rather than
as a list of rules, and why
[the 2024 supervisory review found what it found](/blog/what-the-2024-gold-review-found/) — the
failures were rarely the auction itself. They were the steps before it that nobody could evidence.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The notice | Generate it as a stored document with a reference, the outstanding figure, and a delivery record | Treat "we sent an SMS" as notice |
| The clock | Derive the auction date from the notice date, at the minimum or later | Let somebody type an auction date |
| Custody | Require two named custodians on the movements that matter | Record one, which makes the control unverifiable |
| The reserve | Compute principal plus accrued interest plus penal plus bounce, as at the auction date | Use a round number or a valuation |
| The outcome | Record hammer price, reserve, surplus and deficit as the event's own figures | Store a net result, which loses which of the two happened |
| A surplus | Make paying it a step with a deadline attached | Leave it as a credit balance on a closed loan |
| A deficit | Keep the recovery position open | Close the loan because the gold is gone |
| The auctioneer | Hold an empanelment record | Leave who conducted it to a narration field |
| The price achieved | Nothing | Guarantee it, or present a valuation as a realisable value. What gold fetches at auction is a fact after the event |

## Frequently asked questions

### Can the borrower redeem after the notice is issued?

Yes, and that is the point of the notice period — it exists so the borrower has a real opportunity to
pay and take their gold back. A system that locks the loan on notice has removed the thing the notice
was for.

### Who sets the reserve price?

The arithmetic does. It is the dues as at the auction date, which is why it is computed rather than
decided, and why it differs from the figure on the notice issued thirty days earlier — interest
accrued in between.

### What if the gold cannot be sold at the reserve?

Then there is no sale at that reserve, and what follows is a commercial decision the lender has to
record as one. What the system should not do is quietly reduce the reserve, because the reserve is
the borrower's debt and selling below it creates a deficit the borrower is then pursued for.

### Does an auction close the loan?

Only if the proceeds cover the dues. A deficit leaves the loan open and the borrower liable for the
shortfall, which is also why the auction result has to record both figures rather than a net.

### Where does Lenviq stand on this?

The notice is generated as a stored document with its own reference, the outstanding figure as at
the notice date and a recorded delivery mode and status, and the auction date is derived as the
notice date plus the thirty-day minimum rather than typed. Dual custody is asserted on the movements
that require it. The reserve is computed as outstanding principal plus accrued interest plus penal
plus bounce outstanding, and the result records the auction date, the auctioneer, the reserve, the
hammer price, both custodians, and the surplus and deficit as separate figures with the outcome named.
Paying the surplus is its own step and refuses when there is none. Auctioneers are held as an
empanelment record. Gold holdings and the renewal pipeline are reports. What the platform does not do
is value your gold for the market or tell you what a packet will fetch.
