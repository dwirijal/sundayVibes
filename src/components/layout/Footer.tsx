import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-16 pb-8 mt-24 print:hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" style={{ minHeight: '44px' }}>
              <Image
                src="/assets/logo-black-transparent.webp"
                alt="Sunday Vibes Logo"
                width={32}
                height={32}
                className="dark:invert dark:opacity-100 opacity-90"
              />
              <span className="font-bold text-xl tracking-tight text-foreground">Sunday Vibes</span>
            </Link>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              One-stop creative platform. Menyatukan seluruh kebutuhan kreatif dan teknis Anda dalam satu ekosistem yang terintegrasi.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Layanan</h4>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <li><Link href="/layanan/events" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Event Organizer</Link></li>
              <li><Link href="/layanan/digital" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Digital Product</Link></li>
              <li><Link href="/layanan/sewa-alat" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Sewa Alat Dokumentasi</Link></li>
              <li><Link href="/layanan/design" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Design & Web Development</Link></li>
              <li><Link href="/layanan/photography" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Photography</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <li><Link href="/tentang" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Tentang Kami</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Portfolio</Link></li>
              <li><Link href="/kontak" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Hubungi Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Ikuti Kami</h4>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <li>
                <a href="https://wa.me/6285157319611" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-2" style={{ minHeight: '44px' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.616l4.584-1.453A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.645-6.379-1.763l-.457-.275-2.982.944.961-2.903-.299-.476A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@sundayvibes._" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-2" style={{ minHeight: '44px' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
                  TikTok
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Sunday Vibes. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Syarat & Ketentuan</Link>
            <Link href="/refund-policy" className="hover:text-primary transition-colors" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>Kebijakan Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
