# Project Memory

## Architecture
- Next.js 16 App Router + React 19 + Tailwind CSS v4
- Payload CMS 3.85.x integrated (Neon PostgreSQL)
- Deployed to Vercel

## Key Decisions
- Animation: GSAP + animejs for scroll-triggered interactions
- Payments: manual QRIS verification only (dynamic QRIS generated in `src/lib/qris.ts`)
- CMS: Collections under `src/collections/` (Users, Services, Projects, Testimonials, Media)
- Component library: Shadcn UI + Base UI primitives

## Conventions
- See `CLAUDE.md` for commands and architecture
- See `.claude/rules/ecc/` for coding standards
- Tests: Playwright for E2E, ESLint for linting
