# Atlas-AI Email Setup

> Google Workspace email configuration with AI identity boundaries

## Overview

This document explains the email identity model for Atlas-AI, including:
- Account structure and rationale
- DNS records for email authentication
- AI email automation rules
- Security policies

## Account Model

### Why This Structure?

The account model follows **separation of duties** and **least privilege**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ACCOUNT HIERARCHY                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  admin@atlas-ai.com                                      │   │
│   │  ═══════════════════                                     │   │
│   │  Role: Super Administrator                               │   │
│   │  Access: Full Google Workspace control                   │   │
│   │  Usage: Emergency/administrative ONLY                    │   │
│   │  Visibility: NEVER exposed publicly                      │   │
│   │  Authentication: 2FA + Hardware Security Key             │   │
│   │                                                          │   │
│   │  ⚠️  THIS ACCOUNT MUST NEVER:                            │   │
│   │      • Be used for daily email                           │   │
│   │      • Be shared with AI systems                         │   │
│   │      • Appear in public materials                        │   │
│   │      • Have its password stored digitally                │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  ops@atlas-ai.com                                        │   │
│   │  ════════════════                                        │   │
│   │  Role: Standard User (Operations)                        │   │
│   │  Access: Email, Drive, Calendar                          │   │
│   │  Usage: Client communications, business operations       │   │
│   │  Visibility: Public-facing (on website, cards, etc.)    │   │
│   │  Authentication: 2FA required                            │   │
│   │                                                          │   │
│   │  ✓ Human-operated for client relationships               │   │
│   │  ✓ Can be listed publicly                                │   │
│   │  ✗ No administrative privileges                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  atlas@atlas-ai.com                                      │   │
│   │  ══════════════════                                      │   │
│   │  Role: Standard User (AI/System Identity)                │   │
│   │  Access: Gmail API (send only)                           │   │
│   │  Usage: Automated notifications, AI-generated emails    │   │
│   │  Visibility: Semi-public (can appear as sender)         │   │
│   │  Authentication: 2FA + OAuth (no password login)         │   │
│   │                                                          │   │
│   │  ✓ AI systems send from this account                     │   │
│   │  ✓ All sends logged and auditable                        │   │
│   │  ✗ Cannot read inbox                                     │   │
│   │  ✗ Cannot access admin console                           │   │
│   │  ✗ Cannot create/modify users                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Account Summary Table

| Account | Role | Console Access | API Access | Public? | Daily Use |
|---------|------|----------------|------------|---------|-----------|
| admin@atlas-ai.com | Super Admin | Full | None | **NEVER** | Emergency only |
| ops@atlas-ai.com | Standard | None | Standard | Yes | Yes (human) |
| atlas@atlas-ai.com | Standard | None | gmail.send | Sender visible | Yes (AI) |

## AI Email Safety Model

### How AI Sends Email Safely

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI EMAIL FLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [Claude Code]                                                  │
│        │                                                         │
│        │ 1. Generate email (recipient, subject, body)            │
│        ▼                                                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  PRE-SEND HOOK (hooks/email-approval.sh)                 │   │
│   │  • Log email details                                     │   │
│   │  • Optional: require human approval                      │   │
│   │  • Block if recipient in denylist                        │   │
│   └─────────────────────────────────────────────────────────┘   │
│        │                                                         │
│        │ 2. If approved, proceed                                 │
│        ▼                                                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Gmail MCP Server                                        │   │
│   │  • OAuth token for atlas@atlas-ai.com                    │   │
│   │  • Scope: gmail.send ONLY (cannot read inbox)            │   │
│   │  • Logs operation to ~/.claude/logs/email/               │   │
│   └─────────────────────────────────────────────────────────┘   │
│        │                                                         │
│        │ 3. API call to Google                                   │
│        ▼                                                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Google Workspace                                        │   │
│   │  • Authenticates OAuth token                             │   │
│   │  • Sends from: atlas@atlas-ai.com                        │   │
│   │  • Applies DKIM signature                                │   │
│   │  • Google Workspace audit log records send               │   │
│   └─────────────────────────────────────────────────────────┘   │
│        │                                                         │
│        ▼                                                         │
│   [Recipient receives email from atlas@atlas-ai.com]             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### AI Email Rules

| Rule | Enforcement | Rationale |
|------|-------------|-----------|
| AI uses atlas@ only | Gmail MCP config | Separation from human accounts |
| Sends are logged | MCP + local logs | Auditability |
| Scope is gmail.send | OAuth configuration | Cannot read inbox/contacts |
| No admin access | Account permissions | Blast radius containment |
| Rate limited | Optional hook | Prevent spam |

## DNS Records for Email Authentication

**CRITICAL**: These are TEMPLATES. Do not apply without review.

### MX Records (Google Workspace)

```dns
; Mail routing to Google Workspace
; Apply these ONLY when ready to receive email via Google

atlas-ai.com.    IN    MX    1     ASPMX.L.GOOGLE.COM.
atlas-ai.com.    IN    MX    5     ALT1.ASPMX.L.GOOGLE.COM.
atlas-ai.com.    IN    MX    5     ALT2.ASPMX.L.GOOGLE.COM.
atlas-ai.com.    IN    MX    10    ALT3.ASPMX.L.GOOGLE.COM.
atlas-ai.com.    IN    MX    10    ALT4.ASPMX.L.GOOGLE.COM.
```

### SPF Record

