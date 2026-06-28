import { JsonLd } from './JsonLd'

interface ServiceSchemaProps {
  name: string
  description: string
  provider: string
  areaServed: string[]
  priceRange?: string
}

export function ServiceSchema({ name, description, provider, areaServed, priceRange }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed: areaServed.map(city => ({
      '@type': 'City',
      name: city,
    })),
    ...(priceRange && { priceRange }),
  }

  return <JsonLd data={schema} />
}
