# Railway Setup Summary

## Completed Tasks

### 1. Railway Authentication
- **Status**: ✅ Complete
- **Method**: Used Railway API token via environment variable
- **Token**: Configured in `~/.config/railway/token.json`

### 2. Project Linking
- **Status**: ✅ Complete
- **Project ID**: `ea1a49fd-91d8-4215-8fac-337e6fb7d748`
- **Project Name**: `atlas-website`
- **Environment**: `production` (ID: `d6245c9f-3309-4a4e-9a94-4413d05c8f1c`)

### 3. PostgreSQL Service
- **Status**: ✅ Created
- **Service ID**: `00ddc217-41c4-487f-afc4-039535e8b2ff`
- **Service Name**: `Postgres`
- **Service Instance ID**: `f57c5385-b8e6-43b8-8f37-74033f89ce51`

### 4. DATABASE_URL Configuration
- **Status**: ✅ Configured
- **Variable Set**: `DATABASE_URL="${{Postgres.DATABASE_URL}}"`
- **Location**: Set on `atlas-website` service in Railway
- **Resolution**: Automatic at runtime in Railway environment

## Services in Project

1. **atlas-website** (ID: `f12d17b1-af40-441d-8699-88b5853561c9`)
   - Main application service
   
2. **Postgres** (ID: `00ddc217-41c4-487f-afc4-039535e8b2ff`)
   - PostgreSQL database service
   - Will auto-provision with connection URL

## Environment Variables

### Production (Railway)
The following variables are automatically configured in Railway:
- `DATABASE_URL` → Resolves to `${{Postgres.DATABASE_URL}}` at runtime
- All Railway metadata variables (project ID, service ID, etc.)

### Local Development
For local development, use one of these methods:

#### Method 1: Railway Proxy (Recommended)
```bash
# Start the proxy
railway proxy

# Use this connection string in .env.local:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/railway"
```

#### Method 2: Direct Connection
1. Visit: https://railway.app/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748
2. Select "Postgres" service
3. Go to "Variables" tab
4. Copy the `DATABASE_URL` value
5. Update `.env.local` with the actual connection string

## Next Steps

1. **Run Migrations**
   ```bash
   # With Railway proxy running
   npm run db:push
   # or
   npm run db:migrate
   ```

2. **Deploy to Railway**
   ```bash
   railway deploy
   ```

3. **Verify Deployment**
   - Check logs: `railway logs`
   - Check status: `railway status`
   - Get domain: `railway domain`

## Railway Commands Reference

```bash
# Project management
railway status                    # Check project status
railway link                      # Link current directory to project
railway logs                      # View deployment logs
railway domain                    # Get project domain URL
railway open                      # Open project in browser

# Database management
railway connect Postgres          # Connect to PostgreSQL shell
railway proxy                     # Start local proxy to Railway services
railway variables list            # List all variables
railway variables list --service Postgres    # List PostgreSQL variables

# Deployment
railway deploy                    # Deploy current directory
railway up                        # Deploy and monitor logs
```

## Important Notes

1. **CLI Authentication**: The Railway CLI requires interactive authentication for some commands. Use Railway MCP tools or API for programmatic access.

2. **Service References**: Railway uses `${{ServiceName.VARIABLE_NAME}}` syntax for service-to-service variable references.

3. **Local Development**: The `railway proxy` command creates a local tunnel to Railway services, allowing you to use Railway databases during development.

4. **Environment Variables**: Never commit `.env.local` to git. It contains sensitive credentials.

## Troubleshooting

### Railway CLI not authenticated
```bash
# Remove stale token
rm -f ~/.config/railway/token.json

# The MCP tools use a different authentication mechanism
# and should continue to work
```

### Cannot connect to database locally
```bash
# Start Railway proxy first
railway proxy

# Then in another terminal, run your app
npm run dev
```

### Database migrations fail
```bash
# Ensure DATABASE_URL is correctly set
cat .env.local | grep DATABASE_URL

# Check database connectivity
psql $DATABASE_URL -c "SELECT 1;"
```

## Project Links

- **Railway Dashboard**: https://railway.app/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748
- **PostgreSQL Service**: https://railway.app/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748/service/00ddc217-41c4-487f-afc4-039535e8b2ff
