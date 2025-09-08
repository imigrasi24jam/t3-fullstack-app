import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "INDONESIA.js — Jasa Pembuatan Website Profesional",
  description:
    "INDONESIA.js membantu bisnis Anda punya website profesional: cepat, aman, SEO, dan siap scale.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-white">
        <Link href="/" className="font-extrabold text-xl tracking-wide">
          INDONESIA<span className="text-emerald-400">.js</span>
        </Link>
        <div className="hidden gap-6 md:flex">
          <Link href="/" className="hover:text-emerald-300">Home</Link>
          <Link href="/packages" className="hover:text-emerald-300">Packages</Link>
          <Link href="/contact" className="hover:text-emerald-300">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/80 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-extrabold text-xl">INDONESIA<span className="text-emerald-400">.js</span></div>
          <p className="mt-2 text-sm text-white/80">
            Layanan pembuatan website profesional: cepat, aman, SEO, dan mobile-first.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Navigasi</div>
          <ul className="space-y-1 text-white/80">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/packages">Packages</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Kontak</div>
          <p className="text-white/80 text-sm">Email: hello@indonesiajs.com</p>
          <p className="text-white/80 text-sm">Telepon/WA: +62-8xxx-xxxx</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} INDONESIA.js. All rights reserved.
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable}`}>
      <body className="bg-gradient-to-b from-[#0b1020] to-[#0a0f1a]">
        <TRPCReactProvider>
          <Navbar />
          {children}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
