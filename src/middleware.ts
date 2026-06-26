import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip: public routes, static, api
  if (
    !pathname.startsWith('/dashboard') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next')
  ) {
    return NextResponse.next()
  }

  // Payload CMS auth cookie (default name)
  const token = request.cookies.get('payload-token')

  if (!token?.value) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
