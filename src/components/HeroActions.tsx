import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TiltCard } from '@/components/animations';
import { BlobCursor } from '@/components/anime';

const FLOAT_CARDS = [
  {
    href: '/layanan/digital',
    className: 'absolute top-[10%] right-[10%]',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    icon: <><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></>,
    title: 'Digital Products',
    subtitle: 'Ready to publish',
  },
  {
    href: '/foto',
    className: 'absolute bottom-[20%] left-[5%]',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    icon: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>,
    title: 'Photography',
    subtitle: 'Professional Studio',
  },
  {
    href: '/layanan/coding',
    className: 'absolute top-[60%] right-[-5%] hidden sm:block',
    iconBg: 'bg-foreground dark:bg-background',
    iconColor: 'text-background dark:text-foreground',
    icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    title: 'Web & App',
    subtitle: 'Custom Dev',
  },
] as const;

function HeroActions(_props: Record<string, unknown>, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className="relative flex items-center justify-center h-[500px] lg:h-[600px] w-full">
      <BlobCursor fillColor="rgba(245, 158, 11, 0.35)" trailCount={3} sizes={[45, 65, 38]} className="absolute inset-0" />

      {/* Central Badge */}
      <TiltCard className="hero-center-badge relative z-20 w-72 h-72 sm:w-80 sm:h-80 bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-100 dark:border-stone-800 flex items-center justify-center p-12 hover:shadow-[0_30px_80px_-15px_rgba(245,158,11,0.15)] transition-shadow duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent rounded-[2.5rem] opacity-50" />
        <Image
          src="/assets/logo-black-transparent.webp"
          alt="Sunday Vibes"
          width={200}
          height={200}
          className="dark:invert object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
          priority
        />
      </TiltCard>

      {/* Floating Service Cards */}
      {FLOAT_CARDS.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className={`hero-float-card ${card.className} z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 hover:scale-105 transition-transform cursor-pointer block`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${card.iconBg} flex items-center justify-center ${card.iconColor}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {card.icon}
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">{card.title}</div>
              <div className="text-xs text-muted-foreground">{card.subtitle}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default forwardRef(HeroActions);
