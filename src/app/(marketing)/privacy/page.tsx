import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Kebijakan Privasi - Sunday Vibes",
    description: "Kebijakan Privasi Sunday Vibes. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
    openGraph: {
      title: "Kebijakan Privasi - Sunday Vibes",
      description: "Kebijakan Privasi Sunday Vibes. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
      type: "website",
    },
  };
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 max-w-4xl mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
          <li>/</li>
          <li className="text-foreground font-medium">Kebijakan Privasi</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">Kebijakan Privasi</h1>
        <p className="text-lg text-muted-foreground">Terakhir diperbarui: 27 Juni 2026</p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 max-w-3xl">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            Sunday Vibes (&quot;kami&quot;, &quot;milik kami&quot;) berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Informasi yang Kami Kumpulkan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Kami mengumpulkan beberapa jenis informasi, termasuk:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li><strong>Data Pribadi:</strong> Nama, alamat email, nomor telepon, dan informasi kontak lainnya yang Anda berikan saat mendaftar atau menghubungi kami.</li>
            <li><strong>Data Proyek:</strong> Brief, file, aset, dan informasi lain yang diperlukan untuk menyelesaikan proyek Anda.</li>
            <li><strong>Data Pembayaran:</strong> Informasi transaksi dan pembayaran yang diproses melalui penyedia pembayaran pihak ketiga yang aman.</li>
            <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda menggunakan website dan layanan kami, termasuk alamat IP, jenis browser, dan halaman yang dikunjungi.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Kami menggunakan informasi yang dikumpulkan untuk:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Menyediakan dan mengelola layanan yang Anda minta</li>
            <li>Berkomunikasi dengan Anda mengenai proyek, pesanan, dan pertanyaan</li>
            <li>Memproses pembayaran dan mengirim invoice</li>
            <li>Meningkatkan kualitas layanan dan pengalaman pengguna</li>
            <li>Mengirimkan update promosi dan newsletter (dengan persetujuan Anda)</li>
            <li>Mematuhi kewajiban hukum dan peraturan yang berlaku</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Penyimpanan dan Keamanan Data</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kami menyimpan data pribadi Anda selama diperlukan untuk menyediakan layanan dan memenuhi kewajiban hukum. Kami menerapkan langkah-langkah keamanan teknis dan organisasional yang sesuai untuk melindungi data Anda dari akses, penyalahgunaan, atau pengungkapan yang tidak sah.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Berbagi Informasi dengan Pihak Ketiga</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kami tidak menjual data pribadi Anda. Kami dapat membagikan informasi Anda dengan:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li><strong>Penyedia Layanan:</strong> Vendor pihak ketiga yang membantu kami menyediakan layanan (hosting, pembayaran, analitik).</li>
            <li><strong>Mitra Proyek:</strong> Freelancer atau mitra yang terlibat dalam penyelesaian proyek Anda, hanya sebatas informasi yang diperlukan.</li>
            <li><strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum atau untuk melindungi hak dan keamanan kami.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. Hak Anda</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Anda memiliki hak untuk:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
            <li>Meminta koreksi atas data yang tidak akurat</li>
            <li>Meminta penghapusan data pribadi Anda</li>
            <li>Menarik persetujuan untuk pemrosesan data</li>
            <li>Meminta portabilitas data</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">6. Cookies dan Teknologi Pelacakan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Website kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda. Anda dapat mengelola preferensi cookies melalui pengaturan browser Anda.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">7. Perubahan Kebijakan</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diposting di halaman ini dengan tanggal revisi yang diperbarui. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">8. Hubungi Kami</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda, silakan hubungi kami melalui:
          </p>
          <ul className="list-none pl-0 text-muted-foreground space-y-2 mb-6">
            <li>Email: <a href="mailto:privacy@sundayvibes.id" className="text-primary hover:underline">privacy@sundayvibes.id</a></li>
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
