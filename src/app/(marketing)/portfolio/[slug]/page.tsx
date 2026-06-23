import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, User, Tag } from "lucide-react";
import { getPayload } from 'payload'
import configPromise from '@payload-config'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
  })
  return projects.docs.map((project) => ({ slug: project.slug }))
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise })

  const projectResult = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  if (projectResult.docs.length === 0) {
    notFound();
  }

  const project = projectResult.docs[0];

  // Get related projects from same category
  const relatedResult = await payload.find({
    collection: 'projects',
    where: {
      category: { equals: project.category?.id },
      slug: { not_equals: slug },
    },
    limit: 3,
    depth: 1,
  })

  const relatedProjects = relatedResult.docs;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Portfolio
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            {project.client && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{project.client}</span>
              </div>
            )}
            {project.category && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{project.category.title}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                >
                  #{tag.tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail */}
        {project.thumbnail?.url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg mb-16">
            <Image
              src={project.thumbnail.url}
              alt={project.thumbnail.alt || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-foreground mb-6">Tentang Proyek</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {project.description}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-foreground mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech_stack.map((item: any, index: number) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold"
                >
                  {item.tech}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-foreground mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item: any, index: number) => (
                item.image?.url && (
                  <div
                    key={index}
                    className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                  >
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || `${project.title} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {project.result && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-foreground mb-6">Hasil</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground bg-primary/5 p-8 rounded-3xl border border-primary/20">
              {project.result}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-16 border-t border-border">
          <h2 className="text-3xl font-black text-foreground mb-4">Tertarik dengan proyek serupa?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mari diskusikan bagaimana kami bisa membantu mewujudkan visi Anda
          </p>
          <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-black text-foreground mb-8">Proyek Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((related) => (
                <Link
                  key={related.slug}
                  href={`/portfolio/${related.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm group-hover:shadow-xl transition-all duration-300 mb-4">
                    {related.thumbnail?.url ? (
                      <Image
                        src={related.thumbnail.url}
                        alt={related.thumbnail.alt || related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {related.title}
                  </h3>
                  {related.client && (
                    <p className="text-sm text-muted-foreground">{related.client}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