```dns
; Sender Policy Framework
; Authorizes Google to send on behalf of atlas-ai.com
; Using ~all (softfail) initially for safety

atlas-ai.com.    IN    TXT    "v=spf1 include:_spf.google.com ~all"
```

**Explanation**:
- `include:_spf.google.com` — Google's mail servers are authorized
- `~all` — Softfail for others (use during DMARC monitoring)
- Later change to `-all` (hardfail) after DMARC confirms only Google sends

### DKIM Record

```dns
; DomainKeys Identified Mail
; SELECTOR: google (default Google Workspace selector)
; VALUE: Generated from Google Admin Console

; Steps to generate:
; 1. Google Admin → Apps → Google Workspace → Gmail
; 2. Click "Authenticate email"
; 3. Generate new record (2048-bit recommended)
; 4. Copy the TXT value below

google._domainkey.atlas-ai.com.    IN    TXT    "v=DKIM1; k=rsa; p=<GENERATED_PUBLIC_KEY>"
```

**To Generate DKIM Key**:
1. Sign in to Google Admin Console (admin@atlas-ai.com)
2. Navigate: Apps → Google Workspace → Gmail → Authenticate email
3. Select domain: atlas-ai.com
4. Click "Generate new record"
5. Choose 2048-bit key length
6. Copy the TXT record value
7. Add to DNS as shown above
8. Return to Admin Console and click "Start authentication"

### DMARC Record

```dns
; Domain-based Message Authentication, Reporting & Conformance
; Starting with p=none (monitor only) - DO NOT START WITH REJECT

_dmarc.atlas-ai.com.    IN    TXT    "v=DMARC1; p=none; rua=mailto:dmarc-reports@atlas-ai.com; ruf=mailto:dmarc-forensics@atlas-ai.com; fo=1; sp=none; adkim=r; aspf=r"
```

**Record Breakdown**:
| Tag | Value | Meaning |
|-----|-------|---------|
| v=DMARC1 | Required | DMARC version 1 |
| p=none | Monitor only | Don't reject/quarantine yet |
| rua= | Aggregate reports | Daily summary of email auth results |
| ruf= | Forensic reports | Individual failure reports |
| fo=1 | Report if DKIM or SPF fails | More detailed reporting |
| sp=none | Subdomain policy | Same as parent domain |
| adkim=r | Relaxed DKIM alignment | Domain in From: can differ slightly |
| aspf=r | Relaxed SPF alignment | Same as above |

**DMARC Progression Path**:

```
Week 0-2:   p=none             (Monitor, collect reports)
Week 3-4:   p=quarantine; pct=10  (Quarantine 10% of failures)
Week 5-6:   p=quarantine; pct=50  (Quarantine 50%)
Week 7-8:   p=quarantine; pct=100 (Quarantine all)
Week 9+:    p=reject              (Reject all failures)
```

### Optional: MTA-STS (Strict Transport Security)

```dns
; Enforce TLS for inbound email
; Requires HTTPS endpoint: https://mta-sts.atlas-ai.com/.well-known/mta-sts.txt

_mta-sts.atlas-ai.com.    IN    TXT    "v=STSv1; id=20251231"
```

## Accounts That Must NEVER Be Exposed

| Account | Risk if Exposed | Protection |
|---------|-----------------|------------|
| admin@atlas-ai.com | Total workspace compromise | Never publish, hardware 2FA |
| DKIM private key | Email spoofing | Never export from Google |
| OAuth tokens | Unauthorized API access | Rotate regularly, log usage |

## Google Workspace Security Policies

Apply these in Google Admin Console:

### Organization-Wide

1. **Enforce 2-Step Verification**: ON for all users
2. **Allowed 2SV methods**: Security key preferred, authenticator app allowed
3. **Session length**: 12 hours (force re-auth daily)
4. **Password requirements**: 12+ characters, complexity enforced

### Admin Account Specific

1. **Super Admin recovery**: Disable password recovery (use backup codes only)
2. **Suspicious login alerts**: ON
3. **Admin activity alerts**: ON
4. **Hardware security key**: REQUIRED

### AI Account (atlas@) Specific

1. **Sign-in allowed**: Via OAuth only (disable web sign-in if possible)
2. **Less secure apps**: OFF
3. **Third-party app access**: Limited to approved apps only
4. **Gmail delegation**: OFF

## Verification Checklist

After DNS changes, verify:

- [ ] MX records resolve correctly: `dig MX atlas-ai.com`
- [ ] SPF record valid: Check with `https://mxtoolbox.com/spf.aspx`
- [ ] DKIM active: Send test email, check headers for `dkim=pass`
- [ ] DMARC deployed: `dig TXT _dmarc.atlas-ai.com`
- [ ] Test email from Google Workspace reaches external recipient
- [ ] Test email headers show SPF pass, DKIM pass, DMARC pass

## Troubleshooting

### Email Not Delivering

1. Check MX records are pointing to Google
2. Verify SPF includes `_spf.google.com`
3. Check DKIM is enabled in Admin Console
4. Review DMARC reports for failures

### DMARC Reports Show Failures

1. Unknown sources sending email → Update SPF or stop that source
2. DKIM failures → Regenerate DKIM key
3. SPF failures → Check all sending services are in SPF

---

*Email Setup Version: 1.0.0 | Last Updated: 2025-12-31*

Sources:
- [Google Workspace Admin Help: Set up DKIM](https://support.google.com/a/answer/174124)
- [Google Workspace Admin Help: Add SPF record](https://support.google.com/a/answer/33786)
- [DMARC.org: Getting Started](https://dmarc.org/overview/)
