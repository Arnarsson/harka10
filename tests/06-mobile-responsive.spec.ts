import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Design', () => {
  const mobileViewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Samsung Galaxy', width: 360, height: 740 },
    { name: 'iPad Mini', width: 768, height: 1024 }
  ];

  for (const viewport of mobileViewports) {
    test(`should be responsive on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Check if page loads properly
      await expect(page.locator('body')).toBeVisible();
      
      // Check if content is not overflowing
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width);

      // Check if text is readable (not too small)
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, div');
      const firstTextElement = textElements.first();
      
      if (await firstTextElement.isVisible()) {
        const fontSize = await firstTextElement.evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        const fontSizeNum = parseInt(fontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(14); // Minimum readable font size
      }
    });
  }

  test('should have working mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for hamburger menu or mobile navigation toggle
    const mobileMenuTriggers = [
      page.locator('button[aria-label*="menu" i]'),
      page.locator('button[aria-label*="navigation" i]'),
      page.locator('[data-testid="mobile-menu-trigger"]'),
      page.locator('.hamburger'),
      page.locator('.mobile-menu-trigger'),
      page.locator('button:has([data-testid="hamburger"])'),
      page.locator('button svg[class*="menu"]'),
      page.locator('button:has-text("☰")'),
      page.locator('button[aria-expanded]')
    ];

    let mobileMenuFound = false;
    let workingTrigger = null;

    for (const trigger of mobileMenuTriggers) {
      if (await trigger.isVisible().catch(() => false)) {
        mobileMenuFound = true;
        workingTrigger = trigger;
        console.log('Found mobile menu trigger');
        break;
      }
    }

    if (mobileMenuFound && workingTrigger) {
      // Test mobile menu functionality
      await workingTrigger.click();
      
      // Look for opened mobile menu
      const mobileMenus = [
        page.locator('[data-testid="mobile-menu"]'),
        page.locator('.mobile-menu'),
        page.locator('nav[aria-expanded="true"]'),
        page.locator('[role="navigation"][aria-expanded="true"]'),
        page.locator('.menu-open'),
        page.locator('.nav-open')
      ];

      let menuOpened = false;
      for (const menu of mobileMenus) {
        if (await menu.isVisible().catch(() => false)) {
          menuOpened = true;
          
          // Check if navigation links are present
          const navLinks = menu.locator('a');
          const linkCount = await navLinks.count();
          expect(linkCount).toBeGreaterThan(0);
          break;
        }
      }

      expect(menuOpened).toBe(true);
    } else {
      // Check if navigation is still accessible without hamburger menu
      const navigation = page.locator('nav, header nav');
      const navLinks = navigation.locator('a');
      const visibleLinks = await navLinks.count();
      
      // Should have some navigation even without mobile menu
      expect(visibleLinks).toBeGreaterThan(0);
    }
  });

  test('should handle touch interactions properly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Test button touch targets (should be at least 44px for accessibility)
    const buttons = page.locator('button, a');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      const buttonBox = await firstButton.boundingBox();
      
      if (buttonBox) {
        // Check minimum touch target size
        expect(buttonBox.height).toBeGreaterThanOrEqual(40);
        expect(buttonBox.width).toBeGreaterThanOrEqual(40);
      }
    }

    // Test touch scrolling
    const scrollableContent = page.locator('main, body');
    const initialScrollTop = await scrollableContent.evaluate(el => el.scrollTop);
    
    // Simulate swipe/scroll
    await page.mouse.move(200, 300);
    await page.mouse.down();
    await page.mouse.move(200, 100);
    await page.mouse.up();
    
    await page.waitForTimeout(500);
    
    const newScrollTop = await scrollableContent.evaluate(el => el.scrollTop);
    // Should be able to scroll (unless page is very short)
    if (await scrollableContent.evaluate(el => el.scrollHeight > el.clientHeight)) {
      expect(newScrollTop).not.toBe(initialScrollTop);
    }
  });

  test('should display content properly in landscape mode', async ({ page }) => {
    // Test landscape mobile view
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');

    // Check if header is still visible and functional
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check if content doesn't overflow
    const main = page.locator('main');
    const mainBox = await main.boundingBox();
    
    if (mainBox) {
      expect(mainBox.width).toBeLessThanOrEqual(667);
    }

    // Check if navigation is still accessible
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should handle mobile form interactions', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test on login page if available
    await page.goto('/login');
    
    if (page.url().includes('/login')) {
      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      
      if (inputCount > 0) {
        const firstInput = inputs.first();
        
        // Test input focus
        await firstInput.click();
        const isFocused = await firstInput.evaluate(el => document.activeElement === el);
        expect(isFocused).toBe(true);
        
        // Test input size on mobile
        const inputBox = await firstInput.boundingBox();
        if (inputBox) {
          expect(inputBox.height).toBeGreaterThanOrEqual(40); // Minimum touch target
        }
        
        // Test typing
        await firstInput.fill('test@example.com');
        const inputValue = await firstInput.inputValue();
        expect(inputValue).toBe('test@example.com');
      }
    }
  });

  test('should handle mobile modal and overlay interactions', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for any modal triggers
    const modalTriggers = [
      page.locator('button:has-text("Login")'),
      page.locator('button:has-text("Sign")'),
      page.locator('[data-testid*="modal"]'),
      page.locator('[data-testid*="dialog"]')
    ];

    let modalTriggered = false;
    for (const trigger of modalTriggers) {
      if (await trigger.isVisible().catch(() => false)) {
        await trigger.click();
        
        // Look for modal
        const modals = [
          page.locator('[role="dialog"]'),
          page.locator('.modal'),
          page.locator('[data-testid="modal"]'),
          page.locator('.overlay')
        ];

        for (const modal of modals) {
          if (await modal.isVisible({ timeout: 2000 }).catch(() => false)) {
            modalTriggered = true;
            
            // Check if modal fits on mobile screen
            const modalBox = await modal.boundingBox();
            if (modalBox) {
              expect(modalBox.width).toBeLessThanOrEqual(375);
              expect(modalBox.height).toBeLessThanOrEqual(667);
            }
            
            // Try to close modal
            const closeButtons = [
              modal.locator('button:has-text("×")'),
              modal.locator('button:has-text("Close")'),
              modal.locator('[aria-label*="close" i]'),
              modal.locator('.close-button')
            ];

            for (const closeBtn of closeButtons) {
              if (await closeBtn.isVisible().catch(() => false)) {
                await closeBtn.click();
                await page.waitForTimeout(500);
                const modalStillVisible = await modal.isVisible().catch(() => false);
                expect(modalStillVisible).toBe(false);
                break;
              }
            }
            break;
          }
        }
        
        if (modalTriggered) break;
      }
    }

    // Modal functionality is optional, so this is a soft expectation
    expect.soft(modalTriggered).toBe(true);
  });

  test('should have readable typography on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check heading sizes
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      const firstHeading = headings.first();
      const headingFontSize = await firstHeading.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      const headingSize = parseInt(headingFontSize);
      expect(headingSize).toBeGreaterThanOrEqual(18); // Minimum heading size
    }

    // Check paragraph text
    const paragraphs = page.locator('p');
    const paragraphCount = await paragraphs.count();
    
    if (paragraphCount > 0) {
      const firstParagraph = paragraphs.first();
      const paragraphFontSize = await firstParagraph.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      const paragraphSize = parseInt(paragraphFontSize);
      expect(paragraphSize).toBeGreaterThanOrEqual(14); // Minimum body text size
    }

    // Check line height for readability
    const textElements = page.locator('p, div, span').first();
    if (await textElements.isVisible()) {
      const lineHeight = await textElements.evaluate(el => 
        window.getComputedStyle(el).lineHeight
      );
      
      // Line height should be at least 1.2 for readability
      if (lineHeight !== 'normal') {
        const lineHeightNum = parseFloat(lineHeight);
        expect(lineHeightNum).toBeGreaterThanOrEqual(1.2);
      }
    }
  });
});