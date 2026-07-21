import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Client dashboard uses Payload session cookie (payload-token).
// Neon Auth remains available under /api/auth for a future OAuth bridge —
// it must NOT gate /dashboard until sessions are linked to Payload users.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Neon Auth handles its own callback/state — bypass Payload CSRF for it.
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  // CSRF Protection for API routes (origin-only)
  if (pathname.startsWith('/api')) {
    const isWebhook = pathname.startsWith('/api/whatsapp/webhook')

    if (!isWebhook && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      const origin = request.headers.get('origin')
      const host = request.headers.get('host')

      if (!origin || !host) {
        return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
      }

      try {
        const originUrl = new URL(origin)
        if (originUrl.host !== host) {
          return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
        }
      } catch {
        return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
      }
    }
  }

  // Client dashboard → Payload cookie (layout re-validates via payload.auth).
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('payload-token')?.value
    if (!token) {
      const login = new URL('/login', request.url)
      login.searchParams.set('redirect', pathname)
      return NextResponse.redirect(login)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
