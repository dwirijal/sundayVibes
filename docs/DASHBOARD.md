# Client Dashboard (/dashboard)

The authenticated client surface at `/dashboard` — overview stats, bookings, invoices, projects, settings. Server-rendered, scoped per-user via Payload `find` with `client: { equals: user.id }`.

## Quick links

- `src/app/(dashboard)/layout.tsx` — dashboard shell, Payload auth gate (GATE 2), renders `DashboardSidebar`
- `src/app/(dashboard)/dashboard/page.tsx` — overview: stats grid + recent bookings/projects
- `src/app/(dashboard)/dashboard/bookings/page.tsx` — bookings table
- `src/app/(dashboard)/dashboard/invoices/page.tsx` — payment history table (derived from `bookings`)
- `src/app/(dashboard)/dashboard/projects/page.tsx` — project cards
- `src/app/(dashboard)/dashboard/settings/page.tsx` — read-only profile + disabled password form
- `src/components/dashboard/DashboardSidebar.tsx` — client-side nav
- `src/proxy.ts` — Neon Auth edge guard (GATE 1), CSRF for `/api/*`
- `src/collections/Bookings.ts` — `bookings` collection + access rules
- `src/collections/Projects.ts` — `projects` collection + access rules
- `src/collections/Users.ts` — `users` collection, roles, `beforeChange` role lock

## Two-gate auth (load-bearing)

`/dashboard` is gated by **two independent auth systems, in order**:

1. **GATE 1 — edge (`src/proxy.ts:40-42`):** the Next.js proxy runs `auth.middleware({ loginUrl: '/login' })` (the `neonGuard` from `src/proxy.ts:6`) on any `/dashboard` path *before* the request reaches the app. No Neon Auth session → redirect to `/login` at the edge. Matcher: `/dashboard/:path*` and `/api/:path*` (`src/proxy.ts:48`).

2. **GATE 2 — layout (`src/app/(dashboard)/layout.tsx:14-17`):** the route-group layout calls `payload.auth({ headers: headersList })` and `redirect('/login?redirect=/dashboard')` if there is no Payload `users` session.

A request must clear **both**. The ordering is the subtle part:

- Gate 1 runs first, at the edge, against the Neon Auth session cookie.
- Gate 2 runs second, inside the layout, against the Payload `payload-token` session.
- **Implication:** a Neon-authed user with no Payload `users` record clears gate 1 but is bounced by gate 2 to `/login?redirect=/dashboard`. The two sessions are independent — Neon Auth does not mint a Payload session, and vice versa.

This is why every dashboard sub-page re-runs `payload.auth({ headers })` itself (`dashboard/page.tsx:10`, `bookings/page.tsx:10`, `invoices/page.tsx:12`, `projects/page.tsx:11`, `settings/page.tsx:12`) and returns `null` on no user: the layout gate is not relied upon alone, and the pages never assume `user` is non-null.

See [docs/AUTH.md](AUTH.md) for the full dual-auth model and [docs/ARCHITECTURE.md](ARCHITECTURE.md) for the route-group map.

## Sidebar nav

`src/components/dashboard/DashboardSidebar.tsx` is a `'use client'` component (needs `usePathname` for active state). It receives `user` from the layout (`layout.tsx:22`), which is the Payload-authenticated user object.

| Label | href | Icon |
|---|---|---|
| Overview | `/dashboard` | `LayoutDashboard` |
| Bookings | `/dashboard/bookings` | `Calendar` |
| Projects | `/dashboard/projects` | `FolderKanban` |
| Invoices | `/dashboard/invoices` | `FileText` |
| Settings | `/dashboard/settings` | `Settings` |

Active state is an exact `pathname === item.href` match (`DashboardSidebar.tsx:44`) — nested routes won't highlight their parent. Footer shows `user.name` / `user.email` and a Logout link to `/api/users/logout` (`DashboardSidebar.tsx:69-75`), which clears only the Payload cookie (see Pitfalls).

## Sub-routes

