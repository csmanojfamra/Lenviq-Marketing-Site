---
title: "RBI compliance for NBFCs: the positions your systems have to implement"
description: "A working guide to the RBI requirements that land inside an NBFC's systems rather than its policy files — IRAC classification, income recognition on NPA, penal charges after April 2024, the Key Facts Statement, gold lending under the 2025 directions, and the returns that follow from all of them."
date: "2026-08-12"
category: "Guide"
author: "FastLegal Technologies"
draft: false
---

Most RBI requirements on an NBFC are discharged by a policy document and a board resolution. A
smaller set cannot be: they are arithmetic, and they have to be right in the system that moves the
money every day. Asset classification, income recognition, the treatment of penal amounts, the
disclosure in the Key Facts Statement and the valuation of gold collateral are all in that second
category. This guide covers those — what each direction requires, where systems typically get it
wrong, and what a correct implementation looks like.

It is written for the person who has to answer for the numbers: a compliance officer, a credit head,
a finance controller, or a founder who is all three. Every position below names the direction it
comes from so you can check it against the source.

## How does asset classification work under RBI norms?

An account is **overdue** if any amount due to the lender is not paid on the due date. Classification
follows from how long it stays that way.

| Stage | Trigger | What it is |
|---|---|---|
| SMA-0 | Overdue 1–30 days | Special Mention Account — early warning, not impairment |
| SMA-1 | Overdue 31–60 days | |
| SMA-2 | Overdue 61–90 days | The last stage before impairment |
| NPA (Sub-standard) | Overdue more than 90 days | Non-performing asset |
| Doubtful | 12 months as sub-standard | |
| Loss | Identified as such | |

Three points decide whether an implementation is right.

**It is a day-end event.** The RBI's clarification of 15 November 2021 on prudential norms
(RBI/2021-2022/125) put this beyond argument: an account is flagged overdue as part of the day-end
process for the due date itself. Not the next morning, not on the reporting date, not when somebody
runs a report. A system that classifies when asked, rather than every night, will produce different
answers depending on when it was asked.

**Overdue means demanded and unpaid.** Interest that has accrued but has not yet fallen due is not
overdue. This distinction is what makes a bullet-repayment or interest-servicing product behave
correctly: the clock starts on the date the sanction says the money is due, not on the date interest
began to accrue.

**Upgrade is stricter than most systems assume.** The same 2021 clarification requires that an
account classified as NPA is upgraded to standard only when the **entire** arrears of interest and
principal are paid. Part-payment that brings the account below ninety days does not upgrade it.

Where implementations go wrong: a classification field somebody can edit; a nightly job that skips
accounts in some states; and per-product classification logic, where a gold loan and a term loan take
different code paths and quietly diverge on what counts as overdue.

## What happens to interest when a loan turns NPA?

Income recognition stops being accrual-based. On classification as non-performing, interest that has
accrued but not been collected must be **reversed** — it was recognised as income and it should not
have been — and from that date interest on the account is recognised only when it is actually
received.

In accounting terms: reverse the accrued interest out of income into a suspense account; recognise
from suspense to income only as receipts arrive.

This is the position most commonly implemented halfway. The reversal is done, because it shows up in
the P&L and somebody notices. The second half — recognising on receipt — is often not, because
nothing forces it: the interest sits in suspense and the borrower's later payments quietly reduce
principal instead. The result is an understated income line, an overstated recovery on principal, and
a suspense balance that only grows.

The test is simple. Take an NPA account with interest in suspense, post a payment, and follow it.
The payment should meet the suspended interest before it touches principal, the suspense balance
should fall, and income should be recognised for exactly that amount on the date of receipt.

## Are penal charges interest? (No — and what that changed)

The RBI's circular on fair lending practice and penal charges in loan accounts (RBI/2023-24/53,
dated 18 August 2023, effective for new loans from 1 April 2024 and applied to existing ones at their
next review) settled a question a lot of systems had answered the other way.

Penal amounts on a default are **penal charges**, not penal interest. Four consequences follow, and
each one lands in code:

1. **No capitalisation.** The charge is not added to principal. An outstanding that includes levied
   penal is a wrong outstanding.
2. **No compounding.** Interest is not computed on a penal charge.
3. **They are charges in the books.** Which, on an accrual-versus-receipt view, means income when
   received rather than when levied.
4. **They must be disclosed and reasonable.** Quantum and the circumstances of levy go into the
   agreement and the Key Facts Statement, and the same charge cannot be levied twice for the same
   default under two names.

A useful way to hold it: the borrower's liability arises when the charge is levied, but the lender's
income arises when it is received, and those are two different dates. A statement of account for the
borrower should show the levy; the trial balance should not, until it is collected. Systems that use
one number for both are wrong for one of the two audiences.

## What must the Key Facts Statement contain?

The Key Facts Statement (KFS) is a standardised summary given to the borrower before execution,
required under the RBI's guidelines on the KFS for retail and MSME loans (RBI/2024-25/16, dated
15 April 2024). Two things matter operationally.

**The APR is computed, not quoted.** It is the annualised cost of the loan including interest and all
charges recovered by the lender — processing fee, documentation, insurance premium financed —
excluding only those genuinely collected on behalf of a third party and disclosed as such. A KFS
where somebody typed the APR into a template is a disclosure waiting to be contradicted by the
schedule printed next to it.

