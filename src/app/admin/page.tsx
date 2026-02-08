"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminHome() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
      setSessionUserId(data.session?.user.id ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
      setSessionUserId(session?.user.id ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const allowlist = (process.env.NEXT_PUBLIC_ADMIN_EMAIL_ALLOWLIST ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  // Optional client-side gate. Real access control should be done via Supabase RLS.
  const allowed =
    !!sessionEmail && (allowlist.length === 0 || allowlist.includes(sessionEmail.toLowerCase()));

  async function sendMagicLink(e: React.FormEvent) {
    if (!supabase) {
      setStatus("Supabase ist nicht konfiguriert (Env Vars fehlen). Bitte in Vercel setzen.");
      return;
    }
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Use current origin so it works on Vercel preview + later custom domain.
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });
      if (error) throw error;
      setStatus("Magic Link gesendet. Bitte E-Mail öffnen und bestätigen.");
    } catch (err: any) {
      setStatus(err?.message ?? "Fehler beim Senden des Magic Links.");
    } finally {
      setSending(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Admin</p>
        <h1 className="font-display text-4xl">Dashboard</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          Content verwalten (MVP v0). Login per Magic Link.
        </p>
      </header>

      {!supabase ? (
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <p className="text-sm text-[color:var(--em-muted)]">
            Supabase ist noch nicht konfiguriert. Setze in Vercel die Env Vars:
            <code> NEXT_PUBLIC_SUPABASE_URL</code> und <code> NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
          </p>
        </div>
      ) : !sessionEmail ? (
        <div className="max-w-xl rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <form onSubmit={sendMagicLink} className="grid gap-3">
            <label className="grid gap-2 text-sm text-[color:var(--em-muted)]">
              E-Mail
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nick@..."
                className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-3 text-sm text-[color:var(--em-fg)] placeholder:text-[color:var(--em-muted)] outline-none focus:border-[color:var(--em-gold)]/40"
              />
            </label>

            <button
              disabled={sending}
              className="rounded-xl bg-[color:var(--em-gold)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {sending ? "Sende…" : "Magic Link senden"}
            </button>

            {status && <p className="text-sm text-[color:var(--em-muted)]">{status}</p>}

            <p className="text-xs text-[color:var(--em-muted)]">
              Hinweis: In Supabase muss OTP/Magic Link aktiviert sein und die Redirect-URL erlaubt
              werden.
            </p>
          </form>
        </div>
      ) : !allowed ? (
        <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
          <p className="text-sm text-[color:var(--em-muted)]">
            Eingeloggt als <span className="font-semibold">{sessionEmail}</span>, aber nicht
            erlaubt.
          </p>
          <p className="mt-2 text-xs text-[color:var(--em-muted)]">
            Setze <code>ADMIN_EMAIL_ALLOWLIST</code> (oder leer lassen, um alle eingeloggten User zu
            erlauben).
          </p>
          <button
            onClick={signOut}
            className="mt-4 rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-2 text-sm"
          >
            Abmelden
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6">
            <div className="text-sm text-[color:var(--em-muted)]">
              Eingeloggt als <span className="font-semibold text-[color:var(--em-fg)]">{sessionEmail}</span>
              {sessionUserId ? (
                <>
                  <span className="mx-2 text-[color:var(--em-muted)]">•</span>
                  <span className="text-xs">User ID: <code>{sessionUserId}</code></span>
                </>
              ) : null}
            </div>
            <button
              onClick={signOut}
              className="rounded-xl border border-[color:var(--em-border)] bg-white px-4 py-2 text-sm"
            >
              Abmelden
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/admin/deals"
              className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6 transition hover:border-[color:var(--em-gold)]/40"
            >
              <div className="font-display text-2xl">Deals</div>
              <p className="mt-2 text-sm text-[color:var(--em-muted)]">Sweet Spots hinzufügen/bearbeiten</p>
            </Link>
            <Link
              href="/admin/programs"
              className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6 transition hover:border-[color:var(--em-gold)]/40"
            >
              <div className="font-display text-2xl">Programme</div>
              <p className="mt-2 text-sm text-[color:var(--em-muted)]">Programme pflegen</p>
            </Link>
          </div>

          <p className="text-xs text-[color:var(--em-muted)]">
            Nächste Schritte: Firestore-ähnliches CRUD für Guides + Transfer-Regeln; danach Live-Seiten
            aus der DB statt aus Code.
          </p>
        </div>
      )}
    </div>
  );
}
