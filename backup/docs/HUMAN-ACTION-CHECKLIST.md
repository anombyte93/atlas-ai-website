# Human Action Checklist for Atlas-AI Setup

> **Purpose**: Batch ALL manual steps required for Atlas-AI email and Google Workspace setup.
> Claude cannot perform these actions - they require human browser/admin access.

---

## Pre-requisites

- [ ] **Purchase Google Workspace subscription** for atlas-ai.com
  - Go to: https://workspace.google.com/
  - Plan: Business Starter ($6/user/month) is sufficient
  - Use personal email for initial purchase verification

---

## Step 1: Account Creation (Google Admin Console)

**Location**: https://admin.google.com → Directory → Users → Add new user

### 1.1 Create Super Admin Account
- [ ] Create user: `admin@atlas-ai.com`
- [ ] Role: **Super Administrator**
- [ ] Set temporary password (change immediately on first login)
- [ ] Record recovery options (backup email, phone) in secure location

### 1.2 Create Operations Account
- [ ] Create user: `ops@atlas-ai.com`
- [ ] Role: **Standard User** (no admin privileges)
- [ ] Groups: None initially
- [ ] This account is for daily business email

### 1.3 Create AI Identity Account
- [ ] Create user: `atlas@atlas-ai.com`
- [ ] Role: **Standard User** (no admin privileges)
- [ ] Purpose: AI automation sends from this account
- [ ] Groups: None initially

---

## Step 2: Security Configuration (Google Admin Console)

**Location**: https://admin.google.com → Security

### 2.1 Enforce 2-Step Verification
- [ ] Navigate: Security → 2-Step Verification
- [ ] Set enforcement: **ON for all users**
- [ ] New user enrollment period: **1 week**
- [ ] Methods allowed: Security key, Google Authenticator, SMS backup

### 2.2 Password Policies
- [ ] Navigate: Security → Password management
- [ ] Minimum length: **12 characters**
- [ ] Enforce password strength: **ON**
- [ ] Password expiration: **Never** (2FA is better security)
- [ ] Allow password reuse: **OFF**

### 2.3 Admin Account Hardening
- [ ] Login to admin@atlas-ai.com
- [ ] Add hardware security key (e.g., YubiKey) - **STRONGLY RECOMMENDED**
- [ ] Generate and store backup codes offline (paper, safe)
- [ ] Set recovery email to personal email (NOT @atlas-ai.com)

### 2.4 AI Account Configuration
- [ ] Login to atlas@atlas-ai.com once to verify account works
- [ ] Note: OAuth will be primary auth method; web login rarely needed

---

## Step 3: DKIM Generation (Google Admin Console)

**Location**: https://admin.google.com → Apps → Google Workspace → Gmail → Authenticate email

### 3.1 Generate DKIM Key
- [ ] Navigate: Apps → Google Workspace → Gmail
- [ ] Click: **Authenticate email**
- [ ] Select domain: `atlas-ai.com`
- [ ] Click: **Generate new record**
- [ ] Key length: **2048-bit** (recommended)
- [ ] Selector prefix: `google` (default is fine)

### 3.2 Copy DKIM Record
- [ ] Copy the **TXT record hostname**: `google._domainkey.atlas-ai.com`
- [ ] Copy the **TXT record value**: `v=DKIM1; k=rsa; p=MIIBIjANBgkq...` (long key)
- [ ] **SAVE THIS VALUE** - you'll need it for DNS in Step 4

### 3.3 Do NOT Click "Start Authentication" Yet
- [ ] Leave this page open or save the values
- [ ] Must add DNS record FIRST, then return to click "Start authentication"

---

## Step 4: DNS Records (Domain Registrar)

**Location**: Your domain registrar's DNS management (where you purchased atlas-ai.com)

### 4.1 Add MX Records (Email Routing)

| Type | Host | Priority | Value | TTL |
|------|------|----------|-------|-----|
| - [ ] MX | @ | 1 | `ASPMX.L.GOOGLE.COM` | 3600 |
| - [ ] MX | @ | 5 | `ALT1.ASPMX.L.GOOGLE.COM` | 3600 |
| - [ ] MX | @ | 5 | `ALT2.ASPMX.L.GOOGLE.COM` | 3600 |
| - [ ] MX | @ | 10 | `ALT3.ASPMX.L.GOOGLE.COM` | 3600 |
| - [ ] MX | @ | 10 | `ALT4.ASPMX.L.GOOGLE.COM` | 3600 |

