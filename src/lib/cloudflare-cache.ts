/**
 * Cloudflare KV Cache utility
 * Uses Cloudflare KV REST API for caching
 * Free tier: 100K reads/day, 1K writes/day
 */

const KV_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID
const KV_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN

const KV_BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${KV_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}`

interface CacheOptions {
  ttl?: number // Time to live in seconds, default 3600 (1 hour)
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (!KV_ACCOUNT_ID || !KV_NAMESPACE_ID || !KV_API_TOKEN) {
    console.warn('Cloudflare KV credentials not configured, skipping cache')
    return null
  }

  try {
    const response = await fetch(`${KV_BASE_URL}/values/${key}`, {
      headers: {
        'Authorization': `Bearer ${KV_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      console.error('Cache get error:', response.status)
      return null
    }

    const text = await response.text()
    return JSON.parse(text) as T
  } catch (error) {
    console.error('Cache get failed:', error)
    return null
  }
}

export async function setCache<T>(key: string, value: T, options: CacheOptions = {}): Promise<void> {
  if (!KV_ACCOUNT_ID || !KV_NAMESPACE_ID || !KV_API_TOKEN) {
    console.warn('Cloudflare KV credentials not configured, skipping cache')
    return
  }

  const ttl = options.ttl || 3600 // Default 1 hour

  try {
    const response = await fetch(`${KV_BASE_URL}/values/${key}?expiration_ttl=${ttl}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${KV_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })

    if (!response.ok) {
      console.error('Cache set error:', response.status)
    }
  } catch (error) {
    console.error('Cache set failed:', error)
  }
}

export async function deleteCache(key: string): Promise<void> {
  if (!KV_ACCOUNT_ID || !KV_NAMESPACE_ID || !KV_API_TOKEN) {
    return
  }

  try {
    await fetch(`${KV_BASE_URL}/values/${key}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${KV_API_TOKEN}`,
      },
    })
  } catch (error) {
    console.error('Cache delete failed:', error)
  }
}
