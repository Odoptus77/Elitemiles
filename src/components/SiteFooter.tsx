import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--em-border)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        <div className="space-y-2">
          <div className="font-display tracking-[0.12em] text-[color:var(--em-fg)]">EliteMiles</div>
          <p className="text-sm text-[color:var(--em-muted)]">
            Verständliche Points-&-Miles-Strategien für Luxusreisen in Deutschland / DACH.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--em-muted)] md:justify-end">
          <Link className="hover:text-[color:var(--em-fg)]" href="/about">
            Über uns
          </Link>
          <Link className="hover:text-[color:var(--em-fg)]" href="/newsletter">
            Newsletter
          </Link>
          <Link className="hover:text-[color:var(--em-fg)]" href="/learn">
            Learn
          </Link>
          <Link className="hover:text-[color:var(--em-fg)]" href="/tools">
            Tools
          </Link>
        </div>
      </div>
      <div className="px-4 pb-10 text-center text-xs text-[color:var(--em-muted)]">
        © {new Date().getFullYear()} EliteMiles. Keine Verbindung zu Airlines, Banken oder Bonusprogrammen.
      </div>
    </footer>
  );
}
