import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // CSRF Protection for API routes
  if (pathname.startsWith('/api')) {
    const isWebhook = pathname.startsWith('/api/whatsapp/webhook')

    if (!isWebhook && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      const origin = request.headers.get('origin') ?? request.headers.get('referer')
      const host = request.headers.get('host')

      if (!origin || !host) {
        return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
      }

      try {
        const originUrl = new URL(origin)
        if (originUrl.host !== host) {
          return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
        }
      } catch (e) {
        return NextResponse.json({ error: 'CSRF validation failed' }, { status: 403 })
      }
    }
  }

  // Payload CMS auth cookie (default name)
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('payload-token')
    if (!token?.value) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}