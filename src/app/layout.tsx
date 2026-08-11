import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
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
   * NOT INDEXABLE, deliberately, until four things have been read (Sprint SITE-LIVE §5).
   *
   * Once a search engine indexes a page, removing it later does not undo it — the cached result
   * outlives the page. Four items on this site were built to be reviewed before they were public:
   * the Privacy Policy and Terms (generated, marked draft, never read), the claims list, the
   * Compliance page, and the contact details and demo form. Reviewing them is Manoj's, not the
   * build's.
   *
   * This is one of two mechanisms; `robots.ts` carries the other. Taking it off is a separate,
   * deliberate commit — not something to fold into an unrelated change.
   */
  robots: { index: false, follow: false, nocache: true },
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
