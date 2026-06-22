# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Dev Server**: `npm run dev` or `bun dev` (Runs Next.js app on `0.0.0.0`)
- **Build**: `npm run build` or `bun run build` (Builds Next.js app)
- **Lint**: `npm run lint` or `bun run lint` (Runs ESLint)
- **Start**: `npm run start` or `bun start` (Starts production server)

## Architecture
- **Framework**: Next.js 16.2.9 (App Router) + React 19 + TypeScript.
- **Styling**: Tailwind CSS v4 + Shadcn UI + `tw-animate-css`. Dark mode uses `.dark` class. Global styles in `src/app/globals.css`. Uses custom UI components based on `@base-ui/react`.
- **CMS**: Payload CMS 3.85.x is integrated directly into Next.js.
  - Configuration is in `payload.config.ts`.
  - Collections are stored in `src/collections/` (e.g., Users, Services, Projects, Testimonials, Media).
  - The Payload admin panel runs at `/admin` (routed through `src/app/(payload)/admin/[[...segments]]/page.tsx`).
  - Database: PostgreSQL (via `@payloadcms/db-postgres`), managed by docker-compose for local development (`docker-compose.yml`).
- **Project Structure**:
  - `src/app/`: Next.js pages and routing. Contains main site pages (`page.tsx`, `layanan/`, `portfolio/`) and Payload routes (`(payload)/`).
  - `src/components/ui/`: Reusable Shadcn UI components.
  - `src/components/layout/`: Common layout components (`Navbar`, `Footer`).
  - `src/lib/`: Utilities (e.g., `utils.ts` for Tailwind `cn()`).

## Notes
- Next.js version used has breaking changes compared to older versions. Refer to `AGENTS.md` and local documentation (`node_modules/next/dist/docs/`).
- The Payload CMS setup utilizes local database via `docker-compose.yml`. Make sure Docker is running when accessing CMS features.
- If importing from `@payloadcms/next`, be aware of missing exports (e.g. `importMap`) depending on specific version requirements.

## Project Documentation
- **PRD**: See `prd.txt` for detailed Product Requirements Document, including features, roadmap, UI/UX guidelines, and business context.

## gstack
Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Available skills:
- /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review
- /design-consultation, /design-shotgun, /design-html, /review, /ship
- /land-and-deploy, /canary, /benchmark, /browse, /connect-chrome
- /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy
- /setup-gbrain, /retro, /investigate, /document-release, /document-generate
- /codex, /cso, /autoplan, /plan-devex-review, /devex-review
- /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn
