# Decap CMS Setup Guide

## Access the CMS

1. **Local Development**:
   ```bash
   npm run dev
   ```
   Then visit: http://localhost:3000/admin/

2. **Production**:
   Visit: https://atlas-ai.au/admin/

## First Time Setup

1. Visit `/admin/` on your site
2. Click "Login with Netlify Identity" (or GitHub)
3. Authorize the CMS to access your repository

## Editing Content

### Landing Page
- **Hero**: Headline, subheadline, CTA button
- **Services**: Title and service items (title + description)
- **Pricing**: Title and pricing plans (name, price, description, features)

### Contact Section
- Section title and description
- Email address
- Contact methods (label, value, icon)

## Workflow

1. **Edit content** in the CMS
2. **Save changes** - commits to git
3. **Deploy** - Vercel auto-deploys

## Content Files

- `content/pages/index.md` - Landing page content
- `content/components/contact.md` - Contact section

## Adding New Content Sections

1. Edit `public/admin/config.yml`
2. Add fields to the collection
3. Create corresponding markdown file
4. Restart dev server

## Troubleshooting

**CMS not loading?**
- Check `public/admin/config.yml` syntax
- Verify `public/admin/index.html` exists
- Check browser console for errors

**Changes not appearing?**
- Run `npm run build` locally to test
- Check Vercel deployment logs
- Verify content file paths match config

## Next Steps

For more advanced features:
- Add image uploads (configure `media_folder`)
- Add workflow/publishing flow
- Add more content collections (blog, case studies, etc.)
