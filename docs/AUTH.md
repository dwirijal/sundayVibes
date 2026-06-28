# Authentication & Authorization

This doc covers how the Sunday Vibes app handles two separate auth systems: **Payload CMS** for staff accessing `/admin`, and **Neon Auth** for clients accessing `/dashboard` with Google social login.

## Quick links

- `src/lib/auth.ts` — Neon Auth server instance
- `src/lib/authClient.ts` — Neon Auth browser client
- `src/lib/rateLimit.ts` — in-memory IP rate limiter
- `src/proxy.ts` — Next.js middleware that gates `/dashboard` and CSRF-protects API
- `src/app/api/auth/[...path]/route.ts` — catch-all Neon Auth API handler
- `src/app/api/users/login/route.ts` — email/password login for staff/client hybrid accounts
- `src/app/api/users/register/route.ts` — registration (role forced to `client`)
- `src/app/api/users/logout/route.ts` — clears the Payload auth cookie
- `src/app/(marketing)/login/LoginFormClient.tsx` — login UI with Google button
- `src/collections/Users.ts` — Payload `users` collection, roles, access rules
- `payload.config.ts` — Payload config with `PAYLOAD_SECRET` guard

## Dual auth model

| Surface | System | Identity store | Primary use |
| --- | --- | --- | --- |
| `/admin` | Payload CMS built-in auth | `users` collection (PostgreSQL) | Staff create/edit CMS content |
| `/dashboard` | Neon Auth (better-auth) | Neon managed identities | Clients log in via Google |
| `/api/users/login`, `/api/users/register` | Payload CMS | `users` collection | Legacy email/password path for clients and staff |

The two systems share the same `users` table for email/password accounts, but Neon Auth manages its own session for social logins.

## Env vars

| Name | Purpose | Where set |
| --- | --- | --- |
| `PAYLOAD_SECRET` | Payload token signing secret; must be >= 32 chars | Server (`payload.config.ts:52`) |
| `DATABASE_URI` | PostgreSQL connection string for Payload data | Server (`payload.config.ts:64`) |
| `NEON_AUTH_BASE_URL` | Neon Auth project base URL | Server (`src/lib/auth.ts:7`) |
| `NEON_AUTH_COOKIE_SECRET` | Session cookie encryption secret for Neon Auth | Server (`src/lib/auth.ts:8`) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL used for logout redirect | Server (`src/app/api/users/logout/route.ts:4`) |
| `NODE_ENV` | Production flag for `secure` cookie flag | Server (`src/app/api/users/login/route.ts:43`, `src/app/api/users/logout/route.ts:9`) |

## Users collection & roles

`src/collections/Users.ts` defines the Payload `users` collection with auth enabled.

```ts
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  // ...
}
```

Roles:

- `admin` — can read/update/delete all users, full CMS access.
- `client` — default role; can only read/update their own record.

Access rules (`src/collections/Users.ts:10-35`):

| Operation | Admin | Logged-in non-admin | Guest |
| --- | --- | --- | --- |
| `read` | all users | own record only | denied |
| `create` | anyone (registration or CMS) | anyone | anyone |
| `update` | all users | own record only | denied |
| `delete` | all users | denied | denied |

The `role` field is protected by `beforeChange` hook (`src/collections/Users.ts:41-45`): even if a request sends `role: 'admin'`, non-admin requests are forced back to `client`. Admins using the CMS bypass the hook via `overrideAccess`.

## Auth flows

### Google / social login (clients)

Used for the `/dashboard` client area.

```
Browser (LoginFormClient.tsx)
  -> authClient.signIn.social({ provider: 'google', callbackURL: '/dashboard' })
  -> /api/auth/[...path]/route.ts GET/POST
  -> Neon Auth handles OAuth callback and session cookie
  -> redirects to /dashboard
```

Middleware (`src/proxy.ts:40-42`) runs `auth.middleware({ loginUrl: '/login' })` for any `/dashboard` path. If the Neon session is missing, the user is redirected to `/login`.

### Email/password login (staff & clients)

The custom `/api/users/login` route exists for the email/password form in `LoginFormClient.tsx`.

```
POST /api/users/login { email, password }
  -> rate limit check (5 req / 60 s per IP)
  -> payload.login({ collection: 'users', data: { email, password } })
  -> on success: sets 'payload-token' httpOnly cookie, 30 days
  -> returns { user }
```

The cookie is set server-side:

