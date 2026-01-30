# Atlas AI Website - Content Management

## Current Status

Your site is deployed at: https://atlas-ai-website-two.vercel.app
Custom domain: atlas-ai.au (DNS configured)

## Editing Content

### Option 1: Direct Markdown Editing (Recommended for now)

Content files are in `/content/pages/`:
- `index.md` - Landing page content (hero, services, pricing)

**To edit:**
1. Edit the markdown file
2. Run `npm run build`
3. Commit and push - Vercel auto-deploys

### Option 2: Component Editing

Landing page components are in `/components/landing/`:
- `hero.tsx` - Hero section
- `services.tsx` - Services
- `pricing.tsx` - Pricing cards
- `contact-form.tsx` - Contact form

**To edit:**
1. Edit the component file
2. Run `npm run build` to verify
3. Commit and push

### Option 3: Decap CMS (✅ Installed)

**Visual CMS for static sites** - Access at `/admin/`

**Features:**
- Visual editing interface
- Git-based workflow
- Real-time preview
- No backend required

**Setup:** See `DECAP_CMS_GUIDE.md`

**Usage:**
1. Visit https://atlas-ai.au/admin/
2. Login with GitHub
3. Edit content in visual editor
4. Save changes (auto-commits to git)
5. Vercel auto-deploys

### Option 4: TinaCMS (Advanced)

Full-featured CMS (requires moving from static export)

## Quick Deploy

```bash
# After making changes
git add .
git commit -m "content: Update landing page"
git push origin main
```

Vercel automatically deploys within 1-2 minutes.

## DNS Management

Your Cloudflare DNS is managed via MCP:
```bash
# List DNS records
mcp-cli call cloudflare-dns/list_dns_records '{}'

# Add/Update records
mcp-cli call cloudflare-dns/create_dns_record '{"type":"A","name":"@","content":"76.76.21.21","proxied":false}'
```
