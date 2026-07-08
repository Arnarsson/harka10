import { test, expect } from '@playwright/test';

test.describe('HEKLA Security and Critical Issues Test', () => {
  
  test.beforeEach(async ({ page }) => {
    // Track console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('🔴 Console Error:', msg.text());
      }
    });
  });

  test('🚨 CRITICAL: Admin routes security vulnerability test', async ({ page }) => {
    const adminRoutes = [
      '/admin',
      '/admin/dashboard', 
      '/admin/users',
      '/admin/content',
      '/admin/settings'
    ];
    
    console.log('🔍 Testing admin route security (CRITICAL TEST)...');
    
    for (const route of adminRoutes) {
      console.log(`  Testing: ${route}`);
      
      try {
        const response = await page.goto(route, { timeout: 10000 });
        const currentUrl = page.url();
        const statusCode = response?.status();
        
        await page.screenshot({ 
          path: `test-results/security-${route.replace(/\//g, '_')}.png`,
          fullPage: true 
        });
        
        console.log(`    Status: ${statusCode}`);
        console.log(`    Final URL: ${currentUrl}`);
        
        if (statusCode === 200 && !currentUrl.includes('/sign-in')) {
          console.log(`    🚨 SECURITY VULNERABILITY: ${route} is accessible without authentication!`);
        } else if (currentUrl.includes('/sign-in')) {
          console.log(`    ✅ Properly protected - redirected to sign-in`);
        } else {
          console.log(`    ❓ Unexpected result for ${route}`);
        }
      } catch (error) {
        console.log(`    🔴 Error accessing ${route}: ${error}`);
      }
    }
  });

  test('Authentication system status check', async ({ page }) => {
    console.log('🔐 Testing authentication system...');
    
    // Test sign-in page
    try {
      await page.goto('/sign-in', { timeout: 10000 });
      
      await page.screenshot({ path: 'test-results/auth-signin-check.png', fullPage: true });
      
      // Look for Clerk components
      const clerkSelectors = ['.cl-rootBox', '.clerk-loaded', 'input[type="email"]'];
      let clerkFound = false;
      
      for (const selector of clerkSelectors) {
        if (await page.locator(selector).isVisible()) {
          console.log(`  ✅ Clerk component found: ${selector}`);
          clerkFound = true;
          break;
        }
      }
      
      if (!clerkFound) {
        console.log('  🔴 Clerk authentication system not loading properly');
      }
      
      // Check for HEKLA branding
      const harkaTitle = page.locator('text=HEKLA');
      if (await harkaTitle.isVisible()) {
        console.log('  ✅ HEKLA branding present');
      }
      
    } catch (error) {
      console.log(`  🔴 Sign-in page error: ${error}`);
    }
  });

  test('Homepage visual and functional check', async ({ page }) => {
    console.log('🏠 Testing homepage...');
    
    try {
      await page.goto('/', { timeout: 10000 });
      
      await page.screenshot({ path: 'test-results/homepage-check.png', fullPage: true });
      
      // Check key elements
      const elements = [
        { selector: 'text=HEKLA', name: 'HEKLA branding' },
        { selector: 'text=Dashboard', name: 'Navigation - Dashboard' },
        { selector: 'text=Sign In', name: 'Sign In button' },
        { selector: 'text=Sign Up', name: 'Sign Up button' },
        { selector: 'text=48 hours', name: 'Hero content' }
      ];
      
      for (const element of elements) {
        const locator = page.locator(element.selector);
        if (await locator.isVisible()) {
          console.log(`  ✅ ${element.name} found`);
        } else {
          console.log(`  ❌ ${element.name} not found`);
        }
      }
      
    } catch (error) {
      console.log(`  🔴 Homepage error: ${error}`);
    }
  });

  test('Navigation click test (quick)', async ({ page }) => {
    console.log('🧭 Testing navigation clicks...');
    
    try {
      await page.goto('/', { timeout: 10000 });
      
      // Test Dashboard click
      const dashboardLink = page.locator('text=Dashboard').first();
      if (await dashboardLink.isVisible()) {
        await dashboardLink.click();
        await page.waitForTimeout(2000); // Wait 2 seconds
        
        const currentUrl = page.url();
        console.log(`  Dashboard click result: ${currentUrl}`);
        
        await page.screenshot({ path: 'test-results/nav-dashboard-result.png', fullPage: true });
        
        if (currentUrl.includes('/sign-in')) {
          console.log('  ✅ Dashboard properly protected - redirected to sign-in');
        } else if (currentUrl.includes('/dashboard')) {
          console.log('  🟡 Dashboard accessible without auth');
        }
      }
      
    } catch (error) {
      console.log(`  🔴 Navigation test error: ${error}`);
    }
  });

  test('Mobile responsive quick check', async ({ page }) => {
    console.log('📱 Testing mobile responsiveness...');
    
    try {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/', { timeout: 10000 });
      
      await page.screenshot({ path: 'test-results/mobile-responsive-check.png', fullPage: true });
      
      // Look for mobile menu trigger
      const mobileMenuTrigger = page.locator('button:has-text("☰"), button:has-text("≡"), [aria-label*="menu"]');
      if (await mobileMenuTrigger.isVisible()) {
        console.log('  ✅ Mobile menu trigger found');
      } else {
        console.log('  🟡 Mobile menu trigger not obvious');
      }
      
    } catch (error) {
      console.log(`  🔴 Mobile test error: ${error}`);
    }
  });

  test('Performance quick check', async ({ page }) => {
    console.log('⚡ Testing performance...');
    
    const routes = ['/', '/admin'];
    
    for (const route of routes) {
      try {
        const startTime = Date.now();
        await page.goto(route, { timeout: 10000, waitUntil: 'domcontentloaded' });
        const loadTime = Date.now() - startTime;
        
        console.log(`  ${route}: ${loadTime}ms`);
        
        if (loadTime > 5000) {
          console.log(`    🟡 Slow loading: ${loadTime}ms`);
        } else {
          console.log(`    ✅ Good loading time`);
        }
        
      } catch (error) {
        console.log(`  🔴 ${route} failed to load: ${error}`);
      }
    }
  });

  test('Console errors and network issues check', async ({ page }) => {
    console.log('🔍 Checking for errors...');
    
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    page.on('response', response => {
      if (response.status() >= 400) {
        networkErrors.push(`${response.status()} ${response.url()}`);
      }
    });
    
    try {
      await page.goto('/', { timeout: 10000 });
      await page.waitForTimeout(3000); // Wait for potential errors to surface
      
      console.log(`  Console errors found: ${consoleErrors.length}`);
      console.log(`  Network errors found: ${networkErrors.length}`);
      
      if (consoleErrors.length > 0) {
        console.log('  🔴 Console errors:');
        consoleErrors.slice(0, 3).forEach(error => console.log(`    - ${error}`));
      }
      
      if (networkErrors.length > 0) {
        console.log('  🌐 Network errors:');
        networkErrors.slice(0, 3).forEach(error => console.log(`    - ${error}`));
      }
      
    } catch (error) {
      console.log(`  🔴 Error checking failed: ${error}`);
    }
  });
});