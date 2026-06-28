# Equipment Catalog & Stock

One-stop doc for managing rental equipment items: schema, seed data, public catalog page, and admin stock workflow.

## Quick links

- `src/collections/Equipment.ts` — Payload collection definition
- `scripts/seed-equipment.ts` — idempotent seed script (26 items)
- `src/app/(marketing)/sewa-alat/page.tsx` — public equipment listing
- `src/app/api/products/[id]/route.ts` — product/photo detail API (note: not equipment-specific)
- `src/app/api/products/route.ts` — does not exist in this repo

## Collection schema

Defined in `src/collections/Equipment.ts:1`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | text | yes | Admin title field |
| `slug` | text | yes | Unique, shown in sidebar |
| `specs` | richText | no | Lexical editor content |
| `price_per_day` | number | yes | Daily rental price |
| `deposit` | number | yes | Deposit amount |
| `available` | number | yes | Default `1` |
| `images` | array of uploads | no | Each item relates to `media` |

`admin.useAsTitle: 'name'` is set at `src/collections/Equipment.ts:6`.

## Seed script

Run: `npx tsx scripts/seed-equipment.ts`

Behavior (`scripts/seed-equipment.ts:47-92`):
- Slugifies item names (`scripts/seed-equipment.ts:47-49`).
- Upserts by slug: creates if missing, updates if existing.
- Uses `overrideAccess: true` on every create/update.
- Converts the `specs` string into a Lexical richText root at `scripts/seed-equipment.ts:67`.
- Logs counts of created/updated items.

Seed data snapshot (26 items total, categories shown):
- `Dokumentasi`: DJI LITO X1, Tripod Inbex variants, Mixio/Ulanzi lighting, SHISUO mic, INBEX IL60, IL150 PRO, reflectors, softbox kits variants (`scripts/seed-equipment.ts:18-45`).
- `Outbond`: Tenda Arei Cladonia, Matras Raung, Carrier Kilimanjaro, folding chairs (L/XL/XXL), folding tables (S/M/L), Kompor portable, windshield, cooking set, Canifer hammock.

## Public catalog page

`src/app/(marketing)/sewa-alat/page.tsx:11-35` is a Server Component that:
1. Fetches up to 100 equipment docs with `depth: 1`.
2. Serializes fields to pass to `SewaAlatClient`.
3. Only exposes: `id`, `name`, `slug`, `price_per_day`, `available`, and image `url`/`alt`.

## Admin stock maintenance

Use `/admin/collections/equipment` in Payload CMS.

Stock rule:
- `Rencana` (planned but not yet purchased) → set `available` to `0`.
- `Terbeli` (purchased/on hand) → set `available` to the actual quantity (commonly `1`, `2`, or `3`).

This convention matches the seed script values where purchased items use `available >= 1` and the comment on the DJI LITO X1 records it as `Terbeli` (`scripts/seed-equipment.ts:19`).

## Env vars

| Name | Purpose | Where used |
| --- | --- | --- |
| `DATABASE_URI` | Postgres connection (Neon/Docker) — note: `DATABASE_URI`, NOT `DATABASE_URL` | `payload.config.ts:64` |
| `PAYLOAD_SECRET` | Payload CMS secret | Payload CMS |
| `CLOUDFLARE_KV_NAMESPACE_ID` | KV cache namespace | `src/app/api/products/[id]/route.ts:4` (via `getCache`/`setCache`) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account | KV/R2 utilities |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API auth | KV/R2 utilities |

## Pitfalls / gotchas

- `src/app/api/products/route.ts` does not exist; the product detail endpoint is `src/app/api/products/[id]/route.ts` and queries `products` and `photos` collections, not `equipment`.
- `sewa-alat` page serializes only a subset of fields; `specs` and `deposit` are not passed to the client component.
- Seed script overwrites existing rows by slug, so re-running it updates rather than duplicates.
- `available` is a plain number field; there is no reservation/booking logic in the read files.
- `images` is an nested array of media uploads; empty arrays are allowed (`src/collections/Equipment.ts:44-53`).
