const programs = [
  {
    name: "Miles & More",
    bestUses: [
      "Lufthansa premium cabins",
      "Last-seat award availability",
      "Companion awards",
      "Upgrade awards",
      "Europe business tickets",
    ],
    transferNotes: ["Limited transfer partners", "Miles expire without status/credit card"],
  },
  {
    name: "Flying Blue",
    bestUses: [
      "Monthly Promo Awards",
      "Europe → USA business",
      "Africa routes",
      "Flexible partner availability",
      "Frequent mileage discounts",
    ],
    transferNotes: ["Amex MR transfer partner", "Frequent transfer bonuses"],
  },
  {
    name: "British Airways Executive Club (Avios)",
    bestUses: [
      "Short-haul flights",
      "Iberia partner flights",
      "Intra-Europe redemptions",
      "Partner airline awards",
      "Off-peak pricing",
    ],
    transferNotes: ["Amex MR transfers", "Avios move between BA/Iberia/Qatar"],
  },
  {
    name: "Hilton Honors",
    bestUses: [
      "5th night free awards (elite)",
      "Luxury resorts",
      "Strong elite benefits",
      "Frequent points sales",
      "Large global footprint",
    ],
    transferNotes: ["Many earning methods", "Amex transfers possible"],
  },
  {
    name: "Marriott Bonvoy",
    bestUses: [
      "Luxury hotel portfolio",
      "Airline mile transfers",
      "Resort redemptions",
      "Long-stay value",
      "Global availability",
    ],
    transferNotes: ["Transfers to many airlines", "Occasional bonuses"],
  },
];

export default function ProgramsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Programs</p>
        <h1 className="font-display text-4xl">Loyalty ecosystems</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          The goal isn’t to collect everything — it’s to pick the right ecosystem for your routes,
          your spending, and your travel style.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((p) => (
          <article
            key={p.name}
            className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6"
          >
            <h2 className="font-display text-2xl">{p.name}</h2>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">
                  Best uses
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[color:var(--em-muted)]">
                  {p.bestUses.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-[0.45rem] h-1 w-1 rounded-full bg-[color:var(--em-gold)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">
                  Transfer notes
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[color:var(--em-muted)]">
                  {p.transferNotes.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-[0.45rem] h-1 w-1 rounded-full bg-[color:var(--em-emerald)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-xs text-[color:var(--em-muted)]">
        Next: dedicated program pages + search + structured fields (earn/redeem rates, alliances,
        transfer partners).
      </div>
    </div>
  );
}
