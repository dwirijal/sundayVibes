import { JsonLd } from './JsonLd'

interface Review {
  author: string
  rating: number
  reviewBody: string
  datePublished: string
}

interface ReviewSchemaProps {
  reviews?: Review[]
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function ReviewSchema({ reviews, aggregateRating }: ReviewSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
  }

  if (reviews && reviews.length > 0) {
    schema.review = reviews.map(r => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.reviewBody,
      datePublished: r.datePublished,
    }))
  }

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
    }
  }

  return <JsonLd data={schema} />
}
