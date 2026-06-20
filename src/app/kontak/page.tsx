import { Button } from "@/components/ui/button";

export default function KontakPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <section className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Hubungi Kami
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
            Mari Diskusi<br />
            <span className="text-primary">Project Anda</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siap membantu mewujudkan ide kreatif Anda. Hubungi kami melalui channel di bawah atau isi form langsung.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
                💬
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-2">Respon cepat untuk konsultasi</p>
                <a href="https://wa.me/6285157319611" className="text-primary font-semibold hover:underline">
                  +62 851-5731-9611
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl shrink-0">
                🎵
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">TikTok</h3>
                <p className="text-muted-foreground text-sm mb-2">Follow untuk update terbaru</p>
                <a href="https://tiktok.com/@sundayvibes._" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">
                  @sundayvibes._
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center text-xl shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Lokasi</h3>
                <p className="text-muted-foreground text-sm mb-2">Studio & kantor</p>
                <p className="text-foreground font-medium">
                  Surabaya, Jawa Timur<br />
                  Indonesia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-muted text-foreground flex items-center justify-center text-xl shrink-0">
                🕐
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Jam Operasional</h3>
                <p className="text-muted-foreground text-sm mb-2">Siap melayani Anda</p>
                <p className="text-foreground font-medium">
                  Senin - Sabtu: 09.00 - 18.00<br />
                  Minggu: By appointment
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Kirim Pesan</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email / WhatsApp</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="email@example.com atau 08xx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Layanan yang Diminati</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Pilih layanan...</option>
                  <option value="events">Event Organizer</option>
                  <option value="digital">Digital Product</option>
                  <option value="sewa-alat">Sewa Alat</option>
                  <option value="design">Jasa Design</option>
                  <option value="coding">Jasa Coding</option>
                  <option value="wordpress">Jasa WordPress</option>
                  <option value="photography">Photography</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Ceritakan kebutuhan Anda..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Atau langsung chat via WhatsApp untuk respon tercepat</p>
          <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-green-600 text-white hover:bg-green-700">
            <a href="https://wa.me/6285157319611" className="flex items-center gap-2">
              💬 Chat WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