All sub-routes are async Server Components. Each fetches its own data with `payload.find({ where: { client: { equals: user.id } } })`, so access is scoped at the query level in addition to the collection access rules.

### `/dashboard` — Overview (`dashboard/page.tsx`)

Stats grid + two recent-activity cards.

Queries (both `depth: 1`, `limit: 100`):
- `bookings` where `client` = user (`dashboard/page.tsx:17-24`)
- `projects` where `client` = user (`dashboard/page.tsx:27-34`)

Computed stats (`dashboard/page.tsx:37-42`):
- `totalBookings` = `bookings.docs.length`
- `activeProjects` = `projects.docs.length` (see Pitfalls — no status field yet)
- `unpaidInvoices` = count where `payment_status === 'unpaid'`
- `totalSpent` = sum of `amount` over `payment_status === 'paid'` bookings

Renders top-5 recent bookings and top-5 projects. Currency formatted `id-ID`.

### `/dashboard/bookings` — Bookings (`bookings/page.tsx`)

Table of the user's bookings. Query: `bookings`, `client` = user, `limit: 100`, `depth: 1`, `sort: '-createdAt'` (`bookings/page.tsx:16-24`).

Columns: Date, Service (`service_type.title` via depth-1 population), Amount, Status badge, Payment badge. Status badge color is keyed on `confirmed` / `completed` / `cancelled` / fallback (`bookings/page.tsx:71-83`).

### `/dashboard/invoices` — Invoices (`invoices/page.tsx`)

There is no `invoices` collection. The page reads the **same `bookings` collection** and derives an invoice row per booking (`invoices/page.tsx:18-26`). Order ID is parsed out of `booking.notes` via regex `/Order ID: ([^\n]+)/` (`invoices/page.tsx:61`) — if `notes` is empty or has no match, it falls back to `'N/A'`.

Columns: Order ID (mono), Date, Service, Amount, Payment badge, and a Download button that is **always `disabled`** (`invoices/page.tsx:88-92`) — invoice PDF download is not implemented.

### `/dashboard/projects` — Projects (`projects/page.tsx`)

Card grid of the user's projects. Query: `projects`, `client` = user, `limit: 100`, `depth: 1`, `sort: '-createdAt'` (`projects/page.tsx:17-25`).

Each card links to `/portfolio/{project.slug}` (`projects/page.tsx:45`) — the public portfolio page, not a dashboard detail route. Category is read via `project.category.title` (depth-1 relationship to `services`). Status badge is hardcoded to "In Progress" for every project (`projects/page.tsx:64-68`) — see Pitfalls.

### `/dashboard/settings` — Settings (`settings/page.tsx`)

Read-only profile form + a disabled password-change form. No data fetched beyond `payload.auth()`; renders `user.name`, `user.email`, `user.phone`, `user.company` (`settings/page.tsx:37-54`). Email field is `disabled` and marked non-changeable; all other fields are `readOnly`. Both "Save Changes" and "Update Password" buttons are `disabled` (`settings/page.tsx:56,83`) — settings mutation is not implemented. This route is display-only.

## Access scope (collection-level)

The `client: { equals: user.id }` query in every page is belt-and-suspenders on top of the Payload access rules, which already enforce the same scope:

| Collection | `read` for client | `read` for admin | `create` | `update` | `delete` |
|---|---|---|---|---|---|
| `bookings` (`Bookings.ts:9-24`) | `{ client: { equals: user.id } }` | `true` | any authed user | admin only | admin only |
| `projects` (`Projects.ts:9-24`) | `{ client: { equals: user.id } }` | `true` | any authed user | admin only | admin only |
| `users` (`Users.ts:10-22`) | `{ id: { equals: user.id } }` | `true` | open | self or admin | admin only |

So even if a user forged a `where` clause, the access rule would still restrict the result set to their own rows. `depth: 1` populates the `service_type` and `category` relationships for display.

## Env vars

Names only — no values. Sourced from [docs/AUTH.md](AUTH.md) and [docs/ARCHITECTURE.md](ARCHITECTURE.md).

