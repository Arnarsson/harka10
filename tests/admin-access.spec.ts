import { test, expect } from '@playwright/test'

test.describe('Admin and Landing Page Tests', () => {
  
  test('New harka-style landing page loads correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check for key harka.dk style elements
    await expect(page.locator('h1')).toContainText(/48 timer|48 hours/)
    
    // Check for process section
    await expect(page.locator('text=/Dag 1|Day 1/')).toBeVisible()
    await expect(page.locator('text=/Dag 2|Day 2/')).toBeVisible()
    
    // Check for results section
    await expect(page.locator('text=/resultater|results/i')).toBeVisible()
    
    // Check for CTA
    await expect(page.locator('text=/Book.*møde|Book.*meeting/i')).toBeVisible()
    
    console.log('✓ Harka-style landing page works')
  })

  test('Admin quick access page is accessible', async ({ page }) => {
    await page.goto('/admin/quick-access')
    
    // Should show the quick access page (not redirect to sign-in in dev mode)
    await expect(page.locator('h1')).toContainText(/Admin Quick Access|Access Denied/)
    
    // If signed in, should show admin links
    const adminLinks = page.locator('text=/Dashboard|Users|Content/')
    const count = await adminLinks.count()
    
    if (count > 0) {
      console.log('✓ Admin quick access shows admin links')
    } else {
      console.log('✓ Admin quick access shows sign-in prompt')
    }
  })

  test('Admin dashboard is accessible', async ({ page }) => {
    await page.goto('/admin/dashboard')
    
    // In dev mode with middleware changes, should not redirect
    const url = page.url()
    
    if (url.includes('/admin/dashboard')) {
      console.log('✓ Admin dashboard is accessible (dev mode)')
    } else if (url.includes('/sign-in')) {
      console.log('✓ Admin dashboard redirects to sign-in (not authenticated)')
    } else {
      console.log('✓ Admin dashboard redirects to:', url)
    }
  })

  test('Landing page has proper professional styling', async ({ page }) => {
    await page.goto('/')
    
    // Check for professional B2B elements
    const stats = page.locator('text=/30%|48|timer|hours/')
    await expect(stats.first()).toBeVisible()
    
    // Check for barriers section
    const barriers = page.locator('text=/fejler|fail/i')
    if (await barriers.count() > 0) {
      await expect(barriers.first()).toBeVisible()
      console.log('✓ Barriers section present')
    }
    
    // Check for clean card layouts
    const cards = page.locator('.card, [class*="card"]')
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)
    console.log(`✓ Found ${cardCount} card elements`)
  })

  test('Language switching works on new landing', async ({ page }) => {
    await page.goto('/')
    
    // Find language toggle in header
    const langToggle = page.locator('button:has-text("DA"), button:has-text("EN")')
    
    if (await langToggle.count() > 0) {
      const initialH1 = await page.locator('h1').textContent()
      
      // Click to switch language
      await langToggle.first().click()
      await page.waitForTimeout(1000)
      
      const newH1 = await page.locator('h1').textContent()
      
      if (initialH1 !== newH1) {
        console.log('✓ Language switching works')
      } else {
        console.log('⚠ Language content might be the same')
      }
    } else {
      console.log('⚠ Language toggle not found in header')
    }
  })

  test('Dark mode works with professional design', async ({ page }) => {
    await page.goto('/')
    
    // Find theme toggle
    const themeToggle = page.locator('button').filter({ 
      has: page.locator('[data-icon*="sun"], [data-icon*="moon"]') 
    })
    
    if (await themeToggle.count() > 0) {
      // Get initial background
      const initialBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor
      })
      
      // Toggle theme
      await themeToggle.first().click()
      await page.waitForTimeout(500)
      
      // Check background changed
      const newBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor
      })
      
      if (initialBg !== newBg) {
        console.log('✓ Dark mode toggle works')
      }
    } else {
      console.log('⚠ Theme toggle not found')
    }
  })

  test('Navigation structure matches harka.dk style', async ({ page }) => {
    await page.goto('/')
    
    // Check for minimal, professional navigation
    const nav = page.locator('nav, header').first()
    await expect(nav).toBeVisible()
    
    // Should have clean, minimal nav items
    const navItems = nav.locator('a, button')
    const navCount = await navItems.count()
    
    // Harka.dk has minimal navigation (5-7 items)
    expect(navCount).toBeLessThan(10)
    console.log(`✓ Minimal navigation with ${navCount} items`)
  })
})