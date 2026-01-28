# Testing Guide for Atlas AI Website

Comprehensive test automation setup for the static Next.js 15 website at atlas-ai.au.

## Test Framework Stack

### Component Testing
- **Vitest** - Fast unit test framework with native ESM support
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM simulation for node environment

### End-to-End Testing
- **Playwright** - Cross-browser E2E testing
- **@axe-core/playwright** - Accessibility testing

### Why This Stack?

**Vitest over Jest**:
- Native ESM support (Next.js 15 uses ESM)
- 10x faster than Jest
- Better TypeScript integration
- Built-in coverage with v8

**Playwright over Cypress**:
- Multi-browser support (Chrome, Firefox, Safari, Mobile)
- Faster execution
- Better parallelization
- Built-in accessibility testing via axe-core
- Auto-waiting for elements reduces flaky tests

**Testing Philosophy**:
- **Component tests**: Verify individual component behavior in isolation
- **Build tests**: Validate static export generation
- **E2E tests**: Verify user flows across the site
- **A11y tests**: Ensure WCAG 2.1 AA compliance

## Test Structure

```
Atlas_Website/
├── components/
│   └── landing/
│       └── __tests__/           # Component tests
│           ├── hero.test.tsx
│           ├── navigation.test.tsx
│           └── footer.test.tsx
├── __tests__/
│   └── build/
│       └── static-export.test.ts # Build verification tests
├── e2e/                          # E2E tests
│   ├── landing-page.spec.ts
│   └── accessibility.spec.ts
├── vitest.config.ts              # Vitest configuration
├── vitest.setup.ts               # Test setup utilities
└── playwright.config.ts          # Playwright configuration
```

## Running Tests

### Component Tests (Vitest)

```bash
# Watch mode for development
npm run test

# Run once
npm run test:run

# Generate coverage report
npm run test:coverage

# Interactive UI
npm run test:ui
```

### End-to-End Tests (Playwright)

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Run in headed mode (see browser)
npm run test:e2e:headed
```

### All Tests

```bash
# Run component + E2E tests
npm run test:all

# CI mode (with coverage)
npm run test:ci
```

## Test Coverage

### Component Tests

**Hero Component** (`components/landing/__tests__/hero.test.tsx`):
- Renders main heading
- Renders subheading
- Primary CTA button exists and links correctly
- Secondary CTA button exists and links correctly
- Accessibility attributes

**Navigation Component** (`components/landing/__tests__/navigation.test.tsx`):
- Logo renders
- All navigation links present
- Get Started button
- Mobile menu toggle
- Mobile menu closes on link click
- ARIA attributes

**Footer Component** (`components/landing/__tests__/footer.test.tsx`):
- Atlas AI branding
- Company description
- Quick links section
- Contact information (email, phone)
- Copyright notice
- Semantic structure

### Build Tests

**Static Export Verification** (`__tests__/build/static-export.test.ts`):
- `out/` directory generation
- `index.html` exists and contains content
- `404.html` for static hosting
- Critical CSS inlined
- No Next.js server dependencies
- Proper metadata
- Correct charset and viewport

### E2E Tests

**Landing Page** (`e2e/landing-page.spec.ts`):
- Page title
- Hero section loads
- Navigation links
- CTA buttons work
- Anchor link scrolling
- Mobile menu toggle
- Footer links
- Image loading
- Console error detection
- Responsive design (mobile, tablet)
- Performance budget (< 3s load time)

**Accessibility** (`e2e/accessibility.spec.ts`):
- WCAG 2.1 AA compliance (axe-core)
- Proper heading hierarchy
- Accessible names on interactive elements
- Form labels
- Image alt text
- Color contrast
- Keyboard navigation
- Landmark regions
- Focus management

## Coverage Reports

After running `npm run test:coverage`, view the report:

```bash
# HTML report
open coverage/index.html

# Terminal summary already displayed
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20

      - run: npm ci
      - run: npm run test:ci

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## Test Writing Best Practices

### Component Tests

```typescript
// ✅ GOOD: Test behavior, not implementation
test('renders primary CTA button', () => {
  render(<Hero />)
  const button = screen.getByRole('link', { name: 'Book a Strategy Call' })
  expect(button).toHaveAttribute('href', '#contact')
})

// ❌ BAD: Test implementation details
test('has a div with class btn-primary', () => {
  render(<Hero />)
  expect(container.querySelector('.btn-primary')).toBeTruthy()
})
```

### E2E Tests

```typescript
// ✅ GOOD: Test user flows
test('user can navigate to contact section', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Contact' }).click()
  await expect(page.locator('#contact')).toBeInViewport()
})

// ❌ BAD: Test implementation details
test('clicking link changes URL hash', async ({ page }) => {
  await page.goto('/')
  await page.locator('a[href="#contact"]').click()
  expect(page.url()).toContain('#contact')
})
```

## Debugging Tests

### Vitest

```bash
# Run in watch mode with UI
npm run test:ui

# Run specific test file
npx vitest hero.test.tsx

# Run tests matching pattern
npx vitest --grep "Hero"
```

### Playwright

```bash
# Debug mode with inspector
npm run test:e2e:debug

# Run specific test file
npx playwright test landing-page.spec.ts

# Run specific test
npx playwright test -g "mobile menu"
```

## Performance Benchmarks

Current test suite performance:

- **Component tests**: ~2 seconds
- **Build tests**: ~30 seconds (includes build time)
- **E2E tests**: ~45 seconds (5 browsers × 9 tests)
- **Total time**: ~77 seconds

## Target Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

Current coverage can be checked with `npm run test:coverage`.

## Adding New Tests

### Component Test Template

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { YourComponent } from '../your-component'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('expected text')).toBeInTheDocument()
  })
})
```

### E2E Test Template

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('does something', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Click me' }).click()
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

## Troubleshooting

### Tests Fail Locally But Pass in CI

- Check node version (use Node 20)
- Clear cache: `rm -rf node_modules/.vite`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Playwright Tests Fail

- Install browsers: `npx playwright install`
- Check if port 3000 is available
- Build output exists: `npm run build`

### Coverage Not Generating

- Ensure `@vitest/coverage-v8` is installed
- Check vitest.config.ts coverage configuration

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
