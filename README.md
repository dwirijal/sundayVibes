# Sunday Vibes

Creative services platform for event organization, equipment rental, photography, design, and web development. Built with Next.js 16, Payload CMS 3, and Neon PostgreSQL.

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router) + React 19
- **CMS**: Payload CMS 3.85 (Lexical rich text editor)
- **Database**: PostgreSQL (Neon or local Docker)
- **Styling**: Tailwind CSS 4 + Shadcn UI + tw-animate-css
- **Payments**: Custom dynamic QRIS (EMVCo TLV, `src/lib/qris.ts`)
- **Email**: Resend
- **Testing**: Playwright
- **Language**: TypeScript 5

## Prerequisites

- Node.js 20+ (or Bun)
- PostgreSQL 15+ (Neon cloud or local via Docker)
- Docker (optional, for local database)

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here

# Midtrans (Indonesian payment gateway)
MIDTRANS_SERVER_KEY=your-server-key
MIDTRANS_CLIENT_KEY=your-client-key

# Email (Resend)
RESEND_API_KEY=re_123456789

# Cloudflare (optional, for KV cache + R2 storage)
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_KV_NAMESPACE_ID=your-namespace-id
CLOUDFLARE_R2_BUCKET=your-bucket
CLOUDFLARE_R2_ENDPOINT=your-endpoint

# WhatsApp (optional, Fonnte integration)
FONNTE_API_KEY=your-fonnte-key
```

## Installation

```bash
npm install
# or
bun install
```

### Database Setup

**Neon (cloud)**:
- Create database at https://console.neon.tech
- Copy connection string to `DATABASE_URL`

**Local Docker**:
```bash
docker-compose up -d
```

### Seed Admin User

```bash
npm run seed:admin
```

Creates admin from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (min 12 chars in `.env`). No default password.

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed:admin` | Create admin user |
| `npx playwright test` | Run E2E tests |

## Deployment

### VPS (manual sync)

```bash
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  ./ user@vps:/path/to/project

ssh user@vps 'cd /path/to/project && npm install && npm run build && pm2 restart sunday-vibes'
```

### Vercel

```bash
vercel --prod
```

Configure environment variables in Vercel dashboard.

## Project Structure

```
sunday-vibes/
├── src/
│   ├── app/
│   │   ├── (marketing)/      # Public pages
│   │   │   ├── blog/         # Blog posts
│   │   │   ├── checkout/     # Payment flow
│   │   │   ├── foto/         # Photography services
│   │   │   ├── layanan/      # Service listings
│   │   │   ├── lokasi/       # Location pages (SEO)
│   │   │   ├── portfolio/    # Portfolio gallery
│   │   │   ├── produk-digital/ # Digital products
│   │   │   ├── review/       # Customer reviews
│   │   │   └── sewa-alat/    # Equipment rental
│   │   ├── (payload)/        # Payload CMS admin
│   │   │   └── admin/        # CMS dashboard
│   │   ├── api/              # API routes
│   │   │   ├── bookings/     # Booking management
│   │   │   ├── checkout/     # Payment processing
│   │   │   ├── midtrans/     # Payment webhooks
│   │   │   ├── products/     # Product catalog
│   │   │   └── reviews/      # Google Reviews fetch
│   │   └── dashboard/        # Protected admin area
│   ├── collections/          # Payload CMS schemas
│   │   ├── Bookings.ts       # Service bookings
│   │   ├── Equipment.ts      # Equipment inventory
│   │   ├── Media.ts          # Image/file uploads
│   │   ├── Products.ts       # Digital products
│   │   ├── Projects.ts       # Portfolio projects
│   │   ├── Reviews.ts        # Customer reviews
│   │   ├── Services.ts       # Service offerings
│   │   └── Users.ts          # User accounts
│   ├── components/           # React components
│   │   ├── ui/              # Shadcn UI primitives
│   │   └── ...              # Feature components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities
│   │   ├── cloudflare-cache.ts  # KV caching
│   │   ├── logger.ts        # Structured logging
│   │   ├── midtrans.ts      # Payment config
│   │   └── utils.ts         # Helpers
│   └── middleware.ts        # Auth protection
├── tests/                   # Playwright E2E tests
├── public/                  # Static assets
└── docs/                    # Project documentation
```

## Features

### Implemented
- Equipment rental booking with payment integration
- Photography services with licensing
- Digital product catalog
- Blog with Lexical rich text
- Location-based SEO pages
- Google Reviews integration
- WhatsApp chatbot (Fonnte)
- Structured logging
- Dark mode toggle
- Custom 404/500 error pages

### In Progress
- Admin dashboard enhancements
- Multi-tenant support
- Analytics dashboard

## Testing

```bash
npx playwright test
```

Tests cover:
- Blog rendering and navigation
- Checkout flow (product → cart → payment)
- SEO metadata presence

## Contributing

1. Follow TypeScript best practices (strict mode enabled)
2. Use ESLint for code quality
3. Write tests for new features
4. Update documentation for API changes

## License

Private - All rights reserved
