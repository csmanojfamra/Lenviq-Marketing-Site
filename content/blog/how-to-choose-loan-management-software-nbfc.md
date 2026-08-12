---
title: "How to choose loan management software for an NBFC: an evaluation checklist"
description: "A structured way to evaluate a lending platform — the requirements that actually differentiate, the demo questions that separate depth from a slide deck, how to score vendors, and the contract terms an NBFC needs because of the outsourcing directions."
date: "2026-08-12"
category: "How-to"
author: "FastLegal Technologies"
draft: false
---

Choose loan management software on **what it does at the edges**, not on the length of its feature
list. Every vendor demonstrates a loan being disbursed and an instalment being collected. What
separates a platform you can run a book on from one you will replace in three years is what happens
when an account turns bad, when a scheme is edited, when a receipt is reversed, and when two people
run the same report.

This is a checklist you can run an evaluation from.

## Step 1 — Write down what is actually different about your lending

Most requirements are common to every lender and every vendor will meet them. Spend the evaluation on
what is not:

- Which products, and do any of them behave unusually? (Daily accrual, bullet repayment, step-up
  instalments, tripartite arrangements.)
- Which security types, and do any need physical custody?
- Do you co-lend or securitise?
- How many branches, and what should a branch user see?
- What does your finance function use, and will it move?
- What has to be migrated, and how clean is it?

A vendor who cannot handle the unusual product is disqualified by that alone, however good the rest
is.

## Step 2 — Score the requirements that differentiate

| Requirement | Why it differentiates | Weight |
|---|---|---|
| Products as configuration, not code | A new product is an afternoon or a project | High |
| Terms frozen at sanction | Decides whether editing a master restates live loans | High |
| Day-end classification, one engine per system | Decides whether classification and the ledger agree | High |
| Accounting posted per event | Decides whether month-end is a close or a reconciliation | High |
| Penal treated as charges (April 2024) | Decides whether outstanding and disclosure are right | High |
| Append-only audit trail with prior values | Decides whether a dispute has an answer | High |
| Data scope enforced | Decides whether a branch user can see the book | Medium |
| Masked exports | Decides whether a spreadsheet leaves with personal data | Medium |
| Returns generated from the book | Decides whether reporting is checking or assembling | Medium |
| Migration and exit | Decides what happens at the start and the end | High |

## Step 3 — The demo questions

Ask the vendor to **break something**. In order of how much they reveal:

**On classification and income**
1. Take an account to ninety-one days past due. What happened to the accrued interest, and where did
   it go in the general ledger?
2. Now the borrower pays. What is recognised as income, and on what date? Did the payment reduce
   principal before it met the suspended interest?
3. Part-pay an NPA account so days-past-due falls below ninety. Did it upgrade? (It should not.)
4. Where did this DPD number come from? Show me the rows.

**On terms**
5. Change the scheme's appropriation order now. What happened to a loan sanctioned last month?
6. Print the Key Facts Statement for an existing loan. Is the APR computed or typed?

**On charges**
7. Levy a penal charge, then show me the trial balance. (Nothing should have moved.)
8. Waive part of it. Who was allowed to, and what did the audit record capture?

**On the awkward paths**
9. Reverse a receipt posted last week.
10. Show me a loan closed by foreclosure and one closed by paying it off. What differs?
11. Run the same portfolio report as two users with different scopes.
12. Export a report. What is masked?

**On leaving**
13. What does my data look like if we part company, and in what format?

## Step 4 — Check the things that are not in the demo

- **Who else runs it, at what size, on what products?** Ask to speak to one of them without the
  vendor present.
- **What happened the last time a regulation changed?** The penal charges circular of August 2023 is
  a good test: ask what they did and when.
- **What is the support model** — hours, escalation, and who answers at quarter-end?
- **What does an upgrade do** to your configuration and your integrations?
- **Where is the data hosted**, and will they confirm the region in the contract?

## Step 5 — The contract terms an NBFC needs

