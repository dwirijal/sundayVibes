'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getDuration, STAGGER } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string | number;
  title: string;
  slug: string;
  category?: string;
  description: string;
  hero_image?: { url: string } | null;
}

interface ServicesClientProps {
  services: Service[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section header animation
      gsap.from('.services-header > *', {
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });

      // Service cards stagger reveal
      const serviceCards = gsap.utils.toArray('.service-card') as HTMLElement[];

      serviceCards.forEach((card, index) => {
        const isEven = index % 2 !== 0;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: isEven ? 60 : -60,
          duration: getDuration(0.8),
          ease: 'power3.out',
        });

        // Image parallax within card
        const image = card.querySelector('.service-image');
        if (image) {
          gsap.fromTo(image,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, { scope: sectionRef });

  if (services.length === 0) {
    return (
      <section className="py-24 bg-white dark:bg-stone-950 relative z-10" id="services">
        <div className="container mx-auto px-6">
          <div className="text-center py-12 bg-muted rounded-3xl border border-border">
            <p className="text-xl text-muted-foreground font-medium">Layanan sedang disiapkan, nantikan update dari kami!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-stone-950 relative z-10" id="services">
      <div className="container mx-auto px-6">
        <div className="services-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Layanan Kami</h2>
          <p className="text-lg text-muted-foreground">Solusi lengkap untuk kebutuhan kreatif dan digital Anda.</p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-24">
          {services.map((service, index) => {
            const isEven = index % 2 !== 0;
            const imageUrl = service.hero_image && typeof service.hero_image === 'object' && service.hero_image.url
              ? service.hero_image.url
              : null;

            return (
              <div
                key={service.id}
                className={`service-card flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 p-8 lg:p-12 rounded-[2.5rem] ${isEven ? 'bg-stone-50 dark:bg-stone-900' : 'bg-white dark:bg-stone-950 border border-stone-100 dark:border-stone-800'}`}
              >
                {/* Media Block */}
                <div className="w-full lg:w-1/2 aspect-[4/3] relative rounded-3xl overflow-hidden shadow-lg bg-stone-100 dark:bg-stone-800">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="service-image object-cover"
                    />
                  ) : (
                    <div className="text-6xl opacity-20 flex items-center justify-center h-full">✨</div>
                  )}
                </div>

                {/* Content Block */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  {service.category && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
                      {service.category}
                    </div>
                  )}

                  <h3 className="text-3xl lg:text-4xl font-black text-foreground mb-4 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <Button asChild size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 dark:bg-background dark:text-foreground magnetic-button">
                    <Link href={`/layanan/${service.slug}`}>Lihat Detail</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
