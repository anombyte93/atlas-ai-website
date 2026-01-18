# Atlas AI Website Project

## Scope
Simple, professional website for atlas-ai.au - AI business integration services

## Business Offering
1. **MCP-style AI Services** - Creating custom AI tools for businesses via MCP architecture
2. **Workflow Optimization** - Integrating AI into existing business processes
3. **Website Development** - Full-stack web applications (proven: FleetLeaseFlow, Josh projects)

## Tech Stack (Full-Stack Next.js Application)
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: PostgreSQL (local development: localhost:5432/atlas_website)
- **ORM**: Drizzle ORM with schema-first approach
- **Styling**: Tailwind CSS
- **Design System**: Professional blue/teal theme matching AI/tech aesthetic
- **Deployment**: Railway (Dockerized deployment configured, deployment deferred)
- **Domain**: atlas-ai.au (DNS configuration needed)

### Architecture
- **Frontend**: 10 React components in `components/landing/`
- **Backend**: API routes in `app/api/` (leads, services, portfolio)
- **Database**: 5 tables with indexes and constraints
- **Admin**: Dashboard with authentication (admin check via `admin_users` table)

## Design Principles
- Mobile-first responsive design
- Single primary CTA: "Book a Strategy Call"
- Outcome-focused messaging with concrete metrics
- Clean, generous whitespace
- Fast load times (static site, no heavy JS)

## Page Sections (2025 Best Practices)
1. Hero - Headline + subheading + CTA + visual
2. Pain → Outcome strip - 3 problems + 3 solutions
3. Services - 3-4 productized offerings
4. Social proof - Portfolio/testimonials
5. How it works - 3-step process
6. FAQ - Address common concerns
7. Footer - Final CTA + contact

## Portfolio Projects
- FleetLeaseFlow - Fleet management SaaS
- Josh Project - Client web application
- MCP Servers - Custom AI tooling

## Created
- Date: 2024-12-31
- By: /prompt-architect
- Complexity: 10

## MANDATORY: Perplexity Deep Research (3x Call) Before ANY Task

**Perplexity MCP Server**: `~/Projects/Programs/perplexity-api-simple/`
**Local API URL**: `http://localhost:8765`
**Primary Tool**: `perplexity_deep_research` (comprehensive analysis, 2-5 min, hundreds of sources)
**Secondary Tool**: `perplexity_pro_search` (better quality, seconds, dozens of sources)
**Fast Tool**: `perplexity_search` with `mode: 'auto'` (quick answers)

### The "Research-First" Protocol

**BEFORE performing ANY task**, you MUST run deep research in **3 parallel calls**:

1. **Call 1**: Technical research - Architecture patterns, libraries, best practices
2. **Call 2**: Domain research - Business logic, industry standards, user expectations
3. **Call 3**: Edge cases - Security considerations, accessibility, performance, error handling

### Execution Pattern

```bash
# Always start tasks with 3x parallel Perplexity deep research
mcp-cli call perplexity-api-free/perplexity_deep_research '{
  "query": "<technical-context-query>"
}'

mcp-cli call perplexity-api-free/perplexity_deep_research '{
  "query": "<domain-context-query>"
}'

mcp-cli call perplexity-api-free/perplexity_deep_research '{
  "query": "<edge-cases-query>"
}'
```

### Why 3x?

- **Call 1 (Technical)**: Ensures you use modern, proven patterns
- **Call 2 (Domain)**: Captures business context you may lack
- **Call 3 (Edge cases)**: Prevents overlooking critical considerations

**After research**, synthesize findings, THEN implement.

### Verification

Before claiming research is complete, ask:
- Did I cover technical patterns?
- Did I cover domain context?
- Did I cover edge cases?
- Do I have 3 distinct sources to synthesize?

---

## Reference Pattern Learning Rule

When implementing backend logic or complex components, you may consult the maryse-demo.atlas-ai.au codebase as a reference implementation to infer proven patterns, data flows, and architectural decisions.

Do NOT copy code verbatim.
Extract principles, flows, and constraints only.
Adapt all implementations to the current Atlas AI backend, stack, and conventions.
Document which pattern was learned and why it applies.

---

## Database Integration Completed (2026-01-18)

### Overview
Successfully migrated from static HTML landing page to full-stack Next.js application with PostgreSQL backend, following patterns from maryse-demo.atlas-ai.au and WebApp reference implementations.

### Database Schema

**Tables Created** (via Drizzle ORM):
- `leads` - Lead submissions with scoring (email unique constraint)
- `services` - Service catalog
- `portfolio_projects` - Portfolio items
- `admin_users` - Admin authorization (email unique constraint)
- `activity_logs` - Audit trail for admin actions

**Key Features**:
- Unique constraint on `leads.email` prevents duplicate submissions
- Indexes on `leads.email`, `leads.status`, `leads.qualified` for query optimization
- Foreign key constraint: `activity_logs.admin_id` → `admin_users.id`
- Generated migration: `drizzle/0000_lively_gunslinger.sql`

### API Routes

**`app/api/leads/route.ts`**:
- `POST /api/leads` - Lead submission with validation + scoring
  - Field mapping: `team_size` (form) → `teamSize` (API)
  - Zod validation before database insert
  - Lead scoring algorithm (0-100, qualified if ≥50)
  - Duplicate email handling (409 Conflict)
