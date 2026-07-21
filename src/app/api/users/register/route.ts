import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
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

    // Only accept non-privileged fields — role is forced server-side.
    const { name, email, phone, password } = await req.json()

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Check if user already exists (Users.read is not public)
    const existingUser = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    if (existingUser.docs.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create new user — role forced to 'client', never from request body.
    // overrideAccess: Users.create is admin-only on REST; this is the public path.
    const user = await payload.create({
      collection: 'users',
      data: {
        name,
        email,
        phone,
        password,
        role: 'client',
      },
      overrideAccess: true,
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    logger.error('Registration error', { error: String(error) })
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
