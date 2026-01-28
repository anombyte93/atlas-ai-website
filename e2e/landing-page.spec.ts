import { test, expect } from '@playwright/test'

test.describe('Atlas AI Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Atlas AI/)
  })

  test('loads hero section', async ({ page }) => {
    const hero = page.locator('section').filter({ hasText: 'Governed AI systems' })
    await expect(hero).toBeVisible()
  })

  test('has navigation with all links', async ({ page }) => {
    const nav = page.locator('nav')

    await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Governance' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Case Studies' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Process' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  test('hero section CTAs work', async ({ page }) => {
    const bookCallButton = page.getByRole('link', { name: 'Book a Strategy Call' })
    await expect(bookCallButton).toBeVisible()
    await expect(bookCallButton).toHaveAttribute('href', '#contact')

    const seeHowButton = page.getByRole('link', { name: 'See How It Works' })
    await expect(seeHowButton).toBeVisible()
    await expect(seeHowButton).toHaveAttribute('href', '#process')
  })

  test('scrolls to sections when navigation links are clicked', async ({ page }) => {
    await page.getByRole('link', { name: 'Services' }).click()
    await page.waitForTimeout(500) // Wait for scroll animation

    // Check that services section is in view
    const servicesSection = page.locator('#services')
    await expect(servicesSection).toBeInViewport()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: /toggle navigation/i })
    await expect(menuButton).toBeVisible()

    // Click to open
    await menuButton.click()
    const mobileMenu = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileMenu).toBeVisible()

    // Click a link
    await page.getByRole('link', { name: 'Services' }).click()
    await expect(mobileMenu).not.toBeVisible()
  })

  test('footer contains all links', async ({ page }) => {
    const footer = page.locator('footer')

    await expect(footer.getByRole('link', { name: 'Services' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Governance' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Case Studies' })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'Our Process' })).toBeVisible()

    // Contact links
    await expect(footer.getByRole('link', { name: 'contact@atlas-ai.au' })).toBeVisible()
    await expect(footer.getByRole('link', { name: '+61 494 010 006' })).toBeVisible()
  })

  test('all images load successfully', async ({ page }) => {
    const images = page.locator('img')
    const count = await images.count()

    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      await expect(img).toHaveJSProperty('complete', true)
      await expect(img).toHaveJSProperty('naturalWidth', expect.any(Number))
    }
  })

  test('page has no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.reload()

    // Check for common errors
    expect(errors.filter(e => e.includes('404'))).toHaveLength(0)
    expect(errors.filter(e => e.includes('Failed to load'))).toHaveLength(0)
  })

  test('responsive design works on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()

    // Hero should be visible
    const hero = page.locator('section').filter({ hasText: 'Governed AI systems' })
    await expect(hero).toBeVisible()

    // Navigation should work
    const menuButton = page.getByRole('button', { name: /toggle navigation/i })
    await expect(menuButton).toBeVisible()
  })

  test('responsive design works on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()

    const hero = page.locator('section').filter({ hasText: 'Governed AI systems' })
    await expect(hero).toBeVisible()
  })

  test('page loads within performance budget', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Static site should load very fast
    expect(loadTime).toBeLessThan(3000) // 3 seconds
  })
})
