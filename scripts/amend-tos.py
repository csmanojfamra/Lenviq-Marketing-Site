#!/usr/bin/env python3
"""
Apply the liability-floor amendment to the Terms of Service .docx itself.

The floor was being applied by `import-legal.mjs` at publish time. That was the right holding
position — the published page said the right thing and the amendment could not be silently lost —
but it meant the SIGNED document and the PUBLISHED terms differed. A contract is the one artefact
where that gap is not acceptable: the .docx is what a customer's counsel is sent, and it should not
be the version that omits the term.

So this edits the source, once, and the importer's amendment is removed in the same change.

    python3 scripts/amend-tos.py

Idempotent: run it twice and the second run reports that the clause already reads correctly.
It rewrites word/document.xml and copies every other part of the zip through byte-identical, which
is why Word opens the result without complaint. No dependency — zipfile is in the standard library,
and this repository is not taking on an npm package to edit one paragraph.
"""
import os
import re
import shutil
import sys
import zipfile

SRC = "Terms and Privacy Policy/files/Lenviq_Terms_of_Service_v2.docx"

# ---------------------------------------------------------------------------------------------
# The floor, and why it is a lakh rather than fifty thousand.
#
# The floor only ever bites where twelve months' fees are BELOW it — a pilot, a partial first year,
# or the smallest single-branch lender. For everyone else the fee limb is higher and the floor is
# never reached, so this is not a general exposure; it is what a customer is left with when they
# have barely started paying.
#
# Zoho's own benchmark is USD 1,000, a little over eighty thousand rupees. Fifty thousand sits below
# that. This product runs an NBFC's regulatory book — a defect can cost a customer a misclassified
# portfolio or a wrong return — and a vendor capping that at fifty thousand invites the reasonable
# question of whether it believes its own software. A lakh is round, above the benchmark, and the
# additional exposure is at most fifty thousand rupees per claim, against a customer whose annual
# fees have not yet reached it.
#
# Note the clause is symmetric ("either party"), so the floor applies to the Customer's liability to
# us as well. Clause 28.4 already carves the Customer's fee obligation and indemnity out of the cap,
# so raising the floor does not weaken our position on the things we would actually claim for.
# ---------------------------------------------------------------------------------------------
EDITS = [
    (
        "Clause 28.2 — liability floor",
        "shall not exceed the Fees paid and payable by the Customer under this Agreement in the "
        "twelve (12) months immediately preceding the first event giving rise to the claim.",
        "shall not exceed the higher of (a) INR 1,00,000 (Rupees One Lakh) and (b) the Fees paid "
        "and payable by the Customer under this Agreement in the twelve (12) months immediately "
        "preceding the first event giving rise to the claim.",
    ),
    (
        "Version marker",
        "Version 2.0  |  Effective from: 01 April 2026",
        "Version 2.1  |  Effective from: 01 April 2026",
    ),
    (
        "Version reference in the precedence clause",
        "General Terms of the Lenviq Terms of Service and Master Subscription Agreement, Version 2.0",
        "General Terms of the Lenviq Terms of Service and Master Subscription Agreement, Version 2.1",
    ),
]


def main() -> int:
    if not os.path.exists(SRC):
        print(f"Not found: {SRC}", file=sys.stderr)
        return 1

    with zipfile.ZipFile(SRC) as z:
        parts = {n: z.read(n) for n in z.namelist()}
        order = z.namelist()

    if "word/document.xml" not in parts:
        print("word/document.xml missing — is this a .docx?", file=sys.stderr)
        return 1

    xml = parts["word/document.xml"].decode("utf8")
    changed = already = 0

    for what, find, replace in EDITS:
        if replace in xml:
            print(f"  = {what} — already amended")
            already += 1
            continue
        n = xml.count(find)
        if n != 1:
            print(f"  ! {what} — expected 1 occurrence of the source text, found {n}.", file=sys.stderr)
            print("    The clause has changed in the document. Amend it by hand and update this script.",
                  file=sys.stderr)
            return 1
        xml = xml.replace(find, replace)
        print(f"  ~ {what}")
        changed += 1

    if not changed:
        print(f"Nothing to do — {already} edit(s) already present.")
        return 0

    # Keep the pre-amendment file once, so the change is reversible without reading git history.
    backup = SRC.replace(".docx", "_pre-amendment.docx")
    if not os.path.exists(backup):
        shutil.copyfile(SRC, backup)

    parts["word/document.xml"] = xml.encode("utf8")
    tmp = SRC + ".tmp"
    with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as z:
        for name in order:                     # original order, so Word sees the parts it expects
            z.writestr(name, parts[name])
    os.replace(tmp, SRC)

    print(f"\n{changed} edit(s) written to {SRC}")
    print(f"Backup of the previous version: {backup}")
    print("\nThe PDF alongside it is now STALE — re-export it from Word before sending it to anyone.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
