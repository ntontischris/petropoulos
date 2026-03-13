# Group 110 - Construction & Engineering Website

Professional website for **Group 110** (Petropoulos) — a construction and engineering company based in Greece.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **i18n:** next-intl (Greek & English)
- **Animations:** Framer Motion

## Features

- Bilingual support (EL/EN)
- Project portfolio with filtering
- Service catalog
- Multi-step booking wizard
- Contact form with server actions
- SEO optimized (sitemap, robots, JSON-LD)
- Responsive design

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Supabase and Stripe keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for required variables:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook secret
- `NEXT_PUBLIC_SITE_URL` — Production site URL

## Database

Supabase migrations are in `supabase/migrations/`:

1. `001_schema.sql` — Tables and indexes
2. `002_rls.sql` — Row Level Security policies
3. `003_seed.sql` — Initial seed data

## Deploy

Deploy on [Vercel](https://vercel.com):

1. Connect this repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy
