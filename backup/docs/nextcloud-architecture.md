# Nextcloud Architecture

> Internal file storage system for Atlas-AI

## Overview

Nextcloud serves as the **internal-only** file storage and collaboration platform for Atlas-AI. It is NOT a public-facing service.

**Current Domain**: cloud.ironbarksecure.com (TEMPORARY)
**Future Domain**: cloud.atlas-ai.com (DEFERRED - see migration plan)

## Purpose

### Primary Use Cases

| Use Case | Description | Access Level |
|----------|-------------|--------------|
| Internal Files | Business documents, contracts, invoices | Human (full) |
| Project Work | Active project files, client deliverables | Human (full) |
| AI Memory/Archive | Claude context, session summaries, learnings | AI (write), Human (read) |
| Backups | Encrypted copies of critical data | Human (admin only) |

### What Nextcloud is NOT For

- ❌ Public file sharing (use signed URLs sparingly)
- ❌ Email hosting (handled by Google Workspace)
- ❌ Client-facing portal (future consideration)
- ❌ Real-time collaboration with external parties

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    NEXTCLOUD DEPLOYMENT                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  ENTRY POINT                                             │   │
│   │  https://cloud.ironbarksecure.com                        │   │
│   │                                                          │   │
│   │  • HTTPS only (HTTP redirects to HTTPS)                  │   │
│   │  • Let's Encrypt certificate (auto-renew)                │   │
│   │  • HSTS enabled                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  REVERSE PROXY (nginx/Caddy)                             │   │
│   │                                                          │   │
│   │  • TLS termination                                       │   │
│   │  • Rate limiting                                         │   │
│   │  • IP allowlisting (optional)                            │   │
│   │  • Security headers                                      │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  NEXTCLOUD APPLICATION                                   │   │
│   │                                                          │   │
│   │  Version: Latest stable (29.x+)                          │   │
│   │  PHP: 8.2+                                               │   │
│   │  Database: PostgreSQL (or MariaDB)                       │   │
│   │                                                          │   │
│   │  ┌─────────────────────────────────────────────────┐    │   │
│   │  │ Enabled Apps:                                    │    │   │
│   │  │ • Files (core)                                   │    │   │
│   │  │ • Text (markdown editing)                        │    │   │
│   │  │ • Files Access Control                           │    │   │
│   │  │ • Brute-force settings                           │    │   │
│   │  │ • Two-Factor TOTP                                │    │   │
│   │  └─────────────────────────────────────────────────┘    │   │
│   │                                                          │   │
│   │  ┌─────────────────────────────────────────────────┐    │   │
│   │  │ Disabled/Not Installed:                          │    │   │
│   │  │ • Federation (no external sharing)               │    │   │
│   │  │ • Social apps                                    │    │   │
│   │  │ • Preview generators (security concern)          │    │   │
│   │  └─────────────────────────────────────────────────┘    │   │
│   │                                                          │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  DATA STORAGE                                            │   │
│   │                                                          │   │
│   │  Location: /var/nextcloud/data (OUTSIDE web root)        │   │
│   │  Encryption: Server-side encryption enabled              │   │
│   │  Backup: Daily encrypted backup to offsite               │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Folder Structure

```
/
├── Projects/                    # Active work
│   ├── Client-A/
│   ├── Client-B/
│   └── Internal/
│
├── Archive/                     # Historical records
│   ├── 2024/
│   └── 2025/
│
├── AI-Memory/                   # AI-managed content
│   ├── Context/                 # Session context snapshots
│   ├── Summaries/               # Conversation summaries
│   ├── Learnings/               # Patterns and insights
│   └── Checkpoints/             # Resume points
│
├── Templates/                   # Document templates
│   ├── Contracts/
│   ├── Proposals/
│   └── Reports/
│
└── Admin/                       # Administrative files
    ├── Backups/                 # Config backups (encrypted)
    └── Logs/                    # Access logs (retention: 30d)
```

## User Roles & Permissions

### Role Matrix

| User/Group | Projects/ | Archive/ | AI-Memory/ | Admin/ |
|------------|-----------|----------|------------|--------|
| admin | Full | Full | Full | Full |
| ops (human) | Full | Read | Read | None |
| atlas (AI) | None | None | Write | None |
| guest | None | None | None | None |

### User Accounts

| Account | Type | Purpose | 2FA |
|---------|------|---------|-----|
| admin | Human | Full administration | Required |
| ops | Human | Daily file access | Required |
| atlas | System | AI write access to AI-Memory/ | App password |

### AI Access Model

