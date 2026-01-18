# Atlas-AI System Architecture

> Technical architecture for Atlas-AI business infrastructure

## Overview

Atlas-AI operates as a bootstrapped AI-assisted business requiring:
- Professional email identity (atlas-ai.com via Google Workspace)
- Internal file storage and collaboration (Nextcloud)
- AI automation with clear governance boundaries

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        ATLAS-AI INFRASTRUCTURE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  IDENTITY LAYER                          │   │
│   │                 (Google Workspace)                       │   │
│   │                                                          │   │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │   │
│   │   │   admin@    │  │    ops@     │  │   atlas@    │    │   │
│   │   │ atlas-ai.com│  │atlas-ai.com │  │atlas-ai.com │    │   │
│   │   │             │  │             │  │             │    │   │
│   │   │ Super Admin │  │  Standard   │  │   AI/Bot    │    │   │
│   │   │ Human Only  │  │    User     │  │  Identity   │    │   │
│   │   │   (2FA)     │  │   (2FA)     │  │   (2FA)     │    │   │
│   │   └─────────────┘  └─────────────┘  └─────────────┘    │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              │ SMTP/API                          │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  AI AUTOMATION LAYER                     │   │
│   │                                                          │   │
│   │   ┌─────────────────────────────────────────────────┐   │   │
│   │   │              Claude Code (MCP)                   │   │   │
│   │   │                                                  │   │   │
│   │   │  Uses: atlas@atlas-ai.com for outbound email    │   │   │
│   │   │  Via:  Gmail MCP (OAuth, logged)                │   │   │
│   │   │  Scope: gmail.send only                         │   │   │
│   │   └─────────────────────────────────────────────────┘   │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              │ Files/Archive                     │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  STORAGE LAYER                           │   │
│   │                 (Nextcloud)                              │   │
│   │                                                          │   │
│   │   Domain: cloud.ironbarksecure.com (TEMPORARY)          │   │
│   │   Future: cloud.atlas-ai.com (DEFERRED)                 │   │
│   │                                                          │   │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │   │
│   │   │  Projects/  │  │  Archive/   │  │  AI-Memory/ │    │   │
│   │   │             │  │             │  │             │    │   │
│   │   │ Active work │  │ Historical  │  │ Claude      │    │   │
│   │   │ documents   │  │ records     │  │ context     │    │   │
│   │   └─────────────┘  └─────────────┘  └─────────────┘    │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Identity Layer (Google Workspace)

**Domain**: atlas-ai.com
**Provider**: Google Workspace Business Starter (or higher)

| Account | Role | Purpose | Constraints |
|---------|------|---------|-------------|
| admin@atlas-ai.com | Super Admin | Console access, billing, security | Human-only, never scripted |
| ops@atlas-ai.com | Standard User | Business operations, client comms | Human-operated |
| atlas@atlas-ai.com | Standard User | AI/system identity | No admin, API-only sending |

**Authentication**:
- All accounts require 2FA (enforced at org level)
- admin@ requires hardware security key (recommended)
- atlas@ uses OAuth for Gmail MCP (no password exposure)

### 2. AI Automation Layer

**Tooling**: Claude Code with MCP servers

**Email Automation**:
- Sender: atlas@atlas-ai.com
- Method: Gmail MCP via OAuth
- Scope: `gmail.send` only (cannot read inbox)
- Logging: All sent emails logged locally

**Boundaries**:
- AI CANNOT access admin@ account
- AI CANNOT modify DNS or billing
- AI CANNOT create users or change permissions
- See: `docs/ai-governance.md` for complete rules

### 3. Storage Layer (Nextcloud)

**Current Domain**: cloud.ironbarksecure.com (temporary)
**Future Domain**: cloud.atlas-ai.com (deferred migration)

**Purpose**:
- Internal file storage (not public-facing)
- Project collaboration space
- AI context/memory archive

**Access Control**:
- Human accounts: Full access to Projects/, Archive/
- AI operations: Write access to AI-Memory/ only
- External sharing: Disabled by default

## Data Flow

### Outbound Email Flow

```
Claude Code ──► Gmail MCP ──► Google Workspace ──► Recipient
     │              │               │
     │              │               └── Sends from atlas@atlas-ai.com
     │              │                   with DKIM signature
     │              │
     │              └── OAuth token scoped to gmail.send
     │                  Logged in ~/.claude/logs/email/
     │
     └── Prompt includes recipient, subject, body
         All emails require explicit approval (hook)
```

### File Storage Flow

```
Claude Code ──► Nextcloud WebDAV ──► /AI-Memory/
     │                │
     │                └── HTTPS to cloud.ironbarksecure.com
     │                    Authenticated via app password
     │
     └── Context, summaries, session archives
         Auto-synced, encrypted at rest
```

## Security Boundaries

| Boundary | Inside | Outside | Enforcement |
|----------|--------|---------|-------------|
| Admin Access | Human | AI | OAuth scope limits |
| DNS/Billing | Human | AI | No API credentials |
| Email Send | AI (atlas@) | AI (admin@, ops@) | Gmail MCP config |
| File Write | AI-Memory/ | Projects/, Archive/ | Nextcloud ACLs |

## Future State (After Domain Migration)

Once atlas-ai.com domain is migrated to Nextcloud:

1. `cloud.atlas-ai.com` becomes primary Nextcloud endpoint
2. ironbarksecure subdomain deprecated
3. All file links update to new domain
4. See: `docs/nextcloud-migration-plan.md`

---

*Architecture Version: 1.0.0 | Last Updated: 2025-12-31*
