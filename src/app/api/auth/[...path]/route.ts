import { auth } from '@/lib/auth'
import type { NextRequest } from 'next/server'

// Resolve Neon handlers per-request so `next build` can collect this route
// without NEON_AUTH_* env vars present.
async function dispatch(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const handlers = auth.handler()
  const method = req.method.toUpperCase()
  const fn = (handlers as Record<string, (r: NextRequest, c: unknown) => Promise<Response>>)[method]
  if (!fn) {
    return new Response(`Method ${method} not allowed`, { status: 405 })
  }
  return fn(req, ctx)
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return dispatch(req, ctx)
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return dispatch(req, ctx)
}
