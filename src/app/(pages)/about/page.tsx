export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">About</p>
        <h1 className="font-display text-4xl">EliteMiles</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          EliteMiles hilft Reisenden in Deutschland / DACH, Luxusreisen zu ermöglichen – First/Business,
          5-Sterne-Hotels, Upgrades und Perks – durch smartes Sammeln und Einlösen von Punkten.
        </p>
      </header>

      <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6 text-sm text-[color:var(--em-muted)]">
        <p>
          Wir starten bewusst einfach: klare Grundlagen + praktische Tools + kuratierte Sweet Spots.
          Schritt für Schritt wird EliteMiles zur Travel-Optimierungsplattform.
        </p>
      </div>
    </div>
  );
}
