import { NextResponse } from 'next/server'

export async function GET() {
  // Prefer request-relative redirect base; fall back safely if env is junk.
  let base = 'http://localhost:3000'
  try {
    const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    if (raw) base = new URL(raw).origin
  } catch {
    /* keep localhost fallback */
  }
  const response = NextResponse.redirect(new URL('/', base))

  // Clear auth cookie
  response.cookies.set('payload-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return response
}
