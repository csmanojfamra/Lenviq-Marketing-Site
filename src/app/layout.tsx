import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import { BUILD } from "@/lib/build-info.generated";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { OrgJsonLd } from "@/components/org-jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
  applicationName: SITE.name,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "16x16 32x32 48x48" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
  twitter: { card: "summary_large_image" },
  /**
   * Indexable from 11 August 2026.
   *
   * The site-wide gate is off. It was there because indexing does not come undone — a cached result
   * outlives the page — and four things had to be read first: the claims list, the Compliance page,
   * the contact details and the demo form. Those have been.
   *
   * **Privacy and Terms are still excluded**, and not by this line. They carry their own
   * `index: false`, they are absent from the sitemap, and they are named in `robots.ts` — three
   * places, because they are still the generated drafts and are marked as such on the page. When
   * the reviewed versions land, all three come off together and that is the whole change.
   */
  robots: { index: true, follow: true },
};

/**
 * `.js` is set before paint.
 *
 * Every hidden-then-revealed starting state in globals.css is gated on this class, so a reader
 * with JavaScript disabled or a failed bundle gets the complete page rather than a blank one.
 * Inline and synchronous on purpose: a deferred script would let the un-hidden content paint
 * first and then jump.
 */
const JS_READY = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_READY }} />
        <OrgJsonLd />
        {/*
          Which version is this page?
          
          A stale site does not look wrong — it looks like an older correct site — so a skipped
          deploy is invisible until somebody happens to check a sentence they remember changing.
          On every page, so the question can be answered from wherever the reader already is.
        */}
        <meta name="build-commit" content={BUILD.shortCommit} />
        <meta name="build-time" content={BUILD.builtAt} />
      </head>
      <body className="min-h-screen bg-card antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-input focus:bg-slate focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
