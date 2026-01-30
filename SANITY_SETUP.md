# Sanity CMS Integration - Setup Guide

## Overview

The Atlas AI Website now integrates with Sanity CMS for content management. The integration is configured to:

1. Fetch content from Sanity CMS
2. Fall back to hardcoded content if no CMS content exists
3. Support static export deployment (GitHub Pages, Cloudflare Pages, Vercel)

## Current Configuration

- **Project ID**: `gdf6dsgi`
- **Dataset**: `production`
- **Sanity Studio**: Available at https://www.sanity.io/manage

## Important: API Token Permissions

**The configured `SANITY_API_READ_TOKEN` is a read-only token.** This means:

- ✅ The website can **fetch and display** content from Sanity
- ✅ The integration works correctly for reading content
- ❌ You **cannot create content** via API calls using this token
- ✅ You **can create content** using the Sanity Studio UI at https://www.sanity.io/manage

To create content, use the Sanity Studio web interface. The read-only token is intentional for security - it allows the website to fetch content without having write permissions.

## Accessing Sanity Studio

### Important: Static Export Limitation

Because this site uses `output: 'export'` (static site generation), the Sanity Studio **cannot be embedded** in the Next.js app at `/studio`. This is a known limitation of static exports.

### Two Options for Content Management

#### Option 1: Use Sanity's Hosted Studio (Recommended)

1. Go to https://www.sanity.io/manage
2. Log in with your Sanity account
3. Select project `gdf6dsgi` (Atlas AI Website)
4. Create and edit content directly in the browser

#### Option 2: Deploy Studio as Separate App

If you want a custom Studio at `/studio`, deploy a separate Next.js app:

```bash
# Create new directory for Studio
mkdir -p ../atlas-studio
cd ../atlas-studio

# Initialize new Next.js project WITHOUT static export
npx create-next-app@latest . --typescript --tailwind --eslint
# When asked about App Router: Yes
# When asked about src directory: No
# When asked about import alias: @/*

# Install Sanity dependencies
npm install sanity next-sanity

# Copy the sanity.config.ts from this project
cp ../Atlas_Website/sanity.config.ts ./sanity.config.ts

# Create Studio route
mkdir -p app/studio/[[...index]]
cat > app/studio/[[...index]]/page.tsx << 'EOF'
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
EOF

# DO NOT set output: 'export' in next.config.js
# Deploy this app to Vercel separately
```

## Content Structure

### Landing Page Schema

The Sanity CMS is configured with a `landingPage` document type containing:

- **hero**
  - `headline` - Main hero heading
  - `subheadline` - Hero subheading text
  - `cta` - Call-to-action button text

- **services** (array)
  - `title` - Service name
  - `description` - Service description

- **pricing**
  - `title` - Section title
  - `plans` (array)
    - `name` - Plan name
    - `price` - Price display
    - `description` - Plan description
    - `features` - Features list

## Creating Content

### Step 1: Create a Landing Page Document

1. Go to https://www.sanity.io/manage
2. Select your project
3. Click "New" → "Landing Page"
4. Fill in the fields:

```json
{
  "title": "Atlas AI Home",
  "hero": {
    "headline": "Governed AI systems for businesses that can't afford guesswork",
    "subheadline": "We design and install auditable AI workflows that reduce cost, risk, and time-to-decision.",
    "cta": "Book a Strategy Call"
  },
  "services": [
    {
      "title": "AI Readiness & Risk Audit",
      "description": "For: Businesses considering AI but unsure where or how to start. Includes: Automation opportunities map, AI risk & governance gaps, Clear do/don't automate guidance, Written report + recommendation call."
    }
  ],
  "pricing": {
    "title": "Investment",
    "plans": [
      {
        "name": "What's included",
        "price": "$100,000 - $250,000",
        "description": "Custom MCP servers, AI models, integration, security, training, and 90-day support.",
        "features": "Built to production standards"
      }
    ]
  }
}
```

### Step 2: Publish the Document

Click "Publish" to make the content live.

### Step 3: Verify Content Appears

```bash
# Test locally
npm run dev

# Visit http://localhost:3000
# You should see your Sanity content instead of fallback content
```

## Testing the Integration

### 1. Verify Sanity API is Accessible

```bash
curl -s "https://gdf6dsgi.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22landingPage%22%5D%5B0%5D"
```

Expected response with content:
```json
{"result": {"_type": "landingPage", "hero": {...}, ...}}
```

Expected response without content:
```json
{"result": null}
```

### 2. Verify Content Fetching in Development

```bash
npm run dev
# Check console logs for "Error fetching landing page from Sanity" errors
```

