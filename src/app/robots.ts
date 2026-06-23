import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundayvibes.id'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/api/', '/checkout/'],
      },
      // Explicitly allow AI Search Engines & LLM crawlers so Sunday Vibes appears in ChatGPT, Perplexity, Copilot, etc.
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'DuckDuckBot', 'Bingbot'],
        allow: ['/', '/layanan/*', '/foto/*', '/portfolio/*'],
        disallow: ['/admin/', '/dashboard/', '/checkout/', '/api/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