- `GET /api/leads` - Fetch leads with optional filters (status, qualified)

**`app/api/services/route.ts`**:
- `GET /api/services` - Fetch all active services

**`app/api/portfolio/route.ts`**:
- `GET /api/portfolio` - Fetch all portfolio projects

### Admin Dashboard

**`app/admin/page.tsx`**:
- Protected by `isAdminUser()` check against `admin_users` table
- Displays recent leads, activity logs, and stats
- Status update actions for lead management

**Security**:
- Admin authorization bypass fixed (Cycle 2 validation)
- Email validation added (Zod `.email()` check)
- `admin_users` table whitelist for admin access

### Frontend Components

**10 React Components** (`components/landing/`):
1. `navigation.tsx` - Header with mobile menu
2. `hero.tsx` - Hero section with CTA
3. `mcp-comparison.tsx` - Feature comparison table
4. `services.tsx` - Service offerings
5. `testimonial.tsx` - Social proof
6. `technical.tsx` - Technical capabilities
7. `process.tsx` - How-it-works section
8. `pricing.tsx` - Pricing cards
9. `contact-form.tsx` - Multi-step lead form
10. `footer.tsx` - Site footer

### Critical Bug Fixes (Validation Cycles)

**Field Name Mismatch** (Karen Cycle 3):
- Form sent `team_size` (snake_case)
- API expected `teamSize` (camelCase)
- Fixed: Added transformation in API route

**Enum Value Mismatches** (Karen Cycle 3):
- Form: `'1-5'`, `'6-20'`, `'21-50'`, `'51-200'`, `'200+'`
- Schema expected: `'1-10'`, `'11-50'`, `'51-200'`, `'200+'`
- Fixed: Updated Zod schema and lead-scoring maps

### Validation Results

**Karen Validator Cycle 4**: Score 7.7/10
- Verdict: **PASS WITH WARNINGS** - Deployment ready
- Build passes: ✅ No TypeScript errors
- Form submissions: ✅ Will succeed (field mapping + enum alignment)
- Warnings:
  - Missing `budget` field in form (business critical)
  - `service` field sent but ignored by API

### Database Setup

**Local Development**:
- Database: `postgresql://postgres@localhost:5432/atlas_website`
- Migrations applied: ✅ 5 tables created
- Admin user seeded: `admin@atlas-ai.au`
- Test lead present: 1 entry from testing

**Railway Project**:
- Project ID: `6f63c955-c799-40b4-8a9f-117971dc8654`
- Status: Created and linked (deployment deferred)
- Service: `atlas-web` (Docker build configured)
- PostgreSQL: 3 services available (`atlas-postgres`, `Postgres`, `Postgres-c_n5`)
- DATABASE_URL: `${atlas-postgres.DATABASE_URL}` (service binding)

### Configuration Files

- `drizzle.config.ts` - Drizzle ORM configuration
- `src/db/schema.ts` - Database table definitions
- `src/db/index.ts` - Database connection singleton
- `lib/validation.ts` - Zod validation schemas
- `lib/lead-scoring.ts` - Lead qualification algorithm
- `lib/admin-check.ts` - Admin authorization check
- `railway.toml` - Railway deployment config
- `Dockerfile` - Multi-stage Docker build (standalone output)
- `next.config.js` - Next.js with standalone output
- `.env` - DATABASE_URL for Drizzle Kit

### Deployment Prerequisites

**To complete Railway deployment**:
1. Remove `app/login.disabled/` directory (breaks build without Supabase env vars)
2. Run `railway up --service atlas-web`
3. Set environment variables:
   - `DATABASE_URL=${atlas-postgres.DATABASE_URL}`
   - `NODE_ENV=production`
4. Run migrations: `npm run db:migrate` (or push schema)
5. Seed admin user: Insert into `admin_users` table

### Git Commits

1. `d7caa7c` - feat: Frontend migration - Complete landing page (10 components)
2. `5dac150` - fix: Security fixes (admin auth, validation, unique constraint)
3. `e08e537` - feat: Add blog section with 3 technical articles
4. `87a1a0a` - feat: Add Live RAG Demo section with client-side document processing
5. `843abc6` - fix: Critical bug fixes (field mapping + enum alignment)
6. `d7caa7c` - feat: Frontend migration - Complete landing page with React components

### Patterns Learned from maryse-demo

1. **Lazy Database Connection** - Defers connection until runtime to prevent build failures
2. **Field Mapping Layer** - API route transforms snake_case → camelCase
3. **Separation of Auth/AuthZ** - Supabase handles auth, `admin_users` table handles authorization
4. **Enum-First Development** - Define enums in schema, match across form + validation + scoring
5. **Migration-First Workflow** - Generate migrations, apply, then seed data

### Post-Deployment Improvements

1. **Add budget field** to contact form (currently missing, business critical)
2. **Utilize service field** or remove from form (currently ignored)
3. **Set up Supabase Auth** for full authentication flow
4. **Configure custom domain** in Railway dashboard
5. **Set up monitoring** (Railway logs + health checks)
