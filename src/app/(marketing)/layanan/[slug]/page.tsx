import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import Image from 'next/image'
import Link from 'next/link'
// Button import removed — page renders links, not <Button>
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ServiceSchema } from '@/components/seo/ServiceSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })

  return services.docs.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const services = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!services.docs.length) {
    notFound()
  }

  const service = services.docs[0]

  return (
    <div className="min-h-screen bg-background">
      <ServiceSchema
        name={service.title}
        description={service.description}
        provider="Sunday Vibes"
        areaServed={['Surabaya', 'Tuban']}
        priceRange="Rp 25.000 - Rp 5.000.000"
      />
      <BreadcrumbSchema items={[
        { name: 'Beranda', url: '/' },
        { name: 'Layanan', url: '/layanan' },
        { name: service.title, url: `/layanan/${slug}` },
      ]} />
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {service.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={service.heroImage.url || ''}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.description}
            </p>
            <Link
              href={`/booking?service=${slug}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/80 min-h-[44px]"
            >
              Mulai Project
            </Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      {service.packages && service.packages.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
              Pilihan Paket
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {service.packages.map((pkg: { name: string; price: string; features?: Array<{ text: string }> }, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-lg shadow-lg p-8 border border-border hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold mb-6 text-primary">
                    {pkg.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features && pkg.features.map((feature, fIndex: number) => (
                      <li key={fIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/booking?service=${slug}&package=${pkg.name}`}
                    className={cn(
                      "w-full inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium min-h-[44px]",
                      index === 1
                        ? "bg-primary text-primary-foreground hover:bg-primary/80"
                        : "border border-border bg-background hover:bg-muted hover:text-foreground"
                    )}
                  >
                    Pilih Paket
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Siap Memulai Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hubungi kami untuk konsultasi gratis dan dapatkan penawaran terbaik untuk project Anda
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/booking?service=${slug}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/80 min-h-[44px]"
            >
              Booking Sekarang
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-muted hover:text-foreground min-h-[44px]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
