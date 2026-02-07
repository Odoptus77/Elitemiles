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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--em-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-xl tracking-[0.12em] text-[color:var(--em-fg)]">
            EliteMiles
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-white/50 group-hover:text-white/70">
            DACH
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tools/redemption-value"
            className="rounded-full bg-[color:var(--em-gold)] px-4 py-2 text-sm font-medium text-black transition hover:brightness-110"
          >
            Value Calculator
          </Link>
        </div>
      </div>
    </header>
  );
}
