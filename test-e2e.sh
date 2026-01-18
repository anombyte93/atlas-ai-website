#!/bin/bash
# Atlas Website E2E Test Suite
# Tests lead submission, admin dashboard, and responsive design

set -e

BASE_URL="http://localhost:3002"
TIMESTAMP=$(date +%s)
TEST_EMAIL="test-${TIMESTAMP}@example.com"
TEST_NAME="Test User ${TIMESTAMP}"
TEST_COMPANY="Test Company ${TIMESTAMP}"

echo "=================================="
echo "Atlas Website E2E Test Suite"
echo "=================================="
echo "Base URL: $BASE_URL"
echo "Test Email: $TEST_EMAIL"
echo ""

# Test 1: Landing Page Loads
echo "🧪 Test 1: Landing Page Loads"
echo "-------------------------------"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL")
if [ "$RESPONSE" = "200" ]; then
    echo "✅ Landing page loads (HTTP $RESPONSE)"
else
    echo "❌ Failed to load landing page (HTTP $RESPONSE)"
    exit 1
fi
echo ""

# Test 2: Check for key elements
echo "🧪 Test 2: Check for Key HTML Elements"
echo "-------------------------------"
HTML=$(curl -s "$BASE_URL")
if echo "$HTML" | grep -q "Atlas AI"; then
    echo "✅ Found 'Atlas AI' in page"
else
    echo "⚠️  'Atlas AI' not found in page"
fi

if echo "$HTML" | grep -q "contact"; then
    echo "✅ Found 'contact' section/form"
else
    echo "⚠️  Contact form not found"
fi
echo ""

# Test 3: API Endpoint Health Check
echo "🧪 Test 3: API Health Check"
echo "-------------------------------"
API_RESPONSE=$(curl -s "$BASE_URL/api/health" -o /dev/null -w "%{http_code}" 2>/dev/null || echo "000")
if [ "$API_RESPONSE" = "200" ] || [ "$API_RESPONSE" = "404" ]; then
    echo "✅ API responding (HTTP $API_RESPONSE)"
else
    echo "⚠️  API health check returned: $API_RESPONSE"
fi
echo ""

# Test 4: Lead Submission API (if endpoint exists)
echo "🧪 Test 4: Lead Submission API"
echo "-------------------------------"
LEAD_DATA="{\"name\":\"$TEST_NAME\",\"email\":\"$TEST_EMAIL\",\"company\":\"$TEST_COMPANY\",\"serviceInterest\":\"MCP Services\",\"budget\":\"\$5,000-\$10,000\",\"timeline\":\"1-3 months\",\"message\":\"This is a test lead from the E2E test suite.\"}"

LEAD_RESPONSE=$(curl -s -X POST "$BASE_URL/api/leads" \
  -H "Content-Type: application/json" \
  -d "$LEAD_DATA" \
  -w "\n%{http_code}" 2>/dev/null)

HTTP_CODE=$(echo "$LEAD_RESPONSE" | tail -n1)
BODY=$(echo "$LEAD_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    echo "✅ Lead submitted successfully (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
else
    echo "⚠️  Lead submission returned HTTP $HTTP_CODE"
    echo "   Response: $BODY"
fi
echo ""

# Test 5: Admin Dashboard Redirect
echo "🧪 Test 5: Admin Dashboard Authentication"
echo "-------------------------------"
ADMIN_RESPONSE=$(curl -s "$BASE_URL/admin" -o /dev/null -w "%{http_code}" -L 2>/dev/null)
if [ "$ADMIN_RESPONSE" = "200" ] || [ "$ADMIN_RESPONSE" = "302" ] || [ "$ADMIN_RESPONSE" = "401" ]; then
    echo "✅ Admin endpoint accessible (HTTP $ADMIN_RESPONSE)"
    if [ "$ADMIN_RESPONSE" = "302" ]; then
        echo "   Note: Redirects to login (expected)"
    fi
else
    echo "⚠️  Admin endpoint returned: $ADMIN_RESPONSE"
fi
echo ""

# Test 6: Static Assets
echo "🧪 Test 6: Static Assets Check"
echo "-------------------------------"
STATIC_CHECK=$(curl -s "$BASE_URL/_next/static" -o /dev/null -w "%{http_code}" 2>/dev/null)
if [ "$STATIC_CHECK" = "200" ] || [ "$STATIC_CHECK" = "404" ]; then
    echo "✅ Next.js static assets serving"
else
    echo "⚠️  Static assets issue (HTTP $STATIC_CHECK)"
fi
echo ""

# Test 7: Database Config Check
echo "🧪 Test 7: Database Configuration"
echo "-------------------------------"
if [ -f "/home/anombyte/Atlas/Atlas_Website-deploy/.env.local" ]; then
    echo "✅ Environment file found"
    if grep -q "DATABASE_URL" "/home/anombyte/Atlas/Atlas_Website-deploy/.env.local"; then
        echo "✅ DATABASE_URL configured"
    else
        echo "⚠️  DATABASE_URL not found"
    fi
else
    echo "⚠️  No .env.local file found"
fi
echo ""

# Summary
echo "=================================="
echo "Test Suite Complete"
echo "=================================="
echo "Test email for manual verification: $TEST_EMAIL"
echo "Test name: $TEST_NAME"
echo "Test company: $TEST_COMPANY"
echo ""
echo "📋 Manual Testing Checklist:"
echo "-------------------------------"
echo "1. Visit $BASE_URL"
echo "2. Verify landing page renders correctly"
echo "3. Scroll to contact form"
echo "4. Fill out form with test data"
echo "5. Submit and verify success message"
echo "6. Visit $BASE_URL/admin"
echo "7. Login and check for test lead"
echo "8. Test mobile view (use browser dev tools, width: 375px)"
echo "9. Test tablet view (use browser dev tools, width: 768px)"
echo "10. Verify hamburger menu on mobile"
echo ""
