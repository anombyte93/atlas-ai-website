# DNS Configuration for atlas-ai.au

## GitHub Pages URLs

- **Repository**: https://github.com/Anombyte/atlas-ai-website
- **Default URL**: https://anombyte.github.io/atlas-ai-website
- **Custom Domain**: https://atlas-ai.au (once DNS configured)

## DNS Records Required

### Option 1: Apex Domain (atlas-ai.au) - RECOMMENDED

Add these **A records** to your DNS:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Plus **CNAME** for www:

| Type | Host | Value |
|------|------|-------|
| CNAME | www | anombyte.github.io |

### Option 2: www subdomain as canonical

| Type | Host | Value |
|------|------|-------|
| CNAME | www | anombyte.github.io |

Then redirect apex to www via registrar or add A records above.

## Steps

1. **Log into your domain registrar** (where you bought atlas-ai.au)
2. **Navigate to DNS Management**
3. **Delete any existing A records** for @ (root)
4. **Add the 4 A records** above
5. **Add the CNAME record** for www
6. **Wait for propagation** (usually 5-30 minutes, up to 48 hours)

## Verify DNS

```bash
# Check A records
dig atlas-ai.au +short

# Should return:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check CNAME
dig www.atlas-ai.au +short
# Should return: anombyte.github.io
```

## After DNS Propagates

1. GitHub will detect the DNS and issue SSL certificate
2. HTTPS will be enabled automatically
3. Visit https://atlas-ai.au to verify

## Troubleshooting

- **DNS not propagating?** Try https://dnschecker.org
- **SSL not working?** Wait 10-15 minutes after DNS propagates
- **404 error?** Check CNAME file exists in repo root