Because a lending platform is an IT outsourcing arrangement, the RBI's directions on outsourcing of
IT services shape what the contract must contain:

- **Audit and inspection rights** for you and for the regulator, over the provider's records relating
  to your data.
- **Data localisation** — where it is held, confirmed.
- **Incident and breach reporting**, with timelines.
- **Business continuity and disaster recovery**, with stated objectives.
- **Exit management** — your data returned in a usable form, and erased afterwards.
- **Sub-contracting** — who else touches your data, and your consent to changes.
- **No secondary use** of your data, including for model training.

A vendor who has sold to Indian NBFCs before will have these clauses ready. A vendor who has not will
need to be walked through why they are being asked for, and that itself is information.

## Common mistakes

- **Scoring on feature count.** Every list is long.
- **Demonstrating only the happy path.** Every vendor's happy path works.
- **Skipping migration scope.** It is where the cost and the risk are.
- **No reference call without the vendor.** The only unfiltered information you will get.
- **Leaving exit to contracting.** By then you have no leverage.
- **Choosing the LOS and the LMS separately.** You will own the seam between them.
- **Assuming accounting is included.** Ask whether vouchers are posted per event or per month.

## A worked example

Two vendors, both credible, both demonstrating well.

Vendor A shows a polished dashboard, a mobile collections app and a long integrations list. Asked to
take an account to ninety-one days, they do — and the accrued interest stays in the interest
receivable balance, because the reversal is "handled at month-end by the finance team".

Vendor B has a plainer interface. Asked the same question, the account classifies at day-end, the
accrual reverses to suspense in the same transaction, and a payment posted afterwards meets the
suspended interest before principal and recognises income on the receipt date.

The difference is not visible in a feature comparison. Both list "NPA management". One of them will
cost you a manual month-end entry per NPA account, forever, and an income line that understates until
somebody notices.

## How Lenviq handles this

We would rather be evaluated on the thirteen questions above than on a feature grid, and the
[compliance page](/compliance/) states each regulatory position with the direction it comes from so
the claims can be checked before a call rather than during one. What Lenviq does not do is stated
there too: board policy remains yours, nothing here is a certification, and software does not make a
lender compliant.

## Frequently asked questions

### What is the most important thing to check in a loan management system demo?

What happens to an account after it turns non-performing — the interest reversal, the receipt-basis
recognition, and whether a part-payment upgrades it. It is the single area where implementations
differ most, it is invisible in a feature list, and getting it wrong has a permanent effect on the
income statement.

### How long should an evaluation take?

Four to eight weeks for a considered decision: a fortnight to write the requirements and shortlist,
two to three weeks of deep demonstrations against your own scenarios, and a week for references and
contract review. Longer than that usually means the requirements were not written down first.

### Should we ask for a proof of concept?

For a large book, yes — with your own data and your own edge cases, not the vendor's sample. The
question a proof of concept should answer is whether your unusual product works, not whether the
software runs.

### What should be in the contract for an Indian NBFC?

Audit and inspection rights extending to the regulator, data localisation, incident reporting with
timelines, business continuity commitments, exit management with data return and erasure,
sub-contracting consent, and a prohibition on secondary use of your data. These come from the RBI's
outsourcing directions rather than from ordinary software procurement.

### How do you compare pricing between vendors?

On total cost over three years including implementation, migration, integrations, support and the
cost of the people you will need internally — not on licence alone. A cheaper licence with a monthly
manual reconciliation is not cheaper.

---

**Related reading:** [Loan management software for an NBFC](/blog/loan-management-software-for-nbfc/) ·
[NBFC software: the complete guide](/blog/nbfc-software-complete-guide/) ·
[Spreadsheets vs loan management software](/blog/spreadsheets-vs-loan-management-software-nbfc/) ·
[What cannot be outsourced](/blog/outsourcing-what-cannot-be-outsourced/)

[Ask for a demonstration](/contact/) — bring the thirteen questions.
