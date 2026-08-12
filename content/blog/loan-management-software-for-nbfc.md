---
title: "Loan management software for an NBFC: what it has to do, and how to evaluate it"
description: "What a loan management system actually has to handle for an Indian NBFC — origination, servicing, IRAC classification, penal charges, accounting and RBI returns — how to decide between building and buying, and the questions that separate a demo from a system you can run a book on."
date: "2026-08-12"
category: "Guide"
author: "FastLegal Technologies"
draft: false
---

Loan management software for an NBFC is the system of record for the loan book: it holds every
account, computes what is due and when, classifies assets on the RBI's ninety-days-past-due basis,
posts the accounting behind every movement, and produces the returns and MIS the regulator, the
board and the statutory auditor ask for. For an Indian NBFC the deciding question is not which
system has the most features. It is which one computes the regulatory positions **where the money
is** — in the engine that moves it — rather than assembling them in a spreadsheet at quarter-end.

This guide sets out what such a system has to do, how the pieces fit, what build-versus-buy really
costs, and the questions that separate a good demonstration from a system you can still rely on in
year three.

## What is a loan management system, and how is it different from a loan origination system?

They are two halves of one lifecycle, and confusing them is the most common reason an evaluation
goes wrong.

A **loan origination system (LOS)** covers everything up to the money leaving: lead capture, the
party and KYC record, credit appraisal, the approval matrix, sanction, documentation and
disbursement. Its output is a sanctioned, documented, disbursed loan.

A **loan management system (LMS)** takes over from there: the repayment schedule, receipts and
appropriation, days-past-due, asset classification, penal charges, restructuring, foreclosure and
closure. Its output is a serviced book and the reporting on it.

| | Loan origination (LOS) | Loan management (LMS) |
|---|---|---|
| Period covered | Enquiry to disbursement | Disbursement to closure |
| Core question | Should we lend, and on what terms? | What is owed, what came in, and what does it make this account? |
| Typical users | Sales, credit, operations | Collections, operations, accounts, compliance |
| Regulatory weight | KYC, fair practices, KFS disclosure | IRAC classification, income recognition, penal charges, returns |
| Failure looks like | A file that stalls, a term nobody can find | A number nobody can explain |

Some vendors sell only one. Where they are separate systems, the handover at disbursement is the
seam that leaks: the sanctioned terms have to be transferred exactly and then frozen, and if the LMS
reads a live master rather than a snapshot, a change to that master silently restates loans already
sanctioned.

## What does an NBFC actually need it to do?

Six things, in the order they bite.

**1. Product and scheme configuration that is data, not code.** An NBFC that lends against gold,
property and vehicles is running three different behaviours: daily accrual against a pledged packet,
a monthly amortising instalment against a mortgage, and a hypothecated asset with its own insurance
and endorsement obligations. If those behaviours are hard-coded, every new product is a development
project. If they are configuration, a new scheme is an afternoon.

**2. A repayment engine that agrees with the agreement.** The schedule, the interest method, the
appropriation order and the charge treatment must all come from the terms the borrower was actually
sanctioned on. This sounds obvious and is the single most common defect: schemes get edited, and
loans sanctioned under the old version quietly start behaving under the new one.

**3. Classification computed, not entered.** Days-past-due, SMA staging and NPA classification must
fall out of the due events and the receipts, in the day-end process. Any system where somebody can
type a classification is a system where the classification and the ledger can disagree.

**4. Accounting that posts itself.** A loan event that does not post to the books when it happens
becomes a reconciliation at month-end. Disbursement, receipt, accrual, charge collection, waiver,
write-off and recovery each have a double entry; if the system does not make it, somebody does, by
hand, at the worst time of the month.

**5. Charges handled the way the regulator requires.** Since 18 April 2024, penal amounts on a
default are **charges**, not interest: they are not capitalised to principal and they do not
compound. A system that still treats them as an interest add-on produces a wrong outstanding, a
wrong statement and a wrong disclosure.

**6. Returns and MIS from the same data.** DNBS returns, CRILC, credit bureau submissions and the
priority-sector statement should be produced from the book, not re-keyed from it. Where they are
re-keyed, the return and the ledger are two claims about the same quarter, and only one of them can
be right.

## Should an NBFC build or buy?

Building looks cheapest at the point of decision and rarely is, for a reason specific to lending:
the regulation moves, and the cost of following it never stops.

| | Build in-house | Buy a platform |
|---|---|---|
| First release | 9–18 months, realistically | Weeks to months, depending on migration |
| Regulatory change | Your engineers re-read the circular and re-implement | Vendor's problem, contractually |
| Cost shape | Large capital, then permanent maintenance | Operating cost, scales with the book |
| Depth of edge cases | You will discover them in production | Already discovered, in someone else's production |
| Key-person risk | High — the person who understood NPA staging leaves | Low |
| Fit | Exact | Very good if the vendor knows Indian NBFC lending; poor if it does not |

Building is defensible when the lending model is genuinely unusual and central to the business — a
novel underwriting approach, an embedded-finance flow no vendor supports. It is rarely defensible
for the parts every lender has in common: classification, accrual, appropriation, returns. Nobody
wins market share by having written their own IRAC engine, and everybody who has written one has
found a bug in it during an inspection.

A middle path exists and is often right: buy the platform, integrate what is genuinely yours.

