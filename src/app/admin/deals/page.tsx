"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

type Deal = {
  id: string;
  title: string;
  points: string;
  tags: string[];
  note: string;
  created_at: string;
};

export default function AdminDealsPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [items, setItems] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");

  async function load() {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert (Env Vars fehlen).");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("deals")
      .select("id,title,points,tags,note,created_at")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setItems((data as Deal[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addDeal(e: React.FormEvent) {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert (Env Vars fehlen).");
      return;
    }
    e.preventDefault();
    setError(null);

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase.from("deals").insert({
      title,
      points,
      tags: tagList,
      note,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setTitle("");
    setPoints("");
    setTags("");
    setNote("");
    await load();
  }

  async function remove(id: string) {
    if (!supabase) {
      setError("Supabase ist nicht konfiguriert (Env Vars fehlen).");
      return;
    }
    if (!confirm("Deal wirklich löschen?")) return;
    const { error } = await supabase.from("deals").delete().eq("id", id);
    if (error) setError(error.message);
    await load();
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Admin</p>
        <h1 className="font-display text-4xl">Deals verwalten</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          Voraussetzung: Supabase Table <code>deals</code> existiert.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <h2 className="font-display text-2xl">Neuer Deal</h2>
          <form onSubmit={addDeal} className="mt-4 grid gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel"
              required
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm"
            />
            <input
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Punkte (z.B. 55k–70k)"
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm"
            />
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (kommagetrennt)"
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Notiz"
              rows={4}
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
                <p className="text-sm text-[color:var(--em-muted)]">Noch keine Deals.</p>
              ) : (
                items.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-xl border border-[color:var(--em-border)] bg-white p-4"
                  >
                    <div className="text-sm font-semibold text-[color:var(--em-fg)]">{d.title}</div>
                    <div className="mt-1 text-xs text-[color:var(--em-muted)]">
                      {d.points} • {(d.tags ?? []).join(", ")}
                    </div>
                    <div className="mt-2 text-sm text-[color:var(--em-muted)]">{d.note}</div>
                    <button
                      onClick={() => remove(d.id)}
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
