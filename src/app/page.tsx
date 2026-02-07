import Link from "next/link";

const deals = [
  {
    title: "Frankfurt → USA (Business Class) via Flying Blue",
    points: "~55k–70k",
    note: "Promo Awards possible monthly.",
  },
  {
    title: "Europe → Dubai (Qsuite) via partner programs",
    points: "~70k",
    note: "Excellent product; check surcharges.",
  },
  {
    title: "Iberia Avios: Madrid → USA business deals",
    points: "varies",
    note: "Often lower surcharges than BA.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[color:var(--em-emerald)] blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[color:var(--em-gold)] blur-3xl" />
        </div>

        <div className="relative max-w-2xl space-y-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">
            Luxury travel through points & miles
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            Fly business.
            <br />
            Stay five-star.
            <br />
            Pay economy.
          </h1>
          <p className="text-lg text-[color:var(--em-muted)]">
            EliteMiles turns complex loyalty programs into clear, actionable strategies
            for travelers in Germany / DACH — with tools, guides, and curated sweet spots.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/learn"
              className="rounded-full bg-[color:var(--em-gold)] px-6 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
            >
              Start learning
            </Link>
            <Link
              href="/tools/redemption-value"
              className="rounded-full border border-[color:var(--em-border)] bg-white px-6 py-3 text-center text-sm font-semibold text-[color:var(--em-fg)] shadow-sm transition hover:bg-white/80"
            >
              Calculate a redemption
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">Learn</div>
          <h2 className="mt-2 font-display text-2xl">Beginner → expert path</h2>
          <p className="mt-2 text-sm text-[color:var(--em-muted)]">
            Points & miles basics, alliances, transfer partners, and booking walkthroughs.
          </p>
          <Link className="mt-4 inline-block text-sm text-[color:var(--em-gold)]" href="/learn">
            Browse guides →
          </Link>
        </div>

        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">Tools</div>
          <h2 className="mt-2 font-display text-2xl">Make better redemptions</h2>
          <p className="mt-2 text-sm text-[color:var(--em-muted)]">
            Value calculator + transfer partner paths (v0). More coming.
          </p>
          <Link
            className="mt-4 inline-block text-sm text-[color:var(--em-gold)]"
            href="/tools"
          >
            Explore tools →
          </Link>
        </div>

        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">Programs</div>
          <h2 className="mt-2 font-display text-2xl">Choose the right ecosystem</h2>
          <p className="mt-2 text-sm text-[color:var(--em-muted)]">
            Miles & More, Flying Blue, Avios, Hilton, Marriott — explained for DACH.
          </p>
          <Link
            className="mt-4 inline-block text-sm text-[color:var(--em-gold)]"
            href="/programs"
          >
            Compare programs →
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">
              Featured sweet spots
            </div>
            <h2 className="mt-2 font-display text-3xl">This week’s picks</h2>
          </div>
          <Link href="/deals" className="text-sm text-[color:var(--em-muted)] hover:text-[color:var(--em-fg)]">
            View all deals
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {deals.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6"
            >
              <div className="text-sm text-[color:var(--em-fg)]">{d.title}</div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-2xl font-semibold text-[color:var(--em-gold)]">
                  {d.points}
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--em-muted)]">
                  points
                </div>
              </div>
              <p className="mt-3 text-sm text-[color:var(--em-muted)]">{d.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
