import { test, expect } from '@playwright/test';

test.describe('Workshop page copy', () => {
  test('shows VMS-aligned 2-day workshop content', async ({ page }) => {
    await page.goto('/workshop');
    await page.waitForLoadState('networkidle');

    // Title and subtitle
    await expect(page.locator('h1:text("Strategisk AI-workshop (2 dage)")')).toBeVisible();
    await expect(page.locator('p').filter({ hasText: /to undervisere|ChatGPT & Copilot|hands-on/i }).first()).toBeVisible();

    // Practical details
    await expect(page.getByText(/Praktiske detaljer|Practical details/)).toBeVisible();
    await expect(page.getByText(/Maks\.? 10-15|10–15/).first()).toBeVisible();
    await expect(page.getByText(/30\.000 DKK|30,000 DKK/).first()).toBeVisible();

    // Day buttons labels reflect new copy
    await expect(page.getByRole('button', { name: /Dag 1:|Day 1:/ })).toContainText(/ChatGPT|Copilot/);
    await expect(page.getByRole('button', { name: /Dag 2:|Day 2:/ })).toContainText(/Strategi|Strategy/);

    // CTA has intro-call wording
    await expect(page.getByRole('button', { name: /Book intro-kald|Book intro call/ }).first()).toBeVisible();
  });
});
