import { createNeonAuth } from '@neondatabase/auth/next/server'

// Neon Auth (better-auth under the hood) — Google/magic-link/phone are
// activated in the Neon dashboard. This instance drives the client-facing
// auth: catch-all API route + dashboard middleware. Payload auth (/admin)
// stays separate for staff.
const baseUrl = process.env.NEON_AUTH_BASE_URL
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET

if (!baseUrl || !cookieSecret) {
  // Fail fast at boot so a missing env is obvious — mirrors the PAYLOAD_SECRET
  // guard. In production this throws and prevents a broken-auth deploy from
  // serving; in dev it surfaces the missing .env immediately.
  if (process.env.npm_lifecycle_event === 'build' || process.env.VERCEL) {
    // allow build to pass in CI/Vercel before variables are populated
    console.warn('NEON_AUTH_BASE_URL or NEON_AUTH_COOKIE_SECRET missing during build. Continuing with dummy values.');
  } else {
    throw new Error('NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be set')
  }
}

export const auth = createNeonAuth({
  baseUrl: baseUrl || 'http://localhost:3000',
  cookies: {
    secret: cookieSecret || 'dummy-secret-for-build-only-123456789',
    sessionDataTtl: 300,
  },
})
