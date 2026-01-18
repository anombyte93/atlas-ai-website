# Atlas AI Website Project

## Scope
Simple, professional website for atlas-ai.au - AI business integration services

## Business Offering
1. **MCP-style AI Services** - Creating custom AI tools for businesses via MCP architecture
2. **Workflow Optimization** - Integrating AI into existing business processes
3. **Website Development** - Full-stack web applications (proven: FleetLeaseFlow, Josh projects)

## Tech Stack (Derived from FleetLeaseFlow patterns)
- **Framework**: Static HTML/CSS/JS (no framework overhead for landing page)
- **Styling**: Tailwind CSS (CDN for simplicity)
- **Design System**: Professional blue/teal theme matching AI/tech aesthetic
- **Deployment**: GitHub Pages via dashboard-deployer MCP
- **Domain**: atlas-ai.au (DNS configuration needed)

## Design Principles
- Mobile-first responsive design
- Single primary CTA: "Book a Strategy Call"
- Outcome-focused messaging with concrete metrics
- Clean, generous whitespace
- Fast load times (static site, no heavy JS)

## Page Sections (2025 Best Practices)
1. Hero - Headline + subheading + CTA + visual
2. Pain → Outcome strip - 3 problems + 3 solutions
3. Services - 3-4 productized offerings
4. Social proof - Portfolio/testimonials
5. How it works - 3-step process
6. FAQ - Address common concerns
7. Footer - Final CTA + contact

## Portfolio Projects
- FleetLeaseFlow - Fleet management SaaS
- Josh Project - Client web application
- MCP Servers - Custom AI tooling

## Created
- Date: 2024-12-31
- By: /prompt-architect
- Complexity: 10

## MANDATORY: Perplexity Deep Research (3x Call) Before ANY Task

**Perplexity MCP Server**: `~/Projects/Programs/perplexity-api-simple/`
**Local API URL**: `http://localhost:8765`
**Tool**: `perplexity_pro_search` (sonar-deep-research model)

### The "Research-First" Protocol

**BEFORE performing ANY task**, you MUST run deep research in **3 parallel calls**:

1. **Call 1**: Technical research - Architecture patterns, libraries, best practices
2. **Call 2**: Domain research - Business logic, industry standards, user expectations
3. **Call 3**: Edge cases - Security considerations, accessibility, performance, error handling

### Execution Pattern

```bash
# Always start tasks with 3x parallel Perplexity research
mcp-cli call perplexity-api-free/perplexity_pro_search '{
  "query": "<technical-context-query>",
  "search_type": "deep"
}'

mcp-cli call perplexity-api-free/perplexity_pro_search '{
  "query": "<domain-context-query>",
  "search_type": "deep"
}'

mcp-cli call perplexity-api-free/perplexity_pro_search '{
  "query": "<edge-cases-query>",
  "search_type": "deep"
}'
```

### Why 3x?

- **Call 1 (Technical)**: Ensures you use modern, proven patterns
- **Call 2 (Domain)**: Captures business context you may lack
- **Call 3 (Edge cases)**: Prevents overlooking critical considerations

**After research**, synthesize findings, THEN implement.

### Verification

Before claiming research is complete, ask:
- Did I cover technical patterns?
- Did I cover domain context?
- Did I cover edge cases?
- Do I have 3 distinct sources to synthesize?

---

## Reference Pattern Learning Rule

When implementing backend logic or complex components, you may consult the maryse-demo.atlas-ai.au codebase as a reference implementation to infer proven patterns, data flows, and architectural decisions.

Do NOT copy code verbatim.
Extract principles, flows, and constraints only.
Adapt all implementations to the current Atlas AI backend, stack, and conventions.
Document which pattern was learned and why it applies.
