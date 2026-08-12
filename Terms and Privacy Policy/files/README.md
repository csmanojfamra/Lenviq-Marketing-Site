# The signed documents

`Lenviq_Terms_of_Service_v2.docx` is **Version 2.1**. `scripts/import-legal.mjs` converts these into
`content/legal/*.md`, which the `/terms/` and `/privacy/` pages render — so the published page and
the signed document are the same text by construction, not by anybody remembering.

## What changed in 2.1

Clause 28.2, the general limitation of liability, is now **the higher of ₹1,00,000 and twelve
months' fees**, rather than twelve months' fees alone. It follows the structure Zoho uses, where the
fixed sum is a floor protecting the customer rather than a ceiling protecting the vendor.

Applied by `scripts/amend-tos.py`, which is idempotent and refuses to run if the clause it patches
has moved. The pre-amendment file is kept as `Lenviq_Terms_of_Service_v2_pre-amendment.docx`.

## The PDF is stale

`Lenviq_Terms_of_Service_v2.0_SUPERSEDED_do-not-send.pdf` is the Version 2.0 export. It does **not**
contain the liability floor, so sending it to a customer would send terms that omit a clause in their
favour — and that this repository, the site and the .docx all say is there.

It is renamed rather than deleted so the old text remains available, but it should not be attached to
anything. **Re-export the PDF from Word** and replace it; then delete the superseded one.

The Privacy Policy and Subscription Agreement PDFs are unchanged and current.
