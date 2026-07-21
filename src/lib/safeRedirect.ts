/**
 * Only allow same-origin relative paths. Blocks open redirects
 * like `//evil.com` or `https://evil.com`.
 */
export function safeRedirect(value: string | null | undefined, fallback = '/dashboard'): string {
  if (!value) return fallback
  if (!value.startsWith('/')) return fallback
  if (value.startsWith('//')) return fallback
  if (value.includes('\\')) return fallback
  return value
}

// Runnable check (node -e / tsx)
if (process.env.RUN_SAFE_REDIRECT_CHECK === '1') {
  const assert = (cond: boolean, msg: string) => {
    if (!cond) throw new Error(msg)
  }
  assert(safeRedirect('/dashboard') === '/dashboard', 'relative ok')
  assert(safeRedirect('/dashboard/bookings') === '/dashboard/bookings', 'nested ok')
  assert(safeRedirect('//evil.com') === '/dashboard', 'protocol-relative blocked')
  assert(safeRedirect('https://evil.com') === '/dashboard', 'absolute blocked')
  assert(safeRedirect(null) === '/dashboard', 'null fallback')
  assert(safeRedirect('/\\evil') === '/dashboard', 'backslash blocked')
  console.log('safeRedirect ok')
}