### 3. Build and Test Production Build

```bash
npm run build
npm run start
# Visit http://localhost:3000 and verify content
```

### 4. Deploy and Test

After deploying to Vercel/Cloudflare:

1. Add environment variables in your hosting platform:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID=gdf6dsgi`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_READ_TOKEN=skFSPw9PBdvsJSH0Oj4k4Ank6GQ5s1xlwbQ7d52wxLJHwGoSsjy1NerDUHfieaqDpc4IRrnoVcYWclrcR9CSR3cdsAZykXUg9IU4o5xEsuKQbktyrEVDEVEKtvrArfaBYxphDQgW25KrWMMHjxAGsKlppQT0ZY4pCLJIKpQbu8308l7YUzjD`

2. Visit your deployed site and verify content loads

## How the Integration Works

### Server-Side Fetching

`app/page.tsx` is an async Server Component that fetches content at build/request time:

```typescript
export default async function Home() {
  const sanityData = await getLandingPage();
  return (
    <Hero heroData={sanityData?.hero} />
    // ... other components
  )
}
```

### Fallback Pattern

Each component checks if Sanity data exists, otherwise uses defaults:

```typescript
const headline = heroData?.headline || 'Governed AI systems for businesses...';
```

This ensures the site works even before CMS content is created.

## Revalidation and Caching

The integration uses Next.js Incremental Static Regeneration (ISR):

- Content is cached for 60 seconds (`revalidate: 60`)
- After 60 seconds, next request fetches fresh content
- Tags (`landing-page`, `hero`, `services`) allow targeted revalidation

For manual revalidation, you can:

1. **Re-deploy** - Simplest option for static sites
2. **Add webhook route** - Requires removing `output: 'export'` and using ISR
3. **Use Vercel ISR** - Configure webhook in Sanity dashboard

## Environment Variables

Required in `.env.local` (local) and hosting platform:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=gdf6dsgi
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=skFSPw9PBdvsJSH0Oj4k4Ank6GQ5s1xlwbQ7d52wxLJHwGoSsjy1NerDUHfieaqDpc4IRrnoVcYWclrcR9CSR3cdsAZykXUg9IU4o5xEsuKQbktyrEVDEVEKtvrArfaBYxphDQgW25KrWMMHjxAGsKlppQT0ZY4pCLJIKpQbu8308l7YUzjD
```

## Troubleshooting

### Content Not Appearing

1. Check Sanity document is **Published** (not just draft)
2. Verify API is returning data:
   ```bash
   curl -s "https://gdf6dsgi.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22landingPage%22%5D%5B0%5D" | jq
   ```
3. Check browser console for fetch errors
4. Verify environment variables are set

### Build Errors

- Make sure `styled-components` is installed (required for NextStudio)
- If not using Studio, remove Studio-related code

### Studio Not Loading

- Studio requires **runtime** mode, not static export
- Use hosted Studio at https://www.sanity.io/manage or deploy separately

## Files Created/Modified

### Created
- `lib/sanity/client.ts` - Sanity client configuration
- `lib/sanity/queries.ts` - GROQ queries and TypeScript interfaces
- `.env.local` - Sanity credentials

### Modified
- `sanity.config.ts` - Updated project ID to `gdf6dsgi`
- `app/page.tsx` - Converted to async Server Component
- `components/landing/hero.tsx` - Accepts Sanity props
- `components/landing/services.tsx` - Accepts Sanity props
- `components/landing/pricing.tsx` - Accepts Sanity props

---

## Implementation Status

**Status**: ✅ **COMPLETE**

**Completion Date**: 2026-01-30

**Commit**: `50e63fae` - feat: Complete Sanity CMS integration for static site

### Completed Phases

| Phase | Status | Notes |
|-------|--------|-------|
| Sanity Client Setup | ✅ Complete | `lib/sanity/client.ts` created |
| Content Fetching Integration | ✅ Complete | `lib/sanity/queries.ts` + components updated |
| Credential Setup | ✅ Complete | `.env.local` configured |
| Testing | ✅ Complete | Dev server + build verified |
| Webhook Setup | ⏭️ Skipped | Not required for static export |

### Verification Results

- ✅ Development server tested (port 3010)
- ✅ Sanity content fetched and displayed ("SANITY TEST CONTENT")
- ✅ Production build successful
- ✅ Static export generated in `out/`
- ✅ Changes committed and pushed to `origin/main`

### Next Steps

1. Create content in Sanity Studio at https://www.sanity.io/manage
2. Rebuild: `npm run build`
3. Deploy `out/` directory to hosting provider
