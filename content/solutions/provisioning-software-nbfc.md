---
title: "Provisioning: the classification decides the rate, and the security decides the base"
description: "A provision is two decisions, and systems collapse them into one. The classification fixes the percentage; the realisable value of security fixes what that percentage applies to. Two accounts at the same days past due can therefore carry very different provisions, correctly."
metaDescription: "The classification fixes the provisioning percentage; the security fixes the base it applies to. Why two accounts at the same DPD differ, correctly."
question: "How is the provision on an NBFC loan actually computed?"
keyword: "NBFC provisioning software"
kind: artefact
author: "CA Himanshu Sharma"
updated: "2026-10-13"
related: "nbfc-provisioning-worked-examples, irac-day-end-classification, npa-income-reversal-software-nbfc, sma-classification-what-it-signals, write-off-what-it-does, nbfc-income-recognition-rbi-rules, scale-based-regulation-layers, books-of-account-what-must-be-kept"
priority: 0.8
draft: true
---

A provision is a charge against profit for expected loss on an advance, and computing one is two
separate decisions that get collapsed into a single percentage. The **classification** — standard,
sub-standard, doubtful, loss — fixes the rate. The **realisable value of the security** fixes what
that rate applies to. A provision is the second decision multiplied by the first, and a system that
holds only a percentage per bucket cannot produce it.

That is why two accounts sitting at identical days past due can carry provisions that differ by an
order of magnitude, and both be right.

## The two decisions, kept apart

**Classification follows from days past due**, computed in a day-end process, and it ages: an
account classified non-performing becomes sub-standard, and remains so for a period after which it
becomes doubtful. Doubtful itself ages further. So classification is a function of *how long* the
account has been non-performing, not only of whether it is — which means the classification engine
has to run every day rather than at the moment somebody asks.

**The base is the exposure net of what the security would actually fetch.** A doubtful advance
carries full provision to the extent it is *not* covered by the realisable value of security, and a
much lower rate on the covered portion. So the provision on a property-backed loan and an unsecured
loan at the same age are not comparable figures, and a report that lists them in one column without
the basis stated is a report nobody can act on.

| Which decision | What it depends on | What moves it |
|---|---|---|
| The **rate** | Classification, and how long the account has held it | The passage of time, with no further default needed |
| The **base** | Exposure less the realisable value of security | A revaluation, a part-release of collateral, a repayment of principal |
| The **total** | Both, multiplied, per account | Either of the above — which is why a provision can rise in a month when nothing happened |

The third row is the one that surprises a board. A provision can increase with no new default and no
new disbursement, purely because accounts aged from one classification into the next. A system that
cannot explain a movement in those terms will be asked to, and will not be able to.

## What has to be stored, not derived

The question an auditor asks is not what the provision is. It is what the provision was at the last
balance-sheet date and why it has moved since. Answering it needs three things kept rather than
recomputed:

- **The classification an account carried on a past date**, as a record. Derived live, it answers
  with today's rule — and a rule since amended gives a different answer, which restates history
  without anybody intending to.
- **The valuation the provision was computed against**, with its own date. A security revalued in
  August does not change what the provision correctly was in June.
- **The movement, per account.** "Opening, additions, releases, write-offs, closing" is the shape
  the question is asked in, and it can only be produced if each change was recorded as a change
  rather than as a new total.

## Provisioning is not income reversal, and not a write-off

Three consequences of one classification, each a different head, routinely confused — and the
confusion overstates the first and understates the third.

- **Income reversal** removes interest that was recognised and never collected. It touches *income*,
  the amount is whatever was accrued and uncollected, and
  [the entries run in both directions](/blog/npa-income-reversal-software-nbfc/).
- **A provision** is a charge for expected loss on *principal*. It does not depend on what interest
  was accrued.
- **A write-off** removes the asset from the books, usually against the provision already carried. It
  is not forgiveness and the borrower still owes the money —
  [which is why it is a different decision](/blog/write-off-what-it-does/).

An account can incur all three, in that order, over two or three years. A system that models them as
one status field has collapsed three decisions, three dates and three sets of entries, and can answer
none of the questions asked about them.

## What a system has to do, and what it must not pretend to do

| Need | What good software does | What it must not pretend to do |
|---|---|---|
| The rate | Derive it from classification *and* how long the account has held it, in a daily run | Hold one percentage per days-past-due bucket. Ageing is not a bucket |
| The base | Compute against exposure net of realisable security value, with the basis named on the report | Report a gross and a net figure in one column |
| Valuation | Keep each valuation with its own date | Apply today's valuation to a past period's provision |
| The movement | Record each change as a change, so opening-to-closing reconciles | Store a total and recompute the movement by subtraction |
| Posting | Post the provision to the product's own ledgers | Pool it, so no product's contribution is visible |
| History | Keep the classification an account carried on each past date | Re-derive it, which restates history whenever a rule changes |
| The adequacy of your provisioning | Nothing | Judge it. The rates are the floor; whether they are enough for your book is a management and audit judgement, and no engine should be sold as making it |

That last row is the honest boundary of any provisioning engine. It computes the regulatory minimum
from rules and recorded values. Whether that minimum is sufficient — whether a security will in fact
fetch what the valuation says — is a judgement the lender makes and signs.

## Frequently asked questions

### Can a provision go down?

Yes, and for two quite different reasons. An account can be upgraded on payment of the entire
arrears, which releases the provision; or a security can be revalued upward, which reduces the
uncovered portion without the account improving at all. A movement report that does not distinguish
them is reporting two different things as one.

### Is provisioning computed per account or per borrower?

Per facility, on its own conduct — and then there is a separate borrower-level question about whether
one non-performing facility makes the borrower non-performing across the rest. That is a rule applied
*after* every facility has been assessed, not instead of assessing them.

### What provision does a standard asset carry?

A general provision on the total outstanding, which is why a growing book increases its provision
charge while every account in it is performing. A lender reading a rising provision as deteriorating
credit may simply be reading growth.

### Does the provision change when interest is reversed?

No. They are different heads computed on different bases — the reversal is about income already
recognised, the provision is about principal expected to be lost. An account incurs both and neither
figure is an input to the other.

### Where does Lenviq stand on this?

Classification runs in a scheduled day-end job that takes the business date as an input, and
sub-classification ageing runs with it, so an account that becomes non-performing is aged on the same
night rather than sitting a day at the wrong classification. The provision run computes on a basis
that is net of collateral by default and can be run gross, and it posts to the product's own ledgers
rather than to a pooled head — the behaviour codes on the application are read for exactly that
purpose. A provision movement report is available. What the platform does not do is judge whether
your provisioning is adequate.
