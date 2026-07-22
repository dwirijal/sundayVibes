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

  // Execute independent queries concurrently using Promise.allSettled for fault tolerance.
  // We use depth: 0 and select only the fields needed for the sitemap to reduce payload size.
  const selectQuery = { slug: true, updatedAt: true, createdAt: true } as const;

  const results = await Promise.allSettled([
    payload.find({
      collection: 'posts',
      limit: 100,
      depth: 0,
      select: selectQuery,
    }),
    payload.find({
      collection: 'projects',
      limit: 100,
      depth: 0,
      select: selectQuery,
    }),
    payload.find({
      collection: 'photos',
      limit: 500,
      depth: 0,
      select: selectQuery,
    }),
    payload.find({
      collection: 'products',
      limit: 100,
      depth: 0,
      select: selectQuery,
    }),
  ]);

  // Handle Posts
  if (results[0].status === 'fulfilled') {
    results[0].value.docs.forEach((post) => {
      sitemapData.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date((post.updatedAt || post.createdAt) as string | number | Date),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  } else {
    console.error('Failed to fetch posts for sitemap:', results[0].reason)
  }

  // Handle Projects
  if (results[1].status === 'fulfilled') {
    results[1].value.docs.forEach((project) => {
      sitemapData.push({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: new Date((project.updatedAt || project.createdAt) as string | number | Date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  } else {
    console.error('Failed to fetch projects for sitemap:', results[1].reason)
  }

  // Handle Photos
  if (results[2].status === 'fulfilled') {
    results[2].value.docs.forEach((photo) => {
      sitemapData.push({
        url: `${baseUrl}/foto/${photo.slug}`,
        lastModified: new Date((photo.updatedAt || photo.createdAt) as string | number | Date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  } else {
    console.error('Failed to fetch photos for sitemap:', results[2].reason)
  }

  // Handle Digital Products
  if (results[3].status === 'fulfilled') {
    results[3].value.docs.forEach((product) => {
      sitemapData.push({
        url: `${baseUrl}/produk-digital/${product.slug}`,
        lastModified: new Date((product.updatedAt || product.createdAt) as string | number | Date),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  } else {
    console.error('Failed to fetch products for sitemap:', results[3].reason)
  }

  return sitemapData
}
