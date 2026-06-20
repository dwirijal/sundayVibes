import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-16 pb-8 mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/assets/logo-black-transparent.webp"
                alt="Sunday Vibes Logo"
                width={32}
                height={32}
                className="dark:invert opacity-90"
              />
              <span className="font-bold text-xl tracking-tight text-foreground">Sunday Vibes</span>
            </Link>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              One-stop creative platform. Menyatukan seluruh kebutuhan kreatif dan teknis Anda dalam satu ekosistem yang terintegrasi.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Layanan</h4>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <li><Link href="/layanan/events" className="hover:text-primary transition-colors">Event Organizer</Link></li>
              <li><Link href="/layanan/digital" className="hover:text-primary transition-colors">Digital Product</Link></li>
              <li><Link href="/layanan/sewa-alat" className="hover:text-primary transition-colors">Sewa Alat Dokumentasi</Link></li>
              <li><Link href="/layanan/design" className="hover:text-primary transition-colors">Design & Web Development</Link></li>
              <li><Link href="/layanan/photography" className="hover:text-primary transition-colors">Photography</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Perusahaan</h4>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
              <li><Link href="/license" className="hover:text-primary transition-colors">Lisensi Produk Digital</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Sunday Vibes. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
