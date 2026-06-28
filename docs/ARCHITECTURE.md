# System Architecture

Sunday Vibes — Next.js 16 App Router monolith integrating Payload CMS 3, Neon Postgres + Neon Auth, Vercel Blob storage, and Cloudflare KV cache; deploys to Vercel via GitHub Actions CI.

**Quick links:**

| File | Role |
|---|---|
| `payload.config.ts` | Payload config — collections, globals, DB, blob storage |
| `src/proxy.ts` | Edge proxy — CSRF + Neon Auth guard |
| `src/lib/auth.ts` | Neon Auth server instance |
| `src/lib/authClient.ts` | Neon Auth browser client |
| `src/app/layout.tsx` | Root layout — fonts, metadata, analytics, JSON-LD |
| `src/app/(marketing)/layout.tsx` | Public marketing shell |
| `src/app/(dashboard)/layout.tsx` | Dashboard shell — Payload auth gate |
| `src/app/(payload)/layout.tsx` | Payload admin shell |
| `src/collections/Users.ts` | Auth-enabled users + role enforcement |
| `src/lib/qris.ts` | Dynamic QRIS generator (EMVCo TLV) |
| `src/lib/cloudflare-cache.ts` | KV REST cache wrapper |

## Next.js App Router Route Groups

Three route groups partition the app by surface. The `(payload)` and `(marketing)` groups share the root `src/app/layout.tsx` (html, fonts, metadata, theme, analytics); `(payload)` wraps its children in the Payload `RootLayout` (`src/app/(payload)/layout.tsx:10`).

| Group | Layout | Auth | Routes |
|---|---|---|---|
| `(marketing)` | `src/app/(marketing)/layout.tsx` — `Navbar`, `main`, `Footer`, `BottomTabBar` | None (public) | `/`, `/layanan/*`, `/sewa-alat`, `/foto/*`, `/portfolio/*`, `/blog/*`, `/produk-digital/*`, `/checkout`, `/kontrak`, `/lokasi/*`, `/kontak`, `/login` |
| `(dashboard)` | `src/app/(dashboard)/layout.tsx` | **Two gates:** Neon Auth edge guard (`src/proxy.ts:41`) THEN Payload session (`payload.auth`, layout `:14-18`); redirects to `/login` when unauthenticated | `/dashboard/bookings`, `/dashboard/invoices`, `/dashboard/projects`, `/dashboard/settings` |
| `(payload)` | `src/app/(payload)/layout.tsx` | Payload admin auth (cookie, `admin.user = Users.slug`) | `/admin/[[...segments]]`, `/api/graphql`, `/api/graphql-playground`, `/api/[...slug]` |

Standalone API routes live under `src/app/api/` (outside any group): `auth/[...path]`, `bookings`, `contact`, `products/[id]`, `reviews`, `seed-posts`, `users/register`, `whatsapp/webhook`.

## proxy.ts — CSRF + Neon Guard

`src/proxy.ts` is the Next.js proxy (formerly `middleware`). Matcher scopes it to `/dashboard/:path*` and `/api/:path*` (`src/proxy.ts:48`). Order is load-bearing:

```ts
// 1. Neon Auth owns its callback/state — bypass ALL checks.
if (pathname.startsWith('/api/auth/')) return NextResponse.next()

// 2. CSRF: origin-host match on mutating /api routes, except whatsapp webhook.
if (pathname.startsWith('/api')) {
  const isWebhook = pathname.startsWith('/api/whatsapp/webhook')
  if (!isWebhook && ['POST','PUT','PATCH','DELETE'].includes(method)) { /* origin === host */ }
}

// 3. Dashboard → Neon Auth session (Google/magic/phone).
if (pathname.startsWith('/dashboard')) return neonGuard(request)
```

`neonGuard` is `auth.middleware({ loginUrl: '/login' })` (`src/proxy.ts:6`), constructed from the Neon Auth instance in `src/lib/auth.ts:18`.

## Payload CMS — Collections

Config in `payload.config.ts:28`. Admin user collection = `Users` (`payload.config.ts:30`). Lexical rich-text editor (`payload.config.ts:50`). Types generated to `payload-types.ts` (`payload.config.ts:60`).

