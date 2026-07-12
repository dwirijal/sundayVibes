import { createNeonAuth } from '@neondatabase/auth/next/server'

// Neon Auth (better-auth under the hood) — Google/magic-link/phone are
// activated in the Neon dashboard. This instance drives the client-facing
// auth: catch-all API route + dashboard middleware. Payload auth (/admin)
// stays separate for staff.
// Provide fallback dummy values during Next.js build time (e.g. Vercel deployment)
// to prevent build failures, while keeping the original strict behavior in runtime.
const baseUrl = process.env.NEON_AUTH_BASE_URL || 'http://dummy.url'
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET || 'dummy-secret-for-build-needs-to-be-32-chars-long'

if (process.env.NODE_ENV !== 'production' && (!process.env.NEON_AUTH_BASE_URL || !process.env.NEON_AUTH_COOKIE_SECRET)) {
  console.warn('⚠️ NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET are missing. Using fallback for build phase.')
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
    sessionDataTtl: 300,
  },
})
