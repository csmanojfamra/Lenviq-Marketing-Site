---
title: "RBI returns for NBFCs: which return, who files it, and what each one is built from"
description: "The DNBS returns an NBFC files, one row each — what the return covers, which layer and asset size it applies to, when it is due, and which part of the books each figure has to come out of."
metaDescription: "DNBS01 to DNBS14, FMR and SAC returns: who files each one, the layer and asset-size thresholds, and the due dates under the 2024 Returns Directions."
date: "2026-10-09"
category: "Reporting"
author: "CS Manoj Famra"
draft: true
---

Three questions get conflated whenever NBFC returns are written about: *which returns exist*, *which
ones apply to me*, and *where do the figures come from*. They have different answers and the third
is the one that costs time, because a return is not a form — it is an assertion about the books, and
the books have to be able to produce it twice and get the same answer.

This page takes the returns one at a time. Applicability and timing come from the Reserve Bank's
2024 Directions. The note on what each return is built from is an operational observation, not a
regulatory requirement, and is marked as such.

## The governing text, and the date that matters

[Master Direction — Reserve Bank of India (Filing of Supervisory Returns) Directions,
2024](https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=12613) — RBI/DoS.DSG/2023-24/110
and DoS.DSG.No.10/33.01.001/2023-24, dated **27 February 2024**.

What it did:

- **Repealed** the Master Direction — Non-Banking Financial Company Returns (Reserve Bank)
  Directions, 2016, and the clauses listed in its Annex II.
- Consolidated around twenty scattered reporting instructions into one document.
- **Harmonised the filing timelines.** Most quarterly DNBS returns moved from 15 days to **21 days**
  from the reference date. DNBS04B moved from 10 days to **15**. And **DNBS02 moved from annual
  within 60 days to quarterly within 21 days** — the single biggest change for a Base Layer NBFC.
- Applies to all NBFCs. **Housing Finance Companies are excluded**, as are Regional Rural Banks from
  the bank category.

If a filing guide describes DNBS02 as annual, it is describing the position before February 2024.
Two of the most-cited ones still do, and they disagree with each other.

---

## Every return, and who has to file it

### Financial and prudential — the core set

**DNBS01 — Important Financial Parameters.** Quarterly, within 21 days.
Assets and liabilities, profit and loss, sensitive-sector exposure and sectoral credit.
**Applies to:** NBFC-Upper Layer and NBFC-Middle Layer, except CICs.

*Built from:* the trial balance, plus a sectoral classification of the loan book. The sectoral
split is the part that is rarely a report and usually a spreadsheet — it needs every loan to carry a
classification at origination, because deriving it afterwards from purpose text is guesswork.

**DNBS02 — Important Financial Parameters (NBFCs – BL).** **Quarterly**, within 21 days.
Financial details and compliance with prudential norms.
**Applies to:** NBFCs in the **Base Layer**, except P2Ps.

*Built from:* the trial balance and the asset classification register. If you are a Base Layer NBFC
this is your return, and the frequency change in 2024 is the one to diarise.

**DNBS03 — Important Prudential Parameters.** Quarterly, within 21 days.
Prudential norms — capital adequacy, provisioning.
**Applies to:** NBFC-UL and NBFC-ML, except CICs.

*Built from:* the asset classification at the quarter-end **day-end position**, and the provision
computed on it. Classification is a day-end event
([RBI/2021-2022/125](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12194&Mode=0),
12 November 2021), so a provisioning figure recomputed at 11am on a later date will not reproduce
the number you filed. The quarter-end position has to be retained, not recalculated —
[why that matters](/blog/irac-day-end-classification/).

### Liquidity

**DNBS04A — Short Term Dynamic Liquidity (STDL).** Quarterly, within 21 days.
**Applies to:** NBFC-UL; NBFC-ML except standalone primary dealers; and **NBFC-BL with asset size of
₹100 crore and above**, solely or at group level. Excludes Type-I NBFCs, NOFHCs, P2Ps, Account
Aggregators and Mortgage Guarantee Companies.

**DNBS04B — Structural Liquidity and Interest Rate Sensitivity.** **Monthly**, within 15 days.
Same applicability as DNBS04A.

*Built from:* projected cash flows by bucket. Which means contractual repayment schedules, not
balances — a system that stores only outstanding amounts cannot produce this without rebuilding
every schedule.

### Credit information

**DNBS08 — CRILC-Main.** Monthly, within 15 days.
Credit information on borrowers with aggregate exposure of **₹5 crore and above**.
**Applies to:** NBFC-UL; NBFC-ML except CICs; and NBFC-BL entities that are **ICC, MFI or Factors
with asset size of ₹500 crore and above**.

**DNBS09 — CRILC Weekly (RDB return).** Weekly — reference date Friday, due **on or before the
Wednesday following**. Large borrowers who defaulted, or moved out of default, during the week.
Same applicability as DNBS08.

*Built from:* exposure **aggregated per borrower across accounts**, not per account. A borrower with
four facilities below the threshold individually can cross ₹5 crore in aggregate, and the return is
about the borrower.

### Core Investment Companies

**DNBS11 — Important Financial Parameters.** Quarterly, within 21 days. NBFC-CICs.
**DNBS12 — Important Prudential Parameters.** Quarterly, within 21 days. Adjusted net worth,
provisioning. NBFC-CICs.

