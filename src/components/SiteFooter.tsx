import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
        <div className="space-y-2">
          <div className="font-display tracking-[0.12em]">EliteMiles</div>
          <p className="text-sm text-white/60">
            Beginner-friendly points & miles strategies for luxury travel in Germany / DACH.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 md:justify-end">
          <Link className="hover:text-white" href="/about">
            About
          </Link>
          <Link className="hover:text-white" href="/newsletter">
            Newsletter
          </Link>
          <Link className="hover:text-white" href="/learn">
            Learn
          </Link>
          <Link className="hover:text-white" href="/tools">
            Tools
          </Link>
        </div>
      </div>
      <div className="px-4 pb-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} EliteMiles. Not affiliated with airlines, banks, or loyalty programs.
      </div>
    </footer>
  );
}
