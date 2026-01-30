# Atlas AI Website - Content Editing Guide

## Current Status: Decap CMS Limitation

**Decap CMS requires a backend auth endpoint** which doesn't exist on static sites (Vercel/GitHub Pages). It's designed primarily for Netlify.

For your static site, here are **working alternatives**:

---

## Option 1: Direct Markdown Editing (Recommended) ✅

**Edit content files directly, then deploy.**

### Content Files

| File | Controls |
|------|----------|
| `content/pages/index.md` | Hero headline, services, pricing |
| `content/components/contact.md` | Contact section content |
| `components/landing/hero.tsx` | Hero component structure |
| `components/landing/services.tsx` | Services component |
| `components/landing/pricing.tsx` | Pricing component |

### Quick Edit Workflow

```bash
# 1. Edit content
nano content/pages/index.md

# 2. Build to verify
npm run build

# 3. Commit and push (auto-deploys)
git add .
git commit -m "content: Update landing page"
git push origin main
```

### Example: Editing Hero Section

Edit `content/pages/index.md`:

```yaml
---
hero:
  headline: "Your New Headline Here"
  subheadline: "Your new subheadline"
  cta: "Get Started"
---
```

---

## Option 2: Vercel Visual Editor (Paid) 💰

Vercel offers a built-in visual editor for their paid plans.

**Features:**
- Visual page editing
- Live preview
- No setup required
- Works with static sites

**Upgrade required:** Vercel Pro plan

---

## Option 3: Spreadsheet-to-Git (Free Alternative) 📊

Use Google Sheets + GitHub Actions to edit content via spreadsheet.

**How it works:**
1. Edit content in Google Sheets
2. GitHub Action converts to markdown
3. Auto-commits to repo
4. Vercel auto-deploys

**Want me to set this up?**

---

## Option 4: Netlify CMS (Decap) Migration 🔄

Move from Vercel to Netlify to use Decap CMS properly.

**Trade-offs:**
- ✅ Visual CMS works out of box
- ❌ Migrate from Vercel
- ❌ Slower builds on free tier
- ❌ Need to configure DNS again

---

## Option 5: Custom Simple Admin (Recommended) 🛠️

I can create a simple React admin panel that:

1. **Reads** markdown files from `/content/`
2. **Provides forms** to edit content
3. **Saves** changes (via git commits)
4. **Triggers** Vercel deployment

**Features:**
- No external dependencies
- Works on static sites
- Custom branding
- GitHub integration

**Want me to build this?**

---

## Recommended Approach

For now, use **Option 1 (Direct Markdown Editing)**:

1. Edit `content/pages/index.md` with your content
2. Run `npm run build` to preview
3. `git commit && git push` to deploy

This is **fastest and most reliable** for static sites.

---

## Quick Reference: Content Structure

```
content/
├── pages/
│   └── index.md          # Landing page content
└── components/
    └── contact.md        # Contact section content

components/landing/
├── hero.tsx              # Hero component
├── services.tsx          # Services component
├── pricing.tsx           # Pricing component
└── contact-form.tsx     # Contact form
```

## Deploy Commands

```bash
# Preview locally
npm run build
python3 -m http.server 8080 --directory out

# Deploy to production
git add .
git commit -m "content: Update"
git push origin main
```

Your site auto-deploys in 1-2 minutes at: https://atlas-ai-website-two.vercel.app