| Collection | Slug | Auth | Key fields | Access |
|---|---|---|---|---|
| `Users` | `users` | yes | `name`, `role` (admin/client, default client), `phone`, `company` | self read/update; admin all; create open; delete admin-only (`src/collections/Users.ts:9-36`) |
| `Bookings` | `bookings` | no | `order_id` (unique), `service_type`→services, `client`→users, `date`, `status` (pending/confirmed/in_progress/completed/cancelled), `amount`, `payment_status` (unpaid/partial/paid) | admin read/update/delete; client read own; create needs any user (`src/collections/Bookings.ts:8-37`) |
| `Equipment` | `equipment` | no | `name`, `slug` (unique), `specs` (richText), `price_per_day`, `deposit`, `available` (number, default 1), `images[]` (upload→media) | default Payload |
| `Services` | `services` | — | — | — |
| `Projects` | `projects` | — | — | — |
| `Photos` | `photos` | — | — | — |
| `Products` | `products` | — | — | — |
| `Testimonials` | `testimonials` | — | — | — |
| `Posts` | `posts` | — | — | — |
| `Media` | `media` | no | upload target; backed by Vercel Blob | default Payload |

## Payload CMS — Globals

Registered in `payload.config.ts:44`:

| Global | Slug | Fields |
|---|---|---|
| `SiteConfig` | `site-config` | `brandName` (default "Sunday Vibes"), `logo` (upload), `socialMedia[]` {platform, url} |
| `ContactInfo` | `contact-info` | consumed by `src/app/layout.tsx:24` (email, whatsappNumber, address) |
| `SEODefaults` | `seo-defaults` | `defaultMetaTitle`, `defaultMetaDescription`, `defaultOgImage` (upload→media) |
| `Homepage` | `homepage` | — |

## lib/ Map

| Module | Responsibility |
|---|---|
| `auth.ts` | Neon Auth server instance (`createNeonAuth`); session TTL 300s (`src/lib/auth.ts:18`) |
| `authClient.ts` | Browser Neon Auth client (`'use client'`) |
| `qris.ts` | Static→dynamic QRIS TLV conversion + CRC16-CCITT; amount cap Rp 1,000,000,000 (`src/lib/qris.ts:33`) |
| `cloudflare-cache.ts` | KV REST wrapper — `getCache`/`setCache`/`deleteCache`; default TTL 3600s; no-op if credentials missing (`src/lib/cloudflare-cache.ts:17`) |
| `logger.ts` | Structured JSON logger over console; level via `LOG_LEVEL`; `ponytail:` swap for pino |
| `analytics.ts` | `trackEvent` (GTM dataLayer + gtag + Umami), server-safe noop; `trackBooking`/`trackCheckout`/`trackPurchase`/`trackFormSubmission` |
| `rateLimit.ts` | In-memory IP limiter — 5 req/60s; `ponytail:` swap Map for Upstash Redis |
| `email.ts` | Resend transactional email — booking confirmation + admin notification |
| `animations.ts` | GSAP/anime helpers |
| `utils.ts` | Tailwind `cn()` |

## Storage

**Vercel Blob** — Media collection uploads via `@payloadcms/storage-vercel-blob` plugin; only `media` collection enabled (`payload.config.ts:68`). Token from `BLOB_READ_WRITE_TOKEN`.

**Neon Postgres** — `postgresAdapter` with `DATABASE_URI` connection string (`payload.config.ts:62`). Local dev uses docker-compose Postgres; cloud uses Neon.

**Cloudflare KV** — optional read-through cache via REST API; not wired into Payload, called ad-hoc by app code. R2 referenced in README but not in `payload.config.ts`.

## Auth Flow

Two parallel auth systems, split by surface:

```
Client (/dashboard, /api/auth/*)          Staff (/admin)
──────────────────────────────            ──────────────────
Neon Auth (better-auth)                   Payload auth (cookie)
src/lib/auth.ts                           payload.config.ts admin.user = users
src/proxy.ts neonGuard  ← GATE 1 (edge)   src/app/(payload)/* (Payload admin)
src/app/(dashboard)/layout.tsx ← GATE 2
  payload.auth() re-checks Payload session
src/app/api/auth/[...path]/route.ts
  = auth.handler() catch-all
```

