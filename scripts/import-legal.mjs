/**
 * Convert the signed-off Word documents into the site's legal pages.
 *
 * A converter rather than a copy-paste, because these documents will be revised: the next version
 * lands as a .docx and this is run again. Hand-transcribing 15,000 words of contract once is bad
 * enough; doing it every revision is how the page and the document that actually binds drift apart.
 *
 *   node scripts/import-legal.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const SRC = "Terms and Privacy Policy/files";
const DOCS = [
  { file: "Lenviq_Terms_of_Service_v2.docx", out: "content/legal/terms.md", title: "Terms of Service" },
  { file: "Lenviq_Privacy_Policy_v2.docx", out: "content/legal/privacy.md", title: "Privacy Policy" },
  { file: "Lenviq_Subscription_Agreement_v2.docx", out: "content/legal/subscription-agreement.md", title: "Subscription Agreement" },
];

/** Word paragraphs, in order, via python's zipfile — no npm dependency for a build-time script. */
function paragraphs(path) {
  const py = `
import zipfile, re, sys
z = zipfile.ZipFile(sys.argv[1])
xml = z.read("word/document.xml").decode("utf8", "ignore")
out = []
for p in re.findall(r"<w:p[ >].*?</w:p>", xml, re.S):
    txt = "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p))
    style = re.search(r'w:pStyle w:val="([^"]+)"', p)
    listed = "<w:numPr>" in p
    if txt.strip():
        out.append(("%s\\t%s\\t%s" % (style.group(1) if style else "", "L" if listed else "", txt.strip())))
print("\\n".join(out))
`;
  return execFileSync("python3", ["-c", py, path], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 })
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [style, listed, ...rest] = l.split("\t");
      return { style, listed: listed === "L", text: rest.join("\t") };
    });
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Word's own heading styles are not reliable in these files, so the shape is recovered from the
 * numbering the drafter used — "28." is a clause, "28.2" a sub-clause, "SCHEDULE C" a schedule.
 * Getting this from the text rather than the styles means a re-export from another editor still
 * converts.
 */
function toMarkdown(paras, title) {
  // No H1: the page supplies its own, and two would be a document outline error.
  void title;
  const out = [];
  for (const { text } of paras) {
    if (/^SCHEDULE\s+[A-Z]/i.test(text)) { out.push("", `## ${esc(text)}`, ""); continue; }
    const clause = /^(\d{1,2})\.\s{0,4}([A-Z][A-Z —'&,\-/()]{3,})$/.exec(text);
    if (clause) { out.push("", `## ${clause[1]}. ${esc(clause[2].trim())}`, ""); continue; }
    const sub = /^(\d{1,2}\.\d{1,2}(?:[A-Z](?![a-z]))?)\s*(.*)$/.exec(text);
    if (sub && sub[2]) { out.push("", `**${sub[1]}** ${esc(sub[2])}`, ""); continue; }
    if (/^\(([a-z]|[ivx]+)\)/.test(text)) { out.push(`- ${esc(text)}`); continue; }
    out.push("", esc(text), "");
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/**
 * Amendments applied on import.
 *
 * Empty, deliberately, and it should stay that way.
 *
 * The liability floor in clause 28.2 used to live here — the published page said "the higher of
 * INR 50,000 and twelve months' fees" while the signed .docx still said twelve months' fees alone.
 * That was a defensible holding position (the page was right, and the amendment could not be
 * silently lost, because it failed loudly if the clause it patched moved) but it left the document
 * a customer's counsel is sent saying something different from the document published on the site.
 *
 * The amendment now lives in the source: `scripts/amend-tos.py` applied it to the .docx, which is
 * Version 2.1, and the floor is INR 1,00,000 — see that script for why it is a lakh.
 *
 * If a future amendment genuinely cannot wait for a re-issued .docx, add it here and open a task to
 * fold it back. Do not leave one here permanently: two versions of a contract is the failure this
 * whole arrangement exists to avoid.
 */
const AMENDMENTS = [];

let n = 0;
for (const d of DOCS) {
  const path = `${SRC}/${d.file}`;
  if (!existsSync(path)) { console.log(`SKIP ${d.file} — not present`); continue; }
  let md = toMarkdown(paragraphs(path), d.title);
  for (const a of AMENDMENTS.filter((x) => x.doc === d.out)) {
    if (!a.find.test(md)) {
      console.log(`  !! AMENDMENT DID NOT APPLY to ${d.out} — ${a.reason}`);
      console.log("     The clause it patches has changed in the .docx. Check it by hand.");
      process.exitCode = 1;
      continue;
    }
    md = md.replace(a.find, a.replace);
    console.log(`  ~ amended: ${a.reason}`);
  }
  writeFileSync(d.out, md);
  console.log(`${d.out}  ${md.split(/\s+/).length} words`);
  n++;
}
console.log(`${n} document(s) converted.`);
