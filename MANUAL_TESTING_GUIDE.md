# Manual Testing Guide - Atlas Website

**Quick Reference for Browser Testing**

---

## Test URLs

| Page | URL | Purpose |
|------|-----|---------|
| Home | http://localhost:3002 | Main landing page |
| Admin | http://localhost:3002/admin | Admin dashboard (requires auth) |
| API Health | http://localhost:3002/api/health | API status check |

---

## Browser DevTools Setup

### Open DevTools
- **Chrome/Firefox**: F12 or Ctrl+Shift+I
- **Safari**: Cmd+Option+I

### Enable Device Toolbar
1. Open DevTools
2. Click "Device Toolbar" button (or Ctrl+Shift+M)
3. Select device from dropdown:

**Recommended Devices**:
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- iPad (768x1024)
- Desktop (1920x1080)

---

## Test Case 1: Landing Page Visual Check

### Steps
1. Open http://localhost:3002
2. Inspect each section:
   - ✅ Hero section (headline, subheading, CTA)
   - ✅ Pain → Outcome strip
   - ✅ Services section
   - ✅ Portfolio/social proof
   - ✅ How it works
   - ✅ FAQ
   - ✅ Footer

### Console Check
1. Open Console tab in DevTools
2. Look for red errors
3. Expected: No errors (maybe warnings for localhost)

### Network Check
1. Open Network tab in DevTools
2. Refresh page
3. Check:
   - ✅ All resources load (200 status)
   - ✅ No 404 errors
   - ✅ Load times < 2s for critical resources

---

## Test Case 2: Contact Form Submission

### Step 1: Personal Info
```
Name: John Smith
Email: john@example.com
Company: Acme Inc
```
- [ ] Try invalid email (john@) - should show error
- [ ] Try empty fields - should show required errors
- [ ] Click "Next" with valid data - should proceed to Step 2

### Step 2: Service Details
```
Service Interest: MCP Services
Budget: $5,000-$10,000
Timeline: 1-3 months
```
- [ ] Verify dropdown options exist
- [ ] Make selections
- [ ] Click "Next" - should proceed to Step 3

### Step 3: Message
```
Message: We need AI workflow automation for our sales team.
Looking to integrate with our existing CRM system.
```
- [ ] Type message
- [ ] Click "Submit"
- [ ] Verify success message appears
- [ ] Verify form resets

### Database Verification
```bash
# Open new terminal
psql -U postgres -d atlas_website

# Check for new lead
SELECT name, email, company, score, qualified, status 
FROM leads 
WHERE email = 'john@example.com';
```

Expected: Lead exists with score > 50

---

## Test Case 3: Mobile Responsiveness

### iPhone SE (375px)
1. Set viewport to 375x667
2. Check:
   - [ ] Hamburger menu appears
   - [ ] Menu opens/closes smoothly
   - [ ] All text readable (no horizontal scroll)
   - [ ] Form inputs touch-friendly (min 44px height)
   - [ ] Images scale correctly

### Tablet (768px)
1. Set viewport to 768x1024
2. Check:
   - [ ] Navigation adapts
   - [ ] Form usable
   - [ ] No horizontal scroll
   - [ ] Images load properly

---

## Test Case 4: Duplicate Email Prevention

### Steps
1. Submit form with email: duplicate@test.com
2. Submit again with same email (different name)
3. Expected: Error message "This email has already been submitted"

### Verify
```bash
psql -U postgres -d atlas_website -c "SELECT COUNT(*) FROM leads WHERE email = 'duplicate@test.com';"
```
Expected: 1 (only one record)

---

## Test Case 5: Admin Dashboard (After Supabase Setup)

### Setup
1. Update `.env.local` with Supabase credentials
2. Restart dev server: `npm run dev`

### Test
1. Visit http://localhost:3002/admin
2. Expected: Redirect to /login
3. Login with admin credentials
4. Verify:
   - [ ] Stats cards show metrics
   - [ ] Lead table displays
   - [ ] Filter by status works
   - [ ] Filter by qualification works

---

## Common Issues & Solutions

### Issue: Form submits but no lead in database
**Check**:
1. Console for JavaScript errors
2. Network tab for API response
3. Server logs: `tail -f server.log`

### Issue: Admin page shows "Configuration Required"
**Solution**: Supabase credentials not configured
1. Create Supabase project
2. Update .env.local with credentials
3. Restart server

### Issue: Mobile menu doesn't work
**Check**:
1. JavaScript console for errors
2. CSS for mobile breakpoint
3. Click event listeners attached

---

## Performance Checklist

### Lighthouse Score (Target: 90+)
```bash
npx lighthouse http://localhost:3002 --view
```

### Manual Performance Checks
- [ ] Page loads in < 3 seconds
- [ ] First paint < 1.5 seconds
- [ ] No layout shift (elements don't jump)
- [ ] Smooth scrolling
- [ ] Images optimized (WebP preferred)

---

## Quick Test Commands

### Check server status
```bash
ss -tlnp | grep 3002
```

### View recent leads
```bash
psql -U postgres -d atlas_website -c "SELECT name, email, score, qualified FROM leads ORDER BY created_at DESC LIMIT 5;"
```

### Count total leads
```bash
psql -U postgres -d atlas_website -c "SELECT COUNT(*) FROM leads;"
```

### Clear test leads
```bash
psql -U postgres -d atlas_website -c "DELETE FROM leads WHERE email LIKE '%test%' OR email LIKE '%example%';"
```

---

## Reporting Issues

### Bug Report Template
```
**Description**: [Brief description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected**: [What should happen]
**Actual**: [What actually happens]

**Browser**: [Chrome/Firefox/Safari + version]
**Viewport**: [Desktop/Mobile/Tablet]
**Console Errors**: [Paste any console errors]
**Screenshot**: [Attach screenshot if applicable]
```

---

## Test Completion Checklist

Before signing off, verify:

- [ ] All landing page sections render
- [ ] Contact form submits successfully
- [ ] Lead appears in database with correct score
- [ ] Duplicate emails are rejected
- [ ] Mobile viewports tested (375px, 768px)
- [ ] No console errors
- [ ] No 404s in Network tab
- [ ] Admin dashboard accessible (after Supabase setup)
- [ ] Lighthouse score 90+ (Performance)
- [ ] All links work

---

**Last Updated**: 2025-01-18  
**Tested By**: [Your Name]  
**Browser**: [Chrome 121 / Firefox 122 / Safari 17]
