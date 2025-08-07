import { test, expect } from '@playwright/test';

test.describe('Production Site Testing - ethos-ai.cc', () => {
  test.use({ baseURL: 'https://www.ethos-ai.cc' });

  test('Homepage loads properly', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: 'test-results/production-homepage.png', fullPage: true });
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/HARKA/i);
    console.log('✅ Homepage loads with correct title');
    
    // Check for navigation elements
    const hasNavigation = await page.locator('nav, header').isVisible();
    console.log(`Navigation visible: ${hasNavigation}`);
    
    // Look for teacher-related links in navigation
    const teacherLinks = await page.locator('a[href*="/teach"], button:has-text("Teacher"), a:has-text("Upload")').count();
    console.log(`Found ${teacherLinks} teacher-related navigation elements`);
  });

  test('Teacher routes are properly protected', async ({ page }) => {
    const teacherRoutes = [
      '/teach',
      '/teach/upload', 
      '/teach/dashboard',
      '/teach/interactive'
    ];
    
    for (const route of teacherRoutes) {
      console.log(`Testing teacher route: ${route}`);
      await page.goto(route);
      
      const finalUrl = page.url();
      console.log(`${route} → ${finalUrl}`);
      
      // Should redirect to sign-in
      if (finalUrl.includes('/sign-in')) {
        console.log(`✅ ${route}: Properly protected (redirects to sign-in)`);
      } else {
        console.log(`⚠️ ${route}: Unexpected behavior - ${finalUrl}`);
      }
      
      await page.screenshot({ path: `test-results/prod-teacher-${route.replace(/\//g, '_')}.png`, fullPage: true });
    }
  });

  test('Admin routes are properly protected', async ({ page }) => {
    const adminRoutes = ['/admin', '/admin/dashboard', '/admin/users'];
    
    for (const route of adminRoutes) {
      console.log(`Testing admin route: ${route}`);
      await page.goto(route);
      
      const finalUrl = page.url();
      console.log(`${route} → ${finalUrl}`);
      
      if (finalUrl.includes('/sign-in')) {
        console.log(`✅ ${route}: Properly protected (redirects to sign-in)`);
      } else {
        console.log(`⚠️ ${route}: Unexpected behavior - ${finalUrl}`);
      }
    }
  });

  test('Sign-in page functionality', async ({ page }) => {
    await page.goto('/sign-in');
    await page.screenshot({ path: 'test-results/prod-sign-in-page.png', fullPage: true });
    
    console.log('📍 Testing sign-in page...');
    
    // Wait for Clerk to potentially load
    await page.waitForTimeout(3000);
    
    // Check if Clerk authentication form loads
    const clerkLoaded = await page.locator('.cl-rootBox, .clerk-loaded, [data-clerk-id]').isVisible();
    console.log(`Clerk authentication form loaded: ${clerkLoaded}`);
    
    // Check for basic form elements
    const formElements = await page.locator('input, button, form').count();
    console.log(`Found ${formElements} form elements on sign-in page`);
    
    // Check page content
    const hasSignInContent = await page.locator('text="sign in", text="Sign in", text="Sign up"').isVisible();
    console.log(`Contains sign-in related content: ${hasSignInContent}`);
  });

  test('Check site navigation and teacher access points', async ({ page }) => {
    await page.goto('/');
    
    // Look for any way to access teacher functionality
    console.log('🔍 Searching for teacher access points...');
    
    // Check main navigation
    const navLinks = await page.locator('nav a, header a').all();
    console.log(`Found ${navLinks.length} navigation links`);
    
    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      if (href && (href.includes('teach') || href.includes('upload') || href.includes('admin'))) {
        console.log(`🎯 Found teacher/admin link: "${text}" → ${href}`);
      }
    }
    
    // Check for any buttons or elements that might lead to teacher functionality
    const teacherButtons = await page.locator('button:has-text("Teacher"), button:has-text("Upload"), a:has-text("Teacher"), a:has-text("Upload")').all();
    console.log(`Found ${teacherButtons.length} potential teacher access buttons`);
    
    for (const button of teacherButtons) {
      const text = await button.textContent();
      console.log(`🎯 Teacher access button: "${text}"`);
    }
  });

  test('Test responsive design', async ({ page }) => {
    // Test on mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.screenshot({ path: 'test-results/prod-mobile.png', fullPage: true });
    
    // Check for mobile navigation
    const mobileNav = await page.locator('[data-testid="mobile-nav"], .mobile-nav, button:has-text("Menu")').isVisible();
    console.log(`Mobile navigation visible: ${mobileNav}`);
    
    // Test on desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.screenshot({ path: 'test-results/prod-desktop.png', fullPage: true });
  });
});