#!/bin/bash

echo "====================================="
echo "Atlas Website Database Verification"
echo "====================================="
echo ""

# Database connection string
DB_URL="postgresql://postgres@localhost:5432/atlas_website"

echo "1. Testing database connection..."
if psql "$DB_URL" -c "SELECT 1 as test;" > /dev/null 2>&1; then
    echo "   ✅ Database connection successful"
else
    echo "   ❌ Database connection failed"
    exit 1
fi

echo ""
echo "2. Checking table count..."
TABLE_COUNT=$(psql "$DB_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';")
if [ "$TABLE_COUNT" -eq 5 ]; then
    echo "   ✅ All 5 tables created"
else
    echo "   ⚠️  Expected 5 tables, found $TABLE_COUNT"
fi

echo ""
echo "3. Listing all tables..."
psql "$DB_URL" -c "\dt" | tail -n +4 | head -n -2

echo ""
echo "4. Checking table schemas..."
for table in activity_logs admin_users leads portfolio_projects services; do
    echo "   📋 $table:"
    psql "$DB_URL" -c "\d $table" | tail -n +4 | head -n -2 | sed 's/^/      /'
    echo ""
done

echo "5. Testing sample query..."
echo "   Running: SELECT COUNT(*) FROM leads;"
LEAD_COUNT=$(psql "$DB_URL" -t -c "SELECT COUNT(*) FROM leads;")
echo "   Result: $LEAD_COUNT leads in database"

echo ""
echo "====================================="
echo "Verification Complete!"
echo "====================================="
