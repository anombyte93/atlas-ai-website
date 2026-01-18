#!/bin/bash
# Script to get Railway PostgreSQL DATABASE_URL

echo "Fetching DATABASE_URL from Railway..."
echo ""

# Try using Railway MCP
echo "Attempting to get DATABASE_URL via Railway API..."

# Get the service instance ID
SERVICE_INSTANCE_ID=$(cat <<'API_CALL' | curl -s "https://backboard.railway.app/graphql/v2" -H "Content-Type: application/json" -H "Authorization: Bearer 4e37a6fb-d3e3-4ba9-b1e9-c291edcf9a21" -d @- | jq -r '.data.serviceInstance.id'
{"query":"query { serviceInstance(serviceId: \"00ddc217-41c4-487f-afc4-039535e8b2ff\", environmentId: \"d6245c9f-3309-4a4e-9a94-4413d05c8f1c\") { id } }"}
API_CALL
)

echo "Service Instance ID: $SERVICE_INSTANCE_ID"
echo ""
echo "To get the DATABASE_URL:"
echo "1. Visit: https://railway.app/project/ea1a49fd-91d8-4215-8fac-337e6fb7d748"
echo "2. Select the 'Postgres' service"
echo "3. Click on 'Variables' tab"
echo "4. Copy the DATABASE_URL value"
echo ""
echo "Or use Railway CLI (if properly authenticated):"
echo "  railway connect Postgres"
echo ""
