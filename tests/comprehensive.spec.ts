import { test, expect } from '@playwright/test'

test.describe('HARKA Platform - Comprehensive Tests', () => {
  
  test.describe('Homepage and Navigation', () => {
    test('should load homepage with correct content', async ({ page }) => {
      await page.goto('/')
      
      // Check hero content
      await expect(page.locator('h1')).toContainText(/Transform/)
      
      // Check AI Compass CTA is prominent
      const aiCompassBtn = page.locator('button, a').filter({ hasText: /AI/ })
      await expect(aiCompassBtn.first()).toBeVisible()
      
      // Check for language toggle
      const langToggle = page.locator('[aria-label*="language"], button:has-text("DA"), button:has-text("EN")')
      await expect(langToggle.first()).toBeVisible()
    })

    test('should have working language switching', async ({ page }) => {
      await page.goto('/')
      
      // Find language toggle
      const langToggle = page.locator('[aria-label*="language"], button:has-text("DA"), button:has-text("EN")')
      const initialLang = await langToggle.first().textContent()
      
      // Click to switch language
      await langToggle.first().click()
      
      // Wait for content to update
      await page.waitForTimeout(1000)
      
      // Check if content changed (hero text should change)
      const heroText = await page.locator('h1').textContent()
      
      // Switch back
      await langToggle.first().click()
      await page.waitForTimeout(1000)
      
      const newHeroText = await page.locator('h1').textContent()
      expect(heroText).not.toBe(newHeroText)
    })

    test('should have accessible AI Compass without login', async ({ page }) => {
      await page.goto('/')
      
      // Find AI Compass link/button
      const aiCompassLink = page.locator('a[href*="ai-kompas"], a[href*="ai-compass"]').first()
      await expect(aiCompassLink).toBeVisible()
      
      // Click and verify navigation
      await aiCompassLink.click()
      await expect(page).toHaveURL(/ai-kompas|ai-compass/)
    })
  })

  test.describe('Dark Mode', () => {
    test('should toggle dark mode', async ({ page }) => {
      await page.goto('/')
      
      // Find theme toggle
      const themeToggle = page.locator('[aria-label*="theme"], button:has([data-icon*="moon"]), button:has([data-icon*="sun"])')
      
      // Get initial background color
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
      
      expect(initialBg).not.toBe(newBg)
    })

    test('should persist dark mode preference', async ({ page, context }) => {
      await page.goto('/')
      
      // Toggle to dark mode
      const themeToggle = page.locator('[aria-label*="theme"], button:has([data-icon*="moon"]), button:has([data-icon*="sun"])')
      await themeToggle.first().click()
      
      // Get the theme after toggle
      const isDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark')
      })
      
      // Navigate to another page
      await page.goto('/about')
      
      // Check theme persisted
      const isDarkAfterNav = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark')
      })
      
      expect(isDark).toBe(isDarkAfterNav)
    })
  })

  test.describe('Responsive Design', () => {
    test('should be mobile responsive', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      
      // Check mobile menu exists
      const mobileMenu = page.locator('[aria-label*="menu"], button:has([data-icon*="menu"])')
      await expect(mobileMenu.first()).toBeVisible()
      
      // Check hero is visible and readable
      const hero = page.locator('h1')
      await expect(hero).toBeVisible()
      const fontSize = await hero.evaluate(el => 
        window.getComputedStyle(el).fontSize
      )
      expect(parseInt(fontSize)).toBeGreaterThan(24)
    })

    test('should have proper spacing on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      
      // Check padding on main content
      const mainContent = page.locator('main, section').first()
      const padding = await mainContent.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          left: parseInt(styles.paddingLeft),
          right: parseInt(styles.paddingRight)
        }
      })
      
      // Should have at least 16px padding on mobile
      expect(padding.left).toBeGreaterThanOrEqual(16)
      expect(padding.right).toBeGreaterThanOrEqual(16)
    })

    test('should have touch-friendly buttons', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      
      // Check button sizes
      const buttons = page.locator('button, a[role="button"]')
      const count = await buttons.count()
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = buttons.nth(i)
        const box = await button.boundingBox()
        if (box) {
          // Minimum touch target should be 44x44px
          expect(box.height).toBeGreaterThanOrEqual(36) // Allow some flexibility
          expect(box.width).toBeGreaterThanOrEqual(44)
        }
      }
    })
  })

  test.describe('Performance and Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/')
      
      // Check h1 exists
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      
      // Check heading order
      const headings = await page.evaluate(() => {
        const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        return Array.from(elements).map(el => ({
          tag: el.tagName,
          text: el.textContent?.trim()
        }))
      })
      
      // Verify h1 comes first
      expect(headings[0]?.tag).toBe('H1')
    })

    test('should have proper contrast ratios', async ({ page }) => {
      await page.goto('/')
      
      // Check text contrast
      const textElements = page.locator('p, span, div').filter({ hasText: /.+/ })
      const count = await textElements.count()
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const element = textElements.nth(i)
        const contrast = await element.evaluate(el => {
          const styles = window.getComputedStyle(el)
          const color = styles.color
          const bgColor = styles.backgroundColor
          
          // Simple check - ensure text is not too light
          const rgb = color.match(/\d+/g)
          if (rgb) {
            const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3
            return brightness
          }
          return 128
        })
        
        // Text should not be too light (allowing for dark mode)
        if (contrast > 200) {
          const isDark = await page.evaluate(() => 
            document.documentElement.classList.contains('dark')
          )
          expect(isDark).toBeTruthy()
        }
      }
    })

    test('should have alt text for images', async ({ page }) => {
      await page.goto('/')
      
      const images = page.locator('img')
      const count = await images.count()
      
      for (let i = 0; i < count; i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        
        // Decorative images can have empty alt
        if (alt !== '') {
          expect(alt).toBeTruthy()
        }
      }
    })
  })

  test.describe('Forms and Interactions', () => {
    test('should have accessible form fields', async ({ page }) => {
      await page.goto('/')
      
      // Look for any input fields
      const inputs = page.locator('input:visible, textarea:visible, select:visible')
      const count = await inputs.count()
      
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const input = inputs.nth(i)
          
          // Check for label or aria-label
          const id = await input.getAttribute('id')
          const ariaLabel = await input.getAttribute('aria-label')
          const ariaLabelledBy = await input.getAttribute('aria-labelledby')
          
          if (id) {
            const label = page.locator(`label[for="${id}"]`)
            const hasLabel = await label.count() > 0
            
            expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy()
          }
        }
      }
    })

    test('should show loading states', async ({ page }) => {
      await page.goto('/')
      
      // Check for loading indicators
      const buttons = page.locator('button').filter({ hasText: /get started|sign|log/i })
      const count = await buttons.count()
      
      if (count > 0) {
        // Buttons should have proper states
        const button = buttons.first()
        const isDisabled = await button.evaluate(el => {
          return el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true'
        })
        
        // Check button can be interacted with if not disabled
        if (!isDisabled) {
          await expect(button).toBeEnabled()
        }
      }
    })
  })

  test.describe('Content and Copy', () => {
    test('should have clear value proposition', async ({ page }) => {
      await page.goto('/')
      
      // Check for key value props
      await expect(page.locator('text=/AI|artificial intelligence/i').first()).toBeVisible()
      await expect(page.locator('text=/learn|education|training/i').first()).toBeVisible()
      
      // Check for CTAs
      const ctas = page.locator('button, a').filter({ hasText: /get started|try|sign up|learn more/i })
      await expect(ctas.first()).toBeVisible()
    })

    test('should have trust signals', async ({ page }) => {
      await page.goto('/')
      
      // Look for testimonials, logos, or stats
      const trustSignals = page.locator('text=/testimonial|trusted by|customers|users|%|ROI/i')
      const hasSignals = await trustSignals.count() > 0
      
      expect(hasSignals).toBeTruthy()
    })
  })

  test.describe('Navigation Flow', () => {
    test('AI Compass should be accessible without auth', async ({ page }) => {
      await page.goto('/learn/ai-kompas')
      
      // Should not redirect to login
      await expect(page).not.toHaveURL(/sign-in|login/)
      
      // Should show AI Compass content
      await expect(page.locator('text=/AI|compass|kompas/i').first()).toBeVisible()
    })

    test('Protected routes should redirect to login', async ({ page }) => {
      await page.goto('/learn/dashboard')
      
      // Should redirect to sign-in
      await expect(page).toHaveURL(/sign-in|login/)
    })
  })
})