import { NextRequest, NextResponse } from 'next/server'
import { getPayload, APIError } from 'payload'
import config from '../../../../../payload.config'
import { logger } from '@/lib/logger'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(getClientIp(req), 5, 60_000)) {
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan. Coba lagi dalam 1 menit.' },
        { status: 429 }
      )
    }

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    const { user, token } = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (!user || !token) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Set auth cookie
    const response = NextResponse.json({ user })
    response.cookies.set('payload-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response
  } catch (error) {
    // Payload throws APIError (AuthenticationError etc.) with a status —
    // surface it (e.g. bad creds) instead of masking as 500.
    if (error instanceof APIError) {
      return NextResponse.json(
        { error: error.message || 'Authentication failed' },
        { status: error.status || 400 }
      )
    }
    logger.error('Login error', { error: String(error) })
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
