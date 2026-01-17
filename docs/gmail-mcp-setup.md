# Gmail MCP Setup for Atlas-AI

> OAuth configuration for atlas@atlas-ai.com automated email sending

## Current Status

### MCP Server Configuration

The Gmail MCP is configured in `~/.claude.json`:

```json
"gmail": {
  "type": "stdio",
  "command": "node",
  "args": [
    "/home/anombyte/.claude/mcp-daemons/mcp-sse-client.js",
    "--url", "http://localhost:8226",
    "--name", "gmail"
  ],
  "env": {
    "GMAIL_CONFIG_DIR": "/home/anombyte/.gmail-mcp"
  }
}
```

**Note**: Gmail MCP is currently **disabled** in most project contexts. Enable it per-project as needed.

### Token Storage

| File | Purpose |
|------|---------|
| `/home/anombyte/.gmail-mcp/credentials.json` | OAuth tokens (access + refresh) |
| `/home/anombyte/.gmail-mcp/gcp-oauth.keys.json` | GCP OAuth client credentials |

### Current Scopes

The existing setup has these scopes:
- `gmail.settings.basic` - Read/write Gmail settings
- `gmail.modify` - Read/send/delete/modify messages

**For atlas@atlas-ai.com**, we need **new credentials** with:
- `gmail.send` - Send-only scope (least privilege per email-setup.md)

## Setup for atlas@atlas-ai.com

### Step 1: Create GCP OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select project: "Atlas-AI"
3. Navigate: APIs & Services > Credentials
4. Click "Create Credentials" > "OAuth client ID"
5. Application type: **Desktop app** (not Web)
6. Name: "Atlas-AI Gmail MCP"
7. Download JSON, save as:
   ```
   /home/anombyte/.gmail-mcp/atlas-oauth.keys.json
   ```

### Step 2: Enable Gmail API

1. In GCP Console: APIs & Services > Library
2. Search "Gmail API"
3. Click Enable

### Step 3: Configure OAuth Consent Screen

1. APIs & Services > OAuth consent screen
2. User type: **Internal** (if Google Workspace) or **External** (requires verification)
3. Add scopes: `https://www.googleapis.com/auth/gmail.send`
4. Add test users: `atlas@atlas-ai.com`

### Step 4: Authorize atlas@atlas-ai.com

```bash
# Create separate config directory for Atlas
mkdir -p ~/.gmail-mcp/atlas

# Copy OAuth client credentials
cp /path/to/downloaded/credentials.json ~/.gmail-mcp/atlas/gcp-oauth.keys.json

# Run OAuth flow (will open browser)
GMAIL_CONFIG_DIR=/home/anombyte/.gmail-mcp/atlas \
npx -y @gongrzhe/server-gmail-autoauth-mcp auth
```

**Important**: Sign in as `atlas@atlas-ai.com` when the browser opens.

### Step 5: Update MCP Configuration

Add Atlas-specific Gmail server to `~/.claude.json`:

```json
"gmail-atlas": {
  "type": "stdio",
  "command": "node",
  "args": [
    "/home/anombyte/.claude/mcp-daemons/mcp-sse-client.js",
    "--url", "http://localhost:8227",
    "--name", "gmail-atlas"
  ],
  "env": {
    "GMAIL_CONFIG_DIR": "/home/anombyte/.gmail-mcp/atlas"
  }
}
```

## Testing Send Capability

### Test via Claude Code

```
# Enable gmail-atlas MCP for current project, then:
mcp__gmail__send_email to=["hayden.bruinsma@gmail.com"] subject="Test from Atlas" body="This is a test email from atlas@atlas-ai.com"
```

### Test via curl

```bash
# Get access token
ACCESS_TOKEN=$(jq -r '.access_token' ~/.gmail-mcp/atlas/credentials.json)

# Send test email (base64 encoded)
curl -X POST \
  "https://gmail.googleapis.com/gmail/v1/users/me/messages/send" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "raw": "'$(echo -n "To: hayden.bruinsma@gmail.com\nSubject: Test\n\nTest body" | base64 -w0)'"
  }'
```

## Re-authentication

If tokens expire or become invalid:

```bash
cd ~/.gmail-mcp/atlas
rm -f credentials.json
GMAIL_CONFIG_DIR=/home/anombyte/.gmail-mcp/atlas \
npx -y @gongrzhe/server-gmail-autoauth-mcp auth
```

Then restart Claude Code.

## Security Considerations

Per the 3-account model in email-setup.md:

| Account | Usage | OAuth Scopes |
|---------|-------|--------------|
| admin@atlas-ai.com | **NEVER** for API | None |
| ops@atlas-ai.com | Human email | Standard |
| atlas@atlas-ai.com | AI sends | `gmail.send` only |

**Restrictions for atlas@**:
- Send-only (cannot read inbox)
- All sends logged
- No admin access
- Rate limiting via pre-send hooks (optional)

## Troubleshooting

### "No access, refresh token" Error

```bash
# Re-run OAuth flow
~/.gmail-mcp/reauth.sh
```

### Token Expiry

Access tokens expire after ~1 hour. The MCP server should auto-refresh using the refresh token. If not:

1. Check `credentials.json` has `refresh_token`
2. Re-authenticate if missing

### Wrong Account Sending

Ensure `GMAIL_CONFIG_DIR` points to the correct directory:
- Personal: `/home/anombyte/.gmail-mcp`
- Atlas: `/home/anombyte/.gmail-mcp/atlas`

---

*Gmail MCP Setup Version: 1.0.0 | Last Updated: 2025-12-31*
