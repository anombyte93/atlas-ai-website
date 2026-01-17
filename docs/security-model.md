# Atlas-AI Security Model

> Defense-in-depth security controls and threat model

## Security Principles

1. **Least Privilege**: Every account/system has minimum required permissions
2. **Defense in Depth**: Multiple layers of controls, no single point of failure
3. **Audit Everything**: All security-relevant actions are logged
4. **Assume Breach**: Design for containment, not just prevention

## Threat Model

### Assets to Protect

| Asset | Criticality | Description |
|-------|-------------|-------------|
| admin@atlas-ai.com | CRITICAL | Full control over Google Workspace |
| atlas-ai.com DNS | HIGH | Domain reputation, email deliverability |
| Client Communications | HIGH | Business reputation, legal liability |
| Nextcloud Data | MEDIUM | Internal files, AI context |

### Threat Actors

| Actor | Capability | Motivation | Mitigation |
|-------|------------|------------|------------|
| External Attacker | Variable | Financial, data theft | MFA, email auth, firewalls |
| Compromised AI | High (if misconfigured) | N/A (unintentional) | Scope limits, approval gates |
| Phishing/Social Eng | Medium | Credential theft | Training, 2FA, DMARC |
| Insider Threat | High | Various | Audit logs, separation of duties |

### Attack Scenarios & Mitigations

#### Scenario 1: AI Account Compromise

**Attack**: Attacker gains access to atlas@atlas-ai.com credentials
**Impact**: Could send phishing emails appearing from Atlas-AI

**Mitigations**:
- OAuth tokens are session-scoped, not permanent credentials
- Gmail MCP logs all send operations locally
- atlas@ cannot access admin console
- DMARC policy will eventually block spoofed emails

#### Scenario 2: Admin Account Compromise

**Attack**: Attacker gains admin@atlas-ai.com access
**Impact**: CRITICAL - Full workspace control

**Mitigations**:
- Hardware security key required for admin@
- Admin account never used for daily operations
- Separate recovery codes stored offline
- Google Workspace alerts on admin sign-ins

#### Scenario 3: DNS Hijack

**Attack**: Attacker modifies atlas-ai.com DNS
**Impact**: Email interception, domain impersonation

**Mitigations**:
- DNS registrar account has 2FA
- CAA records limit certificate issuance
- DNSSEC enabled (if registrar supports)
- Low TTL during changes for fast recovery

## Security Controls

### Authentication Controls

| Control | Scope | Implementation |
|---------|-------|----------------|
| MFA/2FA | All accounts | Google Workspace org policy |
| Security Keys | Admin accounts | Hardware key required |
| App Passwords | AI integrations | Scoped, revocable |
| OAuth | Gmail MCP | Limited scope tokens |

### Email Security Controls

| Control | Record Type | Purpose |
|---------|-------------|---------|
| SPF | TXT @ | Authorize Google as sender |
| DKIM | TXT google._domainkey | Cryptographic email signing |
| DMARC | TXT _dmarc | Policy enforcement + reporting |
| MTA-STS | TXT _mta-sts + HTTPS | Enforce TLS for inbound |

### Network Security Controls

| Control | System | Implementation |
|---------|--------|----------------|
| HTTPS Only | Nextcloud | Let's Encrypt + HSTS |
| Firewall | Nextcloud Server | UFW allow 443, 22 only |
| Fail2ban | Nextcloud Server | Block brute force |
| VPN | Admin Access | Optional: Tailscale/WireGuard |

### Data Security Controls

| Control | System | Implementation |
|---------|--------|----------------|
| Encryption at Rest | Nextcloud | Server-side encryption |
| Encryption in Transit | All | TLS 1.2+ everywhere |
| Backup Encryption | Nextcloud | Encrypted offsite backups |
| Data Classification | Nextcloud | Folder-based ACLs |

## Account Hardening Matrix

| Account | 2FA | Security Key | Admin Console | API Access | Daily Use |
|---------|-----|--------------|---------------|------------|-----------|
| admin@atlas-ai.com | Required | Required | Full | None | NEVER |
| ops@atlas-ai.com | Required | Recommended | None | Limited | Yes |
| atlas@atlas-ai.com | Required | Optional | None | gmail.send | Automated |

## Audit & Monitoring

### What Gets Logged

| System | Log Type | Retention | Alert On |
|--------|----------|-----------|----------|
| Google Workspace | Admin audit | 6 months (default) | Admin sign-in, setting changes |
| Gmail (atlas@) | Send log | Local 90 days | Unusual volume, new recipients |
| Nextcloud | Access log | 30 days | Failed logins, bulk downloads |
| Claude Code | Tool usage | Local | Email tool calls |

### Alerting

| Event | Severity | Notification |
|-------|----------|--------------|
| Admin console login | HIGH | Email + SMS |
| Failed login (5+) | MEDIUM | Email |
| DNS change detected | HIGH | Email |
| Certificate expiry (7 days) | MEDIUM | Email |

## Incident Response

### Classification

| Severity | Description | Response Time | Example |
|----------|-------------|---------------|---------|
| P1/Critical | Active breach, data exfil | Immediate | Admin compromise |
| P2/High | Potential breach, service down | 1 hour | Unusual AI activity |
| P3/Medium | Security degradation | 4 hours | Certificate warning |
| P4/Low | Minor issue, no impact | 24 hours | Password policy reminder |

### Response Procedures

#### P1: Admin Account Compromise

1. **Contain**: Disable admin account from backup admin
2. **Preserve**: Export Google Workspace audit logs
3. **Remediate**: Reset credentials, revoke all sessions
4. **Recover**: Re-enable with new hardware key
5. **Review**: Root cause analysis, update controls

#### P2: AI Sending Spam

1. **Contain**: Revoke atlas@ OAuth tokens
2. **Preserve**: Export send logs
3. **Remediate**: Identify compromised component
4. **Recover**: Re-authorize with fresh tokens
5. **Review**: Tighten approval hooks

## Compliance Considerations

### Data Residency

- Google Workspace: Data region can be set to AU if required
- Nextcloud: Self-hosted, data location controlled

### Regulatory

- No current compliance requirements (adjust as business grows)
- Design supports future SOC2/ISO27001 if needed
- Audit logging is foundation for compliance

## Security Roadmap

| Phase | Timeline | Item |
|-------|----------|------|
| Now | Bootstrap | MFA, DMARC p=none, basic logging |
| 30 days | Harden | DMARC p=quarantine, security key for admin |
| 90 days | Mature | DMARC p=reject, formal incident response |
| Future | Scale | SIEM integration, penetration testing |

---

*Security Model Version: 1.0.0 | Review Cycle: Quarterly*
