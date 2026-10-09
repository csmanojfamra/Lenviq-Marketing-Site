# Screenshots a page wants and does not have

**Why this file exists.** `ProductSpec.shots` is optional, and the reason is a refusal rather than a
convenience: a page ships without a screenshot when no *honest* one exists for it. This records
which, so the gap is a queue rather than an omission nobody remembers.

---

## `/microfinance-software/` — two wanted, zero available

The capture set (`public/shots/shots.json`, 23 shots) contains no group-loan or JLG screen. The two
nearest candidates were both rejected, and the reasons are the point:

| Candidate | Why not |
|---|---|
| `approvals-inbox` (`/approvals-inbox`) | Shows **Loan Against Property** applications of ₹66–97 lakh. On a microfinance page that is the wrong asset class in the illustration, which is exactly the doorway pattern `src/lib/products/types.ts` warns about — and a microfinance lender would notice in a second |
| `field-collect` (`/mobile/collections/{id}`) | Operationally right — a field collection screen is what an officer uses at a centre meeting — but it carries a borrower name, a ward-level address and **a phone number** (`9863627094`), plus a `UDR/` loan-number prefix. See the note below; this needs a decision before it is reused anywhere, let alone extended to a new page |

**What the page wants, when a demo MFI tenant can be captured:**

1. **After the intro — a group loan proposal with its preflight result.** The claim it should carry
   is the one the page rests on: every member checked and every failure named *before* a checker
   sees the list. Route is the group-loan proposal detail on an `NBFC_MFI` or `SECTION_8_MFI`
   tenant.
2. **After the "what a group book has to do" section — the executed round.** N loan accounts from
   one approval, each its own account. This is the claim worth showing rather than asserting.

**Why they were not captured tonight — corrected after checking properly.**

My first answer was "there is no capture script". That was true of **this** repo and wrong about the
system. The script is `scripts/marketing-shots.mjs` in **fintrustsuite**, it is well built, and its
header states the design: the site's images are an output of the running product, *"a screenshot
cannot drift from what the software does, because it is what the software did thirty seconds ago."*
It has an `--audit` mode that writes nothing and prints what would be captured.

**The real blocker is narrower and is not environmental.** The script's shot list is a fixed set of
23, each naming the record it opens. Adding two microfinance shots means **editing
`scripts/marketing-shots.mjs` in the product repo**, and the brief reserves changes to the product
repo to Manoj. So this is not "I could not"; it is "I may not", which is a better answer and a
smaller job than it looked: two entries in that list and a rerun.

## The two concerns I raised, both now resolved by checking

**1. `UDR` is not a tenant. It is a branch code — Udaipur**, seeded at `prisma/seed.ts:233`
alongside `JAI` for Jaipur. No live tenant is named in any screenshot, and nothing needs
recapturing on that ground.

**2. The phone number is generated, not leaked.** `9863627094` belongs to "Pankaj Sharma", created
by `scripts/seed-pilot-book.mjs`, whose names come from a fixed list and whose mobiles are random:
`` `98${between(10000000, 99999999)}` ``. It is not a borrower's number and there is no data-protection
incident here.

**One real point survives, and it is smaller and different from what I first said.** A *randomly
generated* number in the 98xxxxxxxx range is not an unassignable number — it is very likely to be
somebody's live subscription. Publishing it on a marketing site means a stranger could take calls
meant for a demo. The fix is a reserved range rather than a sweep: India's 99999xxxxx-style ranges,
or the fictional-number convention, would make the generator safe by construction. A decision for
Manoj, and a small one.

**And the recipe is recorded after all.** I said `shots.json` keeps only the route and that no shot
could be reproduced exactly. Wrong: `marketing-shots.mjs` names the **subject record** for every
shot — `--audit` prints them, e.g. `loan UDR/LN/2025-26/000021 — Pankaj Sharma`,
`gold JAI/LN/2025-26/000003` — which is the recipe the brief asks for. It lives in the script rather
than in `shots.json`, which is arguably the better place, since that is also what reruns it.
