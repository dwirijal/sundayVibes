import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata: Metadata = {
  title: "Portfolio - Sunday Vibes",
  description: "Lihat portfolio dan case study project Sunday Vibes. Event, design, photography, dan web development.",
};

export default async function PortfolioPage() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    limit: 12,
    depth: 1,
    sort: '-createdAt',
  })

  const tiktoks = [
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648357287551192341", id: "7648357287551192341" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648366641457450260", id: "7648366641457450260" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648367069150530838", id: "7648367069150530838" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648367468167384342", id: "7648367468167384342" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
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
        {projects.docs.length > 0 && (
          <section className="mb-24">
            <h2 className="text-3xl font-black text-foreground mb-8">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.docs.map((project) => (
                <Link
                  key={project.id}
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
              ))}
            </div>
          </section>
        )}

        {/* TikTok Videos */}
        <section className="mb-24">
          <h2 className="text-3xl font-black text-foreground mb-8">Dokumentasi Event & Trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiktoks.map((tt, i) => (
              <div key={i} className="group relative aspect-[9/16] bg-muted rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
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

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)]">
            <Link href="/kontak">Diskusikan Proyek Anda</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
