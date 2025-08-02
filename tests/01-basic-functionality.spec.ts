import { test, expect } from '@playwright/test';

test.describe('Basic Application Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/AI Training Platform/);
    await expect(page.locator('h1, h2, .hero')).toBeVisible();
  });

  test('should display navigation header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check for logo/brand
    const logo = page.locator('header').getByText(/AI Platform|HARKA/i);
    await expect(logo).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Test main navigation links
    const navLinks = [
      { text: 'Features', selector: 'a[href*="features"]' },
      { text: 'Courses', selector: 'a[href="/courses"]' },
      { text: 'Certificates', selector: 'a[href="/certificates"]' },
      { text: 'Dashboard', selector: 'a[href="/dashboard"]' }
    ];

    for (const link of navLinks) {
      const linkElement = page.locator(link.selector);
      await expect(linkElement).toBeVisible();
    }
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check if content is still readable
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });

  test('should handle page transitions with animations', async ({ page }) => {
    // Click on a navigation link and check for smooth transition
    const coursesLink = page.locator('a[href="/courses"]');
    if (await coursesLink.isVisible()) {
      await coursesLink.click();
      await page.waitForURL('/courses');
      await expect(page).toHaveURL('/courses');
    }
  });
});