## How should an NBFC evaluate a loan management system?

Most demonstrations show the happy path — a loan disbursed, an EMI collected, a dashboard. The book
is not run on the happy path. Ask what happens at the edges.

**On classification and income**

- Show me an account that turned NPA. What happened to the interest already accrued on it, and where
  did it go in the general ledger?
- If that borrower now pays, what does the system recognise as income, and on what date?
- Where does the DPD number on this screen come from? Show me the rows it was computed from.

**On charges**

- Levy a penal charge and then show me the general ledger. (Under the April 2024 rules there should
  be nothing there until it is received.)
- Waive part of it. Who is allowed to, and what does the audit trail record?
- Is the penal amount in the outstanding balance the borrower is quoted? Should it be?

**On terms and versioning**

- Change the scheme's interest rate now. What happened to a loan sanctioned last month?
- Print the Key Facts Statement for an existing loan. Is the APR computed from that loan's terms, or
  typed in somewhere?

**On the book as a whole**

- Two people run the same report on the same day and get different numbers. How does the system stop
  that? (The answer should involve the date the figures are *as at*.)
- Export a portfolio report. What is masked, and who decided?
- Show me the trial balance, and reconcile one line of it back to a loan event.

**On the things nobody demonstrates**

- Reverse a receipt posted last week. What does the system do, and what does it leave behind?
- Show me a loan that was foreclosed and one that was closed by paying it off. What differs?
- How do I get my data out if we part company?

A vendor who has run an Indian book will answer these easily. A vendor who has not will steer back
to the dashboard.

## What does this cost, and what drives the price?

Indian lending platforms are usually priced on some combination of active loan accounts, branches or
users, and modules licensed, with an implementation fee for migration and configuration. The
variables that actually move the number are the size of the book, the number of distinct products,
whether accounting is included or integrated, and how much historical data has to be migrated and
reconciled.

The cost that is routinely underestimated is not licence — it is **migration**. Moving a live book
means reproducing every account's outstanding, schedule, classification and charge history exactly,
and proving it reconciles. Budget for a parallel run.

## How Lenviq handles this

Lenviq is a multi-tenant lending platform for Indian NBFCs covering origination, loan management,
double-entry accounting and RBI reporting in one system. Three design decisions matter more than the
feature list:

**Products are configuration.** A scheme binds behaviour by an asset-class behaviour code, not by a
product name, so gold, property, vehicle and unsecured lending run on the same engine with different
parameters rather than different code paths.

**Terms are frozen at sanction.** A loan carries the scheme version it was sanctioned on. Editing the
master next quarter cannot restate what an existing borrower was told, which is what makes the
agreement, the Key Facts Statement and the schedule still agree with each other years later.

**The regulatory position is in the engine.** Classification is computed in the day-end process from
the same due events the statement is built from; penal amounts are levied as charges and reach the
general ledger only on receipt; interest accrued before an NPA date is reversed to suspense and
recognised thereafter on a receipt basis. Each of those positions is stated on our
[compliance page](/compliance/) with the direction it comes from, so a compliance officer can check
the claim against the circular rather than take it on trust.

What Lenviq does not do: it does not make a lender compliant. Board policy — rate structures, penal
quantum, waiver authority, the fair practices code — remains the lender's, and the system enforces
what you configure and records who configured it.

## Frequently asked questions

### What is the difference between an LOS and an LMS?

A loan origination system covers everything up to disbursement — lead, KYC, appraisal, approval,
sanction, documentation. A loan management system covers everything after it — schedule, receipts,
days-past-due, asset classification, charges, closure. Many NBFCs run both; the risk is the handover
between them, where sanctioned terms must transfer exactly and then stop changing.

### Does loan management software make an NBFC RBI-compliant?

No. Software implements positions; it does not discharge obligations. What good software does is
make the correct treatment the default and the automatic one — classification computed rather than
typed, penal amounts booked on receipt rather than accrual — and leave an audit trail that shows the
treatment was applied. The compliance officer and the statutory auditor remain the people who sign.

### How long does it take to implement a loan management system for an NBFC?

For a new book, weeks. For a live book, the driver is migration rather than configuration: every
account's outstanding, schedule, classification and charge history has to be reproduced exactly and
reconciled, which usually means a parallel run before cutover. Plan for that period rather than
hoping to compress it.

### Can one system handle gold loans and term loans together?

It should. They behave very differently — a gold loan accrues daily against a pledged packet and is
often serviced by interest alone, while a term loan amortises on a schedule — but both are the same
engine with different parameters if the platform binds behaviour to an asset class rather than to
product names. A system that needs a separate module per product will need another one for your next
product.

### What should an NBFC ask a vendor before signing?

Ask them to break something. Turn an account NPA and follow the interest through the general ledger;
change a scheme and check a loan sanctioned before the change; reverse a week-old receipt; run the
same report as two different users. The happy path demonstrates well from every vendor. The edges do
not.

---

**Related reading:** [Penal charges are charges](/blog/penal-charges-not-interest/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[Terms are frozen at sanction](/blog/frozen-terms-at-sanction/) ·
[What goes into the KFS APR](/blog/kfs-what-goes-in-the-apr/)

Want to see this against your own product mix? [Ask for a demonstration](/contact/) — it is a
conversation with someone who can answer the questions above, not a slide deck.
