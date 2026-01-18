# Continue Prompt: Atlas AI Website Database Integration

## Context

Migrating Atlas AI Website from static HTML to full-stack Next.js application with database backend, following patterns from maryse-demo.atlas-ai.au and WebApp.

## Completed ✅

- **Next.js 15** setup with TypeScript, Tailwind CSS
- **Database schema** with Drizzle ORM (5 tables: leads, services, portfolio_projects, admin_users, activity_logs)
- **API routes**: `/api/leads` (POST/GET), `/api/services`, `/api/portfolio`
- **Supabase Auth** integration with RLS policies
- **Admin dashboard** at `/admin` with lead table, stats cards, authentication
- **Railway deployment** config (Dockerfile, railway.toml)
- **Lead scoring algorithm** preserved from original HTML form

## Remaining 🔜

### 1. HTML → React Migration (High Priority)
Convert `backup/index.html` to React components while preserving the existing Atlas AI design:
- Hero section with headline + CTA
- Services section (3-4 offerings)
- Multi-step lead form (replace Formspree with `/api/leads`)
- Portfolio showcase
- FAQ section

Original design at: `/home/anombyte/Atlas/Atlas_Website/backup/index.html`

### 2. Database Setup
- Create Supabase project or configure Railway PostgreSQL
- Set environment variables in `.env.local`:
  ```
  DATABASE_URL=postgresql://...
  NEXT_PUBLIC_SUPABASE_URL=https://...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
  ```
- Run migrations: `npm run db:migrate`
- Configure RLS policies in Supabase

### 3. Testing & Deployment
- Test lead submission flow end-to-end
- Verify admin dashboard authentication
- Deploy to Railway: `railway up`
- Update DNS for atlas-ai.au

## Quick Start Commands

```bash
cd /home/anombyte/Atlas/Atlas_Website

# Development
npm run dev

# Database
npm run db:migrate
npm run db:generate

# Build
npm run build

# Railway
railway login
railway init
railway add postgresql
railway variables set DATABASE_URL="..."
railway up
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main landing page (currently placeholder) |
| `app/admin/page.tsx` | Admin dashboard |
| `app/api/leads/route.ts` | Lead submission endpoint |
| `src/db/schema.ts` | Database schema |
| `lib/lead-scoring.ts` | Lead scoring algorithm |
| `backup/index.html` | Original design to migrate |

## Next Step Priority

**Start with:** HTML → React migration of the landing page design

**Reference:** `/home/anombyte/Atlas/Atlas_Website/backup/index.html`

**Goal:** Preserve the existing professional blue/teal Atlas AI design while making it dynamic with database backend.
