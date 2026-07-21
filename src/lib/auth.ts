import { createNeonAuth } from '@neondatabase/auth/next/server'

// ponytail: Neon Auth kept for future OAuth bridge only.
// Client dashboard uses Payload (payload-token). /admin stays Payload staff.
// Lazy init so `next build` does not require NEON_AUTH_* env vars.

type NeonAuth = ReturnType<typeof createNeonAuth>

let _auth: NeonAuth | null = null

function getAuth(): NeonAuth {
  if (_auth) return _auth

  const baseUrl = process.env.NEON_AUTH_BASE_URL
  const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET

  if (!baseUrl || !cookieSecret) {
    throw new Error('NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET must be set')
  }

  _auth = createNeonAuth({
    baseUrl,
    cookies: {
      secret: cookieSecret,
      sessionDataTtl: 300,
    },
  })
  return _auth
}

// Surface used by /api/auth/[...path] — resolves at request time.
export const auth = {
  handler: () => getAuth().handler(),
  middleware: (opts: Parameters<NeonAuth['middleware']>[0]) => getAuth().middleware(opts),
}
