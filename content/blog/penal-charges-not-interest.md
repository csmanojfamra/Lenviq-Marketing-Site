---
title: "Penal charges are charges: what the August 2023 direction changed in the ledger"
description: "Why penal amounts stopped being interest, what that means for compounding, capitalisation and the general ledger, and what it implied for existing agreements."
date: "2026-08-10"
category: "Regulatory"
author: "FastLegal Technologies"
draft: false
---

The Reserve Bank's circular on fair lending practice and penal charges in loan accounts
([RBI/2023-24/53, DoR.MCS.REC.28/01.01.001/2023-24](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12527&Mode=0),
dated 18 August 2023) drew a line that a lot of
loan systems had been living on the wrong side of: a penalty for non-compliance with a material term
is a **charge**, not a component of the interest rate.

## What follows from the distinction

Once a penal amount is a charge rather than interest, three things follow mechanically.

**It does not compound.** The circular is unambiguous: *"There shall be no capitalisation of penal
charges i.e., no further interest computed on such charges."* A system that added the penal amount
to the outstanding and then computed the next period's interest on the new balance was charging
interest on a penalty.

**It is not added to principal.** The outstanding principal is what the borrower borrowed less what
they have repaid against it. A penal charge sits outside that balance.

**It is disclosed as a charge.** In the Key Facts Statement it appears among contingent charges,
not in the rate.

## What it means in the general ledger

If a penal amount is income only when it is received, then accruing it into income at the moment it
is levied overstates income for every account where it is never collected — which, on a delinquent
book, is a lot of them. The conservative treatment is to show the levy on the borrower's statement
so they can see what has been applied, and to post to income on receipt.

Settlement order matters too. Where a receipt is less than the total due, which head it clears first
changes both the borrower's outstanding and the lender's income. That order should be a stated
policy applied consistently rather than an emergent property of the code.

## The dates, which moved

The original circular set 1 January 2024. It was then extended by
[RBI/2023-24/102](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12585&Mode=0) dated
29 December 2023, and the operative dates are:

- **Fresh loans** — the instructions apply to all loans availed from **1 April 2024** onwards.
- **Existing loans** — the switchover happens on the next review or renewal date falling on or
  after 1 April 2024, and **not later than 30 June 2024**.

A lender with a long book therefore ran two regimes at once for a quarter. That is worth checking
in any system: an account that switched over in April and one that switched in June should not be
treated identically merely because both are delinquent today, and a system that applied the new
treatment retrospectively to closed periods has restated its own books.

---

*Both circulars are linked above. The compounding, capitalisation and disclosure points are quoted
from the first; the dates from the second.*
