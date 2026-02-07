"use client";

import { useMemo, useState } from "react";

function formatNumber(n: number) {
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(n);
}

type Rating = { label: string; color: string; note: string };

function rateValue(centsPerPoint: number): Rating {
  if (!isFinite(centsPerPoint) || centsPerPoint <= 0) {
    return {
      label: "—",
      color: "text-[color:var(--em-muted)]",
      note: "Gib Werte ein, um eine Bewertung zu sehen.",
    };
  }
  if (centsPerPoint >= 3.0)
    return {
      label: "Excellent",
      color: "text-[color:var(--em-gold)]",
      note: "Sehr guter Wert – oft Premium-Kabine oder hoher Cash-Preis.",
    };
  if (centsPerPoint >= 2.0)
    return {
      label: "Good",
      color: "text-[color:var(--em-fg)]",
      note: "Meist sinnvoll, wenn du diese Reise auch in Cash zahlen würdest.",
    };
  if (centsPerPoint >= 1.2)
    return {
      label: "Okay",
      color: "text-[color:var(--em-muted)]",
      note: "Kann ok sein – aber Alternativen und Flexibilität prüfen.",
    };
  return {
    label: "Poor",
    color: "text-[color:var(--em-muted)]",
    note: "Often better to pay cash or save points for a better redemption.",
  };
}

export default function RedemptionValuePage() {
  const [cashPrice, setCashPrice] = useState<string>(""); // €
  const [taxesFees, setTaxesFees] = useState<string>(""); // €
  const [points, setPoints] = useState<string>("");

  const result = useMemo(() => {
    const cash = Number(cashPrice.replace(",", "."));
    const taxes = Number(taxesFees.replace(",", "."));
    const pts = Number(points.replace(/\s/g, ""));

    if (!cash || !pts) return null;

    const netValueEur = Math.max(0, cash - (isFinite(taxes) ? taxes : 0));
    const eurPerPoint = netValueEur / pts;
    const centsPerPoint = eurPerPoint * 100;
    return { netValueEur, eurPerPoint, centsPerPoint, pts, cash, taxes };
  }, [cashPrice, taxesFees, points]);

  const rating = rateValue(result?.centsPerPoint ?? 0);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Tool</p>
        <h1 className="font-display text-4xl">Einlösewert-Rechner</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          Vergleiche Cash-Preis mit Punkten (abzgl. Steuern/Gebühren), um den Wert pro Punkt zu schätzen.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm text-[color:var(--em-muted)]">
              Cash-Preis (EUR)
              <input
                inputMode="decimal"
                value={cashPrice}
                onChange={(e) => setCashPrice(e.target.value)}
                placeholder="e.g. 2499"
                className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm text-[color:var(--em-fg)] placeholder:text-[color:var(--em-muted)] outline-none focus:border-[color:var(--em-gold)]/40"
              />
            </label>

            <label className="grid gap-2 text-sm text-[color:var(--em-muted)]">
              Steuern & Gebühren (EUR)
              <input
                inputMode="decimal"
                value={taxesFees}
                onChange={(e) => setTaxesFees(e.target.value)}
                placeholder="e.g. 350"
                className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm text-[color:var(--em-fg)] placeholder:text-[color:var(--em-muted)] outline-none focus:border-[color:var(--em-gold)]/40"
              />
            </label>

            <label className="grid gap-2 text-sm text-[color:var(--em-muted)]">
              Benötigte Punkte/Meilen
              <input
                inputMode="numeric"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="e.g. 70000"
                className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm text-[color:var(--em-fg)] placeholder:text-[color:var(--em-muted)] outline-none focus:border-[color:var(--em-gold)]/40"
              />
            </label>

            <p className="text-xs text-[color:var(--em-muted)]">
              Note: This is a simple heuristic for the MVP. Later we add program-specific baselines,
              surcharges norms by route, and alternative redemption suggestions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--em-muted)]">Ergebnis</div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="text-sm text-[color:var(--em-muted)]">Geschätzter Wert pro Punkt</div>
              <div className="mt-1 font-display text-5xl">
                {result ? formatNumber(result.centsPerPoint) : "—"}
                <span className="ml-2 text-lg text-[color:var(--em-muted)]">c/pt</span>
              </div>
            </div>

            <div className="rounded-xl border border-[color:var(--em-border)] bg-white p-4">
              <div className="text-sm text-[color:var(--em-muted)]">Bewertung</div>
              <div className={`mt-1 text-2xl font-semibold ${rating.color}`}>{rating.label}</div>
              <div className="mt-2 text-sm text-[color:var(--em-muted)]">{rating.note}</div>
            </div>

            <div className="text-xs text-[color:var(--em-muted)]">
              Formel: (Cash-Preis − Steuern/Gebühren) ÷ Punkte.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