```ts
response.cookies.set('payload-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 30,
  path: '/',
})
```

`src/app/api/users/logout/route.ts` clears the same cookie by setting `maxAge: 0` and redirects to `NEXT_PUBLIC_SITE_URL`.

### Registration

`POST /api/users/register` accepts only `name`, `email`, `phone`, `password` (`src/app/api/users/register/route.ts:17`). Passwords must be >= 8 characters. The route:

1. Rate-limits by IP.
2. Checks for existing email.
3. Creates the user with `role: 'client'` regardless of any client-provided role.

### Navbar CTA (entry to auth)

`src/components/layout/Navbar.tsx` swaps its primary CTA based on cart state (the cart persists to `localStorage` via Zustand before the user logs in):

| State | CTA label | Target |
|---|---|---|
| fresh visitor (no cart items) | "Mulai Project" | `/kontak` |
| cart has items | "Masuk/Daftar" | `/login` |

The check uses `useCart((s) => s.items.length > 0)` behind a `mounted` hydration guard (SSR renders "Mulai Project" to avoid mismatch, then swaps client-side). The standalone "Client Portal" link was removed in favor of this unified CTA.

## Middleware / proxy behavior

`src/proxy.ts` runs on `/dashboard/:path*` and `/api/:path*`.

Order of checks:

1. **Neon Auth bypass** — `pathname.startsWith('/api/auth/')` skips CSRF checks (`src/proxy.ts:12-14`). Neon Auth endpoints need to handle their own state/callback.
2. **CSRF protection** — `POST`/`PUT`/`PATCH`/`DELETE` to `/api/*` (except `/api/whatsapp/webhook`) require `origin` header and `origin.host === host` (`src/proxy.ts:17-36`).
3. **Dashboard guard** — `/dashboard` paths run Neon Auth middleware (`src/proxy.ts:40-42`).

## Rate limiting

`src/lib/rateLimit.ts` implements a simple in-memory IP rate limiter.

```ts
const WINDOW_MS = 60_000
const MAX = 5
```

- Default: 5 requests per minute per IP.
- Used in `/api/users/login` and `/api/users/register` with `rateLimit(getClientIp(req), 5, 60_000)`.
- Resets on server restart. For multi-instance production, swap the `Map` for Redis using the same surface.

`getClientIp` reads `x-forwarded-for` first, then `x-real-ip`, falling back to `'unknown'`.

## PAYLOAD_SECRET guard

`payload.config.ts` enforces a strong secret at startup:

```ts
secret: (() => {
  const s = process.env.PAYLOAD_SECRET
  if (!s || s.length < 32) {
    throw new Error('PAYLOAD_SECRET must be set and at least 32 characters')
  }
  return s
})(),
```

If `PAYLOAD_SECRET` is missing or shorter than 32 characters, the app throws during config init and refuses to start.

## Deferred features

The following auth methods are planned but not yet implemented in the codebase:

- **Magic-link login** — requires SMTP provider and callback route.
- **Phone (OTP/SMS) login** — requires Twilio or similar provider and verification flow.

Both would extend the Neon Auth configuration in `src/lib/auth.ts` and add corresponding UI in `LoginFormClient.tsx`.

## Pitfalls / gotchas

- **Proxy bypass order matters**: `/api/auth/*` is exempt from CSRF before the generic `/api` CSRF check. Do not move the CSRF block above the Neon bypass or social callbacks will fail (`src/proxy.ts:12-14` vs `17-36`).
- **Role is forced server-side**: never trust a `role` field from the client. The register route hard-codes `role: 'client'` (`src/app/api/users/register/route.ts:57`), and the `beforeChange` hook overwrites any non-admin `role` (`src/collections/Users.ts:41-45`).
- **Rate limiter is process-local**: the `Map` resets on each deploy/server restart. Use Redis for horizontal scaling.
- **Two logout paths**: `/api/users/logout` only clears the Payload `payload-token` cookie. Neon Auth sessions have their own cookie and would need `authClient.signOut()` on the client or a separate server handler.
- **CSRF only validates origin, not tokens**: API mutations compare `origin.host` to `host`. Ensure the app runs behind a trusted proxy that sets `x-forwarded-for` correctly, otherwise `getClientIp` may return `'unknown'` and rate-limit all traffic together.
- **PAYLOAD_SECRET blocks startup**: a missing or short secret throws during `payload.config.ts` evaluation, not lazily on first request.
