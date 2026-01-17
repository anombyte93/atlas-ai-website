# DNS Checklist for Atlas-AI Google Workspace

**Domain**: atlas-ai.com
**Purpose**: Configure email authentication for Google Workspace
**Last Updated**: 2025-12-31

---

## Pre-Configuration

- [ ] Access domain registrar DNS management
- [ ] Note current TTL settings (lower to 300 for faster propagation during setup)
- [ ] Have Google Admin Console open for DKIM key generation

---

## 1. MX Records (Email Routing)

Add these MX records to route email through Google:

| Priority | Host | Value |
|----------|------|-------|
| 1 | @ | ASPMX.L.GOOGLE.COM |
| 5 | @ | ALT1.ASPMX.L.GOOGLE.COM |
| 5 | @ | ALT2.ASPMX.L.GOOGLE.COM |
| 10 | @ | ALT3.ASPMX.L.GOOGLE.COM |
| 10 | @ | ALT4.ASPMX.L.GOOGLE.COM |

- [ ] All 5 MX records added
- [ ] Verified with `dig MX atlas-ai.com`

---

## 2. SPF Record (Sender Authorization)

Add this TXT record at the root (@):

```
v=spf1 include:_spf.google.com ~all
```

| Type | Host | Value |
|------|------|-------|
| TXT | @ | `v=spf1 include:_spf.google.com ~all` |

**Note**: Using `~all` (softfail) initially. Change to `-all` (hardfail) after DMARC monitoring confirms clean traffic.

- [ ] SPF record added
- [ ] Verified with `dig TXT atlas-ai.com | grep spf`

---

## 3. DKIM Record (Email Signing)

**Step 1**: Generate DKIM key in Google Admin Console
1. Go to: Apps → Google Workspace → Gmail → Authenticate email
2. Select atlas-ai.com
3. Click "Generate new record"
4. Select **2048-bit** key length
5. Copy the generated public key

**Step 2**: Add TXT record:

| Type | Host | Value |
|------|------|-------|
| TXT | google._domainkey | `v=DKIM1; k=rsa; p=<PASTE_KEY_HERE>` |

**Step 3**: Return to Admin Console and click "Start authentication"

- [ ] DKIM key generated in Admin Console
- [ ] TXT record added with key
- [ ] Authentication started in Admin Console
- [ ] Verified with `dig TXT google._domainkey.atlas-ai.com`

---

## 4. DMARC Record (Policy Enforcement)

Add this TXT record:

| Type | Host | Value |
|------|------|-------|
| TXT | _dmarc | `v=DMARC1; p=none; rua=mailto:dmarc-reports@atlas-ai.com; ruf=mailto:dmarc-forensics@atlas-ai.com; fo=1; sp=none; adkim=r; aspf=r` |

**Policy Progression** (update after 2-4 weeks of monitoring):
1. `p=none` - Monitor mode (current)
2. `p=quarantine; pct=10` - Quarantine 10%
3. `p=quarantine; pct=50` - Quarantine 50%
4. `p=quarantine` - Quarantine all
5. `p=reject` - Maximum protection

- [ ] DMARC record added
- [ ] Verified with `dig TXT _dmarc.atlas-ai.com`
- [ ] Created mailbox aliases for reports (optional but recommended)

---

## 5. Domain Verification (If Needed)

If domain not already verified:

| Type | Host | Value |
|------|------|-------|
| TXT | @ | `google-site-verification=<CODE_FROM_ADMIN>` |

- [ ] Verification TXT added (or already verified via other method)

---

## Post-Configuration Validation

Run the validation script:
```bash
./scripts/validate-dns.sh
```

External validation tools:
- [ ] [Google MX Check](https://toolbox.googleapps.com/apps/checkmx/)
- [ ] [MXToolbox](https://mxtoolbox.com/SuperTool.aspx)
- [ ] [DMARC Analyzer](https://www.dmarcanalyzer.com/)

---

## Timeline

| Day | Action |
|-----|--------|
| Day 0 | Add MX, SPF, DMARC (p=none) |
| Day 0-1 | Generate and add DKIM |
| Week 2 | Review DMARC reports |
| Week 4 | Move to p=quarantine if clean |
| Week 8 | Move to p=reject if clean |

---

## Troubleshooting

**MX records not resolving**: Wait 15-60 minutes for propagation

**DKIM failing**: Ensure no line breaks in the TXT record value

**SPF "too many lookups"**: Should not occur with Google-only setup

**DMARC reports not arriving**: Check spam folder; reports are delivered once daily

---

## Reference

Full zone template: `/home/anombyte/den/atlas-ai/infra/dns/atlas-ai.com.zone.template`
