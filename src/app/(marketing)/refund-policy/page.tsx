import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Kebijakan Refund - Sunday Vibes",
    description: "Kebijakan Refund Sunday Vibes. Pelajari syarat dan ketentuan pengembalian dana untuk layanan kami.",
    openGraph: {
      title: "Kebijakan Refund - Sunday Vibes",
      description: "Kebijakan Refund Sunday Vibes. Pelajari syarat dan ketentuan pengembalian dana untuk layanan kami.",
      type: "website",
    },
  };
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 max-w-4xl mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">Kebijakan Refund</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Kebijakan Refund</h1>
        <p className="text-lg text-muted-foreground">Terakhir diperbarui: 27 Juni 2026</p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 max-w-3xl">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Sunday Vibes berkomitmen memberikan layanan terbaik. Kebijakan Refund ini menjelaskan kondisi di mana pengembalian dana dapat diproses untuk layanan yang kami sediakan.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Kebijakan Umum</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Karena sifat layanan kreatif dan teknis yang kami berikan (custom-made untuk setiap klien), refund tidak selalu dimungkinkan setelah pekerjaan dimulai. Namun, kami memahami bahwa keadaan dapat berubah dan kami akan menangani setiap kasus secara adil.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Kondisi yang Memenuhi Syarat Refund</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Refund dapat dipertimbangkan dalam kondisi berikut:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li><strong>Pembatalan Sebelum Dimulai:</strong> Jika Anda membatalkan proyek sebelum pekerjaan dimulai, deposit dapat dikembalikan dengan potongan biaya administrasi maksimal 10%.</li>
            <li><strong>Kegagalan Deliverable:</strong> Jika kami tidak dapat memberikan deliverable sesuai kesepakatan dan tidak ada solusi alternatif yang disetujui.</li>
            <li><strong>Keterlambatan Signifikan:</strong> Jika kami gagal memenuhi deadline yang telah disepakati tanpa alasan yang sah, dan keterlambatan melebihi 30 hari dari jadwal yang dijanjikan.</li>
            <li><strong>Kesalahan Teknis:</strong> Jika deliverable memiliki bug atau kesalahan yang tidak dapat diperbaiki dalam waktu yang wajar.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Kondisi yang Tidak Memenuhi Syarat Refund</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Refund tidak dapat diproses dalam kondisi berikut:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Perubahan pikiran atau preferensi pribadi setelah proyek dimulai.</li>
            <li>Ketidakpuasan terhadap hasil kreatif yang sesuai dengan brief awal.</li>
            <li>Pembatalan sepihak setelah milestone atau deliverable telah diserahkan dan disetujui.</li>
            <li>Keterlambatan yang disebabkan oleh klien (tidak memberikan feedback, materi, atau approval tepat waktu).</li>
            <li>Force majeure atau keadaan di luar kendali kami.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Proses Refund</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Untuk mengajukan refund, ikuti langkah berikut:</p>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Hubungi tim kami melalui email atau formulir kontak dengan menyertakan detail proyek dan alasan refund.</li>
            <li>Tim kami akan meninjau permintaan Anda dalam waktu 3-5 hari kerja.</li>
            <li>Jika disetujui, refund akan diproses ke metode pembayaran asal dalam waktu 7-14 hari kerja.</li>
            <li>Anda akan menerima konfirmasi email setelah refund berhasil diproses.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Perhitungan Refund</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jumlah refund akan dihitung berdasarkan pekerjaan yang telah dilakukan:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li><strong>Belum dimulai:</strong> 90% dari total biaya (potongan 10% administrasi).</li>
            <li><strong>Tahap awal (0-25% selesai):</strong> 75% dari total biaya.</li>
            <li><strong>Tahap menengah (26-50% selesai):</strong> 50% dari total biaya.</li>
            <li><strong>Tahap lanjut (51%+ selesai):</strong> Tidak ada refund, namun kami akan menawarkan alternatif seperti penundaan atau restrukturisasi proyek.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Alternatif Selain Refund</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Dalam beberapa kasus, kami dapat menawarkan alternatif selain refund tunai:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li><strong>Kredit Layanan:</strong> Saldo yang dapat digunakan untuk layanan Sunday Vibes di masa depan.</li>
            <li><strong>Restrukturisasi Proyek:</strong> Menyesuaikan ruang lingkup atau timeline proyek sesuai kebutuhan Anda.</li>
            <li><strong>Revisi Tambahan:</strong> Menambah kuota revisi untuk memastikan kepuasan Anda.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Hak dan Kewajiban</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Setelah refund diproses, semua hak atas deliverable yang telah diserahkan tetap menjadi milik Sunday Vibes.</li>
            <li>Anda tidak diperkenankan menggunakan deliverable yang telah dibatalkan dan di-refund.</li>
            <li>Kami berhak menahan deliverable hingga refund diproses sepenuhnya.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Penyelesaian Sengketa</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jika terjadi ketidaksepakatan mengenai refund, kami akan berusaha menyelesaikannya melalui musyawarah terlebih dahulu. Jika tidak tercapai kesepakatan, masalah akan diselesaikan sesuai dengan ketentuan hukum yang berlaku di Indonesia.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">9. Perubahan Kebijakan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kami berhak mengubah Kebijakan Refund ini sewaktu-waktu. Kebijakan yang berlaku adalah versi terbaru yang diposting di halaman ini pada saat Anda mengajukan permintaan refund.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">10. Hubungi Kami</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Untuk pertanyaan atau pengajuan refund, silakan hubungi kami:
          </p>
          <ul className="list-none pl-0 text-muted-foreground space-y-2 mb-6">
            <li>Email: <a href="mailto:refund@sundayvibes.id" className="text-primary hover:underline">refund@sundayvibes.id</a></li>
            <li>Website: <Link href="/kontak" className="text-primary hover:underline">Formulir Kontak</Link></li>
          </ul>

          <div className="mt-12 pt-8 border-t border-border flex gap-6">
            <Link href="/terms" className="text-primary hover:underline">
              &larr; Syarat &amp; Ketentuan
            </Link>
            <Link href="/" className="text-primary hover:underline">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
