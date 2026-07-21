import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'
  let payload: Awaited<ReturnType<typeof getPayload>> | null = null
  try {
    payload = await getPayload({ config: configPromise })
  } catch {
    payload = null
  }

  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/foto`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produk-digital`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sewa-alat`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/lokasi/tuban`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ]

  // Add dynamic service pages
  const services = [
    'events', 'digital', 'sewa-alat', 'design', 'coding', 'wordpress', 'photography'
  ];

  services.forEach(service => {
    sitemapData.push({
      url: `${baseUrl}/layanan/${service}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  if (!payload) return sitemapData

  // ⚡ Bolt: Fetch all dynamic collections concurrently to speed up sitemap generation.
  // ⚡ Bolt: Use `depth: 0` and `select` to only fetch required fields (slug, dates),
  // significantly reducing payload size, parsing overhead, and database query time.
  const commonOptions = {
    depth: 0,
    select: { slug: true, updatedAt: true, createdAt: true } as const,
  }

  // Use Promise.allSettled to maintain fault tolerance (if one collection fails, others still render)
  const results = await Promise.allSettled([
    payload.find({ collection: 'posts', limit: 100, ...commonOptions }),
    payload.find({ collection: 'projects', limit: 100, ...commonOptions }),
    payload.find({ collection: 'photos', limit: 500, ...commonOptions }),
    payload.find({ collection: 'products', limit: 100, ...commonOptions }),
  ])

  const [postsResult, projectsResult, photosResult, productsResult] = results

  if (postsResult.status === 'fulfilled') {
    postsResult.value.docs.forEach((post) => {
      if (post.slug) {
        sitemapData.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date((post.updatedAt || post.createdAt) as string),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      }
    })
  } else {
    console.error('Failed to fetch posts for sitemap:', postsResult.reason)
  }

  if (projectsResult.status === 'fulfilled') {
    projectsResult.value.docs.forEach((project) => {
      if (project.slug) {
        sitemapData.push({
          url: `${baseUrl}/portfolio/${project.slug}`,
          lastModified: new Date((project.updatedAt || project.createdAt) as string),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  } else {
    console.error('Failed to fetch projects for sitemap:', projectsResult.reason)
  }

  if (photosResult.status === 'fulfilled') {
    photosResult.value.docs.forEach((photo) => {
      if (photo.slug) {
        sitemapData.push({
          url: `${baseUrl}/foto/${photo.slug}`,
          lastModified: new Date((photo.updatedAt || photo.createdAt) as string),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })
  } else {
    console.error('Failed to fetch photos for sitemap:', photosResult.reason)
  }

  if (productsResult.status === 'fulfilled') {
    productsResult.value.docs.forEach((product) => {
      if (product.slug) {
        sitemapData.push({
          url: `${baseUrl}/produk-digital/${product.slug}`,
          lastModified: new Date((product.updatedAt || product.createdAt) as string),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  } else {
    console.error('Failed to fetch products for sitemap:', productsResult.reason)
  }

  return sitemapData
}
