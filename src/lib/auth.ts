import { createNeonAuth } from '@neondatabase/auth/next/server'

// Neon Auth (better-auth under the hood) — Google/magic-link/phone are
// activated in the Neon dashboard. This instance drives the client-facing
// auth: catch-all API route + dashboard middleware. Payload auth (/admin)
// stays separate for staff.
const baseUrl = process.env.NEON_AUTH_BASE_URL
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET

if (!baseUrl || !cookieSecret) {
  // Fail fast in dev so a missing env is obvious. Never silently fall back.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[auth] NEON_AUTH_BASE_URL or NEON_AUTH_COOKIE_SECRET missing')
  }
}

export const auth = createNeonAuth({
  baseUrl: baseUrl ?? '',
  cookies: {
    secret: cookieSecret ?? '',
    sessionDataTtl: 300,
  },
})
