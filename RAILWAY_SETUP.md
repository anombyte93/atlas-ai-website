# Railway Deployment Setup

## Issue: 404 Error
The 404 error occurs because the Next.js app is missing required environment variables.

## Required Environment Variables

Add these to your Railway project (Project Settings > Variables):

### Supabase Configuration (Required)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional (Rate Limiting)
```
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

## How to Add Variables in Railway:

1. Open your Railway project: https://railway.app/project/atlas-ai-website
2. Go to the **atlas-web** service
3. Click on **Variables** tab
4. Add the Supabase variables above
5. Railway will automatically redeploy

## After Adding Variables:

1. Click **Deploy Now** or wait for automatic redeploy
2. Check logs: `railway logs --service atlas-web --lines 50`
3. Visit: https://atlas-web-production-e708.up.railway.app

## Local Testing:

To test locally with Railway's environment:
```bash
# Copy variables from Railway
railway variables

# Test build locally
npm run build
npm run start
```

## Health Check:

The healthcheck is configured to hit `/` which should return 200 OK once the app starts.
