import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return posts[0] || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 100,
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'
  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.title
  const images = post.thumbnail?.url ? [{ url: post.thumbnail.url }] : undefined

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${baseUrl}/blog/${post.slug}`,
      images,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: typeof post.author === 'object' ? [post.author?.name].filter(Boolean) : undefined,
    },
    twitter: { title, description, images },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'
  const authorName = typeof post.author === 'object' ? post.author?.name : undefined
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo?.metaDescription || post.title,
    image: post.thumbnail?.url || undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: authorName ? { '@type': 'Person', name: authorName } : undefined,
    publisher: { '@type': 'Organization', name: 'Sunday Vibes', url: baseUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}` },
  }

  return (
    <article className="min-h-screen bg-background">
      <JsonLd data={articleSchema} />
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
        </Link>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          {post.category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {post.author && typeof post.author === 'object' && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.thumbnail?.url && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={post.thumbnail.url}
                alt={post.thumbnail.alt || post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <RichText data={post.content} />
        </div>
      </div>
    </article>
  )
}
