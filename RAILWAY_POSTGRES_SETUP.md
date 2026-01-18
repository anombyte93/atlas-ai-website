# Railway PostgreSQL Setup for Atlas Website

## Current Status
✅ Railway project created: atlas-website
✅ Application deployed: https://railway.com/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748
✅ Service linked: atlas-website

## Next Steps: Add PostgreSQL Database

### Option 1: Via Railway Dashboard (Recommended)

1. **Open Railway Dashboard:**
   ```
   https://railway.com/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748
   ```

2. **Add PostgreSQL Service:**
   - Click "New Service" button
   - Select "Database" 
   - Choose "PostgreSQL"
   - Click "Add PostgreSQL"

3. **Get DATABASE_URL:**
   - Click on the newly created PostgreSQL service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` (or `POSTGRES_URL`)

4. **Set DATABASE_URL in Application:**
   - Go back to the "atlas-website" service
   - Go to "Variables" tab
   - Add `DATABASE_URL` with the value from PostgreSQL service
   - Railway automatically references it as: `${{PostgreSQL.DATABASE_URL}}`

### Option 2: Via Railway CLI (If Interactive)

```bash
cd /home/anombyte/Atlas/Atlas_Website-deploy
railway add postgresql
```

This will:
- Create a new PostgreSQL service
- Automatically set `DATABASE_URL` in your atlas-website service
- Reference it as: `${{PostgreSQL.DATABASE_URL}}`

### Option 3: Manual DATABASE_URL (Temporary)

For testing, you can use a temporary PostgreSQL connection string:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/atlas"
```

## Verify Database Connection

After adding PostgreSQL, verify it's working:

```bash
# List all variables
railway variables list

# Check DATABASE_URL specifically
railway variables get DATABASE_URL
```

## Run Migrations

Once DATABASE_URL is set, run database migrations:

```bash
cd /home/anombyte/Atlas/Atlas_Website-deploy
npm run db:push
```

## Current Variables

Your project currently has these variables set:
- RAILWAY_ENVIRONMENT: production
- RAILWAY_PROJECT_ID: ea1a49fd-91d8-4215-8fac-337e6fb7d748
- RAILWAY_SERVICE_ID: f12d17b1-af40-441d-8699-88b5853561c9

## Railway Project URL

- **Dashboard**: https://railway.com/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748
- **Service**: https://railway.com/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748/service/f12d17b1-af40-441d-8699-88b5853561c9
