# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlas AI Website - A **static Next.js 15 website** for atlas-ai.au showcasing AI business integration services. The site is configured for static export deployment (GitHub Pages, Cloudflare Pages, or Vercel).

## Architecture

**Static Site Pattern**: This is a **static export** configured Next.js application (`output: 'export'` in next.config.js). No API routes, no database connections in production. All forms are client-side only.

### Tech Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (sans-serif), Instrument Serif (headings)
- **Deployment**: Static export to `out/` directory
- **Domain**: atlas-ai.au

### Component Architecture

**Landing Page Components** (`components/landing/`):
- `navigation.tsx` - Header with mobile menu
- `hero.tsx` - Hero section with CTA
- `mcp-comparison.tsx` - Feature comparison table
- `services.tsx` - Service offerings
- `governance.tsx` - Governance-first philosophy section
- `case-studies.tsx` - Portfolio showcase
- `process.tsx` - How-it-works section
- `pricing.tsx` - Pricing cards
- `contact-form.tsx` - Multi-step lead form (client-side only)
- `technical.tsx` - Technical capabilities
- `testimonial.tsx` - Social proof
- `footer.tsx` - Site footer

## Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:3000)
npm run dev

# Production build (creates static export in ./out)
npm run build

# Preview production build
npm run start

# Lint code
npm run lint
```

## Static Export Configuration

**next.config.js**:
- `output: 'export'` - Enables static site generation
- `trailingSlash: false` - Clean URLs without trailing slashes
- `images.unoptimized: true` - Required for static export
- `serverActions.allowedOrigins` - Allows atlas-ai.au and localhost

**Deployment**: The `npm run build` command generates a static site in the `out/` directory that can be deployed to any static hosting provider.

## Design System

**Colors**:
- Primary: Blue/teal theme
- Accent: Professional tech aesthetic

**Typography**:
- Headings: Instrument Serif (serif)
- Body: Inter (sans-serif)

**Layout**:
- Mobile-first responsive design
- Generous whitespace
- Clean, minimalist approach

## Important Notes

### No Backend in Current Configuration
This project was originally configured with database backend (Drizzle ORM, Supabase, API routes) but has been converted to a **static site**. The database-related code exists in the codebase but is not active.

**Inactive Backend Code** (may be re-enabled later):
- `src/db/` - Database schema and connection
- `drizzle/` - Migration files
- `lib/validation.ts` - Zod schemas
- `lib/lead-scoring.ts` - Lead scoring algorithm
- `drizzle.config.ts` - Drizzle ORM configuration

### Contact Form
The contact form in `components/landing/contact-form.tsx` is **client-side only**. It does not submit to a backend API in the current static configuration.

## Deployment

### Static Hosting Options

**GitHub Pages**:
1. Run `npm run build`
2. Push to `gh-pages` branch or use GitHub Actions

**Cloudflare Pages**:
1. Connect repository
2. Build command: `npm run build`
3. Output directory: `out`

**Vercel**:
1. Import project
2. Build command: `npm run build`
3. Output directory: `out` (set in vercel.json if needed)

### Custom Domain
Configure atlas-ai.au DNS to point to your hosting provider.

## File Structure

```
app/
├── layout.tsx       # Root layout with fonts
├── page.tsx         # Landing page (composes all components)
└── globals.css      # Global styles

components/
├── landing/         # Landing page components (12 total)
└── admin/           # Admin components (inactive)

lib/                 # Utilities (mostly inactive DB code)
src/db/              # Database schema (inactive)

public/              # Static assets (images, favicon)
out/                 # Generated static site (gitignored)
```

## Business Context

**Atlas AI** offers:
1. MCP-style AI Services - Custom AI tools via MCP architecture
2. Workflow Optimization - AI integration into business processes
3. Website Development - Full-stack web applications

**Portfolio Projects**:
- FleetLeaseFlow - Fleet management SaaS
- Josh Project - Client web application
- MCP Servers - Custom AI tooling

## Design Principles

- Single primary CTA: "Book a Strategy Call"
- Outcome-focused messaging with concrete metrics
- Fast load times (static export, minimal JS)
- Mobile-first responsive design
