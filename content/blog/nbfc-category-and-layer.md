---
title: "NBFC-ICC in the Base Layer: why your NBFC has two labels, not one"
description: "The category says what an NBFC does. The layer says how much regulation it gets. They are separate questions with separate answers, every NBFC carries one of each, and the reason it feels like a contradiction is that they arrived seven years apart. Also: what happened to NBFC-ND-SI."
metaDescription: "Category says what an NBFC does; layer says how much regulation it gets. Every NBFC carries one of each — and NBFC-ND-SI no longer exists."
date: "2026-08-30"
category: "Regulatory"
author: "CS Sushil Choudhary"
tool: "nbfc-layer-finder"
draft: false
---

If your certificate of registration says **NBFC-ICC** and a compliance note says you are in the
**Base Layer**, nothing has gone wrong and neither one replaces the other. They answer two different
questions:

- **The category answers *what do you do*.** Investment and Credit Company, Microfinance, Factor,
  Account Aggregator. It is about the activity.
- **The layer answers *how much regulation do you get*.** Base, Middle, Upper, Top. It is about size
  and systemic importance.

Every NBFC carries **one of each, at the same time**. “An NBFC-ICC in the Base Layer” is not two
competing classifications — it is one complete description, in the same way that a vehicle has both a
type and an engine size and neither is the “real” one.

The confusion is entirely understandable, because the two systems arrived years apart and nobody
retired the first when the second turned up.

## Why it feels like a contradiction

**Until 2019 the categories were the whole system.** There were a lot of them, and they described the
entity: an Asset Finance Company was one thing, a Loan Company another, an Investment Company a
third, each with its own rulebook. In practice the boundaries blurred — the same lender could
plausibly sit in two.

**In February 2019 the Reserve Bank collapsed three of them into one.** A notification dated
**22 February 2019**, following the bi-monthly policy statement of 7 February, merged **Asset Finance
Companies, Loan Companies and Investment Companies** into a single category: **NBFC-ICC, the
Investment and Credit Company**. The stated principle was *regulation by activity rather than
regulation by entity*.

That is why so many NBFCs are ICCs. It is not a narrow specialist category — it is the general one,
the category an ordinary lender falls into when it is not one of the specific things on the list.

**In October 2021 the Reserve Bank added a second axis entirely.** Scale Based Regulation introduced
the four layers. It did not replace the categories; it sat on top of them. The intensity of
regulation would now track the size and systemic importance of the NBFC, not just what it did for a
living.

So an NBFC that had been an NBFC-ICC since 2019 became an NBFC-ICC **in a layer**, and both labels
were correct, and nobody sent a letter explaining that this was the intention.

## What happened to NBFC-ND-SI

If you have been in this industry a while, the classification you remember is probably
**non-deposit-taking systemically important** — NBFC-ND-SI, the ₹500 crore threshold.

**That classification no longer exists.** Scale Based Regulation ended the split between
systemically important and non-systemically important NBFCs. In the Master Direction the Reserve Bank
was explicit: references to NBFC-ND-SI are now to be read as **NBFC-ML or NBFC-UL** as applicable, and
existing ND-SIs with assets of ₹500 crore and above but below ₹1,000 crore — unless their category
kept them out — were **reclassified into the Base Layer**.

That last part is worth sitting with, because it went the opposite way to most people's instinct. A
number of NBFCs that had been “systemically important” for years found themselves in the *lowest*
layer, with a lighter regime than before. Nothing about them had changed. The threshold had.

If a policy document, a template or a consultant's note still uses NBFC-ND-SI, it predates
October 2021 and everything downstream of it is worth re-checking.

## The categories, as they stand

| Category | What it does |
| --- | --- |
| **NBFC-ICC** | Investment and Credit Company. Lending and investment generally — the category most NBFCs are in. |
| **NBFC-MFI** | Microfinance. Collateral-free lending to low-income households, with its own conduct rules. |
| **NBFC-Factor** | Factoring — buying receivables. |
| **NBFC-IFC** | Infrastructure Finance Company. |
| **IDF-NBFC** | Infrastructure Debt Fund, refinancing completed infrastructure projects. |
| **CIC** | Core Investment Company, holding investments in its own group. |
| **NBFC-MGC** | Mortgage Guarantee Company. |
| **NBFC-AA** | Account Aggregator. Moves financial data with consent; does not lend. |
| **NBFC-P2P** | Peer-to-peer lending platform. Matches lenders and borrowers; does not lend off its own book. |
| **HFC** | Housing Finance Company, regulated by the Reserve Bank since 2019. |
| **SPD** | Standalone Primary Dealer. |
| **NOFHC** | Non-Operative Financial Holding Company. |

