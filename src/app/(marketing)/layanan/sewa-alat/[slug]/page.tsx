import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'
import { DetailClient } from './DetailClient'
import Image from 'next/image'

// Dummy data implementation to match the main catalog since we are not fully using Payload CMS yet for equipment
const catalogItems = [
  { slug: "il60-60w", name: "IL60 60W", desc: "Studio light portable, CRI 98", price: 75000, stock: 2, category: "Lighting Equipment", fullDesc: "Butuh pencahayaan studio berkualitas tinggi yang ringkas dan powerful? Sewa IL60 60W adalah solusi sempurna! Lampu LED portable ini menghadirkan cahaya alami dengan CRI 98 (Color Rendering Index sangat tinggi), sehingga warna objek tetap akurat dan vivid untuk produksi video, foto, maupun konten kreator.\n\nSpesifikasi Paket Sewa IL60 60W:\n• 1 unit Studio Light IL60 60W – Output cahaya powerful 60 Watt\n• CRI 98 – Reproduksi warna super akurat (hampir setara cahaya alami)\n• Desain portable & ringkas – Mudah dibawa untuk outdoor/indoor shooting\n• Fitur unggulan: Dimming 0-100%, color temperature adjustable (biasanya 2500K-6500K atau daylight), efek lighting scene, mounting Bowens compatible, silent operation\n• Cocok untuk standar light stand atau boom arm\n\nCatatan Penting: Paket ini mencakup unit lampu utama. Aksesoris tambahan seperti softbox, diffuser, atau baterai (jika ada) dapat disewa terpisah.\n\nMengapa Memilih Sewa IL60 60W?\nLampu studio LED 60W ini ringan, efisien energi, dan menghasilkan cahaya konsisten tanpa panas berlebih. Sangat ideal untuk:\n• Content creator TikTok, YouTube, Instagram Reels\n• Videografi & fotografi produk, portrait, interview, vlog\n• Produksi video pernikahan, event, real estate, studio kecil\n\nDengan CRI 98, Anda mendapatkan warna kulit natural, detail produk tajam, dan hasil sinematik profesional tanpa editing warna rumit. Desain portable membuatnya mudah digunakan di lapangan atau studio sementara." },
  { slug: "il150pro-150w", name: "IL150Pro 150W", desc: "Studio light pro, 2700K-7500K", price: 125000, stock: 2, category: "Lighting Equipment", fullDesc: "Butuh pencahayaan studio powerful dan fleksibel untuk hasil video & foto profesional? Sewa IL150Pro 150W adalah pilihan terbaik! Lampu COB LED portable ini menghadirkan output cahaya kuat dengan suhu warna adjustable 2700K-7500K, cocok untuk berbagai situasi shooting indoor maupun outdoor.\n\nSpesifikasi Paket Sewa IL150Pro 150W:\n• 1 unit Studio Light IL150Pro 150W – Output cahaya tinggi (hingga ~14.000 lumens)\n• Suhu Warna 2700K-7500K – Dari warm light hingga daylight, adjustable presisi\n• CRI 95+ – Reproduksi warna sangat akurat dan natural\n• Desain portable & compact dengan kontrol dimming 0-100%\n• Fitur unggulan: Efek lighting scene, silent operation (tanpa noise), mounting Bowens compatible, kompatibel softbox & aksesoris\n\nCatatan Penting: Paket ini mencakup unit lampu utama. Aksesoris seperti softbox, grid, atau stand dapat disewa terpisah sesuai kebutuhan.\n\nMengapa Memilih Sewa IL150Pro 150W?\nLampu studio LED 150W ini powerful namun tetap ringan dan efisien, menghasilkan cahaya konsisten tanpa panas berlebih. Sangat ideal untuk:\n• Content creator YouTube, TikTok, Instagram Reels & Live Streaming\n• Videografi & fotografi produk, portrait, interview, vlog, wedding\n• Produksi video studio kecil, real estate, event, dan konten profesional\n\nDengan rentang suhu warna 2700K-7500K yang luas, Anda bisa menyesuaikan mood lighting dari warm cozy hingga bright daylight. CRI tinggi memastikan warna kulit dan objek tampil natural, mengurangi editing pasca produksi." },
  { slug: "dji-lito-x1", name: "DJI Lito X1", desc: "Drone 4K/60fps HDR, 48MP, ActiveTrack, 30mnt", price: 220000, stock: 1, category: "Drone & Aerial", images: ["/images/equipment/dji-lito-x1-4.jpg", "/images/equipment/dji-lito-x1-5.jpg", "/images/equipment/dji-lito-x1-6.jpg", "/images/equipment/dji-lito-x1-7.jpg"], fullDesc: "Ingin hasil video dan foto drone berkualitas tinggi tanpa harus beli unit mahal? Sewa DJI Lito X1 adalah pilihan terbaik! Drone ringan di bawah 249 gram ini cocok untuk pemula hingga profesional yang butuh performa premium dengan kemudahan penggunaan.\n\nSpesifikasi Paket Sewa DJI Lito X1:\n• 1 unit Drone DJI Lito X1 dengan kamera 1/1.3-inch CMOS 48MP, lensa f/1.7 (FOV 82.1°)\n• Video: 4K/60fps HDR, 4K/100fps slow motion, dukungan 10-bit D-Log M\n• Foto: Hingga 48MP (8K resolusi tinggi), format JPEG & RAW\n• 1x Intelligent Flight Battery – Estimasi terbang 30 menit per baterai\n• Remote Controller DJI RC-N3 (kompatibel dengan smartphone via DJI Fly App)\n• Transmission O4 hingga 15 km jarak kontrol stabil\n• Fitur unggulan: Obstacle Avoidance omnidirectional + Forward LiDAR (deteksi rintangan bahkan di malam hari), ActiveTrack, QuickShots, dan mode penerbangan aman\n\nCatatan Penting: Paket ini tidak termasuk propeller cadangan. Pastikan membawa perlengkapan sendiri jika diperlukan.\n\nMengapa Memilih Sewa DJI Lito X1?\nDrone sub-250g ini tidak perlu registrasi khusus di banyak negara (C0/UK0 class), ringan, dan sangat portabel. Cocok untuk:\n• Videografi & fotografi pernikahan, wisata, real estate\n• Content creator TikTok, YouTube, Instagram Reels\n• Pemula yang ingin mencoba drone canggih dengan biaya terjangkau\n\nDapatkan hasil sinematik tajam di siang dan malam hari berkat sensor besar dan aperture lebar. Dengan LiDAR depan dan sensing lengkap, Anda bisa terbang lebih percaya diri di lokasi kompleks." },
  { slug: "dji-neo-2", name: "DJI Neo 2", desc: "Drone 4K/60fps, 12MP, Omnidirectional Obstacle Avoidance, 19mnt", price: 175000, stock: 1, category: "Drone & Aerial", images: ["/images/equipment/dji-neo-2-1.jpg", "/images/equipment/dji-neo-2-2.jpg", "/images/equipment/dji-neo-2-3.jpg", "/images/equipment/dji-neo-2-4.jpg"], fullDesc: "Mau hasil video sinematik 4K yang stabil dan mudah digunakan? Sewa DJI Neo 2 adalah pilihan ideal! Drone super kompak dengan berat hanya 151 gram ini dilengkapi omnidirectional obstacle avoidance, cocok untuk siapa saja yang ingin rekam momen keren tanpa ribet.\n\nSpesifikasi Paket Sewa DJI Neo 2:\n• 1 unit Drone DJI Neo 2 dengan kamera 12MP 1/2-inch CMOS, lensa FOV lebar\n• Video: 4K/60fps, 4K/100fps slow motion, 2.7K vertical video\n• Foto: 12MP resolusi tinggi\n• 1x Intelligent Flight Battery – Estimasi terbang hingga 19 menit (realistis ~15-17 menit)\n• Remote Controller DJI RC-N2 (kompatibel O4 transmission)\n• Fitur unggulan: Omnidirectional Obstacle Avoidance (termasuk Forward LiDAR), ActiveTrack, SelfieShot, Gesture Control, palm takeoff & landing, QuickShots, MasterShots\n\nCatatan Penting: Paket ini tidak termasuk propeller cadangan. Propeller guard sudah terpasang untuk keamanan ekstra.\n\nMengapa Memilih Sewa DJI Neo 2?\nDrone ringan di bawah 250 gram ini tidak perlu registrasi khusus di banyak tempat (C0 class), sangat portabel, dan aman untuk pemula. Cocok untuk:\n• Content creator TikTok, Instagram Reels, YouTube Shorts\n• Vlog perjalanan, acara keluarga, wedding highlight\n• Pemula yang ingin drone pintar dengan tracking otomatis\n\nDengan omnidirectional sensing dan propeller guard lengkap, Anda bisa terbang lebih aman di ruangan, dekat pohon, atau area ramai. Hasil video tajam siang & malam dengan stabilisasi gimbal 2-axis + EIS." }
];

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const item = catalogItems.find(i => i.slug === params.slug);
  if (!item) {
    return { title: 'Alat Tidak Ditemukan - Sunday Vibes' };
  }

  return {
    title: `Sewa ${item.name} - Sunday Vibes`,
    description: item.desc,
  };
}

