"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

type Program = {
  id: string;
  name: string;
  best_uses: string[];
  transfer_notes: string[];
  created_at: string;
};

export default function AdminProgramsPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [items, setItems] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [bestUses, setBestUses] = useState("");
  const [transferNotes, setTransferNotes] = useState("");

  async function load() {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert (Env Vars fehlen).");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("programs")
      .select("id,name,best_uses,transfer_notes,created_at")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setItems((data as Program[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addProgram(e: React.FormEvent) {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert (Env Vars fehlen).");
      return;
    }
    e.preventDefault();
    setError(null);

    const best = bestUses
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const transfer = transferNotes
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from("programs").insert({
      name,
      best_uses: best,
      transfer_notes: transfer,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setName("");
    setBestUses("");
    setTransferNotes("");
    await load();
  }

  async function remove(id: string) {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert (Env Vars fehlen).");
      return;
    }
    if (!confirm("Programm wirklich löschen?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (error) setError(error.message);
    await load();
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Admin</p>
        <h1 className="font-display text-4xl">Programme verwalten</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          Voraussetzung: Supabase Table <code>programs</code> existiert.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <h2 className="font-display text-2xl">Neues Programm</h2>
          <form onSubmit={addProgram} className="mt-4 grid gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm"
            />
            <textarea
              value={bestUses}
              onChange={(e) => setBestUses(e.target.value)}
              placeholder="Beste Einsätze (1 pro Zeile)"
              rows={5}
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm"
            />
            <textarea
              value={transferNotes}
              onChange={(e) => setTransferNotes(e.target.value)}
              placeholder="Transfer-Notizen (1 pro Zeile)"
              rows={5}
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm"
            />
            <button className="rounded-xl bg-[color:var(--em-gold)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110">
              Speichern
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        </div>

        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <h2 className="font-display text-2xl">Liste</h2>
          {loading ? (
            <p className="mt-4 text-sm text-[color:var(--em-muted)]">Lade…</p>
          ) : (
            <div className="mt-4 space-y-3">
              {items.length === 0 ? (
                <p className="text-sm text-[color:var(--em-muted)]">Noch keine Programme.</p>
              ) : (
                items.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-[color:var(--em-border)] bg-white p-4"
                  >
                    <div className="text-sm font-semibold text-[color:var(--em-fg)]">{p.name}</div>
                    <div className="mt-2 text-xs text-[color:var(--em-muted)]">Beste Einsätze</div>
                    <ul className="mt-1 space-y-1 text-sm text-[color:var(--em-muted)]">
                      {(p.best_uses ?? []).slice(0, 5).map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-xs text-[color:var(--em-muted)]">Transfer</div>
                    <ul className="mt-1 space-y-1 text-sm text-[color:var(--em-muted)]">
                      {(p.transfer_notes ?? []).slice(0, 5).map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => remove(p.id)}
                      className="mt-3 text-xs text-red-700"
                    >
                      Löschen
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