| Name | Role for dashboard |
|---|---|
| `NEON_AUTH_BASE_URL` | Neon Auth issuer; backs the edge guard (`src/lib/auth.ts:7`) |
| `NEON_AUTH_COOKIE_SECRET` | Signs the Neon session cookie that gate 1 reads (`src/lib/auth.ts:8`) |
| `PAYLOAD_SECRET` | Signs the `payload-token` cookie that gate 2 reads (`payload.config.ts`) |
| `DATABASE_URI` | Postgres connection for the `payload.find` calls on every sub-route |
| `NEXT_PUBLIC_SITE_URL` | Used by the logout route the sidebar links to |
| `NODE_ENV` | Toggles `secure` on the Payload cookie |

## Pitfalls / gotchas

- **Two gates, two sessions.** Gate 1 (Neon) and gate 2 (Payload) are independent. A Neon-authed user with no Payload `users` row passes the edge and is then redirected by the layout to `/login?redirect=/dashboard`. There is no auto-provisioning of a Payload user from a Neon session — the user must also exist in the `users` collection. See [docs/AUTH.md §Two logout paths](AUTH.md).
- **Sidebar Logout only clears Payload.** The Logout link hits `/api/users/logout`, which clears `payload-token` only (`src/app/api/users/logout/route.ts`). It does not call `authClient.signOut()`, so the Neon Auth session cookie survives — the user can immediately re-enter `/dashboard` through gate 1 until that cookie expires or is cleared client-side.
- **No `invoices` collection.** `/dashboard/invoices` reads `bookings` and parses `Order ID:` out of the free-text `notes` textarea with a regex (`invoices/page.tsx:61`). Any booking whose `notes` lack that pattern shows `N/A` as Order ID. The schema does not enforce the pattern — it is a convention.
- **Download button is a no-op.** The invoice Download button is always rendered `disabled` (`invoices/page.tsx:89`). No PDF generation, no download route exists.
- **Projects have no status field.** `Projects.ts` has no `status` field at all. The overview stat is just `projects.docs.length` (`dashboard/page.tsx:38`, with the inline comment `// projects dont have status field yet in phase 1`), and every project card hardcodes a green "In Progress" badge (`projects/page.tsx:64-68`). Do not read `project.status` — it is undefined.
- **Projects `client` is a text field, not a relationship.** `Projects.ts:61` defines `client` as `type: 'text'`, not a relationship to `users`. The dashboard queries it with `client: { equals: user.id }` (`projects/page.tsx:19-20`), which compares a text column against the user's UUID. This only returns rows where someone stored the user's ID verbatim in that text field — it is not a FK join. Contrast with `Bookings.ts:54-58`, where `client` is a proper `relationship` to `users`.
- **Settings is read-only.** Both forms on `/dashboard/settings` are disabled/`readOnly` (`settings/page.tsx:37-54,56,83`). No server action or API route wires up profile or password updates from this page. Editing happens via the Payload admin (`/admin`) by staff.
- **Sidebar active state is exact-match.** `pathname === item.href` (`DashboardSidebar.tsx:44`) means a hypothetical nested route under `/dashboard/bookings/:id` would not highlight "Bookings". Not a current issue because no nested dashboard routes exist, but any future detail page needs a `startsWith` check to inherit the highlight.
- **Every page re-runs `payload.auth()`.** The layout already gates on `payload.auth()`, but each sub-page calls it again and `return null` on no user (`bookings/page.tsx:12-14`, etc.). This is defensive but means `getPayload({ config })` + `payload.auth()` runs twice per dashboard navigation. Acceptable for a low-traffic client surface; do not propagate this pattern to a high-traffic route without caching.
- **Gate ordering must not be swapped.** If the layout gate ran before the edge gate, a user with no Neon session could reach the app code and only then be redirected — defeating the purpose of the edge guard. The proxy runs first by Next.js contract (matcher hits before the route group), and this ordering is what makes the two-gate split safe.
