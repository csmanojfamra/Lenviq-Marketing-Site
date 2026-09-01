import type { ProductSpec } from "./types";

/**
 * Business lending — the fifth product page, and the one `types.ts` anticipated.
 *
 * What is true here and on none of the other four: the borrower is not a person. Everything that
 * follows from that — which relationships a constitution must carry before a file can move, whose
 * PAN the bureau is pulled against, who signs — is the substance of this page.
 */
export const BUSINESS: ProductSpec = {
  slug: "business-loan-software",
  eyebrow: "Business lending",
  title: "Business loan software for NBFCs",
  description:
    "Business loan software for NBFCs: eleven constitutions with the KYC each one actually requires, promoter guarantees, and the accounting under it.",
  h1: "Business loan software, for borrowers that are not people.",
  intro: [
    "A business loan is the file where the borrower is a legal person rather than a natural one, and almost every difference follows from that. A private limited company cannot sign; its directors do. A partnership has no PAN separate from its deed. A HUF has a karta. The constitution decides who has to be on the file before it can move, and getting that wrong is not a data-entry error — it is a file that cannot be enforced.",
    "For NBFCs lending to proprietorships, partnerships, LLPs, companies, trusts and societies, secured or clean, where the promoter usually guarantees what the entity borrows.",
  ],
  lifecycle: {
    head: "The file, from enquiry to sanction",
    lead: "The same origination workflow the other products use, with the parts that only apply when the borrower is an entity.",
    points: [
      ["The entity as a party", "Legal name, constitution, incorporation or registration date, CIN and GSTIN where they exist — held as a party record, so a second facility to the same borrower starts from what is already on file rather than a fresh form."],
      ["The people behind it", "Directors, designated partners, partners, karta, trustees, office bearers and proprietors are related parties in their own right, each with their own KYC — not names typed into a field on the entity."],
      ["Beneficial ownership", "Companies, LLPs, partnerships and AOP/BOI cannot proceed without beneficial-owner coverage. It is a condition of the file moving, not a document collected later."],
      ["Guarantors", "A promoter guaranteeing the entity is a party with a guarantee relationship, so the exposure is visible against the person as well as against the business."],
      ["Sanction", "The scheme's terms are snapshotted at sanction, so a later change to the scheme cannot alter a facility already sanctioned — and the approval slab that released it is on the record."],
    ],
    evidence: ["src/lib/parties/rules.ts", "src/lib/repos/parties.ts", "src/lib/repos/party-sub-modules.ts"],
  },
  specific: {
    head: "Eleven constitutions, and what each one has to carry",
    lead: "The constitution is not a label on the party — it decides what the file must contain before it can move. These are enforced, not suggested.",
    points: [
      ["Private limited, public limited, OPC", "At least two directors, or one for an OPC, and beneficial-owner coverage. A company file without a UBO does not proceed."],
      ["LLP", "At least two designated partners, and beneficial-owner coverage. Designated partners are a distinct relationship from partners, because the liability is."],
      ["Partnership and AOP/BOI", "At least two partners, with beneficial-owner coverage — and the partners' profit shares are checked to total no more than 100%, which is the arithmetic a deed gets wrong."],
      ["HUF", "A karta. One, and named, because that is who can bind the family."],
      ["Trust, society and Section 8", "At least one trustee or office bearer, since these constitutions have neither directors nor partners."],
      ["Proprietorship", "A proprietor — the natural person the business actually is, whose PAN the bureau is pulled against, because the firm has none of its own."],
    ],
    evidence: ["src/lib/parties/rules.ts"],
  },
  compliance: {
    head: "What the regulation asks of an entity file",
    points: [
      ["KYC by constitution", "The document set follows the constitution rather than one list applied to everyone, which is what the Master Direction on KYC actually requires of a legal person."],
      ["Bureau against the right PAN", "A commercial bureau pull is made against the entity; a proprietorship's is made against the proprietor. Recorded against the application with the report attached."],
      ["Key Facts Statement", "An MSME term loan gets the prescribed one-page statement with an APR computed from the actual cash flows, on the same footing as a retail loan."],
      ["Exposure across the group", "A borrower's facilities are visible together, and asset classification is borrower-wise: if one facility is non-performing, all of them are."],
    ],
    evidence: ["src/lib/repos/party-exposure.ts", "src/lib/repos/npa.ts", "src/lib/repos/kfs.ts"],
  },
  documents: {
    head: "The pack a business file needs",
    points: [
      ["Sanction letter and agreement", "Generated from the facility's own terms on your letterhead, naming the entity as it is registered rather than as it was typed."],
      ["Guarantee deed", "Where a promoter guarantees, the deed is part of the pack rather than a document someone remembers to add."],
      ["Board resolution and authority", "The authorised signatory is held on the party, so the pack names the person who can actually sign."],
      ["Borrower declaration", "In fourteen languages, because an MSME borrower is entitled to the terms in a language they read."],
    ],
    evidence: ["src/lib/documents/html/templates/letters.ts", "src/lib/repos/documents.ts"],
  },
  reports: {
    head: "What it produces",
    points: [
      ["Its own book in the ledger", "Business loans post to their own control and income accounts, so the portfolio can be read on its own rather than pooled into an 'other' bucket."],
      ["Exposure by borrower", "Across facilities and across the people connected to the entity, which is the view a credit committee asks for and a spreadsheet cannot keep current."],
      ["Classification and provisioning", "Day-end IRAC classification and the provision that follows, at the NBFC rates and at the rate the tenant's layer carries."],
    ],
    evidence: ["src/lib/lms/coa-defaults.ts", "src/lib/repos/party-exposure.ts", "src/lib/repos/npa.ts"],
  },
  shots: {
    afterIntro: {
      name: "parties",
      priority: true,
      alt: "The parties list in Lenviq showing borrower records with their type and identifiers",
      caption: "An entity is a party record, not a name on a loan — which is why the second facility does not start from a blank form.",
    },
    afterSpecific: {
      name: "party-kyc",
      alt: "A party's KYC section in Lenviq showing the documents held against the record",
      caption: "The document set follows the constitution. A trust and a partnership are not asked for the same things.",
    },
  },
  faqs: [
    {
      q: "Can it lend to a proprietorship, where the firm has no PAN of its own?",
      a: "Yes. A proprietorship is held with its proprietor as a related party, and the bureau pull is made against the proprietor's PAN because the firm has none. The facility still sits on the business's file, which is what keeps the exposure visible on both.",
    },
    {
      q: "Are the constitution rules configurable?",
      a: "No, and deliberately. Two directors for a company, one for an OPC, two designated partners for an LLP, a karta for a HUF — these are what makes a file enforceable, not a lender's preference. Rate bands, charges and approval slabs are the settings; who must be on a file is not.",
    },
    {
      q: "Can a business loan be secured?",
      a: "Yes, and then it is the security that decides the book it sits in — a business loan against property is a mortgage exposure and posts as one. A clean facility to an entity is what this page describes.",
    },
    {
      q: "Does a promoter guarantee show against the promoter?",
      a: "Yes. A guarantee is a relationship between two party records, so the exposure appears against the individual as well as against the entity, which is the point of asking for the guarantee.",
    },
  ],
  related: [
    { href: "/loan-against-property-software/", label: "Loan against property software", note: "Where a business facility is secured on immovable property." },
    { href: "/cash-credit-software/", label: "Cash credit and overdraft software", note: "The working-capital limit the same borrower usually runs alongside a term loan." },
    { href: "/compliance/", label: "The RBI positions, and the direction each comes from", note: "Including borrower-wise classification and the provisioning rates." },
  ],
};
