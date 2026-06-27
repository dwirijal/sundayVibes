import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Syarat & Ketentuan - Sunday Vibes",
    description: "Syarat dan Ketentuan penggunaan layanan Sunday Vibes. Baca dengan seksama sebelum menggunakan layanan kami.",
    openGraph: {
      title: "Syarat & Ketentuan - Sunday Vibes",
      description: "Syarat dan Ketentuan penggunaan layanan Sunday Vibes. Baca dengan seksama sebelum menggunakan layanan kami.",
      type: "website",
    },
  };
}

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 max-w-4xl mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">Syarat &amp; Ketentuan</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Syarat &amp; Ketentuan</h1>
        <p className="text-lg text-muted-foreground">Terakhir diperbarui: 27 Juni 2026</p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 max-w-3xl">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Selamat datang di Sunday Vibes. Dengan menggunakan layanan kami, Anda menyetujui Syarat dan Ketentuan berikut. Harap baca dengan seksama sebelum memesan atau menggunakan layanan kami.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Definisi</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li><strong>&quot;Kami&quot;</strong> mengacu pada Sunday Vibes, platform kreatif yang berbasis di Surabaya.</li>
            <li><strong>&quot;Anda&quot;</strong> atau <strong>&quot;Klien&quot;</strong> mengacu pada individu atau entitas yang menggunakan layanan kami.</li>
            <li><strong>&quot;Layanan&quot;</strong> mengacu pada semua layanan yang disediakan oleh Sunday Vibes, termasuk namun tidak terbatas pada event management, produk digital, photography, design, coding, dan pengembangan website.</li>
            <li><strong>&quot;Proyek&quot;</strong> mengacu pada pekerjaan spesifik yang disepakati antara kami dan Anda.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Layanan Kami</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sunday Vibes menyediakan berbagai layanan kreatif dan teknis. Detail spesifik setiap layanan, termasuk ruang lingkup, timeline, dan deliverable akan disepakati dalam proposal atau kontrak terpisah untuk setiap proyek.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kami berhak untuk menolak atau membatalkan pesanan jika kami yakin bahwa proyek tersebut tidak sesuai dengan kapabilitas atau standar etika kami.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Pemesanan dan Kontrak</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Setiap proyek dimulai setelah adanya kesepakatan tertulis (proposal, quotation, atau kontrak).</li>
            <li>Anda akan menerima konfirmasi pesanan dan detail proyek sebelum pekerjaan dimulai.</li>
            <li>Perubahan ruang lingkup setelah proyek dimulai dapat mengakibatkan penyesuaian biaya dan timeline.</li>
            <li>Kami berhak meminta deposit atau pembayaran di muka sesuai kebijakan yang berlaku.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Pembayaran</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Harga layanan tercantum dalam proposal atau quotation yang diberikan.</li>
            <li>Pembayaran dilakukan sesuai jadwal yang disepakati (deposit, termin, atau pelunasan).</li>
            <li>Keterlambatan pembayaran dapat mengakibatkan penundaan atau penghentian proyek.</li>
            <li>Semua harga belum termasuk pajak kecuali dinyatakan lain.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Hak Kekayaan Intelektual</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Setelah pembayaran lunas, hak cipta atas deliverable final akan dialihkan kepada Anda, kecuali untuk:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Komponen, template, atau tools yang kami gunakan secara umum (bukan eksklusif untuk proyek Anda).</li>
            <li>Hak kami untuk menampilkan karya dalam portfolio Sunday Vibes (kecuali jika Anda meminta kerahasiaan).</li>
            <li>Konten pihak ketiga yang dilisensikan (font, stock photo, plugin, dll).</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Revisi dan Perubahan</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Setiap proyek mencakup jumlah revisi yang disepakati dalam proposal.</li>
            <li>Revisi di luar kuota akan dikenakan biaya tambahan.</li>
            <li>Perubahan besar pada brief atau ruang lingkup dianggap sebagai revisi mayor dan dapat mempengaruhi timeline dan biaya.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Pembatalan dan Penghentian</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Anda dapat membatalkan proyek kapan saja dengan pemberitahuan tertulis.</li>
            <li>Pembayaran untuk pekerjaan yang telah dilakukan tidak dapat dikembalikan.</li>
            <li>Kami berhak menghentikan proyek jika terjadi pelanggaran syarat oleh klien atau force majeure.</li>
            <li>Lihat <Link href="/refund-policy" className="text-primary hover:underline">Kebijakan Refund</Link> kami untuk detail lebih lanjut.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Batasan Tanggung Jawab</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sejauh diizinkan oleh hukum, tanggung jawab kami atas klaim yang berkaitan dengan layanan tidak akan melebihi jumlah yang Anda bayarkan untuk layanan tersebut. Kami tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">9. Kerahasiaan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kedua belah pihak sepakat untuk menjaga kerahasiaan informasi bisnis dan teknis yang dibagikan selama proyek berlangsung, kecuali jika diwajibkan oleh hukum.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">10. Hukum yang Berlaku</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap perselisihan akan diselesaikan secara musyawarah, dan jika tidak tercapai kesepakatan, akan diselesaikan melalui pengadilan yang berwenang di Surabaya.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">11. Perubahan Syarat</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kami berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan berlaku efektif setelah diposting di halaman ini. Penggunaan layanan yang berkelanjutan menandakan penerimaan terhadap perubahan tersebut.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">12. Kontak</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Untuk pertanyaan mengenai Syarat dan Ketentuan ini, silakan hubungi kami:
          </p>
          <ul className="list-none pl-0 text-muted-foreground space-y-2 mb-6">
            <li>Email: <a href="mailto:legal@sundayvibes.id" className="text-primary hover:underline">legal@sundayvibes.id</a></li>
            <li>Website: <Link href="/kontak" className="text-primary hover:underline">Formulir Kontak</Link></li>
          </ul>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-primary hover:underline">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
