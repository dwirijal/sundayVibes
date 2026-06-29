import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'

  let payload: any = null
  try {
    payload = await getPayload({ config: configPromise })
  } catch (error) {
    console.error('Failed to get payload config:', error)
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

  // Add dynamic blog posts
  try {
    if (payload) {
      const posts = await payload.find({
        collection: 'posts',
        limit: 100,
      })

      posts.docs.forEach((post: any) => {
        sitemapData.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.createdAt),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      })
    }
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error)
  }

  // Add dynamic projects
  try {
    if (payload) {
      const projects = await payload.find({
        collection: 'projects',
        limit: 100,
      })

      projects.docs.forEach((project: any) => {
        sitemapData.push({
          url: `${baseUrl}/portfolio/${project.slug}`,
          lastModified: new Date(project.updatedAt || project.createdAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      })
    }
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error)
  }

  // Add dynamic photos
  try {
    if (payload) {
      const photos = await payload.find({
        collection: 'photos',
        limit: 500,
      })

      photos.docs.forEach((photo: any) => {
        sitemapData.push({
          url: `${baseUrl}/foto/${photo.slug}`,
          lastModified: new Date(photo.updatedAt || photo.createdAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      })
    }
  } catch (error) {
    console.error('Failed to fetch photos for sitemap:', error)
  }

  // Add dynamic digital products
  try {
    if (payload) {
      const products = await payload.find({
        collection: 'products',
        limit: 100,
      })

      products.docs.forEach((product: any) => {
        sitemapData.push({
          url: `${baseUrl}/produk-digital/${product.slug}`,
          lastModified: new Date(product.updatedAt || product.createdAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      })
    }
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error)
  }

  return sitemapData
}
