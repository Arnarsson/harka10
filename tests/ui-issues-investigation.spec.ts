import { test, expect } from '@playwright/test';

test.describe('UI and Admin Issues Investigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto('/');
  });

  test('Homepage loads and basic UI elements are visible', async ({ page }) => {
    // Take screenshot of homepage
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/HARKA/i);
    
    // Check for basic navigation elements
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check for main content
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Log any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
  });

  test('Navigation elements are properly styled and visible', async ({ page }) => {
    // Check navigation bar
    const nav = page.locator('nav');
    if (await nav.isVisible()) {
      await page.screenshot({ path: 'test-results/navigation.png' });
      
      // Check for navigation links
      const navLinks = page.locator('nav a');
      const linkCount = await navLinks.count();
      console.log(`Found ${linkCount} navigation links`);
      
      for (let i = 0; i < linkCount; i++) {
        const link = navLinks.nth(i);
        const text = await link.textContent();
        const isVisible = await link.isVisible();
        console.log(`Link "${text}": visible=${isVisible}`);
      }
    }
    
    // Check for mobile navigation toggle
    const mobileToggle = page.locator('[data-testid="mobile-nav-toggle"], button:has-text("Menu")');
    if (await mobileToggle.isVisible()) {
      console.log('Mobile navigation toggle found');
    }
  });

  test('Check admin routes accessibility', async ({ page }) => {
    // Try to access admin routes directly
    const adminRoutes = [
      '/admin',
      '/admin/dashboard',
      '/admin/users',
      '/admin/content',
      '/admin/settings'
    ];
    
    for (const route of adminRoutes) {
      console.log(`Testing admin route: ${route}`);
      
      const response = await page.goto(route);
      const currentUrl = page.url();
      
      console.log(`Route ${route}: Status=${response?.status()}, Final URL=${currentUrl}`);
      
      // Take screenshot of the page
      await page.screenshot({ 
        path: `test-results/admin-route-${route.replace(/\//g, '_')}.png`,
        fullPage: true 
      });
      
      // Check if redirected to sign-in
      if (currentUrl.includes('/sign-in')) {
        console.log(`Route ${route}: Redirected to sign-in (expected for unauthenticated user)`);
      } else if (currentUrl === route) {
        console.log(`Route ${route}: Accessed directly`);
      } else {
        console.log(`Route ${route}: Redirected to ${currentUrl}`);
      }
      
      // Check for error messages or empty content
      const errorMessage = page.locator('text="Error", text="Not found", text="404"');
      if (await errorMessage.isVisible()) {
        console.log(`Route ${route}: Error message found`);
      }
    }
  });

  test('Check responsive design on different screen sizes', async ({ page }) => {
    const screenSizes = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const size of screenSizes) {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.reload();
      
      // Take screenshot at this size
      await page.screenshot({ 
        path: `test-results/responsive-${size.name}.png`,
        fullPage: true 
      });
      
      // Check if navigation is properly responsive
      const nav = page.locator('nav');
      const mobileNav = page.locator('[data-testid="mobile-nav"], .mobile-nav');
      
      console.log(`Screen size ${size.name} (${size.width}x${size.height}):`);
      console.log(`- Main nav visible: ${await nav.isVisible()}`);
      console.log(`- Mobile nav visible: ${await mobileNav.isVisible()}`);
      
      // Check if content overflows or is cut off
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      if (bodyBox && bodyBox.width > size.width) {
        console.log(`- WARNING: Content width (${bodyBox.width}) exceeds viewport width (${size.width})`);
      }
    }
  });

  test('Check for CSS styling issues', async ({ page }) => {
    // Check for common styling issues
    
    // 1. Check if Tailwind CSS is loading
    const hasBaseStyles = await page.evaluate(() => {
      const body = window.getComputedStyle(document.body);
      return body.margin !== '0px' || body.padding !== '0px';
    });
    
    console.log(`Base styles applied: ${hasBaseStyles}`);
    
    // 2. Check for elements with broken styling
    const elementsWithoutStyling = await page.locator('*').evaluateAll((elements) => {
      return elements.filter(el => {
        const styles = window.getComputedStyle(el);
        return styles.display === 'none' && el.textContent && el.textContent.trim().length > 0;
      }).map(el => ({
        tagName: el.tagName,
        textContent: el.textContent?.substring(0, 50),
        className: el.className
      }));
    });
    
    if (elementsWithoutStyling.length > 0) {
      console.log('Elements that might have styling issues:');
      elementsWithoutStyling.forEach(el => {
        console.log(`- ${el.tagName}.${el.className}: "${el.textContent}"`);
      });
    }
    
    // 3. Check for missing images or broken assets
    const brokenImages = await page.locator('img').evaluateAll((images) => {
      return images.filter(img => !img.complete || img.naturalWidth === 0)
                  .map(img => img.src);
    });
    
    if (brokenImages.length > 0) {
      console.log('Broken images found:', brokenImages);
    }
  });

  test('Check authentication flow and role detection', async ({ page }) => {
    // Go to sign-in page
    await page.goto('/sign-in');
    await page.screenshot({ path: 'test-results/sign-in-page.png', fullPage: true });
    
    // Check if Clerk sign-in form is present
    const clerkForm = page.locator('.cl-rootBox, .clerk-loaded, [data-clerk-id]');
    const isClerkLoaded = await clerkForm.isVisible();
    
    console.log(`Clerk authentication form loaded: ${isClerkLoaded}`);
    
    if (!isClerkLoaded) {
      // Check for error messages
      const errorText = await page.textContent('body');
      if (errorText?.includes('CLERK') || errorText?.includes('API')) {
        console.log('Possible Clerk API key issue detected');
      }
    }
    
    // Check environment variables indication
    const hasDevWarning = await page.locator('text="development", text="API key", text="environment"').isVisible();
    if (hasDevWarning) {
      console.log('Development environment warnings detected');
    }
  });

  test('Check for JavaScript errors and console warnings', async ({ page }) => {
    const consoleMessages: string[] = [];
    const jsErrors: string[] = [];
    
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      jsErrors.push(`Page error: ${error.message}`);
    });
    
    // Navigate through key pages
    const pagesToTest = ['/', '/learn/dashboard', '/teach/dashboard', '/admin/dashboard'];
    
    for (const pagePath of pagesToTest) {
      console.log(`Testing page: ${pagePath}`);
      await page.goto(pagePath);
      await page.waitForTimeout(2000); // Wait for any async operations
    }
    
    console.log('\n=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => console.log(msg));
    
    if (jsErrors.length > 0) {
      console.log('\n=== JAVASCRIPT ERRORS ===');
      jsErrors.forEach(error => console.log(`ERROR: ${error}`));
    }
    
    // Take final screenshot of dashboard
    await page.goto('/learn/dashboard');
    await page.screenshot({ path: 'test-results/final-dashboard.png', fullPage: true });
  });
});