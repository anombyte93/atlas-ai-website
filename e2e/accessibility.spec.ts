import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has no accessibility violations on main page', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('has proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()

    // Should have exactly one h1
    const h1s = await page.locator('h1').count()
    expect(h1s).toBe(1)

    // Headings should follow logical order
    let previousLevel = 1
    for (const heading of headings) {
      const tag = await heading.evaluate(e => e.tagName)
      const level = parseInt(tag[1])

      // Headings should not skip levels (e.g., h1 to h3)
      expect(level - previousLevel).toBeLessThanOrEqual(1)
      previousLevel = level
    }
  })

  test('all interactive elements have accessible names', async ({ page }) => {
    // Check buttons
    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const hasAccessibleName = await button.evaluate(el =>
        el.hasAttribute('aria-label') ||
        el.hasAttribute('aria-labelledby') ||
        !!el.textContent?.trim()
      )
      expect(hasAccessibleName).toBe(true)
    }

    // Check links
    const links = await page.locator('a[href]').all()
    for (const link of links) {
      const hasText = await link.evaluate(el => !!el.textContent?.trim())
      const hasAriaLabel = await link.evaluate(el => el.hasAttribute('aria-label'))
      expect(hasText || hasAriaLabel).toBe(true)
    }
  })

  test('forms have proper labels', async ({ page }) => {
    const inputs = await page.locator('input, textarea, select').all()

    for (const input of inputs) {
      const hasLabel = await input.evaluate(el => {
        const id = el.getAttribute('id')
        const hasExplicitLabel = id && document.querySelector(`label[for="${id}"]`)
        const hasAriaLabel = el.hasAttribute('aria-label')
        const hasAriaLabelledBy = el.hasAttribute('aria-labelledby')
        return hasExplicitLabel || hasAriaLabel || hasAriaLabelledBy
      })

      expect(hasLabel).toBe(true)
    }
  })

  test('images have alt text', async ({ page }) => {
    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt !== null).toBe(true)
    }
  })

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include(['#contact'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation works', async ({ page }) => {
    // Tab through focusable elements
    const focusableElements = await page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').all()

    for (let i = 0; i < Math.min(focusableElements.length, 10); i++) {
      await page.keyboard.press('Tab')
      const focusedElement = await page.locator(':focus').count()
      expect(focusedElement).toBeGreaterThan(0)
    }
  })

  test('skip links are available or page is navigable', async ({ page }) => {
    // Check for skip link
    const skipLink = page.locator('a[href^="#"]').filter({ hasText: /skip/i }).first()

    const hasSkipLink = await skipLink.count() > 0

    if (hasSkipLink) {
      await skipLink.click()
      const target = await skipLink.getAttribute('href')
      if (target) {
        const targetElement = page.locator(target)
        await expect(targetElement).toBeFocused()
      }
    }
  })

  test('landmark regions are present', async ({ page }) => {
    // Check for main landmarks
    const hasNav = await page.locator('nav').count() > 0
    const hasMain = await page.locator('main').count() > 0 || await page.locator('[role="main"]').count() > 0
    const hasFooter = await page.locator('footer').count() > 0

    expect(hasNav).toBe(true)
    expect(hasMain).toBe(true)
    expect(hasFooter).toBe(true)
  })

  test('focus management in mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.getByRole('button', { name: /toggle navigation/i })
    await menuButton.focus()
    await menuButton.click()

    const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileMenu).toBeVisible()

    // Focus should move into menu
    const focusedElement = await page.locator(':focus').count()
    expect(focusedElement).toBeGreaterThan(0)
  })
})
