import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ButtonEffect } from '@/components/anime';
import { ShinyText } from '@/components/ui/shiny-text';

interface HeroContentProps {
  heroHeadline?: React.ReactNode;
  heroSubheadline?: string;
}

export default function HeroContent({ heroHeadline, heroSubheadline }: HeroContentProps) {
  return (
    <div className="flex flex-col items-start max-w-2xl">
      <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-8">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Premium Growth & Systems Agency
      </div>

      <h1 className="hero-headline text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.05] mb-6">
        {heroHeadline || (
          <>
            Karya terbaik,<br />
            <span className="text-primary"><ShinyText text="tanpa pusing." shineColor="#FCD34D" speed={3} /></span>
          </>
        )}
      </h1>

      <p className="hero-subheadline text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10">
        {heroSubheadline || "Mitra pertumbuhan digital strategis dan otomatisasi sistem bisnis. Kami membantu mengoptimalkan konversi funnel Anda, mengintegrasikan sistem AI cerdas, merancang identitas brand premium, serta mengelola infrastruktur IT modern perusahaan Anda secara profesional."}
      </p>

      <div className="hero-cta flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <ButtonEffect>
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-[background-color,transform,box-shadow] duration-300">
            <Link href="/layanan">Eksplorasi Layanan</Link>
          </Button>
        </ButtonEffect>
        <ButtonEffect>
          <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-2 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-300">
            <Link href="/portfolio">Lihat Portfolio</Link>
          </Button>
        </ButtonEffect>
      </div>

      {/* Trust Markers */}
      <div className="hero-trust mt-12 flex items-center gap-6 pt-8 border-t border-stone-200 dark:border-stone-800 w-full">
        <div className="flex -space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-900 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-500 z-[4] relative">
              {i === 4 ? '+50' : ''}
            </div>
          ))}
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Dipercaya oleh 50+ klien lokal & nasional
        </div>
      </div>
    </div>
  );
}
