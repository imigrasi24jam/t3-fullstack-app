import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const benefits = [
    { title: "Meningkatkan Kredibilitas", desc: "Bisnis terlihat lebih profesional dan terpercaya.", icon: "/image/icon-code.png" },
    { title: "Engagement Pelanggan", desc: "Form, chat, dan konten yang membuat pelanggan kembali.", icon: "/image/icon-chat.png" },
    { title: "Jangkauan Lebih Luas", desc: "Website tampil 24/7, dijangkau dari mana saja.", icon: "/image/icon-globe.png" },
    { title: "Tampil 24/7", desc: "Selalu online, informasi selalu tersedia.", icon: "/image/icon-clock.png" },
    { title: "Showcase Produk/Jasa", desc: "Galeri, katalog, hingga portofolio yang rapi.", icon: "/image/icon-gallery.png" },
    { title: "Otomasi & Penjualan", desc: "Integrasi pembayaran & formulir otomatis.", icon: "/image/icon-cart.png" },
  ];

  return (
    <main className="text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/30 via-transparent to-transparent" />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pb-20 pt-16 text-center md:flex-row md:gap-10 md:text-left">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Bangun Website Bisnis Profesional bersama{" "}
              <span className="text-emerald-400">INDONESIA.js</span>
            </h1>
            <p className="mt-4 text-white/80">
              Modern, cepat, aman, SEO-ready, dan mobile-first. Ubah pengunjung menjadi pelanggan.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/packages" className="rounded-md bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400">
                Lihat Paket
              </Link>
              <Link href="/contact" className="rounded-md border border-white/20 px-6 py-3 font-semibold hover:border-white/40">
                Konsultasi Gratis
              </Link>
            </div>
          </div>
          <div className="relative mt-8 h-64 w-full flex-1 md:mt-0">
            <Image src="/image/hero-dev.jpg" alt="INDONESIA.js" fill className="object-cover rounded-xl border border-white/10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-center text-3xl font-bold">Kenapa Bisnis Perlu Website?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-white/70">
          Website adalah aset digital yang bekerja 24/7 membangun kredibilitas, menjangkau audiens baru, dan mengotomasi proses bisnis Anda.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-emerald-400/40 hover:bg-white/10">
              <div className="mb-3 h-10 w-10">
                <Image src={b.icon} alt={b.title} width={40} height={40} />
              </div>
              <div className="font-semibold">{b.title}</div>
              <div className="mt-1 text-sm text-white/70">{b.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/packages" className="rounded-md bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400">
            Mulai dari Rp 500.000 →
          </Link>
        </div>
      </section>
    </main>
  );
}
