<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Repo context (for Jules / coding agents)

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript. Breaking changes — read `node_modules/next/dist/docs/` first.
- **CMS**: Payload CMS 3.85 at `/admin`. Collections in `src/collections/` (Users, Services, Projects, Testimonials, Media).
- **DB**: PostgreSQL via Neon direct (pooler). `DATABASE_URI` required at runtime. `docker-compose.yml` is a legacy local fallback — unused unless `DATABASE_URI` points local.
- **Auth**: Neon Auth (Google) for client `/dashboard` — SEPARATE from Payload admin auth. Do not touch auth/payments without human review.
- **Deploy**: push `main` → Vercel via `.github/workflows/deploy.yml`. Build needs `DATABASE_URI` + `PAYLOAD_SECRET` env. PRs deploy to Preview.
- **Style**: Tailwind CSS v4 + shadcn UI (built on `@base-ui/react`). Dark mode via `.dark` class. Globals in `src/app/globals.css`.
- **Commands**: `npm run dev` | `npm run build` | `npm run lint`. Seed: `npm run seed:admin`.
- **Jules integration**: `scripts/jules.ts` (CLI, `npm run jules -- <cmd>`). REST API alpha — all calls isolated in that one file.

## Ground rules

- Minimal diffs. No speculative abstractions. Deletion over addition.
- Match surrounding code style, comment density, naming.
- Never hardcode secrets — use env vars. `.env` is gitignored.
- Validate input at trust boundaries; handle errors explicitly; never swallow silently.
