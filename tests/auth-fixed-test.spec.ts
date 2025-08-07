import { test, expect } from '@playwright/test';

test.describe('Authentication After Fix', () => {
  test('Sign-in page should now show Clerk authentication form', async ({ page }) => {
    await page.goto('/sign-in');
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/sign-in-after-fix.png', fullPage: true });
    
    // Wait for Clerk to load
    await page.waitForTimeout(3000);
    
    // Check if Clerk components loaded
    const clerkLoaded = await page.locator('.cl-rootBox, .clerk-loaded, [data-clerk-id]').isVisible();
    console.log(`Clerk authentication form loaded: ${clerkLoaded}`);
    
    // Should see sign-in form elements
    const hasSignInElements = await page.locator('input, button').count() > 0;
    console.log(`Sign-in form elements found: ${hasSignInElements}`);
  });

  test('Admin routes should redirect to sign-in', async ({ page }) => {
    await page.goto('/admin');
    
    // Should be redirected to sign-in
    await expect(page).toHaveURL(/sign-in/);
    console.log('✅ Admin route properly redirects to sign-in');
    
    await page.screenshot({ path: 'test-results/admin-redirect-after-fix.png', fullPage: true });
  });

  test('Teacher routes should redirect to sign-in', async ({ page }) => {
    await page.goto('/teach/dashboard');
    
    // Should be redirected to sign-in  
    await expect(page).toHaveURL(/sign-in/);
    console.log('✅ Teacher route properly redirects to sign-in');
  });
});