export default async function SewaAlatDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const item = catalogItems.find(i => i.slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link href="/layanan/sewa-alat" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Katalog Alat
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image & Gallery Placeholder */}
          
          {/* Image & Gallery */}
          <div className="lg:sticky lg:top-32 relative z-10">
            {item.images && item.images.length > 0 ? (
              <div className="space-y-4">
                <div className="aspect-square w-full rounded-[2.5rem] bg-card border border-border flex flex-col items-center justify-center p-0 text-center relative overflow-hidden">
                  <div className="absolute top-6 left-6 z-10">
                    <span className="text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-3 py-1.5 rounded-full backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <Image 
                    src={item.images[0]} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                {item.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {item.images.slice(1).map((img, idx) => (
                      <div key={idx} className="aspect-square w-full rounded-2xl bg-card border border-border relative overflow-hidden">
                        <Image src={img} alt={`${item.name} - ${idx+2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square w-full rounded-[2.5rem] bg-card border border-border flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                <div className="absolute top-6 left-6">
                  <span className="text-xs font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-3 py-1.5 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-6xl mb-6">
                  {item.category.includes('Drone') ? '🚁' : item.category.includes('Lighting') ? '💡' : '📷'}
                </div>
                <h2 className="text-2xl font-black text-foreground opacity-20">{item.name}</h2>
              </div>
            )}
          </div>


          {/* Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">{item.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{item.desc}</p>
            
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-border">
              <div className="text-4xl font-black text-foreground">
                Rp {item.price.toLocaleString("id-ID")}
              </div>
              <div className="text-muted-foreground mb-1">/ hari</div>
            </div>

            {/* Client component for add to cart */}
            <DetailClient item={item} />

            {/* Full Description */}
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold mb-4">Deskripsi Alat</h3>
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {item.fullDesc}
              </div>
            </div>

            {/* Deposit Info */}
            <div className="mt-12 bg-secondary/5 border border-secondary/20 rounded-2xl p-6 flex items-start gap-4">
              <Shield className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground mb-1">Ketentuan Deposit</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Penyewaan wajib menggunakan jaminan KTP/SIM Asli yang ditinggal selama masa sewa. 
                  Kerusakan dan kehilangan menjadi tanggung jawab penuh penyewa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
