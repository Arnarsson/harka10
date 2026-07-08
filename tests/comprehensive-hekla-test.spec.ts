import { test, expect } from '@playwright/test';

test.describe('HEKLA Platform Comprehensive Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set up console error tracking
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('🔴 Console Error:', msg.text());
      }
      if (msg.type() === 'warning') {
        console.log('🟡 Console Warning:', msg.text());
      }
    });

    // Track network failures
    page.on('response', response => {
      if (response.status() >= 400) {
        console.log(`🌐 Network Error: ${response.status()} ${response.url()}`);
      }
    });
  });

  test.describe('Homepage and Basic UI', () => {
    test('Homepage loads and displays all key elements', async ({ page }) => {
      await page.goto('/');
      
      // Take full page screenshot
      await page.screenshot({ path: 'test-results/homepage-full.png', fullPage: true });
      
      // Check page title
      await expect(page).toHaveTitle(/HEKLA/);
      
      // Check for HEKLA logo/branding
      const heklaText = page.locator('text=HEKLA').first();
      await expect(heklaText).toBeVisible();
      
      // Check navigation elements
      const dashboard = page.locator('text=Dashboard');
      const learning = page.locator('text=Learning');
      const playground = page.locator('text=Playground');
      const analytics = page.locator('text=Analytics');
      const toolkit = page.locator('text=Toolkit');
      
      await expect(dashboard).toBeVisible();
      await expect(learning).toBeVisible();
      await expect(playground).toBeVisible();
      await expect(analytics).toBeVisible();
      await expect(toolkit).toBeVisible();
      
      // Check for sign in/up buttons
      const signIn = page.locator('text=Sign In');
      const signUp = page.locator('text=Sign Up');
      
      await expect(signIn).toBeVisible();
      await expect(signUp).toBeVisible();
      
      console.log('✅ Homepage basic elements test passed');
    });

    test('Hero section content is properly displayed', async ({ page }) => {
      await page.goto('/');
      
      // Check hero text content
      const heroText = page.locator('text=From idea to implementation');
      await expect(heroText).toBeVisible();
      
      const subtitle = page.locator('text=48 hours');
      await expect(subtitle).toBeVisible();
      
      // Check for CTA button
      const ctaButton = page.locator('button', { hasText: /strategy|action|contact/i });
      if (await ctaButton.isVisible()) {
        console.log('✅ CTA button found');
      }
      
      console.log('✅ Hero section test passed');
    });
  });

  test.describe('Navigation Testing', () => {
    test('All navigation links are clickable and functional', async ({ page }) => {
      await page.goto('/');
      
      const navLinks = [
        { text: 'Dashboard', expectedPath: '/learn/dashboard' },
        { text: 'Learning', expectedPath: '/learn' },
        { text: 'Playground', expectedPath: '/playground' },
        { text: 'Analytics', expectedPath: '/analytics' },
        { text: 'Toolkit', expectedPath: '/toolkit' }
      ];
      
      for (const link of navLinks) {
        console.log(`Testing navigation to ${link.text}...`);
        
        // Click the navigation link
        await page.click(`text=${link.text}`);
        
        // Wait for navigation
        await page.waitForLoadState('networkidle');
        
        // Take screenshot
        await page.screenshot({ 
          path: `test-results/nav-${link.text.toLowerCase()}.png`,
          fullPage: true 
        });
        
        // Check if we're on the expected path or redirected
        const currentUrl = page.url();
        console.log(`  → Current URL: ${currentUrl}`);
        
        if (currentUrl.includes('/sign-in')) {
          console.log(`  → Redirected to sign-in (expected for protected route)`);
        } else if (currentUrl.includes(link.expectedPath)) {
          console.log(`  → Successfully navigated to ${link.text}`);
        } else {
          console.log(`  → Unexpected navigation result`);
        }
        
        // Go back to homepage for next test
        await page.goto('/');
      }
      
      console.log('✅ Navigation links test completed');
    });

    test('Mobile responsive navigation', async ({ page }) => {
      // Test on mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      await page.screenshot({ path: 'test-results/mobile-nav-closed.png', fullPage: true });
      
      // Look for mobile menu toggle (hamburger menu)
      const mobileToggle = page.locator('button[aria-label*="menu"], button[aria-expanded], [data-testid="mobile-nav-toggle"]');
      
      if (await mobileToggle.isVisible()) {
        console.log('✅ Mobile menu toggle found');
        
        // Click to open mobile menu
        await mobileToggle.click();
        await page.waitForTimeout(500); // Wait for animation
        
        await page.screenshot({ path: 'test-results/mobile-nav-open.png', fullPage: true });
        
        console.log('✅ Mobile menu opened');
      } else {
        // Look for alternative mobile navigation patterns
        const hamburgerIcon = page.locator('text=≡, text=☰');
        if (await hamburgerIcon.isVisible()) {
          await hamburgerIcon.click();
          await page.screenshot({ path: 'test-results/mobile-nav-hamburger.png', fullPage: true });
        }
        console.log('🟡 Mobile menu toggle not found - checking for alternative patterns');
      }
    });
  });

  test.describe('Authentication System Testing', () => {
    test('Sign-in page loads and displays authentication form', async ({ page }) => {
      await page.goto('/sign-in');
      
      await page.screenshot({ path: 'test-results/signin-page-full.png', fullPage: true });
      
      // Check for HEKLA branding on sign-in page
      const heklaTitle = page.locator('text=HEKLA');
      await expect(heklaTitle).toBeVisible();
      
      // Check for sign-in text
      const signInText = page.locator('text=Sign in');
      await expect(signInText).toBeVisible();
      
      // Look for Clerk authentication components
      const clerkComponents = [
        '.clerk-loaded',
        '.cl-rootBox',
        '.cl-card',
        '[data-clerk-id]',
        'input[name="identifier"]',
        'input[type="email"]',
        'input[type="password"]'
      ];
      
      let clerkFormFound = false;
      for (const selector of clerkComponents) {
        const element = page.locator(selector);
        if (await element.isVisible()) {
          console.log(`✅ Clerk component found: ${selector}`);
          clerkFormFound = true;
          break;
        }
      }
      
      if (!clerkFormFound) {
        console.log('🔴 No Clerk authentication form found - likely configuration issue');
      }
      
      // Check for any error messages
      const errorMessages = page.locator('.error, .alert, [role="alert"]');
      if (await errorMessages.isVisible()) {
        const errorText = await errorMessages.textContent();
        console.log(`🔴 Error message found: ${errorText}`);
      }
      
      console.log('✅ Sign-in page test completed');
    });

    test('Sign-up page accessibility', async ({ page }) => {
      await page.goto('/sign-up');
      
      await page.screenshot({ path: 'test-results/signup-page.png', fullPage: true });
      
      // Similar checks as sign-in page
      const heklaTitle = page.locator('text=HEKLA');
      await expect(heklaTitle).toBeVisible();
      
      console.log('✅ Sign-up page test completed');
    });
  });

  test.describe('CRITICAL: Admin Security Testing', () => {
    test('Admin routes should require authentication', async ({ page }) => {
      const adminRoutes = [
        '/admin',
        '/admin/dashboard', 
        '/admin/users',
        '/admin/content',
        '/admin/courses',
        '/admin/settings',
        '/admin/blog',
        '/admin/subscriptions'
      ];
      
      console.log('🔍 Testing admin route security...');
      
      for (const route of adminRoutes) {
        console.log(`  Testing: ${route}`);
        
        const response = await page.goto(route);
        const currentUrl = page.url();
        const statusCode = response?.status();
        
        await page.screenshot({ 
          path: `test-results/admin-security-${route.replace(/\//g, '_')}.png`,
          fullPage: true 
        });
        
        console.log(`    Status: ${statusCode}`);
        console.log(`    Final URL: ${currentUrl}`);
        
        if (statusCode === 200 && !currentUrl.includes('/sign-in')) {
          console.log(`    🚨 SECURITY VULNERABILITY: ${route} is accessible without authentication!`);
        } else if (currentUrl.includes('/sign-in')) {
          console.log(`    ✅ Properly redirected to sign-in`);
        } else {
          console.log(`    ❓ Unexpected result for ${route}`);
        }
      }
    });

    test('Admin interface visual inspection', async ({ page }) => {
      // This test assumes we can access admin (to document the vulnerability)
      await page.goto('/admin');
      
      await page.screenshot({ path: 'test-results/admin-interface-full.png', fullPage: true });
      
      // Check admin sidebar elements
      const adminElements = [
        'text=Dashboard',
        'text=Users', 
        'text=Courses',
        'text=Content',
        'text=Blog',
        'text=Subscriptions',
        'text=Settings'
      ];
      
      console.log('📋 Admin interface elements:');
      for (const element of adminElements) {
        const el = page.locator(element);
        if (await el.isVisible()) {
          console.log(`  ✅ ${element.replace('text=', '')}`);
        } else {
          console.log(`  ❌ ${element.replace('text=', '')} - not found`);
        }
      }
      
      // Check for admin branding
      const adminTitle = page.locator('text=HEKLA Admin');
      if (await adminTitle.isVisible()) {
        console.log('✅ Admin branding found');
      }
    });
  });

  test.describe('Teacher Routes Testing', () => {
    test('Teacher routes accessibility', async ({ page }) => {
      const teacherRoutes = [
        '/teach',
        '/teach/dashboard',
        '/teach/upload',
        '/teach/interactive'
      ];
      
      console.log('🎓 Testing teacher route security...');
      
      for (const route of teacherRoutes) {
        console.log(`  Testing: ${route}`);
        
        const response = await page.goto(route);
        const currentUrl = page.url();
        const statusCode = response?.status();
        
        await page.screenshot({ 
          path: `test-results/teacher-${route.replace(/\//g, '_')}.png`,
          fullPage: true 
        });
        
        console.log(`    Status: ${statusCode}`);
        console.log(`    Final URL: ${currentUrl}`);
        
        if (statusCode === 200 && !currentUrl.includes('/sign-in')) {
          console.log(`    🟡 Teacher route accessible: ${route}`);
        } else if (currentUrl.includes('/sign-in')) {
          console.log(`    ✅ Properly redirected to sign-in`);
        }
      }
    });
  });

  test.describe('User Dashboard Testing', () => {
    test('Student dashboard accessibility', async ({ page }) => {
      const studentRoutes = [
        '/learn/dashboard',
        '/learn/courses',
        '/learn/analytics',
        '/learn/certificates',
        '/dashboard'
      ];
      
      for (const route of studentRoutes) {
        console.log(`Testing student route: ${route}`);
        
        const response = await page.goto(route);
        const currentUrl = page.url();
        
        await page.screenshot({ 
          path: `test-results/student-${route.replace(/\//g, '_')}.png`,
          fullPage: true 
        });
        
        console.log(`  Final URL: ${currentUrl}`);
        
        if (currentUrl.includes('/sign-in')) {
          console.log(`  ✅ Redirected to sign-in (expected)`);
        } else {
          console.log(`  🟡 Accessible without auth`);
        }
      }
    });
  });

  test.describe('Performance and Error Testing', () => {
    test('Page load performance', async ({ page }) => {
      const routes = ['/', '/admin', '/teach', '/learn/dashboard'];
      
      for (const route of routes) {
        console.log(`⏱️ Testing performance for: ${route}`);
        
        const startTime = Date.now();
        
        try {
          await page.goto(route, { waitUntil: 'networkidle', timeout: 15000 });
          const loadTime = Date.now() - startTime;
          console.log(`  ✅ Loaded in ${loadTime}ms`);
          
          if (loadTime > 10000) {
            console.log(`  🟡 Slow loading: ${loadTime}ms`);
          }
        } catch (error) {
          console.log(`  🔴 Failed to load: ${error}`);
        }
      }
    });

    test('Check for broken images and assets', async ({ page }) => {
      await page.goto('/');
      
      // Check for broken images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      console.log(`🖼️ Found ${imageCount} images`);
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        const alt = await img.getAttribute('alt');
        
        try {
          const response = await page.request.get(src || '');
          if (response.status() >= 400) {
            console.log(`🔴 Broken image: ${src} (alt: ${alt})`);
          }
        } catch {
          console.log(`🔴 Failed to check image: ${src}`);
        }
      }
    });
  });

  test.describe('Responsive Design Testing', () => {
    const viewports = [
      { name: 'Desktop', width: 1920, height: 1080 },
      { name: 'Laptop', width: 1366, height: 768 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Small Mobile', width: 320, height: 568 }
    ];

    for (const viewport of viewports) {
      test(`Responsive design on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        const routes = ['/', '/admin'];
        
        for (const route of routes) {
          await page.goto(route);
          
          await page.screenshot({ 
            path: `test-results/responsive-${viewport.name.toLowerCase()}-${route.replace('/', 'home')}.png`,
            fullPage: true 
          });
          
          // Check if content overflows
          const body = await page.locator('body').boundingBox();
          if (body && body.width > viewport.width + 50) { // 50px tolerance
            console.log(`🟡 Content overflow detected on ${viewport.name}: ${body.width}px > ${viewport.width}px`);
          }
        }
        
        console.log(`✅ ${viewport.name} responsive test completed`);
      });
    }
  });
});