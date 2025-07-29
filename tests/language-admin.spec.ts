import { test, expect } from '@playwright/test';

test.describe('Language Switch and Admin Access', () => {
  test('language switch should work on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Log initial state
    console.log('Testing language switch...');
    
    // Find the language switch button (Globe icon with DA/EN text)
    const languageButton = page.locator('button:has-text("DA"), button:has-text("EN")').first();
    
    // Check if button exists
    const buttonExists = await languageButton.count();
    console.log('Language button found:', buttonExists > 0);
    
    if (buttonExists > 0) {
      // Get initial language
      const initialText = await languageButton.textContent();
      console.log('Initial language button text:', initialText);
      
      // Look for Danish content
      const danishContent = await page.locator('text=/From idea to implementation|Fra idé til implementering/').count();
      console.log('Danish content found:', danishContent > 0);
      
      // Click language button
      await languageButton.click();
      await page.waitForTimeout(500); // Wait for state change
      
      // Check if text changed
      const newText = await languageButton.textContent();
      console.log('New language button text:', newText);
      
      // Verify content language changed
      const englishContent = await page.locator('text=/From idea to implementation in just 48 hours/').count();
      console.log('English content found:', englishContent > 0);
    }
    
    // Take screenshot for debugging
    await page.screenshot({ path: 'language-switch-test.png', fullPage: true });
  });

  test('admin access visibility for regular users', async ({ page }) => {
    await page.goto('/');
    
    // Regular user (not signed in)
    console.log('Testing admin visibility for non-signed-in users...');
    
    // Check desktop navigation
    const adminLinkDesktop = page.locator('a:has-text("Admin")').first();
    const adminDesktopVisible = await adminLinkDesktop.isVisible().catch(() => false);
    console.log('Admin link visible in desktop nav (should be false):', adminDesktopVisible);
    
    // Check mobile menu
    const menuButton = page.locator('button:has(svg)').filter({ hasText: '' }).last();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(300);
      
      const adminLinkMobile = page.locator('a:has-text("Admin Panel")');
      const adminMobileVisible = await adminLinkMobile.isVisible().catch(() => false);
      console.log('Admin link visible in mobile menu (should be false):', adminMobileVisible);
    }
    
    await page.screenshot({ path: 'admin-access-not-signed-in.png', fullPage: true });
  });

  test('access admin sign-in page directly', async ({ page }) => {
    console.log('Testing direct admin access...');
    
    // Go to admin sign-in
    await page.goto('/admin/sign-in');
    await page.waitForLoadState('networkidle');
    
    // Check if we're on the admin sign-in page
    const adminTitle = await page.locator('h1:has-text("HARKA Admin")').count();
    const adminSubtitle = await page.locator('text=/Administrator access portal/').count();
    
    console.log('Admin sign-in page title found:', adminTitle > 0);
    console.log('Admin subtitle found:', adminSubtitle > 0);
    
    // Check for Clerk sign-in component
    const clerkSignIn = await page.locator('[data-clerk-sign-in]').count();
    console.log('Clerk sign-in component found:', clerkSignIn > 0);
    
    await page.screenshot({ path: 'admin-sign-in-page.png', fullPage: true });
  });

  test('debug language switch mechanism', async ({ page }) => {
    await page.goto('/');
    
    console.log('Deep debugging language switch...');
    
    // Log all buttons on the page
    const allButtons = await page.locator('button').all();
    console.log('Total buttons found:', allButtons.length);
    
    for (let i = 0; i < allButtons.length; i++) {
      const text = await allButtons[i].textContent();
      const hasGlobe = await allButtons[i].locator('svg').count();
      if (text?.includes('DA') || text?.includes('EN') || hasGlobe > 0) {
        console.log(`Button ${i}: "${text}", has icon: ${hasGlobe > 0}`);
      }
    }
    
    // Check for Globe icon specifically
    const globeButtons = await page.locator('button:has(svg[class*="Globe"])').all();
    console.log('Buttons with Globe icon:', globeButtons.length);
    
    // Check onClick handlers
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((btn, index) => {
        if (btn.textContent?.includes('DA') || btn.textContent?.includes('EN')) {
          console.log(`Button ${index} onclick:`, btn.onclick);
          console.log(`Button ${index} listeners:`, btn.getEventListeners ? btn.getEventListeners() : 'N/A');
        }
      });
    });
  });

  test('full user journey - language and navigation', async ({ page }) => {
    await page.goto('/');
    
    console.log('Testing full user journey...');
    
    // Test 1: Language exists and is clickable
    const langButton = page.locator('button').filter({ hasText: /DA|EN/ }).first();
    if (await langButton.count() > 0) {
      console.log('Language button found');
      await langButton.click();
      console.log('Language button clicked');
      await page.waitForTimeout(1000);
    }
    
    // Test 2: Navigate to learn dashboard
    const dashboardLink = page.locator('a[href="/learn/dashboard"]').first();
    if (await dashboardLink.count() > 0) {
      console.log('Dashboard link found');
      // Don't click, just verify it exists
    }
    
    // Test 3: Check all learn platform links
    const learnLinks = [
      '/learn/learning',
      '/learn/playground', 
      '/learn/analytics',
      '/learn/toolkit'
    ];
    
    for (const link of learnLinks) {
      const linkElement = page.locator(`a[href="${link}"]`).first();
      const exists = await linkElement.count() > 0;
      console.log(`Link ${link} exists:`, exists);
    }
    
    await page.screenshot({ path: 'full-journey-test.png', fullPage: true });
  });
});