import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Neon auth middleware instance (protects /dashboard with a Neon session).
const neonGuard = auth.middleware({ loginUrl: '/login' })

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

  // Client dashboard → Neon Auth session (Google/magic/phone).
  if (pathname.startsWith('/dashboard')) {
    return neonGuard(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
