const deals = [
  {
    title: "Frankfurt → USA Business Class via Flying Blue",
    points: "55k–70k",
    tags: ["Airline", "Business"],
    note: "Monthly Promo Awards possible.",
  },
  {
    title: "Flying Blue monthly Promo Awards",
    points: "Up to -50%",
    tags: ["Promo"],
    note: "Best for flexible travelers.",
  },
  {
    title: "Hilton Maldives stays with points",
    points: "Varies",
    tags: ["Hotel"],
    note: "5th night free for elites increases value.",
  },
];

export default function DealsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-white/50">Deals</p>
        <h1 className="font-display text-4xl">Sweet spots & promos</h1>
        <p className="max-w-2xl text-white/65">
          Curated redemptions and opportunities you can actually use from Germany / DACH.
          (Manual entries in v0.)
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {deals.map((d) => (
          <article
            key={d.title}
            className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6"
          >
            <div className="flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="mt-4 text-lg text-white/90">{d.title}</h2>
            <div className="mt-3 text-2xl font-semibold text-[color:var(--em-gold)]">
              {d.points}
            </div>
            <p className="mt-3 text-sm text-white/60">{d.note}</p>
          </article>
        ))}
      </div>

      <div className="text-xs text-white/40">
        Next: filters (airline/hotel/region/cabin), then Supabase-backed entries + admin UI.
      </div>
    </div>
  );
}
