# Sunday Vibes — Developer Documentation

Grounded in real code (`src/`), cited as `file:line`. Source of truth for behavior; where these docs conflict with `README.md`/`DEPLOYMENT.md`, the docs here win (those root files are stale on deploy target and env-var names).

## Index

| Doc | Covers |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Route groups, `proxy.ts` (CSRF + Neon guard), Payload collections/globals, `lib/` map, storage, deploy (Vercel via CI), env vars |
| [AUTH.md](AUTH.md) | Dual auth model (Payload staff vs Neon clients), Google login, registration, Navbar CTA, rate limiting, `PAYLOAD_SECRET` guard, deferred magic-link/phone |
| [BOOKING_CONTRACT.md](BOOKING_CONTRACT.md) | Cart → checkout → `/api/bookings` → QRIS modal → A4 printable 2-page contract, print CSS, email notifications |
| [DASHBOARD.md](DASHBOARD.md) | Client portal `/dashboard/*`, two-gate auth ordering, per-route data + access scope, sidebar |
| [EQUIPMENT.md](EQUIPMENT.md) | Equipment collection schema, seed script (26 items, Rencana=0 stock), admin stock maintenance |

## Conventions

- **Deploy:** Vercel via GitHub Actions (`.github/workflows/deploy.yml`). Never deploy from a developer PC; secrets live on the VPS and in GitHub. `verify.yml` lints+builds on PRs.
- **Env var names:** `DATABASE_URI` (not `DATABASE_URL`), `PAYLOAD_SECRET` (≥32 chars or boot fails). Full table in [ARCHITECTURE.md](ARCHITECTURE.md#env-vars).
- **Auth split:** `/admin` = Payload (staff); `/dashboard` = Neon Auth (clients) gated twice — edge proxy then layout. See [AUTH.md](AUTH.md) + [DASHBOARD.md](DASHBOARD.md).
- **Citing:** every claim links to `file:line`. If you change code referenced here, update the doc in the same PR.

## Related (root-level)

- `README.md` — project overview (note: stale on deploy path + `DATABASE_URL` naming + `src/middleware.ts` → actually `src/proxy.ts`)
- `DEPLOYMENT.md` — deploy notes (note: stale on Midtrans/VPS)
- `SECURITY.md` — security policy (agrees with Vercel deploy)
- `CLOUDFLARE_SETUP.md` — KV setup (note: references `invalidateCache()` which does not exist; real fns are `getCache`/`setCache`/`deleteCache`)
- `CLAUDE.md` — agent guidance
