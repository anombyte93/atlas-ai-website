# Sanity CMS Setup Guide for Atlas AI Website

Sanity is a headless CMS that works perfectly with static Next.js sites on Vercel.

## Why Sanity?

- ✅ **Free generous tier** (up to 500K documents, 3 team members)
- ✅ **Visual editor** - Edit content in real-time
- ✅ **Webhooks** - Auto-rebuild Vercel on content changes
- ✅ **Real-time collaboration** - Multiple editors
- ✅ **No backend needed** - Static site compatible

---

## Step 1: Create Sanity Account

1. Go to: https://www.sanity.io/
2. Click **"Get started"**
3. Sign up with **GitHub** (recommended) or email

---

## Step 2: Create New Project

1. After signup, click **"Create new project"**
2. Project name: **`atlas-ai-website`**
3. Dataset name: **`production`**
4. Plan: **Free** (should be default)
5. Click **"Create project"**

---

## Step 3: Get Project Credentials

After creating the project:

1. Go to: https://www.sanity.io/manage/
2. Select your **`atlas-ai-website`** project
3. Click **"API"** → **"Tokens"**
4. Click **"Add API token"**
   - Label: **`Vercel`**
   - Permissions: **`Editor`**
5. Copy the token (save it - you'll need it)

**Your project ID** is displayed in the project overview (format: `xxxxxxxxxxxxx`).

---

## Step 4: Configure Locally

Create `.env.local` file in your project root:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_api_token_here
```

Replace the values with your actual project ID and token.

---

## Step 5: Install & Run

```bash
# Install dependencies (already done)
npm install

# Run dev server
npm run dev
```

Visit: http://localhost:3000/studio

---

## Step 6: Import Content Schema

1. The schema is already configured in `sanity.config.ts`
2. In Sanity Studio, go to **"Schema"**
3. The schema types will auto-import

---

## Step 7: Create Your First Content

1. Go to **"Content"** in Sanity Studio
2. Click **"New"** → **"Landing Page"**
3. Fill in the fields:
   - Title: **"Atlas AI"**
   - Description: **"AI That Works For Your Business"**
   - Hero: headline, subheadline, CTA
   - Services: add items
   - Pricing: add plans
4. Click **"Publish"**

---

## Step 8: Connect to Your Website

I've already set up the integration. After you create content:

```bash
# Rebuild to see changes
npm run build

# Deploy
git push origin main
```

Your site will automatically fetch content from Sanity and display it.

---

## Step 9: Set Up Webhook (Auto-Deploy)

To have Vercel auto-rebuild when you change content:

1. In Sanity Studio, go to **"API"** → **"Webhooks"**
2. Click **"Create webhook"**
3. URL: **`https://atlas-ai-website-two.vercel.app/api/revalidate`**
4. Secret: Generate one (copy it)
5. Triggers: **On: create, update, delete**

Then add to Vercel environment variables:
```bash
SANITY_WEBHOOK_SECRET=your_webhook_secret_here
```

---

## Quick Reference

| Action | Location |
|--------|----------|
| Edit content | https://www.sanity.io/manage/ → your project → Studio |
| View live site | https://atlas-ai-website-two.vercel.app |
| Local preview | http://localhost:3000 |
| Sanity Studio | http://localhost:3000/studio |

---

## Content Structure

The Sanity CMS manages:

- **Hero Section**: Headline, subheadline, CTA
- **Services Section**: Service items
- **Pricing Section**: Pricing plans

Changes appear live after rebuild.

---

## Troubleshooting

**Content not appearing?**
- Check `.env.local` has correct credentials
- Run `npm run build` to rebuild
- Clear browser cache

**Sanity Studio not loading?**
- Run `npm run dev`
- Visit http://localhost:3000/studio
- Check you're logged into Sanity

**Webhook not triggering rebuilds?**
- Verify webhook URL in Sanity dashboard
- Check Vercel environment variables include `SANITY_WEBHOOK_SECRET`

---

## Next Steps

Once your Sanity account is set up and you have your credentials:

1. Add them to `.env.local`
2. Create your first content in Sanity Studio
3. Rebuild and deploy

Your site will dynamically fetch content from Sanity!
