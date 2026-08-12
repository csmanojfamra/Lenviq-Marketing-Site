import Link from "next/link";
import { SITE, COMPANY } from "@/lib/site";
import { DesktopNav, MobileNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-s4 px-s3">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/lockup-horizontal.svg" alt={SITE.name} width={116} height={26} />
        </Link>

        <DesktopNav />

        <div className="ml-auto flex items-center gap-s2">
          {/* WhatsApp in the header because it is how an Indian NBFC actually opens a conversation —
              a form is a commitment, a message is a question. Same number as the phone line. */}
          {/* WhatsApp before Login, because most people arriving here are not customers yet.
              Icon-only below md so it survives a phone header without crowding the demo button. */}
          <a
            href={`https://wa.me/${COMPANY.phone.replace("+", "")}?text=${encodeURIComponent("Hi — I'd like to know more about Lenviq for our NBFC.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message us on WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-input px-2.5 py-2 text-[14px] font-medium text-slate-mid transition-colors hover:text-[#25D366]"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/>
            </svg>
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
          {/*
            Every "Login" on this site points at the product. The marketing site and the app share
            a registrable domain, so this is the only relationship between them: a link. This site
            sets no cookies at all and nothing it does can touch a session on the subdomain.
          */}
          <a
            href={SITE.appUrl}
            className="hidden rounded-input px-3 py-2 text-[14px] font-medium text-slate-mid transition-colors hover:text-ink md:inline-flex"
          >
            Login
          </a>
          <Link
            href="/contact/"
            className="rounded-input bg-cta px-4 py-2 text-[14px] font-medium text-white shadow-e1 transition-colors hover:bg-cta-hover"
          >
            Request a demo
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
