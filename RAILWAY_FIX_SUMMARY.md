# Railway 404 Fix - Root Cause and Solution

## Root Cause

The 404 error was caused by **Next.js workspace root detection** creating a nested standalone output structure.

### Issue Details:
1. Next.js detected multiple `package-lock.json` files in parent directories
2. It chose `/home/anombyte/Atlas/package-lock.json` as the workspace root
3. This caused the standalone build to create output at:
   - `.next/standalone/Atlas_Website/server.js` (nested)
   - Instead of `.next/standalone/server.js` (flat)

4. The Dockerfile tried to copy `server.js` from the wrong location
5. The container couldn't find the server file to start, resulting in 404

### Build Warning:
```
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of /home/anombyte/Atlas/package-lock.json as the root directory.
```

## Solution

### 1. Fixed `next.config.js`
Added explicit `outputFileTracingRoot` to prevent workspace confusion:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Railway
  outputFileTracingRoot: '/home/anombyte/Atlas/Atlas_Website-deploy',
  experimental: {
    serverActions: {
      allowedOrigins: ['atlas-ai.au', 'localhost:3000'],
    },
  },
}
```

### 2. Updated `Dockerfile`
Added logic to handle both nested and flat standalone structures:

```dockerfile
# Copy standalone files - handle both nested and flat structures
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./standalone-tmp

# Move files to correct location, handling nested structure
RUN if [ -f ./standalone-tmp/Atlas_Website/server.js ]; then \
      mv ./standalone-tmp/Atlas_Website/* ./ && \
      rm -rf ./standalone-tmp; \
    else \
      mv ./standalone-tmp/* ./ && \
      rmdir ./standalone-tmp; \
    fi
```

### 3. Updated `railway.toml`
Added explicit port and healthcheck configuration:

```toml
[deploy]
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ALWAYS"
startCommand = "node server.js"

[env]
NODE_ENV = "production"
PORT = "3000"
HOSTNAME = "0.0.0.0"
```

## Deployment Steps

1. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "fix: Railway 404 - Fix Next.js standalone output path"
   git push
   ```

2. **Railway will auto-deploy** - The build should now succeed

3. **Verify deployment**:
   ```bash
   railway logs --service atlas-web --lines 50
   ```

4. **Test the site**: https://atlas-web-production-e708.up.railway.app

## Expected Result

- Build succeeds without workspace warnings
- Container starts successfully with `node server.js`
- Health check passes (200 OK on `/`)
- Site loads at the Railway URL

## Files Changed

- `/home/anombyte/Atlas/Atlas_Website-deploy/next.config.js` - Added outputFileTracingRoot
- `/home/anombyte/Atlas/Atlas_Website-deploy/Dockerfile` - Added nested structure handling
- `/home/anombyte/Atlas/Atlas_Website-deploy/railway.toml` - Added port and healthcheck config

## Additional Files Created

- `.env.example` - Environment variable documentation
- `RAILWAY_SETUP.md` - Railway deployment setup guide
- `RAILWAY_FIX_SUMMARY.md` - This document
