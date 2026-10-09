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

**Why they were not captured tonight.** Not a product limitation and not a missing feature — the
screens exist. It is **this environment**: the product UI is behind host routing and TOTP from
here, there is no capture script in this repo (`scripts/` has none), and the existing shots were
produced elsewhere. Capturing requires a running product instance with a seeded MFI demo tenant and
a logged-in session, which is a separate job.

## A note on the existing capture set, for Manoj rather than for me to act on

Two things worth a decision, both pre-existing and neither introduced tonight:

1. **`field-collect` shows a phone number** — `9863627094` — alongside a borrower name and a
   ward-level address. Whether the number is synthetic or not, it is on a public marketing site and
   it reads as real. This is the kind of thing worth a sweep rather than a glance.
2. **Loan numbers carry a `UDR/` prefix** (`UDR/LN/2025-26/000021`, `UDR/PROP_FIN/2026-27/00022`),
   which looks like a tenant code. The brief forbids naming a live tenant in a screenshot. If `UDR`
   is a demo tenant this is fine and worth confirming once; if it is not, the shots need recapturing.

**And the recipe gap.** `shots.json` records each shot's `path` — the route — which is half of what
the brief asks for. It does not record the **tenant** or the **state** the screen was in, so a shot
cannot be reproduced exactly and will go stale silently, which is precisely the failure the brief
names. Adding `tenant` and `state` fields to `shots.json` entries would close it; not done tonight
because it changes a file the capture process writes and I could not see that process from here.
