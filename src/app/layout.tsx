import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const inter = Inter({
  variable: "--font-em-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-em-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EliteMiles — Luxusreisen mit Punkten & Meilen",
    template: "%s — EliteMiles",
  },
  description:
    "Verständliche Points-&-Miles-Strategien für Luxusflüge und Hotels (Deutschland / DACH).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <div className="min-h-dvh bg-[color:var(--em-bg)] text-[color:var(--em-fg)]">
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