Neon Auth methods (Google/magic-link/phone) are toggled in the Neon dashboard, not in code (`src/lib/auth.ts:3`). The `/api/auth/[...path]` route is a catch-all proxying `sign-in/google`, `callback/*`, `session`, etc. to `auth.handler()` (`src/app/api/auth/[...path]/route.ts:5`).

**Two gates on `/dashboard`, in order:**
1. **GATE 1 — edge:** `src/proxy.ts:41` runs `neonGuard` (Neon Auth session). No Neon session → redirect to `/login` before the request reaches the app.
2. **GATE 2 — layout:** `src/app/(dashboard)/layout.tsx:14-18` calls `payload.auth({ headers })` and redirects to `/login?redirect=/dashboard` if there is no Payload `users` session.

A request must pass BOTH. A Neon-authed user with no Payload `users` record clears gate 1 but is bounced by gate 2. The two sessions are independent — see [docs/AUTH.md](AUTH.md) for the full model and [docs/DASHBOARD.md](DASHBOARD.md) for the per-route behavior.

Role enforcement for Users is defense-in-depth: a `beforeChange` hook forces `role: 'client'` for any non-admin request, even if `role: 'admin'` appears in the body (`src/collections/Users.ts:41-46`); admins via CMS bypass via `overrideAccess`.

## Print CSS

Contract print stylesheet in `src/app/globals.css:314`:

```css
@page contract { size: A4; margin: 14mm 14mm 12mm; }
@media print {
  .no-print, .print\:hidden { display: none !important; }
  html, body { background: #fff !important; color: #111 !important;
               font-size: 10.5px; line-height: 1.35; }
}
```

Any chrome element (Navbar, Footer, BottomTabBar, buttons) on the `/kontrak` page must carry `print:hidden` or `no-print` or it leaks into the printed A4 contract.

## Seed Command

```bash
npm run seed:admin   # = tsx seed-admin.ts
```

Creates `admin@sundayvibes.com` / `admin123`, role `admin` (`seed-admin.ts:20-28`). Loads `.env` via dotenv before importing Payload config. README notes the email as `admin@sundayvibes.id` — the script uses `admin@sundayvibes.com`; treat the script as source of truth.

## Deploy — Vercel via CI

Production deploys to Vercel automatically via GitHub Actions (`.github/workflows/deploy.yml`). This is the canonical deploy path — the only sanctioned manual flow is triggering `vercel --prod` from the VPS host (never from a developer PC; secrets live on the VPS and in GitHub).

| Trigger | Job | Result |
|---|---|---|
| push to `main` | `deploy` → `npm ci` → `npm run build` (with `DATABASE_URI`/`PAYLOAD_SECRET`/`NEXT_PUBLIC_SITE_URL`) → `vercel --prod --token` | Production deployment |
| PR against `main` | `deploy` → build → `vercel --token` (no `--prod`) | Preview deployment |
| `workflow_dispatch` | manual | same as push branch |

CI secrets required: `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN`, `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL` (`.github/workflows/deploy.yml:10-13,32-36,40-48`). `verify.yml` runs lint+build on PRs.

> ⚠️ README.md still documents a VPS rsync/pm2 flow and `package.json` exposes `vercel:build`/`vercel:deploy` scripts; treat the CI workflow as source of truth. Vercel Blob storage works from Vercel naturally (it is a Vercel product) and the token is set in the project env.

## Env Vars

