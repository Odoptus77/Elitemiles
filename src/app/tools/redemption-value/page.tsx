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
      color: "text-white/60",
      note: "Enter values to see a rating.",
    };
  }
  if (centsPerPoint >= 3.0)
    return {
      label: "Excellent",
      color: "text-[color:var(--em-gold)]",
      note: "Strong value — often premium-cabin or peak cash pricing.",
    };
  if (centsPerPoint >= 2.0)
    return {
      label: "Good",
      color: "text-white",
      note: "Usually worth it if you’d pay cash for this trip.",
    };
  if (centsPerPoint >= 1.2)
    return {
      label: "Okay",
      color: "text-white/80",
      note: "Could be fine, but compare alternatives and flexibility.",
    };
  return {
    label: "Poor",
    color: "text-white/70",
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
        <p className="text-xs uppercase tracking-[0.32em] text-white/50">Tool</p>
        <h1 className="font-display text-4xl">Redemption Value Calculator</h1>
        <p className="max-w-2xl text-white/65">
          Compare cash price vs points (minus taxes/fees) to estimate value per point.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm text-white/70">
              Cash price (EUR)
              <input
                inputMode="decimal"
                value={cashPrice}
                onChange={(e) => setCashPrice(e.target.value)}
                placeholder="e.g. 2499"
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20"
              />
            </label>

            <label className="grid gap-2 text-sm text-white/70">
              Taxes & fees you still pay (EUR)
              <input
                inputMode="decimal"
                value={taxesFees}
                onChange={(e) => setTaxesFees(e.target.value)}
                placeholder="e.g. 350"
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20"
              />
            </label>

            <label className="grid gap-2 text-sm text-white/70">
              Points / miles required
              <input
                inputMode="numeric"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="e.g. 70000"
                className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/20"
              />
            </label>

            <p className="text-xs text-white/40">
              Note: This is a simple heuristic for the MVP. Later we add program-specific baselines,
              surcharges norms by route, and alternative redemption suggestions.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <div className="text-xs uppercase tracking-[0.28em] text-white/50">Result</div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="text-sm text-white/60">Estimated value per point</div>
              <div className="mt-1 font-display text-5xl">
                {result ? formatNumber(result.centsPerPoint) : "—"}
                <span className="ml-2 text-lg text-white/50">c/pt</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/25 p-4">
              <div className="text-sm text-white/60">Rating</div>
              <div className={`mt-1 text-2xl font-semibold ${rating.color}`}>{rating.label}</div>
              <div className="mt-2 text-sm text-white/60">{rating.note}</div>
            </div>

            <div className="text-xs text-white/40">
              Formula: (cash price − taxes/fees) ÷ points.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
