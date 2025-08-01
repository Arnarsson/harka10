import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users to sign-in when accessing protected routes', async ({ page }) => {
    // Try to access the dashboard without authentication
    await page.goto('/learn/dashboard');
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/\/sign-in/);
    
    // Check that the sign-in page loads
    await expect(page.locator('text=Sign in to your learning platform')).toBeVisible();
  });

  test('should allow access to public routes without authentication', async ({ page }) => {
    // Try to access the toolkit page
    await page.goto('/toolkit');
    
    // Should stay on toolkit page
    await expect(page).toHaveURL('/toolkit');
    
    // Should not redirect to sign-in
    await expect(page).not.toHaveURL(/\/sign-in/);
  });

  test('should redirect to login page when clicking dashboard from hero', async ({ page }) => {
    // Go to home page
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Click on the Dashboard button
    const dashboardButton = page.locator('a[href="/learn/dashboard"]').first();
    await expect(dashboardButton).toBeVisible();
    await dashboardButton.click();
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/\/sign-in/);
  });

  test('should show sign-in page without redirect loops', async ({ page }) => {
    // Navigate directly to sign-in
    await page.goto('/sign-in');
    
    // Should stay on sign-in page
    await expect(page).toHaveURL('/sign-in');
    
    // Should show the sign-in form
    await expect(page.locator('text=Sign in to your learning platform')).toBeVisible();
    
    // Should not have any console errors about redirect loops
    const consoleMessages: string[] = [];
    page.on('console', msg => consoleMessages.push(msg.text()));
    
    await page.waitForTimeout(2000); // Wait to see if redirect loop occurs
    
    // Check that we're still on sign-in page
    await expect(page).toHaveURL('/sign-in');
    
    // Log console messages for debugging
    console.log('Console messages:', consoleMessages);
  });

  test('should handle login and signup links correctly', async ({ page }) => {
    // Go to home page
    await page.goto('/');
    
    // Click Login link
    await page.click('text=Login');
    await expect(page).toHaveURL(/\/(sign-in|login)/);
    
    // Go back to home
    await page.goto('/');
    
    // Click Sign Up link
    await page.click('text=Sign Up');
    await expect(page).toHaveURL(/\/(sign-up|signup)/);
  });

  test('middleware should handle auth routes correctly', async ({ page }) => {
    // Test various auth routes
    const authRoutes = ['/sign-in', '/sign-up', '/login', '/signup'];
    
    for (const route of authRoutes) {
      await page.goto(route);
      // Should not get stuck in redirect loop
      await expect(page).toHaveURL(new RegExp(route.replace('/', '\\/')));
    }
  });
});