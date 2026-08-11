/**
 * A small markdown renderer for post bodies.
 *
 * Deliberately not a dependency. The posts are written in this repo by one author, the subset of
 * markdown they use is known, and a parser plus a sanitiser plus their transitive tree is a lot of
 * supply chain for headings, paragraphs, lists and links.
 *
 * HTML in a post body is ESCAPED, not passed through — the output goes into
 * `dangerouslySetInnerHTML`, so anything that reaches it unescaped is an injection waiting for the
 * day somebody pastes something into a draft.
 */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inline: `code`, **bold**, *italic*, [text](href). Applied AFTER escaping. */
function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) =>
      // Only http(s) and site-relative links. A `javascript:` href in a post body is the one thing
      // this renderer must not emit.
      /^(https?:\/\/|\/)/.test(href) ? `<a href="${href}">${text}</a>` : `${text}`,
    );
}

export function renderMarkdown(src: string): string {
  const out: string[] = [];
  const lines = src.split("\n");
  let list: "ul" | "ol" | null = null;

  const closeList = () => {
    if (list) { out.push(`</${list}>`); list = null; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) { closeList(); continue; }

    if (/^---+$/.test(line.trim())) { closeList(); out.push("<hr>"); continue; }

    const h = /^(#{2,4})\s+(.*)$/.exec(line);
    if (h) { closeList(); const n = h[1].length; out.push(`<h${n}>${inline(h[2])}</h${n}>`); continue; }

    const q = /^>\s?(.*)$/.exec(line);
    if (q) { closeList(); out.push(`<blockquote><p>${inline(q[1])}</p></blockquote>`); continue; }

    const ul = /^[-*]\s+(.*)$/.exec(line);
    if (ul) {
      if (list !== "ul") { closeList(); out.push("<ul>"); list = "ul"; }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }

    const ol = /^\d+\.\s+(.*)$/.exec(line);
    if (ol) {
      if (list !== "ol") { closeList(); out.push("<ol>"); list = "ol"; }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }

    // A paragraph runs until a blank line, so a wrapped sentence stays one paragraph.
    closeList();
    const para = [line];
    while (i + 1 < lines.length && lines[i + 1].trim() && !/^(#{2,4}\s|[-*]\s|\d+\.\s|>|---+$)/.test(lines[i + 1])) {
      para.push(lines[++i]);
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  closeList();
  return out.join("\n");
}