**Charges not in the KFS cannot be recovered later.** That is the clause with teeth. It makes the
KFS a limit on the lender rather than a summary of its intentions, and it means the KFS has to be
generated from the loan's own sanctioned terms rather than assembled by hand.

## What changed for gold loans under the 2025 directions?

The Reserve Bank of India (Lending Against Gold and Silver Collateral) Directions, 2025 harmonised
what had been a patchwork. The changes with operational teeth:

| Area | The requirement |
|---|---|
| Valuation reference | The **lower** of the 30-day average and the previous day's closing price of 22-carat gold, published by IBJA or a SEBI-recognised exchange; lower purities adjusted proportionately |
| Return of collateral | On repayment, the same day or within 7 working days; compensation payable per day of delay |
| Unclaimed collateral | Treated as unclaimed after two years from full repayment |
| Auction surplus | Returned to the borrower within 7 working days |
| Loss or damage in custody | The lender compensates |

The valuation rule is the one that breaks existing systems. Valuing at "the latest rate on file" is
no longer sufficient, and a branch that has not keyed the rate for a fortnight is valuing that
morning's pledge at a fortnight-old price — over-lending on a falling market, short-changing the
borrower on a rising one, and unable to demonstrate the basis afterwards either way.

The return deadline is the one that creates a liability nobody notices, because it accrues by doing
nothing: the loan is closed, the borrower has a no-dues certificate, and the packet sits on the
shelf.

## What returns follow from all of this?

The classification, the income treatment and the charge treatment above are the inputs to the
reporting. If they are wrong, everything downstream is wrong in the same direction.

- **DNBS returns** — the supervisory returns applicable to your layer under scale-based regulation.
- **CRILC** — large-borrower reporting, including SMA status, which comes straight from the DPD you
  computed at day-end.
- **Credit information reporting** — submissions to the credit information companies, on the
  fortnightly cycle now required.
- **Priority sector** — where applicable to your classification of advances.

The practical test of a reporting stack is whether a return can be traced back to the accounts that
produced it. Where returns are assembled in a spreadsheet from an extract, the return and the ledger
are two claims about the same quarter and reconciling them is a manual exercise every time.

## Common mistakes

- **A classification that can be typed.** If a human can set it, it can differ from the ledger.
- **Reversing NPA interest but never recognising it on receipt.** Half the rule, and the half that
  understates income.
- **Penal amounts in the principal outstanding.** Directly contrary to the April 2024 position.
- **A KFS with a typed APR.** It will eventually contradict the schedule on the same page.
- **Per-product classification logic.** Two engines diverge; the divergence surfaces in an
  inspection.
- **Gold valued at whatever rate is on file.** Not the prescribed basis, and not defensible after
  the fact.
- **Editing a scheme and restating live loans.** The borrower was told something; that has to remain
  true.

## How Lenviq handles this

Every position above is implemented in the engine rather than in a reporting layer over it.
Classification runs in the day-end process from the due events, on one path for every product.
Interest is reversed to suspense on NPA and recognised from suspense on receipt — the receipt meets
suspended interest before principal. Penal amounts are levied as charges, are never capitalised, and
reach the general ledger only when collected. The KFS is generated from the loan's own sanctioned
terms with the APR computed. Gold is valued at the reference the 2025 directions prescribe, and the
seven-working-day return clock is monitored rather than left to memory.

Each of these is set out with its citation on the [compliance page](/compliance/), and the boundary
is stated there too: software implements a position, it does not make a lender compliant.

## Frequently asked questions

### When does an account become NPA under RBI norms?

When it has been overdue for more than ninety days, determined in the day-end process rather than at
a reporting date. The RBI's 15 November 2021 clarification requires the overdue flag to be applied as
part of the day-end process for the due date itself, which is what makes the ninety-day count start
on day one rather than whenever a report is run.

### Can an NPA account be upgraded when the borrower part-pays?

No. The 2021 clarification requires the entire arrears of interest and principal to be paid before an
account classified as NPA is upgraded to standard. A part-payment that brings the account under
ninety days does not upgrade it, which is a change from what many systems did previously.

### Are penal charges allowed to be compounded?

No. Under RBI/2023-24/53 penal amounts are charges rather than interest, so no interest is computed
on them and they are not capitalised to the principal outstanding. They must also be disclosed in the
loan agreement and the Key Facts Statement, and be reasonable relative to the default.

### What gold rate should an NBFC use for valuation?

The lower of the 30-day average closing price and the previous day's closing price of 22-carat gold,
as published by IBJA or a SEBI-recognised exchange, with lower purities adjusted proportionately.
Using the latest rate on file, however old, does not meet the basis the 2025 directions prescribe.

### Is compliance software enough to satisfy an RBI inspection?

No, and any vendor who says otherwise should worry you. What a system can do is make the correct
treatment automatic, keep the classification and the ledger reading from the same rows, and leave a
trail that shows what was applied and when. The policy decisions, the board approvals and the
sign-offs remain the lender's.

---

**Related reading:** [Penal charges are charges](/blog/penal-charges-not-interest/) ·
[Classification is a day-end event](/blog/irac-day-end-classification/) ·
[Income reversal on NPA](/blog/npa-income-reversal/) ·
[What the KFS APR includes](/blog/kfs-what-goes-in-the-apr/) ·
[The 2025 gold directions](/blog/gold-loan-directions-2025/) ·
[SMA classification](/blog/sma-classification-what-it-signals/)

If you want to see how these are implemented rather than described,
[ask for a walk-through](/contact/).
