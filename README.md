# Atlas AI Website - Database Integration

Full-stack Next.js application with database backend for Atlas AI business.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (via Railway or Supabase)
- **ORM**: Drizzle ORM
- **Auth**: Supabase Auth
- **Deployment**: Railway

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL` or `POSTGRES_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for admin operations)

### 3. Database Setup

Run database migrations:

```bash
npm run db:migrate
```

Generate migrations (after schema changes):

```bash
npm run db:generate
```

### 4. Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Railway Deployment

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login and link project:
```bash
railway login
railway init
```

3. Add PostgreSQL database:
```bash
railway add postgresql
```

4. Set environment variables:
```bash
railway variables set DATABASE_URL="postgresql://..."
railway variables set NEXT_PUBLIC_SUPABASE_URL="https://..."
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
railway variables set SUPABASE_SERVICE_ROLE_KEY="..."
```

5. Deploy:
```bash
railway up
```

## Database Schema

### Tables

- **leads** - Lead form submissions with scoring
- **services** - Service catalog
- **portfolio_projects** - Portfolio/showcase projects
- **admin_users** - Admin user accounts
- **activity_logs** - Audit trail for admin actions

## API Routes

- `POST /api/leads` - Submit lead form
- `GET /api/leads` - List all leads (admin)
- `GET /api/services` - Get active services
- `GET /api/portfolio` - Get portfolio projects

## Admin Dashboard

Access at `/admin` (requires authentication).

Features:
- Lead management with qualification scoring
- Dashboard stats (total leads, qualified leads, conversion rate)
- Activity log for audit trail

## Lead Scoring

Leads are automatically scored based on:
- Team size (up to 20 points)
- Timeline urgency (up to 15 points)
- Budget range (up to 25 points)
- Message quality (up to 15 points)
- Company presence (10 points)
- Referral source (up to 15 points)

Leads with score ≥ 50 are marked as "qualified".

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard (protected)
│   ├── api/               # API routes
│   ├── login/             # Login page
│   └── globals.css        # Global styles
├── components/
│   └── admin/             # Admin components
├── lib/                   # Utilities
│   ├── lead-scoring.ts    # Lead scoring algorithm
│   ├── supabase.ts        # Client-side Supabase
│   └── supabase-server.ts # Server-side Supabase
├── src/db/                # Database
│   ├── schema.ts          # Drizzle schema
│   └── index.ts           # Database connection
├── drizzle.config.ts      # Drizzle configuration
├── Dockerfile             # Railway deployment
└── railway.toml           # Railway configuration
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings → API
3. Create an admin user in Authentication → Users
4. Configure Row-Level Security (RLS) policies

### RLS Policies

```sql
-- Public can insert leads
CREATE POLICY "Public can insert leads"
ON leads FOR INSERT
WITH CHECK (true);

-- Authenticated users can read leads
CREATE POLICY "Authenticated can read leads"
ON leads FOR SELECT
USING (auth.role() = 'authenticated');
```

## Credits

Based on reference patterns from:
- **WebApp** - Drizzle ORM patterns, multi-tenancy foundation
- **Massage_Website** - Supabase integration, RLS policies

## License

Proprietary - Atlas AI © 2025
