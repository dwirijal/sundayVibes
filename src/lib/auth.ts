import { createNeonAuth } from '@neondatabase/auth/next/server'

// ponytail: Neon Auth kept for future OAuth bridge only.
// Client dashboard uses Payload (payload-token). /admin stays Payload staff.
// Do not gate /dashboard on Neon until sessions map to Payload users.
const baseUrl = process.env.NEON_AUTH_BASE_URL
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET

if (!baseUrl || !cookieSecret) {
  throw new Error('NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be set')
}

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret,
    sessionDataTtl: 300,
  },
})