The `atlas` user is a **system account** for AI automation:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI ACCESS FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   [Claude Code]                                                  │
│        │                                                         │
│        │ WebDAV request to /AI-Memory/                           │
│        ▼                                                         │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Nextcloud WebDAV Endpoint                               │   │
│   │  https://cloud.ironbarksecure.com/remote.php/dav/files/  │   │
│   │                                                          │   │
│   │  Authentication: atlas:app-password                      │   │
│   │  Scope: /AI-Memory/* (write)                             │   │
│   │         Other folders: DENIED                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│        │                                                         │
│        ▼                                                         │
│   [Files stored encrypted at rest]                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Security Configuration

### Server Hardening

Based on [Nextcloud Security Best Practices](https://docs.nextcloud.com/server/stable/admin_manual/installation/harden_server.html):

```php
// config/config.php security settings

// Data outside web root
'datadirectory' => '/var/nextcloud/data',

// Debug MUST be false in production
'debug' => false,

// Disable preview generation (security)
'enable_previews' => false,

// Trusted domains (strict)
'trusted_domains' => [
    0 => 'cloud.ironbarksecure.com',
    // 1 => 'cloud.atlas-ai.com',  // Add after migration
],

// Force HTTPS
'overwrite.cli.url' => 'https://cloud.ironbarksecure.com',
'overwriteprotocol' => 'https',

// Session security
'session_lifetime' => 3600,  // 1 hour
'session_keepalive' => true,
'token_auth_enforced' => true,

// Brute force protection
'auth.bruteforce.protection.enabled' => true,

// Restrict admin access by IP (optional)
// 'allowed_admin_ranges' => ['192.168.1.0/24', '10.0.0.0/8'],

// Logging
'log_type' => 'file',
'logfile' => '/var/log/nextcloud/nextcloud.log',
'loglevel' => 2,  // Warning and above
'logdateformat' => 'Y-m-d H:i:s',
```

### Nginx Security Headers

```nginx
# /etc/nginx/sites-available/nextcloud

server {
    listen 443 ssl http2;
    server_name cloud.ironbarksecure.com;

    # TLS configuration (Mozilla Modern)
    ssl_certificate /etc/letsencrypt/live/cloud.ironbarksecure.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cloud.ironbarksecure.com/privkey.pem;
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Robots-Tag "noindex, nofollow" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # CSP (adjust as needed for Nextcloud apps)
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'self'" always;

    # Disable compression (BREACH attack mitigation)
    gzip off;

    # ... rest of Nextcloud config
}
```

### Fail2ban Integration

```ini
# /etc/fail2ban/filter.d/nextcloud.conf
[Definition]
failregex = ^{"reqId":".*","level":2,"time":".*","remoteAddr":"<HOST>","user":".*","app":"core","method":".*","message":"Login failed:.*$
            ^{"reqId":".*","level":2,"time":".*","remoteAddr":"<HOST>","user":".*","app":"core","method":".*","message":"Trusted domain error.*$
ignoreregex =
```

```ini
# /etc/fail2ban/jail.d/nextcloud.conf
[nextcloud]
enabled = true
port = 80,443
protocol = tcp
filter = nextcloud
maxretry = 5
findtime = 600
bantime = 1800
logpath = /var/log/nextcloud/nextcloud.log
```

### Encryption Configuration

```php
// Server-side encryption
// Enable in Admin → Security

// Keys stored: /var/nextcloud/data/files_encryption/
// Master key mode (recommended for single-admin setup)
// Per-user keys not used (simplifies recovery)
```

## Backup Strategy

### What Gets Backed Up

| Component | Method | Frequency | Retention |
|-----------|--------|-----------|-----------|
| Files (data/) | Incremental | Daily | 30 days |
| Database | pg_dump | Daily | 14 days |
| Config | Copy | Daily | 7 days |
| Encryption keys | Secure copy | Daily | Indefinite |

### Backup Script Location

```
/home/anombyte/den/atlas-ai/scripts/nextcloud-backup.sh
```

### Recovery Procedure

1. Restore database from dump
2. Restore data directory
3. Restore config.php
4. Restore encryption keys
5. Run `occ maintenance:repair`
6. Run `occ files:scan --all`

## Monitoring

### Health Checks

| Check | Method | Frequency | Alert |
|-------|--------|-----------|-------|
| HTTPS reachable | curl status page | 1 min | Yes |
| Disk space | df | 5 min | >80% |
| Certificate expiry | openssl | Daily | <14 days |
| Login failures | fail2ban | Continuous | >5 |

### Status Page

Nextcloud provides a status endpoint:
```
https://cloud.ironbarksecure.com/status.php
```

Returns JSON with installation status, version, etc.

## Operational Procedures

### Adding a New User

1. Log in as admin
2. Users → Add user
3. Set username, email, group membership
4. Enable 2FA requirement
5. Send password reset link

### Rotating AI App Password

1. Log in as atlas user (or admin)
2. Settings → Security → App passwords
3. Revoke old app password
4. Generate new app password
5. Update Claude MCP configuration
6. Verify AI can still write to AI-Memory/

### Emergency: Lock Down System

1. Enable maintenance mode: `occ maintenance:mode --on`
2. Review logs: `/var/log/nextcloud/nextcloud.log`
3. Block IPs if needed: fail2ban or firewall
4. Disable maintenance: `occ maintenance:mode --off`

---

*Nextcloud Architecture Version: 1.0.0 | Last Updated: 2025-12-31*

Sources:
- [Nextcloud Hardening Guide](https://docs.nextcloud.com/server/stable/admin_manual/installation/harden_server.html)
- [Nextcloud Security Best Practices](https://contabo.com/blog/nextcloud-security-hardening-guide/)
