"use client";

import { useMemo, useState } from "react";

type Currency = "Amex MR" | "Avios" | "Miles & More" | "Flying Blue" | "Hilton" | "Marriott";

type Path = {
  from: Currency;
  to: string;
  notes: string[];
};

const paths: Path[] = [
  {
    from: "Amex MR",
    to: "Flying Blue",
    notes: ["Transfer partner", "Watch for transfer bonuses"],
  },
  {
    from: "Amex MR",
    to: "British Airways / Avios",
    notes: ["Transfer partner", "Avios can often be moved to Iberia/Qatar"],
  },
  {
    from: "Avios",
    to: "Iberia",
    notes: ["Move Avios between BA ↔ Iberia", "Often lower surcharges ex-Madrid"],
  },
];

const currencies: Currency[] = [
  "Amex MR",
  "Avios",
  "Miles & More",
  "Flying Blue",
  "Hilton",
  "Marriott",
];

export default function TransferPartnerPage() {
  const [from, setFrom] = useState<Currency>("Amex MR");
  const [target, setTarget] = useState<string>("");

  const results = useMemo(() => {
    return paths.filter((p) => {
      const okFrom = p.from === from;
      const okTarget = target.trim()
        ? p.to.toLowerCase().includes(target.trim().toLowerCase())
        : true;
      return okFrom && okTarget;
    });
  }, [from, target]);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Tool</p>
        <h1 className="font-display text-4xl">Transferpartner (Basis)</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          MVP-Version: kuratierte Regeln (Deutschland/DACH). Als Nächstes wird daraus eine
          strukturierte Datenbank mit mehr Währungen und Partnerlogik.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm text-[color:var(--em-muted)]">
              Punktewährung
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value as Currency)}
                className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm text-[color:var(--em-fg)] outline-none focus:border-[color:var(--em-gold)]/40"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-[color:var(--em-muted)]">
              Zielprogramm (optional)
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. Flying Blue"
                className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm text-[color:var(--em-fg)] placeholder:text-[color:var(--em-muted)] outline-none focus:border-[color:var(--em-gold)]/40"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">Pfade</div>

          <div className="mt-4 space-y-3">
            {results.length === 0 ? (
              <div className="text-sm text-[color:var(--em-muted)]">Noch keine passenden Pfade gefunden.</div>
            ) : (
              results.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[color:var(--em-border)] bg-white p-4"
                >
                  <div className="text-sm text-[color:var(--em-fg)]">
                    <span className="text-[color:var(--em-muted)]">{p.from}</span> →{" "}
                    <span className="font-semibold text-[color:var(--em-gold)]">{p.to}</span>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-[color:var(--em-muted)]">
                    {p.notes.map((n) => (
                      <li key={n}>• {n}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}

            <div className="pt-2 text-xs text-[color:var(--em-muted)]">
              Next: Supabase-backed rules + more currencies + partner airline use-cases.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
