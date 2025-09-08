export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-white">
      <h1 className="text-3xl font-bold">Kontak Kami</h1>
      <p className="mt-2 text-white/70">
        Ingin konsultasi gratis? Kirimkan data Anda, kami akan hubungi dalam 1x24 jam.
      </p>

      <form className="mt-6 grid gap-4">
        <input className="rounded border border-white/10 bg-white/5 px-3 py-2 outline-none" placeholder="Nama" />
        <input className="rounded border border-white/10 bg-white/5 px-3 py-2 outline-none" placeholder="Email" />
        <input className="rounded border border-white/10 bg-white/5 px-3 py-2 outline-none" placeholder="No. HP / WhatsApp" />
        <textarea className="min-h-32 rounded border border-white/10 bg-white/5 px-3 py-2 outline-none" placeholder="Pesan / Kebutuhan Anda" />
        <button type="button" className="rounded bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400">
          Kirim
        </button>
      </form>
    </main>
  );
}