### Overseas investment

**DNBS13 — Overseas Investment Details.** Quarterly, within 21 days. **All NBFCs** — and **a NIL
return is required** where there are no overseas investments.

This is the return most often missed, for the obvious reason: an NBFC with nothing to report assumes
there is nothing to file.

### Peer-to-peer

**DNBS14 — P2Ps.** Quarterly, within 21 days. Financial and prudential parameters. NBFC-P2Ps.

### Asset Reconstruction Companies

**DNBS07 — ARCs Important Financial Parameters.** Quarterly, within 21 days. Assets and liabilities,
acquired assets, recovery status. ARCs only — included here because ARCs are covered by the same
Directions.

### Audit certificates

**DNBS10 — Statutory Auditor Certificate (SAC).** Yearly, reference date 31 March. **Annex IV
timeline:** within **5 working days of the date of signing of the auditor's report** under section
134 of the Companies Act, 2013, and **not later than 31 December**. Filed by the statutory auditor.
**Applies to:** all NBFCs and ARCs of **₹500 crore and above**.

**Form A Certificate.** Annual, reference date 31 March. Certificate on appointment of the Statutory
Central Auditor / Statutory Auditor. **Annex IV timeline:** within **one month of the date of
appointment**. All NBFCs.

### Fraud and incident

**FMR-I — actual or suspected frauds.** As and when detected; **within three weeks of the date of
detection**. NBFC-UL, NBFC-ML, and Base Layer ICCs, MFIs and Factors of **₹500 crore and above**.
**FMR-III — update of FMR-I.** Immediately on a progress update. Same applicability.
**FMR-IV — dacoities, robberies, theft, burglaries.** Quarterly. Same applicability.

### Also listed

**Financial Soundness Indicators (FSI).** Quarterly. Consolidated indicators furnished to the IMF.

---

## The two thresholds worth writing on a wall

Almost every applicability question above reduces to these:

- **₹100 crore** — DNBS04A and DNBS04B begin to apply to a Base Layer NBFC.
- **₹500 crore** — the CRILC returns (DNBS08, DNBS09), the fraud returns (FMR-I, III, IV) and the
  Statutory Auditor Certificate begin to apply.

Below ₹100 crore, a Base Layer NBFC's return set is small: DNBS02 quarterly, DNBS13 quarterly
including NIL, Form A annually, and nothing else from the list above.

## What makes a return hard, and it is not the form

Three figures cause most of the re-work, and all three are about the shape of the records rather than
the filing:

1. **The quarter-end classification has to be retained.** Classification is computed in the day-end
   process; re-deriving it from today's balances produces a different number. If the only way to get
   the figure you filed is to recompute it, you cannot defend it.
2. **Exposure aggregates per borrower.** CRILC is borrower-level. Account-level books have to be able
   to roll up by borrower identity, which is a data question that has to be answered at onboarding.
3. **The sectoral split has to exist at origination.** DNBS01 wants sectoral credit. Inferring it
   afterwards from free-text purpose fields is the single most common source of a return that cannot
   be reproduced.

A longer treatment of the systems side — why a return assembled in a spreadsheet eventually
disagrees with the ledger — is in
[how to generate RBI returns without re-keying the book](/blog/how-to-generate-rbi-returns-nbfc/).

## Sourcing

Scope, repeal and the periodicity timelines were read from the Reserve Bank's own Master Directions
page. **The Annex III return list, its coverage descriptions and the applicability thresholds were
read from a verbatim reproduction of the Directions rather than from the Reserve Bank's PDF.** They
agree with the primary page on every point the two overlap, and the structure matches. Before you
rely on a threshold to decide whether a return applies to you, open
[Annex III](https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=12613) and read the row.

The *built from* notes are operational observation, not regulation. Nothing in the Directions
prescribes where a figure must come from inside your systems.

Written **9 October 2026**.


## Frequently asked questions

### Is DNBS02 an annual or a quarterly return?

Quarterly, within 21 days of the quarter end. It moved from annual-within-60-days under the 2024
Supervisory Returns Directions, and it is the largest single change for a Base Layer NBFC. Two
widely-cited filing guides still describe it the old way and contradict each other.

### What asset-size thresholds decide which returns apply?

Two. Rs 100 crore brings DNBS04A and DNBS04B into play for a Base Layer NBFC; Rs 500 crore brings the
CRILC returns, the fraud returns and the Statutory Auditor Certificate.

### Is CRILC reported per account or per borrower?

Per borrower, aggregated across accounts, for exposures of Rs 5 crore and above. A borrower with four
facilities each below the threshold can cross it in aggregate, which is why account-level books have
to be able to roll up by borrower identity.

### Why can a provisioning figure not be recomputed later?

Because classification is computed in the day-end process for the relevant date. A figure re-derived
from today's balances will not reproduce the one filed, so the quarter-end position has to be
retained rather than recalculated.

---

**Related:** [NBFC compliance checklist](/blog/nbfc-compliance-checklist/) ·
[NBFC compliance calendar](/blog/nbfc-compliance-calendar/) ·
[NBFC category and layer](/blog/nbfc-category-and-layer/) ·
[NBFC returns calendar tool](/tools/nbfc-returns-calendar/)
