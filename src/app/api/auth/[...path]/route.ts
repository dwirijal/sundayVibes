import { auth } from '@/lib/auth'

// Catch-all that proxies all Neon Auth (better-auth) client requests:
// /api/auth/sign-in/google, /api/auth/callback/*, /api/auth/session, etc.
export const { GET, POST } = auth.handler()
