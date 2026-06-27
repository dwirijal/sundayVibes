# Security Policy

## Reporting a Vulnerability

Email security@sundayvibes.com with details and reproduction steps. Do not open public issues for security bugs. Expect acknowledgment within 48 hours.

## Scope

- This repository (`sundayVibes`)
- Production deployment on Vercel
- Payload CMS admin panel (`/admin`)

## Dependency Scanning

- Dependabot enabled (`.github/dependabot.yml`) for npm and GitHub Actions
- Review PRs from dependabot before merging

## Secret Management

- All secrets via Vercel environment variables
- `.env*` files are gitignored and never committed
- Required secrets documented in `.env.example`
- Rotate immediately if exposed

## Authentication

- Payload CMS admin uses local auth strategy with strong passwords

## Database

- Neon PostgreSQL (serverless Postgres)
- Connection string in `DATABASE_URI`; `sslmode=require&channel_binding=require` enforced

## Payments

- Manual QRIS verification only — no automated payment gateway
- Dynamic QRIS generated client-side (`src/lib/qris.ts`)
- Admin verifies payment manually in Payload CMS before marking bookings paid
