import Link from "next/link";

const tools = [
  {
    title: "Redemption Value Calculator",
    desc: "Cash price vs points + taxes → value per point + quality rating.",
    href: "/tools/redemption-value",
  },
  {
    title: "Transfer Partner Optimizer (Basic)",
    desc: "Select points currency + target program → curated transfer paths.",
    href: "/tools/transfer-partner",
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--em-muted)]">Tools</p>
        <h1 className="font-display text-4xl">Practical calculators</h1>
        <p className="max-w-2xl text-[color:var(--em-muted)]">
          The MVP focuses on tools that help you make better decisions quickly.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group rounded-2xl border border-[color:var(--em-border)] bg-[color:var(--em-card)] p-6 transition hover:border-[color:var(--em-gold)]/40"
          >
            <h2 className="font-display text-2xl">{t.title}</h2>
            <p className="mt-2 text-sm text-[color:var(--em-muted)]">{t.desc}</p>
            <div className="mt-5 text-sm text-[color:var(--em-gold)]">
              Open →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
