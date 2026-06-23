# Sunday Vibes - Deployment Guide

This document outlines the architecture and deployment steps required to publish the Sunday Vibes platform to production. The project is architected as a Next.js App Router application with Payload CMS seamlessly integrated into the Next.js runtime.

## Architecture Overview
- **Framework:** Next.js 16.x (App Router)
- **CMS:** Payload CMS 3.x (Runs inside Next.js via `@payloadcms/next`)
- **Database:** Neon Serverless Postgres
- **Storage:** Vercel Blob / Cloudflare R2 (for Media uploads)
- **Hosting:** Vercel

## Prerequisites
Before deploying, ensure you have active accounts on:
1. [GitHub](https://github.com/) (for source control)
2. [Vercel](https://vercel.com/) (for hosting)
3. [Neon](https://neon.tech/) (for the PostgreSQL database)
4. [Midtrans](https://midtrans.com/) (for the payment gateway)
5. [Resend](https://resend.com/) (for transactional emails)

## Step 1: Database Setup (Neon)
1. Create a new project in Neon.
2. Navigate to your Neon dashboard and grab the **Connection String** (make sure `?sslmode=require` is appended to the URL).
3. Save this string; it will be your `DATABASE_URI`.

## Step 2: Environment Variables
Prepare the following environment variables. You will need to add these to your Vercel project settings:

```env
# Database
DATABASE_URI="postgresql://username:password@ep-your-db.region.aws.neon.tech/neondb?sslmode=require"

# Payload CMS
# Generate a random secure string (e.g., using `openssl rand -base64 32`)
PAYLOAD_SECRET="your_super_secret_string"

# Next.js
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"

# Midtrans (Payment Gateway)
MIDTRANS_SERVER_KEY="your_server_key"
MIDTRANS_CLIENT_KEY="your_client_key"

# Resend (Emails)
RESEND_API_KEY="your_resend_api_key"

# Analytics (Optional)
NEXT_PUBLIC_UMAMI_URL="https://analytics.your-domain.com"
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your_umami_uuid"
```

## Step 3: Deployment via Vercel
This project is pre-configured with a `vercel.json` and `next.config.ts` specifically optimized for Vercel.

1. Push your repository to GitHub.
2. Go to your Vercel Dashboard and click **Add New Project**.
3. Import your GitHub repository.
4. Expand the **Environment Variables** section and paste the variables you prepared in Step 2.
5. Click **Deploy**.

*Vercel will automatically detect Next.js, run `npm install`, and execute `npm run build`. The `next.config.ts` uses `output: 'standalone'` internally to optimize the serverless build footprint.*

## Step 4: Initializing the CMS (First Run)
Once the deployment finishes:
1. Navigate to `https://your-production-domain.com/admin`.
2. Since the database is empty, Payload CMS will automatically prompt you to create the first **Admin User**.
3. Fill out the details to create your admin account.

## Step 5: Post-Deploy Configuration
1. **Midtrans Webhooks:** Go to your Midtrans Dashboard -> Settings -> Configuration. Set your Payment Notification URL to:
   `https://your-production-domain.com/api/midtrans/notification`
2. **Payload Globals:** Log into your Payload Admin panel and populate the **Site Config**, **Contact Info**, and **SEO Defaults** globals so the frontend renders properly.

## Maintenance & CI/CD
- **Continuous Integration:** The repository includes a GitHub Action (`.github/workflows/verify.yml`) that automatically lints and test-builds every Pull Request.
- **Database Migrations:** Because Payload CMS handles schema changes dynamically in Next.js dev mode, it is highly recommended to test schema modifications locally (`npm run dev`) before pushing to production, as Payload will automatically apply those schema updates to your Neon database upon the next successful build/deployment on Vercel.