| Name | Purpose | Where set |
|---|---|---|
| `DATABASE_URI` | Postgres connection (Neon or local) | `payload.config.ts:64` |
| `PAYLOAD_SECRET` | Payload JWT/session secret; ≥32 chars or throw | `payload.config.ts:52` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob upload token (media collection) | `payload.config.ts:69` |
| `NEON_AUTH_BASE_URL` | Neon Auth issuer base URL | `src/lib/auth.ts:7` |
| `NEON_AUTH_COOKIE_SECRET` | Neon Auth cookie signing secret | `src/lib/auth.ts:8` |
| `LOG_LEVEL` | Logger threshold (debug/info/warn/error) | `src/lib/logger.ts:7` |
| `CLOUDFLARE_ACCOUNT_ID` | KV REST account scope | `src/lib/cloudflare-cache.ts:7` |
| `CLOUDFLARE_KV_NAMESPACE_ID` | KV namespace | `src/lib/cloudflare-cache.ts:8` |
| `CLOUDFLARE_API_TOKEN` | KV REST bearer token | `src/lib/cloudflare-cache.ts:9` |
| `NEXT_PUBLIC_SITE_URL` | Canonical base for metadata + JSON-LD | `src/app/layout.tsx:18,82` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami site ID (no-cookie analytics) | `src/app/layout.tsx:133` |
| `NEXT_PUBLIC_UMAMI_URL` | Umami script origin | `src/app/layout.tsx:133` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | `src/app/layout.tsx:141` |
| `RESEND_API_KEY` | Resend email API key | `src/lib/email.ts:3` |
| `FONNTE_API_KEY` | Fonnte WhatsApp API key (webhook + chatbot) | README env list |

## Pitfalls / gotchas

- **Proxy bypass order is load-bearing.** `/api/auth/*` returns `NextResponse.next()` before the CSRF check (`src/proxy.ts:12`); moving the CSRF block above it breaks Neon Auth callbacks. The whatsapp webhook is the only other `/api` route exempt from CSRF (`src/proxy.ts:18`) — adding another webhook needs an explicit exemption or it 403s.
- **Two auth systems, one dashboard — and gate order is load-bearing.** Gate 1 (`src/proxy.ts:41`, Neon Auth edge guard) runs FIRST and redirects unauthenticated users to `/login` before the app boots. Gate 2 (`src/app/(dashboard)/layout.tsx:14-18`, `payload.auth()`) runs after, redirecting to `/login?redirect=/dashboard` if the Neon-authed user has no Payload `users` record. A user passing gate 1 can still be bounced by gate 2. The two sessions are independent.
- **Role forced server-side, not client.** `Users.beforeChange` overwrites `role` to `'client'` for any non-admin caller (`src/collections/Users.ts:41-46`). A client POSTing `role:'admin'` to `/api/users/register` still gets `client` (`src/app/api/users/register/route.ts:57`). Only CMS admins (via `overrideAccess`) bypass the hook. Never trust client-set role for gating UI.
- **`print:hidden` is required on contract chrome.** The `@media print` block only hides `.no-print` and `.print\:hidden` (`src/app/globals.css:322`). Any Navbar/Footer/Button on `/kontrak` without one of those classes prints onto the A4 contract.
- **Equipment `available` field gates booking.** `available` is a number (default 1); the sewa-alat UI disables the booking button when `available <= 0` and shows "Sedang Disewa" / "Tidak Tersedia" (`src/app/(marketing)/sewa-alat/SewaAlatClient.tsx:90-104`). There is no separate "out of stock" flag — zero stock is the unavailability signal.
- **KV cache silently no-ops without credentials.** `getCache`/`setCache` `console.warn` and return null/void if any of the three `CLOUDFLARE_*` env vars is missing (`src/lib/cloudflare-cache.ts:18,45`) — code calling them gets cache misses, not errors.
- **Logger swallows below threshold.** `LOG_LEVEL=warn` drops all `debug`/`info` calls before they reach console (`src/lib/logger.ts:10`). In prod defaults to `info`.
- **Rate limiter is in-memory.** `src/lib/rateLimit.ts:4` uses a process-local `Map`; it resets on every deploy/restart and does not share state across serverless instances. Undercounts under multi-instance Vercel; fine for correctness on a single instance.
- **`PAYLOAD_SECRET` hard-fails below 32 chars.** `payload.config.ts:51-56` throws at config load, not at request time — the process will not boot without a compliant secret.
- **Seed email mismatch.** `seed-admin.ts:23` creates `admin@sundayvibes.com`; README says `admin@sundayvibes.id`. The script wins. Password is `admin123` — rotate after first login.
