# Nextcloud Domain Migration Plan

> Migration from ironbarksecure.com to atlas-ai.com

## Current State

| Aspect | Value |
|--------|-------|
| Current Domain | cloud.ironbarksecure.com |
| Target Domain | cloud.atlas-ai.com |
| Status | **INTENTIONALLY DEFERRED** |
| Reason | Minimize disruption during bootstrap |

## Why Migration is Deferred

1. **Risk Reduction**: atlas-ai.com DNS changes require careful coordination with email (Google Workspace)
2. **Validation First**: Prove Nextcloud works on temporary domain before committing
3. **No Urgency**: Internal-only system, no client visibility yet
4. **Clean Separation**: Email infrastructure (atlas-ai.com) stabilizes before adding more records

## Pre-Migration Checklist

Before executing migration, ensure:

- [ ] Google Workspace email fully operational (MX, SPF, DKIM, DMARC)
- [ ] DMARC policy at p=quarantine or higher
- [ ] Nextcloud running stable for 30+ days
- [ ] All data backed up and verified
- [ ] DNS propagation plan reviewed
- [ ] Rollback procedure tested

## Migration Steps

### Phase 1: DNS Preparation (T-7 days)

1. **Lower TTL** on ironbarksecure subdomain
   ```dns
   cloud.ironbarksecure.com.    IN    A    <IP>    ; TTL: 300 (5 min)
   ```

2. **Prepare atlas-ai.com record** (do not apply yet)
   ```dns
   cloud.atlas-ai.com.    IN    A    <SAME_IP>    ; TTL: 300
   ```

3. **Prepare TLS certificate** for cloud.atlas-ai.com
   ```bash
   # Using certbot
   certbot certonly --webroot -w /var/www/letsencrypt \
       -d cloud.atlas-ai.com
   ```

### Phase 2: Nextcloud Configuration (T-1 day)

1. **Add new domain to trusted_domains**
   ```php
   // config/config.php
   'trusted_domains' => [
       0 => 'cloud.ironbarksecure.com',
       1 => 'cloud.atlas-ai.com',  // ADD THIS
   ],
   ```

2. **Update nginx/Caddy** to accept both domains
   ```nginx
   server_name cloud.ironbarksecure.com cloud.atlas-ai.com;
   ```

3. **Test internally** with /etc/hosts override

### Phase 3: DNS Cutover (T-0)

1. **Apply DNS record** at atlas-ai.com
   ```dns
   cloud.atlas-ai.com.    IN    A    <NEXTCLOUD_IP>
   ```

2. **Wait for propagation** (5-15 minutes with low TTL)

3. **Verify access** via cloud.atlas-ai.com
   - Can log in
   - Files accessible
   - WebDAV works

### Phase 4: Client Updates (T+1 day)

1. **Update Claude MCP config** to new URL
   ```json
   {
     "nextcloud": {
       "url": "https://cloud.atlas-ai.com"
     }
   }
   ```

2. **Update desktop/mobile sync clients**

3. **Update any bookmarks/shortcuts**

### Phase 5: Redirect and Cleanup (T+7 days)

1. **Set redirect** from old domain
   ```nginx
   server {
       server_name cloud.ironbarksecure.com;
       return 301 https://cloud.atlas-ai.com$request_uri;
   }
   ```

2. **Update overwrite.cli.url** in config
   ```php
   'overwrite.cli.url' => 'https://cloud.atlas-ai.com',
   ```

3. **Remove old domain** from trusted_domains after 30 days
   ```php
   'trusted_domains' => [
       0 => 'cloud.atlas-ai.com',
       // 'cloud.ironbarksecure.com' REMOVED
   ],
   ```

4. **Raise TTL** back to normal (3600+)

## Rollback Procedure

If migration fails:

1. **Revert DNS**: Remove cloud.atlas-ai.com record
2. **Revert trusted_domains**: Remove new domain
3. **Revert MCP config**: Point back to ironbarksecure
4. **Investigate**: Check logs before retrying

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| DNS propagation delay | Medium | Low | Low TTL, patience |
| TLS certificate issue | Low | Medium | Pre-generate cert |
| Client sync broken | Medium | Medium | Document update steps |
| WebDAV URLs broken | Medium | High | Update AI config immediately |

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Nextcloud stable on ironbarksecure | +30 days | Not started |
| Email infrastructure stable | +14 days | Not started |
| Pre-migration checklist complete | TBD | Not started |
| Migration execution | TBD | **DEFERRED** |

## Decision Criteria for Proceeding

Migration should proceed when ALL of these are true:

1. ✅ Nextcloud running 30+ days without issues
2. ✅ Google Workspace email fully operational
3. ✅ DMARC at p=quarantine with clean reports
4. ✅ Backup and recovery tested
5. ✅ No critical business operations in next 48 hours

---

*Migration Plan Version: 1.0.0 | Status: DEFERRED | Last Updated: 2025-12-31*
