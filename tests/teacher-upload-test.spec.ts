import { test, expect } from '@playwright/test';

test.describe('Teacher Upload System Test', () => {
  test('Test teacher upload hub accessibility and functionality', async ({ page }) => {
    console.log('🧪 Testing Teacher Upload System...');
    
    // Test 1: Check if /teach/upload is accessible
    console.log('📍 Testing /teach/upload route...');
    await page.goto('/teach/upload');
    await page.screenshot({ path: 'test-results/teacher-upload-route.png', fullPage: true });
    
    const currentUrl = page.url();
    console.log(`Current URL after /teach/upload: ${currentUrl}`);
    
    // Check if redirected to sign-in (expected for unauthenticated user)
    if (currentUrl.includes('/sign-in')) {
      console.log('✅ Correctly redirected to sign-in (authentication required)');
    } else {
      console.log('🔍 Route accessible - checking content...');
    }
    
    // Test 2: Check teacher dashboard
    console.log('📍 Testing /teach/dashboard route...');
    await page.goto('/teach/dashboard');
    await page.screenshot({ path: 'test-results/teacher-dashboard-route.png', fullPage: true });
    
    console.log(`Teacher dashboard URL: ${page.url()}`);
    
    // Test 3: Check interactive builder
    console.log('📍 Testing /teach/interactive route...');
    await page.goto('/teach/interactive');
    await page.screenshot({ path: 'test-results/teacher-interactive-route.png', fullPage: true });
    
    console.log(`Interactive builder URL: ${page.url()}`);
    
    // Test 4: Check if teacher routes are in navigation
    console.log('📍 Testing navigation for teacher links...');
    await page.goto('/');
    await page.screenshot({ path: 'test-results/homepage-navigation.png', fullPage: true });
    
    // Look for any teacher-related navigation
    const teacherLinks = await page.locator('a[href*="/teach"], button:has-text("Teacher"), a:has-text("Upload")').count();
    console.log(`Found ${teacherLinks} teacher-related navigation elements`);
    
    // Test 5: Check if content loads properly on upload page
    await page.goto('/teach/upload');
    if (!page.url().includes('/sign-in')) {
      console.log('🔍 Upload page loaded - checking for content...');
      
      // Wait for potential loading
      await page.waitForTimeout(3000);
      
      // Check for upload-related content
      const uploadElements = await page.locator('text="Upload", text="Video", text="Document", text="Interactive"').count();
      console.log(`Found ${uploadElements} upload-related elements`);
      
      // Check for forms or input fields
      const inputElements = await page.locator('input, textarea, select, button').count();
      console.log(`Found ${inputElements} form elements`);
    }
  });

  test('Check middleware protection for teacher routes', async ({ page }) => {
    console.log('🔐 Testing teacher route middleware protection...');
    
    const teacherRoutes = ['/teach', '/teach/dashboard', '/teach/upload', '/teach/interactive'];
    
    for (const route of teacherRoutes) {
      console.log(`Testing route: ${route}`);
      await page.goto(route);
      
      const finalUrl = page.url();
      console.log(`Route ${route} → Final URL: ${finalUrl}`);
      
      if (finalUrl.includes('/sign-in')) {
        console.log(`✅ ${route}: Properly protected (redirects to sign-in)`);
      } else if (finalUrl === `http://localhost:3000${route}`) {
        console.log(`⚠️ ${route}: Accessible without authentication`);
      } else {
        console.log(`❓ ${route}: Unexpected redirect to ${finalUrl}`);
      }
      
      await page.screenshot({ path: `test-results/teacher-route-${route.replace(/\//g, '_')}.png`, fullPage: true });
    }
  });

  test('Inspect actual page content and errors', async ({ page }) => {
    console.log('🔍 Inspecting page content and checking for errors...');
    
    const consoleMessages: string[] = [];
    const errors: string[] = [];
    
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(`Page error: ${error.message}`);
    });
    
    // Test upload page with error capturing
    await page.goto('/teach/upload');
    await page.waitForTimeout(5000); // Wait for any async loading
    
    console.log('\n📊 CONSOLE MESSAGES:');
    consoleMessages.forEach(msg => console.log(`  ${msg}`));
    
    if (errors.length > 0) {
      console.log('\n❌ ERRORS FOUND:');
      errors.forEach(error => console.log(`  ERROR: ${error}`));
    } else {
      console.log('\n✅ No JavaScript errors detected');
    }
    
    // Check page content structure
    const pageContent = await page.content();
    const hasUploadContent = pageContent.includes('Upload') || pageContent.includes('Teacher') || pageContent.includes('Content');
    const hasSignInContent = pageContent.includes('Sign in') || pageContent.includes('sign-in');
    
    console.log(`\n📄 PAGE CONTENT ANALYSIS:`);
    console.log(`  Contains upload-related content: ${hasUploadContent}`);
    console.log(`  Contains sign-in content: ${hasSignInContent}`);
    console.log(`  Page title: ${await page.title()}`);
  });
});