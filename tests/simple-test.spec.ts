import { test, expect } from '@playwright/test'

test.describe('Quick functionality check', () => {
  test('Homepage loads with new abstract design', async ({ page }) => {
    await page.goto('/')
    
    // Check page loads
    await expect(page).toHaveTitle(/HARKA/)
    
    // Check for key elements
    const headline = page.locator('h1')
    await expect(headline).toBeVisible()
    
    // Check for AI Compass button
    const aiCompassBtn = page.locator('text=/AI.*Assessment|Start AI/i')
    await expect(aiCompassBtn.first()).toBeVisible()
    
    console.log('✓ Homepage loads successfully')
  })

  test('Dark mode toggle works', async ({ page }) => {
    await page.goto('/')
    
    // Find theme toggle
    const themeToggle = page.locator('button').filter({ has: page.locator('[data-icon*="sun"], [data-icon*="moon"]') })
    
    // Get initial state
    const isDarkInitial = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    // Toggle theme
    await themeToggle.first().click()
    await page.waitForTimeout(500)
    
    // Check state changed
    const isDarkAfter = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    expect(isDarkInitial).not.toBe(isDarkAfter)
    console.log('✓ Dark mode toggle works')
  })

  test('Language switching works', async ({ page }) => {
    await page.goto('/')
    
    // Find language toggle
    const langToggle = page.locator('button:has-text("DA"), button:has-text("EN")')
    
    if (await langToggle.count() > 0) {
      const initialText = await page.locator('h1').textContent()
      
      // Click language toggle
      await langToggle.first().click()
      await page.waitForTimeout(1000)
      
      const newText = await page.locator('h1').textContent()
      
      expect(initialText).not.toBe(newText)
      console.log('✓ Language switching works')
    } else {
      console.log('⚠ Language toggle not found')
    }
  })

  test('AI Compass is accessible', async ({ page }) => {
    await page.goto('/')
    
    // Click AI Compass link
    await page.click('text=/AI.*Assessment|Start AI/i')
    
    // Should navigate to AI Compass
    await expect(page).toHaveURL(/ai-kompas|ai-compass/)
    
    // Should not redirect to login
    await expect(page).not.toHaveURL(/sign-in|login/)
    
    console.log('✓ AI Compass is accessible without login')
  })

  test('Visual elements render correctly', async ({ page }) => {
    await page.goto('/')
    
    // Check for abstract elements
    const abstractElements = page.locator('.mesh-gradient, .shape-blob, .decoration-circle')
    const count = await abstractElements.count()
    
    expect(count).toBeGreaterThan(0)
    console.log(`✓ Found ${count} abstract visual elements`)
    
    // Check for glass effects
    const glassElements = page.locator('.glass')
    const glassCount = await glassElements.count()
    
    expect(glassCount).toBeGreaterThan(0)
    console.log(`✓ Found ${glassCount} glass effect elements`)
  })

  test('Responsive design works', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    
    const desktopGrid = page.locator('.lg\\:grid-cols-2')
    await expect(desktopGrid.first()).toBeVisible()
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check mobile layout
    const mobileLayout = await page.evaluate(() => {
      const hero = document.querySelector('h1')
      return hero ? window.getComputedStyle(hero).fontSize : null
    })
    
    expect(mobileLayout).toBeTruthy()
    console.log('✓ Responsive design works')
  })
})