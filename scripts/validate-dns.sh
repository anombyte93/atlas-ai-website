#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════
# validate-dns.sh - DNS Record Validator for Atlas-AI Google Workspace
# ═══════════════════════════════════════════════════════════════════════════
#
# PURPOSE: Check current DNS records for atlas-ai.com
# USAGE: ./validate-dns.sh [--verbose]
#
# ═══════════════════════════════════════════════════════════════════════════

set -euo pipefail

DOMAIN="atlas-ai.com"
VERBOSE="${1:-}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  DNS VALIDATION: ${DOMAIN}${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"
}

check_record() {
    local type="$1"
    local name="$2"
    local expected="$3"
    local description="$4"

    echo -e "${YELLOW}▶ Checking ${type} record: ${name}${NC}"
    echo -e "  Expected: ${expected}"

    local result
    if [[ "$name" == "@" ]]; then
        result=$(dig +short "${type}" "${DOMAIN}" 2>/dev/null || echo "NXDOMAIN")
    else
        result=$(dig +short "${type}" "${name}.${DOMAIN}" 2>/dev/null || echo "NXDOMAIN")
    fi

    if [[ -z "$result" || "$result" == "NXDOMAIN" ]]; then
        echo -e "  ${RED}✗ NOT FOUND${NC}"
        return 1
    else
        echo -e "  Found: ${result}"
        echo -e "  ${GREEN}✓ RECORD EXISTS${NC}"
        return 0
    fi
}

check_mx() {
    echo -e "\n${YELLOW}═══ MX RECORDS (Google Workspace) ═══${NC}"

    local mx_records
    mx_records=$(dig +short MX "${DOMAIN}" 2>/dev/null | sort)

    if [[ -z "$mx_records" ]]; then
        echo -e "${RED}✗ No MX records found${NC}"
        return 1
    fi

    echo "Found MX records:"
    echo "$mx_records" | while read -r line; do
        echo "  $line"
    done

    # Check for Google MX
    if echo "$mx_records" | grep -qi "google"; then
        echo -e "${GREEN}✓ Google MX records detected${NC}"
    else
        echo -e "${YELLOW}⚠ Google MX records not found - may need configuration${NC}"
    fi
}

check_spf() {
    echo -e "\n${YELLOW}═══ SPF RECORD ═══${NC}"

    local spf
    spf=$(dig +short TXT "${DOMAIN}" 2>/dev/null | grep "v=spf1" || echo "")

    if [[ -z "$spf" ]]; then
        echo -e "${RED}✗ No SPF record found${NC}"
        echo "  Expected: \"v=spf1 include:_spf.google.com ~all\""
        return 1
    fi

    echo "Found: $spf"

    if echo "$spf" | grep -q "_spf.google.com"; then
        echo -e "${GREEN}✓ Google SPF include present${NC}"
    else
        echo -e "${YELLOW}⚠ Google SPF include missing${NC}"
    fi
}

check_dkim() {
    echo -e "\n${YELLOW}═══ DKIM RECORD ═══${NC}"

    local dkim
    dkim=$(dig +short TXT "google._domainkey.${DOMAIN}" 2>/dev/null || echo "")

    if [[ -z "$dkim" ]]; then
        echo -e "${YELLOW}⚠ DKIM record not found${NC}"
        echo "  Note: Generate key in Google Admin Console first"
        echo "  Path: Apps → Google Workspace → Gmail → Authenticate email"
        return 1
    fi

    echo "Found DKIM at google._domainkey.${DOMAIN}"
    if [[ "$VERBOSE" == "--verbose" ]]; then
        echo "$dkim"
    fi
    echo -e "${GREEN}✓ DKIM record exists${NC}"
}

check_dmarc() {
    echo -e "\n${YELLOW}═══ DMARC RECORD ═══${NC}"

    local dmarc
    dmarc=$(dig +short TXT "_dmarc.${DOMAIN}" 2>/dev/null || echo "")

    if [[ -z "$dmarc" ]]; then
        echo -e "${RED}✗ No DMARC record found${NC}"
        echo "  Expected: \"v=DMARC1; p=none; ...\""
        return 1
    fi

    echo "Found: $dmarc"

    # Check policy
    if echo "$dmarc" | grep -q "p=none"; then
        echo -e "${YELLOW}⚠ DMARC policy is 'none' (monitor mode)${NC}"
    elif echo "$dmarc" | grep -q "p=quarantine"; then
        echo -e "${GREEN}✓ DMARC policy is 'quarantine'${NC}"
    elif echo "$dmarc" | grep -q "p=reject"; then
        echo -e "${GREEN}✓ DMARC policy is 'reject' (maximum protection)${NC}"
    fi
}

check_domain_verification() {
    echo -e "\n${YELLOW}═══ GOOGLE SITE VERIFICATION ═══${NC}"

    local verify
    verify=$(dig +short TXT "${DOMAIN}" 2>/dev/null | grep "google-site-verification" || echo "")

    if [[ -z "$verify" ]]; then
        echo -e "${YELLOW}⚠ No Google site verification record found${NC}"
        echo "  Note: May already be verified via another method"
    else
        echo "Found: $verify"
        echo -e "${GREEN}✓ Domain verification record present${NC}"
    fi
}

summary() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  SUMMARY${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Run this script after each DNS change to verify propagation."
    echo "DNS changes can take 15-60 minutes to propagate globally."
    echo ""
    echo "Test propagation at: https://toolbox.googleapps.com/apps/checkmx/"
    echo ""
}

# Main
print_header
check_mx
check_spf
check_dkim
check_dmarc
check_domain_verification
summary
