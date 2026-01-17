#!/bin/bash
# Check DNS propagation for atlas-ai.au

echo "=== DNS Propagation Check for atlas-ai.au ==="
echo "Time: $(date)"
echo ""

echo "Google DNS:"
curl -s "https://dns.google/resolve?name=atlas-ai.au&type=A" | jq -r '.Answer[].data' 2>/dev/null | sort

echo ""
echo "Expected (GitHub IPs):"
echo "185.199.108.153"
echo "185.199.109.153"
echo "185.199.110.153"
echo "185.199.111.153"

echo ""
CURRENT=$(curl -s "https://dns.google/resolve?name=atlas-ai.au&type=A" | jq -r '.Answer[0].data' 2>/dev/null)
if [[ "$CURRENT" == "185.199."* ]]; then
    echo "✅ DNS PROPAGATED! Site should be live."
else
    echo "⏳ Still waiting... (current: $CURRENT)"
fi
