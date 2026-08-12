---
title: "Which layer are you in, and what actually changes"
description: "Scale-Based Regulation put every NBFC in one of four layers. The layer is not a label — it decides governance, disclosure and, since 2025, whether you may levy a prepayment charge at all."
date: "2026-08-11"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

Your **layer** under scale-based regulation is no longer a classification you establish once and
forget. Later instruments key off it directly — the prepayment charges Directions bar an Upper Layer
NBFC outright, cap a Middle Layer one at ₹50 lakh, and name the Base Layer in neither. Knowing which
layer you are in is now an input to what your systems must enforce.

Scale-Based Regulation ([RBI/2021-22/112](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12179&Mode=0),
22 October 2021, effective 1 October 2022) replaced a single rulebook with four layers. Most NBFCs
read it once, established they were in the Base Layer, and moved on. That was reasonable in 2022 and
is no longer enough, because later instruments have started keying off the layer directly.

## The four layers

**Base Layer** — asset size below ₹1,000 crore, plus P2P platforms, account aggregators, NOFHCs, and
NBFCs with neither public funds nor public interface.

**Middle Layer** — all deposit-taking NBFCs regardless of size, and non-deposit-taking NBFCs at
₹1,000 crore and above. Standalone primary dealers, infrastructure debt funds, core investment
companies, housing finance companies and infrastructure finance companies sit here whatever their
size.

**Upper Layer** — identified by name by the Reserve Bank, on a scoring methodology. You do not
arrive here by growth alone; you are told.

**Top Layer** — empty by design, and populated only if systemic risk from a specific company rises.

## Why the layer stopped being trivia

The Pre-payment Charges Directions, 2025 are the clearest example. They bar prepayment charges on
business loans by naming entity classes — NBFC-UL outright, NBFC-ML up to ₹50 lakh — and say nothing
about the Base Layer, which therefore falls to the residual paragraph and its own board policy.

The strings "NBFC-BL" and "Base Layer" do not appear in that instrument at all. A Base Layer NBFC
that assumed the stricter reading applied to it would be refusing itself a charge it is lawfully
entitled to levy; one that crosses into the Middle Layer and does not notice would be levying one it
is not.

## What that means operationally

Two things worth having written down rather than remembered.

**The layer is a fact about the company on a date**, and asset size moves. A company approaching
₹1,000 crore should know which of its rules change on the day it crosses, not discover it at the
next inspection.

**Systems that encode a regulatory test have to encode the layer**, not a constant. A prepayment
rule hard-coded to one answer is correct for exactly one class of lender and silently wrong for the
others — and the failure is invisible, because a charge that should have been levied and was not
produces no error anywhere.

## What does the layer decide in practice?

| Area | Base Layer | Middle Layer | Upper Layer |
|---|---|---|---|
| Prepayment charges, business loans to individuals/MSE | Per approved policy | Barred up to ₹50 lakh sanctioned | Barred, no threshold |
| Governance requirements | Lighter | Higher | Highest, including a listing requirement |
| Risk management | Board policy | Prescribed functions | Prescribed functions and CRO |
| Disclosure | Lighter | Expanded | Expanded |
| Internal capital adequacy | — | — | Required |

The row that matters day to day is the first, because it is the one a system enforces on every
foreclosure quote. The rest are organisational.

## Common mistakes

- **Applying a higher layer's rule to yourself.** Enforcing a restriction the regulator declined to
  impose is not conservatism; it is a commercial decision made by mistake.
- **Assuming the layer follows only from asset size.** All deposit-taking NBFCs are Middle Layer
  whatever their size, and several categories sit there by type.
- **Assuming you can grow into the Upper Layer.** Upper Layer entities are identified by the Reserve
  Bank by name, on a scoring methodology.
- **Hard-coding the layer in the software.** It changes, and when it does every rule that keys off it
  has to change with it.
- **No record of which layer was in force when a decision was taken.** A charge levied under the old
  layer is not wrong because the layer later changed.

## How this lands in a lending system

The layer should be **configuration on the tenant**, not an assumption in code, because the rules
that read it will multiply. Today it decides the prepayment charge treatment. It already shapes what
returns apply. It will decide more.

The second requirement is that a change of layer is a **dated event**, not an edit. A loan foreclosed
last year under Base Layer treatment was correctly treated then, and a system that recomputes history
against today's layer will make past decisions look wrong.

## Frequently asked questions

### How does an NBFC know which layer it is in?

Base and Middle Layer follow from the criteria — asset size, deposit-taking status, and category.
Upper Layer entities are identified by name by the Reserve Bank on a scoring methodology, and are
told; you do not arrive there by growth alone. The Top Layer is empty by design.

### Does the layer affect prepayment charges?

Directly. The 2025 Pre-payment Charges Directions bar an Upper Layer NBFC from levying them on
business loans to individuals and MSEs with no threshold, bar a Middle Layer NBFC up to ₹50 lakh
sanctioned, and name the Base Layer in neither limb — so a Base Layer NBFC charges per its
board-approved policy.

### Do all deposit-taking NBFCs sit in the Middle Layer?

Yes, regardless of asset size, along with standalone primary dealers, infrastructure debt funds, core
investment companies, housing finance companies and infrastructure finance companies.

### What happens when an NBFC moves between layers?

The obligations of the new layer apply from the transition, and the software has to treat the change
as a dated event rather than a retrospective restatement — decisions taken correctly under the
previous layer were correct when taken.

### Should the layer be configurable in the software?

Yes. More instruments key off it every year, and a layer hard-coded in application logic is a change
request every time one of them moves.

---

**Related reading:** [Prepayment charges after the 2025 Directions](/blog/prepayment-charges-2025/) ·
[RBI compliance for NBFCs](/blog/rbi-compliance-for-nbfcs-guide/) ·
[How to generate RBI returns](/blog/how-to-generate-rbi-returns-nbfc/) ·
[NBFC software: the complete guide](/blog/nbfc-software-complete-guide/)

[Ask for a walk-through](/contact/) — foreclose the same loan at two different layers.
