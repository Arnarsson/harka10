import { test, expect } from '@playwright/test';

test.describe('Live Site Teacher Navigation Test', () => {
  test.use({ baseURL: 'https://www.ethos-ai.cc' });

  test('Check for teacher navigation on mobile', async ({ page }) => {
    console.log('🧪 Testing live site for teacher navigation...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Go to homepage
    await page.goto('/');
    await page.screenshot({ path: 'test-results/live-homepage-mobile.png', fullPage: true });
    
    console.log('📱 Checking mobile navigation...');
    
    // Look for hamburger menu and click it
    const mobileMenuButton = page.locator('button:has-text("Menu"), [data-testid="mobile-menu"], button:has(svg)').first();
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      console.log('✅ Mobile menu opened');
      
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/live-mobile-menu-open.png', fullPage: true });
      
      // Look for teacher-related items
      const teacherSection = page.locator('text="Teacher Tools", text="Teach", text="Upload Content"');
      const teacherItemsCount = await teacherSection.count();
      
      console.log(`Found ${teacherItemsCount} teacher-related items in mobile menu`);
      
      if (teacherItemsCount > 0) {
        console.log('🎉 Teacher navigation found in mobile menu!');
        
        // Try to find specific teacher links
        const uploadLink = page.locator('a[href="/teach/upload"], text="Upload Content"');
        const teacherDashLink = page.locator('a[href="/teach/dashboard"], text="Teacher Dashboard"');
        const interactiveLink = page.locator('a[href="/teach/interactive"], text="Interactive Builder"');
        
        console.log(`Upload Content link: ${await uploadLink.isVisible()}`);
        console.log(`Teacher Dashboard link: ${await teacherDashLink.isVisible()}`);  
        console.log(`Interactive Builder link: ${await interactiveLink.isVisible()}`);
      } else {
        console.log('❌ No teacher navigation found in mobile menu');
      }
    } else {
      console.log('❌ Could not find mobile menu button');
    }
  });

  test('Check for teacher navigation on desktop', async ({ page }) => {
    console.log('🖥️ Testing desktop navigation...');
    
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto('/');
    await page.screenshot({ path: 'test-results/live-homepage-desktop.png', fullPage: true });
    
    // Look for Teach button in desktop nav
    const teachButton = page.locator('button:has-text("Teach"), a:has-text("Teach")');
    const teachButtonVisible = await teachButton.isVisible();
    
    console.log(`Desktop "Teach" button visible: ${teachButtonVisible}`);
    
    if (teachButtonVisible) {
      console.log('🎉 Found Teach button in desktop navigation!');
      
      // Try to click it and see dropdown
      await teachButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-results/live-teach-dropdown.png', fullPage: true });
      
      const uploadOption = page.locator('text="Upload Content"');
      console.log(`Upload Content option in dropdown: ${await uploadOption.isVisible()}`);
    } else {
      console.log('❌ No Teach button found in desktop navigation');
      
      // Check what navigation items are actually present
      const navItems = await page.locator('nav a, nav button').allTextContents();
      console.log('Available navigation items:', navItems);
    }
  });

  test('Test direct access to teacher upload route', async ({ page }) => {
    console.log('🔗 Testing direct access to teacher upload route...');
    
    await page.goto('/teach/upload');
    const finalUrl = page.url();
    
    console.log(`/teach/upload → ${finalUrl}`);
    
    if (finalUrl.includes('/sign-in')) {
      console.log('🔐 Route is protected - redirects to sign-in (expected for unauthenticated user)');
    } else if (finalUrl.includes('/teach/upload')) {
      console.log('✅ Upload route accessible!');
      await page.screenshot({ path: 'test-results/live-teacher-upload.png', fullPage: true });
    } else {
      console.log(`❓ Unexpected redirect: ${finalUrl}`);
    }
    
    await page.screenshot({ path: 'test-results/live-upload-route-result.png', fullPage: true });
  });

  test('Check if navigation changes were deployed', async ({ page }) => {
    console.log('🚀 Checking if navigation changes were deployed...');
    
    await page.goto('/');
    
    // Check if the page contains references to teacher functionality
    const pageContent = await page.content();
    
    const hasTeacherConfig = pageContent.includes('teacher') || pageContent.includes('Teacher');
    const hasUploadRefs = pageContent.includes('upload') || pageContent.includes('Upload');
    
    console.log(`Page contains teacher references: ${hasTeacherConfig}`);
    console.log(`Page contains upload references: ${hasUploadRefs}`);
    
    // Check for any JavaScript errors that might prevent navigation loading
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(`ERROR: ${msg.text()}`);
      }
    });
    
    await page.waitForTimeout(3000);
    
    if (consoleMessages.length > 0) {
      console.log('JavaScript errors found:');
      consoleMessages.forEach(msg => console.log(`  ${msg}`));
    } else {
      console.log('✅ No JavaScript errors detected');
    }
  });
});