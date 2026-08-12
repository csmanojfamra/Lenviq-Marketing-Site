---
title: "What the RBI found when it looked at gold loan books"
description: "The September 2024 review named specific practices across banks and NBFCs. Two of them are the kind a lender's own system either prevents or quietly permits."
date: "2026-08-11"
category: "Supervision"
author: "FastLegal Technologies"
draft: false
---

The Reserve Bank's September 2024 review of gold loan practices named a list of failures that are
mostly **process** rather than intent — valuation without the customer present, appraisal and custody
handed to business correspondents, opaque auctions, LTV breaches, cash disbursal beyond the limit.
Two of them are systems questions: **loans rolled over against partial repayment**, and **gold loans
not being categorised as NPAs**. Both are still worth checking in any gold book today.

In September 2024 the Reserve Bank published the findings of a review of gold loan practices across
banks and NBFCs ([RBI/2024-25/77](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12735&Mode=0),
30 September 2024) and gave supervised entities three months to report what they had done about it.

It is worth reading as a list of the things that go wrong, because most of them are process failures
rather than intentions.

## What was named

- Gold valued **without the customer present**, and appraisal outsourced to third parties.
- Credit appraisal and valuation handled entirely by business correspondents, with the gold in the
  BC's custody and transported to branches without security.
- Weak due diligence and **no end-use monitoring** where the loan purpose required it.
- Opacity in the auction process on default.
- Breaches of the LTV ceiling, and incorrect risk weights.
- Cash disbursal beyond the statutory limit.

And two that are systems questions as much as process ones:

- **Loans rolled over at the end of their tenure against only partial repayment.**
- **Gold loans not being categorised as NPAs.**

## Why those last two travel together

A gold loan that is renewed rather than repaid gets a fresh maturity date. If the renewal is
permitted while the account is in arrears, the overdue history stops being visible on the live
account and the DPD clock restarts. Do that consistently and a book of stressed accounts reports as
standard — not because anyone falsified anything, but because the system allowed a renewal it should
have refused.

The 2025 Directions closed the gap in the rulebook: renewal only on a standard account, and only
after accrued interest is paid. Whether it is closed in a given lender's software is a separate
question, and it is answered by trying it.

## The check worth running

Attempt a renewal on an account you know is overdue. If the system permits it, the control does not
exist — a guard that nobody has watched refuse is not a guard. The same test applies to LTV at
top-up, and to whether the loan can reach NPA at all.

## Why were gold loans not being categorised as NPAs?

Because in many systems a gold loan generates nothing for the classification engine to read.

A term loan produces instalments. Those are due events, they go unpaid, the engine counts days. A
gold loan is often built as "no schedule" — interest accrues daily onto the account and the principal
is repaid at maturity — so there is no row anywhere saying an amount was demanded on a date. The
engine looks for the oldest unpaid due, finds none, and reports the account as current. Forever,
however far past maturity it is.

The fix is not a gold-specific classification rule. It is to give a gold loan **due events**:
servicing dates where the scheme requires interest to be serviced, and a maturity in every case,
because every loan falls wholly due at maturity whatever else the scheme demands. Then one engine
classifies every product identically.

Two errors sit either side of the right answer:

- **NPA at the maturity date.** Ninety days early. Conservative-looking, still wrong, and harder to
  explain for looking careful.
- **Never NPA at all.** The failure the review named.

## Why does rolling over against partial repayment matter?

Because it moves the arrears off the live account. The renewed loan has a fresh maturity date and a
clean days-past-due, and the history that would have driven classification is attached to a loan that
no longer exists.

The 2025 Directions later made the conditions explicit — renewal only within the permissible LTV,
only on an account classified as standard, and for a bullet loan only after accrued interest is paid.
A system that enforces one of those three enforces none of them.

## What should a gold book be able to show?

| Question | What answers it |
|---|---|
| Was the customer present at valuation? | The appraisal record, with who performed it |
| Who held the ornaments, and when? | Item-level custody records with dual custodians |
| What is each item, exactly? | Description, weights, purity, test method, photograph |
| Was the LTV within the cap, throughout? | A daily test, not a sanction-time one |
| Why was this loan renewed? | The three paragraph 11 conditions, evidenced |
| What was the auction process? | Notice, reserve, hammer price, surplus, and the vouchers |
| Is this loan classified correctly? | Its due events and the day-end DPD computed from them |

## Common mistakes

- **A gold loan with no due events.** Never overdue, never NPA — the failure the review named.
- **NPA at maturity.** The overcorrection.
- **Renewal without the three conditions.** Evergreening in effect.
- **Packet-level records rather than item-level.** Cannot support a part-release or a dispute.
- **LTV tested only at sanction.** Paragraph 20 of the 2025 Directions says on an ongoing basis.
- **An auction with no accounting entries.** It happened in operations and not in the books.
- **The same user as both custodians.** Dual custody recorded rather than implemented.

## Frequently asked questions

### Why were gold loans not being classified as NPA?

Most often because the system generated no due events for them, so there was nothing for the
classification engine to find unpaid. It is a data-model failure rather than a rule failure — the
ninety-day norm applies to gold exactly as it does to anything else.

### When does a gold loan become non-performing?

Ninety days past due, like any other advance. What differs is what falls due: interest servicing
dates where the scheme requires them, and the maturity, at which the whole loan falls due.

### What is wrong with renewing a gold loan against partial repayment?

It resets the maturity and the days-past-due, moving the arrears off the live account. The 2025
Directions permit renewal only within the permissible LTV, only on a standard account, and — for a
bullet loan — only after accrued interest has been paid.

### What records should be kept for each pledged item?

Description, count, gross and net weight, purity and the test method used, a photograph, and the
custody history. Item level rather than packet level, because a packet total cannot support a
part-release and a description in words identifies nothing when two similar items come back and one
is disputed.

### Did the 2024 review change the rules?

It was a supervisory review rather than a new instrument — findings, with three months given to
report remediation. The rules themselves were consolidated later, in the Lending Against Gold and
Silver Collateral Directions, 2025.

---

**Related reading:** [The 2025 gold Directions](/blog/gold-loan-directions-2025/) ·
[Gold loan management software](/blog/gold-loan-management-software-nbfc/) ·
[How to automate NPA classification](/blog/how-to-automate-npa-classification-nbfc/) ·
[What cannot be outsourced](/blog/outsourcing-what-cannot-be-outsourced/)

[Ask for a walk-through](/contact/) — take a gold loan past maturity and read its DPD.
