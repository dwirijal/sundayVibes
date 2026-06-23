'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getDuration, STAGGER } from '@/lib/animations';
import { TiltCard } from '@/components/animations';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string | number;
  title: string;
  slug: string;
  client?: string;
  tags?: Array<{ tag: string }>;
  thumbnail?: { url: string; alt?: string } | null;
  category?: { title: string } | null;
}

interface PortfolioClientProps {
  projects: Project[];
  tiktoks: Array<{ url: string; id: string }>;
  youtubeVideos?: Array<{ id: string; title: string }>;
}

export function PortfolioClient({ projects, tiktoks, youtubeVideos }: PortfolioClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.portfolio-header > *', {
        scrollTrigger: {
          trigger: '.portfolio-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });

      // Project cards stagger
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: STAGGER.SLOW,
        duration: getDuration(0.7),
        ease: 'power3.out',
      });

      // TikTok videos stagger
      gsap.from('.tiktok-card', {
        scrollTrigger: {
          trigger: '.tiktoks-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        rotateY: -15,
        stagger: STAGGER.NORMAL,
        duration: getDuration(0.6),
        ease: 'back.out(1.7)',
      });

      // YouTube videos stagger
      gsap.from('.youtube-card', {
        scrollTrigger: {
          trigger: '.youtube-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: STAGGER.NORMAL,
        duration: getDuration(0.6),
        ease: 'power3.out',
      });

      // CTA button
      gsap.from('.portfolio-cta', {
        scrollTrigger: {
          trigger: '.portfolio-cta',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.8,
        duration: getDuration(0.5),
        ease: 'elastic.out(1, 0.5)',
      });
    });

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* Header */}
      <div className="portfolio-header text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Our Works
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4">Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Proyek-proyek terbaik yang telah kami selesaikan untuk klien dari berbagai industri.
        </p>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 && (
        <section className="mb-24">
          <h2 className="text-3xl font-black text-foreground mb-8">Case Studies</h2>
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <TiltCard key={project.id} className="project-card">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm group-hover:shadow-xl transition-all duration-300 mb-4">
                    {project.thumbnail?.url ? (
                      <Image
                        src={project.thumbnail.url}
                        alt={project.thumbnail.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800 flex items-center justify-center">
                        <span className="text-6xl opacity-20">📁</span>
                      </div>
                    )}
                    {project.category && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
                        {project.category.title}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.slice(0, 3).map((tag: any, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs"
                        >
                          #{tag.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </TiltCard>
            ))}
          </div>
        </section>
      )}

      {/* TikTok Videos */}
      <section className="mb-24">
        <h2 className="text-3xl font-black text-foreground mb-8">Dokumentasi Event & Trip</h2>
        <div className="tiktoks-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiktoks.map((tt, i) => (
            <div key={i} className="tiktok-card group relative aspect-[9/16] bg-muted rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
              <iframe
                src={`https://www.tiktok.com/embed/v2/${tt.id}?lang=en-US`}
                className="w-full h-full border-0 absolute top-[-45px] scale-[1.05]"
                title="TikTok Video"
                allow="encrypted-media"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
              />
              <a
                href={tt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent"
              >
                <div className="text-white text-sm font-bold flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md rounded-full py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Tonton Penuh
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Videos */}
      {youtubeVideos && youtubeVideos.length > 0 && (
        <section className="mb-24">
          <h2 className="text-3xl font-black text-foreground mb-8">Video Dokumentasi</h2>
          <div className="youtube-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map((video, i) => (
              <div key={i} className="youtube-card group relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  className="absolute inset-0 w-full h-full border-0"
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="text-center">
        <Button asChild size="lg" className="portfolio-cta rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)]">
          <Link href="/kontak">Diskusikan Proyek Anda</Link>
        </Button>
      </div>
    </div>
  );
}
