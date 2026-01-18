# Atlas-AI Operations Runbook

> All infrastructure actions are logged here for auditability.

## Runbook Purpose

This document serves as the authoritative record of all operational actions taken during Atlas-AI infrastructure bootstrap. Every action includes timestamp, rationale, and verification steps.

---

## Action Log

### 2025-12-31 — Initial Bootstrap

#### Action 001: Project Structure Creation

**Timestamp**: 2025-12-31T14:10:00+08:00
**Actor**: Claude-Code (DevOps/Security Engineer role)
**Action**: Created atlas-ai/ project scaffold

```
atlas-ai/
├── CLAUDE.md              # Project context
├── docs/                  # All documentation
│   ├── architecture.md
│   ├── security-model.md
│   ├── ops-runbook.md     # This file
│   ├── email-setup.md
│   ├── nextcloud-architecture.md
│   ├── nextcloud-migration-plan.md
│   ├── ai-governance.md
│   └── executive-summary.md
├── infra/
│   ├── email/             # Email DNS templates
│   ├── dns/               # DNS zone templates
│   └── nextcloud/         # Nextcloud configs
├── scripts/               # Operational scripts
├── state/                 # State tracking files
└── tests/                 # Validation tests
```

**Rationale**: Clean separation of concerns. Documentation-first approach ensures auditability. Infrastructure templates kept separate from applied state.

**Verification**: `ls -la /home/anombyte/den/atlas-ai/`

---

#### Action 002: Documentation Generation

**Timestamp**: 2025-12-31T14:15:00+08:00
**Actor**: Claude-Code
**Action**: Generated all required documentation files

**Files Created**:
1. `docs/architecture.md` — System architecture overview
2. `docs/security-model.md` — Security controls and threat model
3. `docs/email-setup.md` — Google Workspace email configuration
4. `docs/nextcloud-architecture.md` — Nextcloud internal system design
5. `docs/nextcloud-migration-plan.md` — Future domain migration steps
6. `docs/ai-governance.md` — AI automation boundaries and rules
7. `docs/executive-summary.md` — Status summary for stakeholders

**Rationale**: Complete documentation before any infrastructure changes ensures understanding and reviewability.

---

#### Action 003: DNS Template Generation

**Timestamp**: 2025-12-31T14:20:00+08:00
**Actor**: Claude-Code
**Action**: Created DNS record templates (NOT APPLIED)

**Templates Created**:
- `infra/dns/atlas-ai.com.zone.template`
- `infra/email/google-workspace-dns.md`

**CRITICAL**: These are TEMPLATES only. No DNS changes have been made.

**Rationale**: DNS templates allow review before application. Prevents accidental domain disruption.

---

## Pending Actions

| ID | Action | Status | Blocker |
|----|--------|--------|---------|
| P001 | Apply MX records to atlas-ai.com | STAGED | Requires human approval |
| P002 | Generate DKIM key in Google Admin | STAGED | Requires admin console access |
| P003 | Deploy Nextcloud on ironbarksecure | STAGED | Requires server provisioning |
| P004 | Domain migration to atlas-ai.com | DEFERRED | Intentionally postponed |

---

## Emergency Procedures

### Rollback: Email DNS

If email stops working after DNS changes:

1. Revert MX records to previous values
2. TTL should be set low (300s) during changes for fast rollback
3. Contact: admin@atlas-ai.com (requires backup access method)

### Rollback: Nextcloud

1. Nextcloud runs on ironbarksecure (temporary)
2. Data is isolated from atlas-ai.com domain
3. No interdependency with email system

---

## Change Control

All changes to production infrastructure require:

1. Entry in this runbook BEFORE the change
2. Clear rollback procedure documented
3. Verification steps defined
4. Human approval for DNS/identity changes

---

*This runbook is append-only. Never delete entries.*
