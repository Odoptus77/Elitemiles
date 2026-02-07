import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/deals", label: "Deals" },
  { href: "/programs", label: "Programs" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/newsletter", label: "Newsletter" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--em-border)] bg-[color:var(--em-bg)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-xl tracking-[0.12em] text-[color:var(--em-fg)]">
            EliteMiles
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-[color:var(--em-muted)] group-hover:text-[color:var(--em-fg)]">
            DACH
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[color:var(--em-muted)] transition hover:text-[color:var(--em-fg)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tools/redemption-value"
            className="rounded-full bg-[color:var(--em-gold)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Value Calculator
          </Link>
        </div>
      </div>
    </header>
  );
}
