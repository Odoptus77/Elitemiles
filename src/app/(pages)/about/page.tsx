export default function AboutPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-white/50">About</p>
        <h1 className="font-display text-4xl">EliteMiles</h1>
        <p className="max-w-2xl text-white/65">
          EliteMiles helps travelers in Germany / DACH unlock luxury travel experiences — first class,
          five-star hotels, upgrades, and perks — by earning and redeeming points strategically.
        </p>
      </header>

      <div className="rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6 text-sm text-white/65">
        <p>
          We’re starting simple: clear education + practical tools + curated sweet spots. Over time,
          EliteMiles evolves into a full travel optimization platform.
        </p>
      </div>
    </div>
  );
}
