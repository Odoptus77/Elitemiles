const guides = [
  {
    title: "Points & Miles in Germany Explained",
    bullets: [
      "What points & miles are",
      "Airline vs hotel programs",
      "How Germans earn differently than US users",
      "First goal: a business class redemption",
    ],
  },
  {
    title: "How to Book Business Class Flights with Miles",
    bullets: [
      "Alliances + partner bookings",
      "Taxes & fees",
      "Flexible dates",
      "Upgrade vs award ticket",
    ],
  },
  {
    title: "Best Frequent Flyer Programs for Germany (DACH)",
    bullets: [
      "Miles & More vs Flying Blue vs Avios",
      "When partner programs win",
      "Promo awards & transfer partners",
      "Beginner strategy",
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Learn</p>
        <h1 className="font-display text-4xl">Guides für Einsteiger</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          Einfach starten, Sicherheit gewinnen, dann strategisch werden – der EliteMiles Lernpfad
          für Deutschland / DACH.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {guides.map((g) => (
          <article
            key={g.title}
            className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6"
          >
            <h2 className="font-display text-2xl">{g.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--em-muted)]">
              {g.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1 w-1 rounded-full bg-[color:var(--em-gold)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 text-xs text-[color:var(--em-muted)]">(MDX articles next)</div>
          </article>
        ))}
      </div>
    </div>
  );
}
