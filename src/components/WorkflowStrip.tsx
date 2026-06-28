'use client';

import { useStaggerReveal } from '@/hooks/useScrollReveal';

const STEPS = [
  { n: '1', label: 'Pilih Layanan', accent: 'text-primary' },
  { n: '2', label: 'Briefing & Deal', accent: 'text-secondary' },
  { n: '3', label: 'Terima Hasil', accent: 'text-foreground' },
];

export function WorkflowStrip() {
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <section className="border-y border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="md:w-1/3">
            <h3 className="text-lg font-bold text-foreground mb-2">Kenapa Sunday Vibes?</h3>
            <p className="text-sm text-muted-foreground">
              Booking mudah, tracking transparan, dan hasil profesional dalam satu dashboard.
            </p>
          </div>
          <div ref={ref} className="flex gap-12 text-sm font-medium text-muted-foreground">
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1">
                <span className={`text-2xl font-black ${s.accent} transition-transform duration-300 hover:scale-110`}>
                  {s.n}
                </span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
