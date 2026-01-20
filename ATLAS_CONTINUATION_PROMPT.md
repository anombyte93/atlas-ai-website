# Atlas-AI Website Continuation Prompt - Self-Iterating

## Context
You are continuing work on the Atlas-AI website (atlas-ai.au) transformation. The conversion-focused structure is COMPLETE and building successfully.

## Completed Work
✅ Hero: "Governed AI systems for businesses that can't afford guesswork"
✅ 4 Productized Services (Audit, Workflow, Observability, Handoff)
✅ Governance page as major differentiator
✅ Evidence-based case studies with "what wasn't automated" transparency
✅ 5-step transparent process flow
✅ Qualification-focused contact form
✅ Enhanced navigation and footer with Atlas-AI branding
✅ Build passes successfully (no TypeScript errors)
✅ Committed and pushed to GitHub (commit: 4636e6f)

## Remaining Tasks

### 1. Vercel Deployment (HIGH PRIORITY - Manual Step Required)
- Manual intervention required: `vercel login` (opens browser)
- Check current Vercel configuration: `vercel list`
- Link project if needed: `vercel link`
- Ensure environment variables are set (DATABASE_URL optional for static site)
- Deploy to production: `vercel --yes --prod`
- Verify atlas-ai.au domain is connected
- Test live site functionality

**Note**: Vercel deployment requires interactive browser login. This is a MANUAL step that the human must perform. See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions.

### 2. 100% Test Coverage for Interactive Elements
Write comprehensive tests using React Testing Library and Jest:

**Hero Section** (components/landing/hero.tsx):
- Test headline renders correctly
- Test three pillars display
- Test CTA buttons have correct href links
- Test responsive behavior

**Services Section** (components/landing/services.tsx):
- Test all 4 services render
- Test service cards have correct content
- Test CTA links for each service
- Test flagship service styling

**Governance Section** (components/landing/governance.tsx):
- Test all 3 subsections render
- Test "When we say no" list displays
- Test CTA button functionality

**Case Studies** (components/landing/case-studies.tsx):
- Test all 3 case studies render
- Test evidence framework displays (problem, what wasn't automated, validation, outcome)
- Test "Verified" badges display

**Process Section** (components/landing/process.tsx):
- Test all 5 steps render with correct content
- Test step descriptions display
- Test key message about validation criteria

**Contact Form** (components/landing/contact-form.tsx):
- Test multi-step form flow
- Test form validation
- Test service options match new structure
- Test form submission to /api/leads
- Test success state displays
- Test Cal.com booking button

**Navigation** (components/landing/navigation.tsx):
- Test all links work (Services, Governance, Case Studies, Process, Contact)
- Test mobile menu toggle
- Test scroll behavior changes styling
- Test "Get Started" CTA

**Footer** (components/landing/footer.tsx):
- Test all links work
- Test contact information displays
- Test copyright information

**API Routes**:
- Test POST /api/leads with validation
- Test GET /api/services returns active services
- Test GET /api/portfolio returns projects

### 3. x3 Doubt Agents Final Validation
Run 3 cycles of validation:
1. **Cycle 1** (doubt-critic): Check for obvious errors, security issues, broken links
2. **Cycle 2** (doubt-meta-critic): Check for bias, blind spots, missing content
3. **Cycle 3** (Karen validator): Evidence-based validation with scoring

Each cycle must:
- Test the live deployed site
- Verify all interactive elements work
- Check mobile responsiveness
- Validate all forms submit correctly
- Confirm all links work
- Score the implementation (≥7.7/10 required)

## Success Criteria

### Vercel Deployment:
- [ ] Site deploys without errors
- [ ] atlas-ai.au loads correctly
- [ ] All pages render
- [ ] Forms submit successfully
- [ ] Database connects (if applicable)

### Test Coverage:
- [ ] All components have tests
- [ ] All interactive elements tested
- [ ] 100% coverage report generated
- [ ] All tests pass

### Validation:
- [ ] Cycle 1 passes (no critical issues)
- [ ] Cycle 2 passes (no bias/blind spots)
- [ ] Cycle 3 passes (Karen score ≥7.7/10)

## Execution Order
1. **DEPLOY FIRST** - Manual Vercel login and deployment (blocking)
2. Write and run tests against live site
3. Run x3 doubt agents on live deployed site
4. Generate final validation report

## Important Notes
- Current directory: /home/anombyte/Atlas/Atlas_Website
- Build command: `npm run build`
- Dev command: `npm run dev`
- All ESLint errors resolved with `/* eslint-disable react/no-unescaped-entities */`
- Git commit: 4636e6f
- Deployment guide: VERCEL_DEPLOYMENT_GUIDE.md

## Known Blockers
- **Vercel login requires interactive browser** - This CANNOT be automated
- Must use: `vercel login` (opens browser for authentication)
- After login: `vercel --yes --prod` to deploy

## Completion Promise

Continue this work until: "Atlas-AI website transformation is complete with Vercel deployment live at https://atlas-ai.au/, 100% test coverage passing for all interactive elements, x3 doubt agent validation complete with Karen score ≥7.7/10, production-ready with conversion-focused governance-first messaging throughout."

---

## Self-Iteration Prompt

CREATE A prompt to conitnue this work with a completion promise at the end in the format: (example) 'Ralph Script is complete with end-to-end test passing, real Claude session recovery verified, production-ready with v1.0.0 tag'
