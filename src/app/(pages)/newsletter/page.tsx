"use client";

import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; already?: boolean };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Subscribe failed");
      }

      setStatus("ok");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Subscribe failed");
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-white/50">Newsletter</p>
        <h1 className="font-display text-4xl">Get sweet spots in your inbox</h1>
        <p className="max-w-2xl text-white/65">
          Weekly: beginner-friendly guides + curated redemptions for Germany / DACH.
        </p>
      </header>

      <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-xl bg-[color:var(--em-gold)] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        {status === "ok" ? (
          <p className="mt-3 text-sm text-white/80">
            Check your inbox — you may need to confirm your subscription.
          </p>
        ) : status === "error" ? (
          <p className="mt-3 text-sm text-red-200">{error}</p>
        ) : (
          <p className="mt-3 text-xs text-white/40">
            We use Mailchimp (free plan). No spam — unsubscribe anytime.
          </p>
        )}
      </div>

      <div className="text-xs text-white/40">
        Dev note: configure Mailchimp env vars (see <code>.env.example</code>) for this to work in
        production.
      </div>
    </div>
  );
}