### 4.2 Add SPF Record (Sender Authorization)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| - [ ] TXT | @ | `v=spf1 include:_spf.google.com ~all` | 3600 |

### 4.3 Add DKIM Record (Email Signing)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| - [ ] TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=<KEY_FROM_STEP_3>` | 3600 |

**Note**: Use the exact value from Step 3.2. It will be very long (300+ characters).

### 4.4 Add DMARC Record (Policy & Reporting)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| - [ ] TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc-reports@atlas-ai.com; fo=1` | 3600 |

**Note**: Starting with `p=none` (monitor only). Will tighten to `p=reject` after 2-4 weeks.

---

## Step 5: Activate DKIM (Google Admin Console)

**Location**: Back to https://admin.google.com → Apps → Google Workspace → Gmail → Authenticate email

- [ ] Wait 5-10 minutes after adding DNS records
- [ ] Return to the DKIM page from Step 3
- [ ] Click: **Start authentication**
- [ ] Status should change to: **Authenticating email** (green checkmark)

---

## Step 6: Gmail MCP OAuth Setup (Google Cloud Console)

**Location**: https://console.cloud.google.com/

### 6.1 Create Project
- [ ] Go to: https://console.cloud.google.com/
- [ ] Create new project: `atlas-ai-mcp` (or similar)
- [ ] Note the Project ID

### 6.2 Enable Gmail API
- [ ] Navigate: APIs & Services → Library
- [ ] Search: **Gmail API**
- [ ] Click: **Enable**

### 6.3 Configure OAuth Consent Screen
- [ ] Navigate: APIs & Services → OAuth consent screen
- [ ] User type: **Internal** (only atlas-ai.com users)
- [ ] App name: `Atlas AI MCP`
- [ ] User support email: `ops@atlas-ai.com`
- [ ] Developer contact: `ops@atlas-ai.com`
- [ ] Scopes: Add `https://www.googleapis.com/auth/gmail.send`
- [ ] Save

### 6.4 Create OAuth Credentials
- [ ] Navigate: APIs & Services → Credentials
- [ ] Click: **Create Credentials** → **OAuth client ID**
- [ ] Application type: **Desktop app** (for CLI/MCP use)
- [ ] Name: `Claude Gmail MCP`
- [ ] Click: **Create**
- [ ] Download JSON file

### 6.5 Save Credentials
- [ ] Save downloaded JSON to: `~/.config/gmail-mcp/credentials.json`
- [ ] Secure permissions: `chmod 600 ~/.config/gmail-mcp/credentials.json`

### 6.6 First-Time OAuth Authorization
- [ ] Run Gmail MCP tool once to trigger OAuth flow
- [ ] Browser will open for Google sign-in
- [ ] Sign in as: `atlas@atlas-ai.com`
- [ ] Grant permissions (gmail.send scope)
- [ ] Token will be saved locally

---

## Verification Checklist

### DNS Verification (Run in Terminal)
- [ ] MX records: `dig MX atlas-ai.com +short`
  - Should show 5 Google mail servers
- [ ] SPF record: `dig TXT atlas-ai.com +short`
  - Should include `_spf.google.com`
- [ ] DKIM record: `dig TXT google._domainkey.atlas-ai.com +short`
  - Should show DKIM key
- [ ] DMARC record: `dig TXT _dmarc.atlas-ai.com +short`
  - Should show `v=DMARC1`

### Email Delivery Test
- [ ] Send test email from ops@atlas-ai.com to personal Gmail
- [ ] Check email headers for:
  - `spf=pass`
  - `dkim=pass`
  - `dmarc=pass`

### Gmail MCP Test
- [ ] Verify Gmail MCP can send email
- [ ] Check that sent email shows `From: atlas@atlas-ai.com`

---

## Summary

| Step | Items | Estimated Time |
|------|-------|----------------|
| Pre-requisites | 1 | 5 min |
| Account Creation | 3 | 10 min |
| Security Config | 8 | 15 min |
| DKIM Generation | 3 | 5 min |
| DNS Records | 9 | 15 min |
| Activate DKIM | 1 | 2 min |
| Gmail MCP OAuth | 7 | 20 min |
| Verification | 6 | 10 min |
| **TOTAL** | **38** | **~80 min** |

---

## Post-Setup Actions (Claude Can Help With)

Once the above is complete, Claude can assist with:
- [ ] Creating DMARC report email group
- [ ] Setting up email forwarding rules
- [ ] Testing Gmail MCP integration
- [ ] Tightening DMARC policy after monitoring period

---

*Checklist Version: 1.0.0 | Created: 2025-12-31*