Your category is on your certificate of registration. It is not something to work out — it is
something to read.

## Which categories can be in which layer

This is where the two axes interact, and it is the part worth actually knowing.

**Some categories are pinned to a layer regardless of size.**

- **Always Base Layer:** NBFC-P2P, NBFC-AA, NOFHC, and any NBFC with no public funds and no customer
  interface. A ₹5,000 crore Account Aggregator is still Base Layer, because an AA does not carry
  credit risk.
- **Always Middle Layer:** IDF-NBFC and SPD.
- **Never Base Layer:** deposit-taking NBFCs, CICs, IFCs and HFCs. These are Middle Layer, and can be
  named into the Upper Layer.

**The rest are placed by size.** NBFC-ICC, NBFC-MFI, NBFC-Factor and NBFC-MGC can be in any layer.
Non-deposit-taking and below ₹1,000 crore of assets puts them in the Base Layer; at or above it, the
Middle Layer.

**And the Upper Layer is not a threshold at all.** It is a designation. The Reserve Bank identifies
those NBFCs and publishes the list — seventeen names currently — using a scoring model that no
company can run on itself. You cannot compute your way into the Upper Layer and you cannot compute
your way out. [The layer finder](/tools/nbfc-layer-finder/) works this out for the three layers where
it is a question of fact, and asks you about the fourth rather than pretending.

## What each label actually decides

Once the distinction is clear, the practical question is which label to check when something comes up.

**The layer decides prudential intensity.** Capital adequacy. The standard-asset provisioning rate —
0.25% in the Base Layer, 0.40% in the Middle. How long an account stays sub-standard before it turns
doubtful — eighteen months in the Base Layer, twelve in the Middle and Upper. Board committee
requirements, internal capital adequacy assessment, the concentration limits. When you are asking
*how strictly am I regulated*, the answer is the layer's. The
[provisioning calculator](/tools/nbfc-provisioning-calculator/) takes the layer as its first input for
exactly this reason.

**The category decides activity-specific conduct.** An NBFC-MFI has qualifying asset requirements and
household income limits that no ICC has. An NBFC-P2P has exposure caps and cannot lend off its own
balance sheet. An NBFC-AA has a data framework and no lending rules at all, because it does not lend.
A CIC has its own asset composition test. When you are asking *what rules apply to this product*, the
answer is often the category's.

What each layer actually requires — governance, disclosure, the committees, the limits — is a
subject of its own, and is worked through in
[which layer are you in, and what actually changes](/blog/scale-based-regulation-layers/).

**And several things need both.** Supervisory returns are the clearest example: which returns you
file depends on your layer *and* your category *and* whether you accept deposits — which is a third
thing again. [The returns calendar](/tools/nbfc-returns-calendar/) asks all three, because two of them
is not enough to produce a correct filing list.

## The one-line answer

If somebody asks what kind of NBFC you are, the complete answer has two halves and a possible third:
**an NBFC-ICC, in the Base Layer, non-deposit-taking.** Category, layer, deposits. Each answers
something the other two do not, and dropping one is how people end up applying the wrong provisioning
rate or filing the wrong return.

## Frequently asked questions

### Is NBFC-ICC a layer or a category?

A category. It says what the NBFC does — lending and investment generally. The layer is separate and
says how much regulation applies. Every NBFC carries one of each at the same time.

### Does NBFC-ND-SI still exist?

No. Scale Based Regulation ended the split between systemically important and non-systemically
important NBFCs. References to NBFC-ND-SI now read as NBFC-ML or NBFC-UL, and a number of former
ND-SIs were reclassified into the Base Layer.

### Which category is on my certificate of registration?

Whichever one the Reserve Bank granted. It is not something to work out — read it off the
certificate. Most ordinary lenders are NBFC-ICC, because that is the general category rather than a
specialist one.

### Can an NBFC change its category?

Only by applying to the Reserve Bank. A change of category is a change to the certificate of
registration, not something that follows from a change in the business mix.

### Which categories can be in any layer?

NBFC-ICC, NBFC-MFI, NBFC-Factor and NBFC-MGC are placed by size. NBFC-P2P, NBFC-AA and NOFHC are
always Base Layer. IDF-NBFC and SPD are always Middle Layer. Deposit-taking NBFCs, CICs, IFCs and
HFCs are never Base Layer.

### Does the layer or the category decide my provisioning rate?

The layer, for the standard-asset rate and for how long a loan stays sub-standard. The category does
not change either.

---

*Sources: RBI notification on harmonisation of NBFC categories, 22 February 2019; Master Direction —
Reserve Bank of India (Non-Banking Financial Company — Scale Based Regulation) Directions, 2023,
19 October 2023. Your certificate of registration and your board-approved policy govern your own
position.*
