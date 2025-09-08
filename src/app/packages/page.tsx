"use client";

import Image from "next/image";
import { useState } from "react";

type PackageItem = {
  code: string;
  name: string;
  price: number; // in IDR
  features: string[];
  benefit: string;
};

const packages: PackageItem[] = [
  { code: "PKG1", name: "Starter", price: 500_000, features: ["1 Halaman Landing", "Responsive Design", "SSL & Hosting Basic", "SEO Dasar"], benefit: "Cocok untuk UMKM yang butuh online presence cepat." },
  { code: "PKG2", name: "Basic", price: 900_000, features: ["3 Halaman", "Form Kontak", "Free Domain .my.id", "Google Analytics"], benefit: "Mulai bangun brand dengan konten yang lebih lengkap." },
  { code: "PKG3", name: "Business", price: 1_500_000, features: ["5 Halaman", "Blog/Artikel", "Optimasi Kecepatan", "Dukungan 1 Bulan"], benefit: "Perkuat kredibilitas bisnis & edukasi pelanggan." },
  { code: "PKG4", name: "Company", price: 2_500_000, features: ["8 Halaman", "Galeri/Portfolio", "Kustom Seksi", "SEO On-Page"], benefit: "Profil perusahaan profesional untuk tender & kerja sama." },
  { code: "PKG5", name: "Catalog", price: 3_500_000, features: ["Katalog Produk", "Search & Filter", "Inquiry via WA", "Hosting Premi"], benefit: "Tampilkan produk lengkap dengan navigasi mudah." },
  { code: "PKG6", name: "E‑Commerce Lite", price: 4_500_000, features: ["Keranjang & Checkout", "Tripay Payment", "Notifikasi Email", "Voucher Diskon"], benefit: "Jualan online cepat dengan fitur inti toko." },
  { code: "PKG7", name: "E‑Commerce Pro", price: 6_500_000, features: ["Multi Kurir", "Stok & Varian", "Laporan Penjualan", "Optimasi SEO Produk"], benefit: "Skalakan penjualan dengan fitur lengkap." },
  { code: "PKG8", name: "Custom App Lite", price: 8_500_000, features: ["Halaman Khusus", "API Sederhana", "Admin Panel Dasar", "Auth"], benefit: "Kebutuhan unik bisnis Anda dengan biaya efisien." },
  { code: "PKG9", name: "Custom App Pro", price: 12_000_000, features: ["Role Based Access", "Integrasi Pihak Ketiga", "CI/CD", "Monitoring"], benefit: "Aplikasi tailor‑made, siap scale & maintainable." },
  { code: "PKG10", name: "Enterprise", price: 20_000_000, features: ["Arsitektur Microservice", "HA & Backup", "SLA & Support", "Security Review"], benefit: "Solusi enterprise dengan reliability & keamanan tinggi." },
];

const currency = (v: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);

export default function PackagesPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PackageItem | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const PHP_BASE = process.env.NEXT_PUBLIC_PHP_BASE ?? "http://127.0.0.1:8080";

  const onCheckout = async () => {
    if (!selected) return;
    const res = await fetch(`${PHP_BASE}/create_transaction.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        package_code: selected.code,
        package_name: selected.name,
        price: selected.price,
      }),
    });
    const data = await res.json();
    if (data?.success && data?.checkout_url) {
      window.location.href = data.checkout_url as string;
    } else {
      alert(data?.message ?? "Gagal membuat transaksi");
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-center">Paket Website INDONESIA<span className="text-emerald-400">.js</span></h1>
      <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
        Pilih paket sesuai kebutuhan. Semua paket responsif, aman, dan SEO-friendly.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <div key={p.code} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">{p.code}</div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">{currency(p.price)}</div>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400/80" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-white/70">{p.benefit}</p>
            <button
              onClick={() => { setSelected(p); setOpen(true); }}
              className="mt-5 w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
            >
              Checkout via Tripay
            </button>
          </div>
        ))}
      </div>

      {open && selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#0b1220] p-6 text-white">
            <div className="mb-4 text-lg font-bold">Data Pemesan — {selected.name}</div>
            <div className="space-y-3">
              <input
                className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 outline-none"
                placeholder="Nama Lengkap"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 outline-none"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="w-full rounded border border-white/10 bg-white/5 px-3 py-2 outline-none"
                placeholder="No. HP / WhatsApp"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setOpen(false)} className="flex-1 rounded border border-white/20 px-4 py-2">
                Batal
              </button>
              <button onClick={onCheckout} className="flex-1 rounded bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400">
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}