import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--em-border)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        <div className="space-y-2">
          <div className="font-display tracking-[0.12em] text-[color:var(--em-fg)]">EliteMiles</div>
          <p className="text-sm text-[color:var(--em-muted)]">
            Beginner-friendly points & miles strategies for luxury travel in Germany / DACH.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--em-muted)] md:justify-end">
          <Link className="hover:text-[color:var(--em-fg)]" href="/about">
            About
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
        © {new Date().getFullYear()} EliteMiles. Not affiliated with airlines, banks, or loyalty programs.
      </div>
    </footer>
  );
}
