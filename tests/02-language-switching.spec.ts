import { test, expect } from '@playwright/test';

test.describe('Language Switching Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display language switcher', async ({ page }) => {
    // Look for language switcher elements
    const languageSwitchers = [
      page.locator('[data-testid="language-switcher"]'),
      page.locator('button:has-text("EN")'),
      page.locator('button:has-text("DA")'),
      page.locator('button:has-text("Danish")'),
      page.locator('button:has-text("English")'),
      page.locator('select[name*="lang"]'),
      page.locator('select[name*="locale"]'),
      page.locator('[aria-label*="language"]'),
      page.locator('[aria-label*="Language"]'),
      page.getByRole('button', { name: /language|lang|EN|DA/i }),
      page.getByRole('combobox', { name: /language|lang/i })
    ];

    let found = false;
    for (const switcher of languageSwitchers) {
      try {
        if (await switcher.isVisible({ timeout: 1000 })) {
          found = true;
          console.log('Found language switcher:', await switcher.textContent());
          break;
        }
      } catch (e) {
        // Element not found, continue
      }
    }

    if (!found) {
      // Capture screenshot for debugging
      await page.screenshot({ path: 'language-switcher-not-found.png', fullPage: true });
      console.log('No language switcher found. Available elements:');
      const allButtons = await page.locator('button').all();
      for (const button of allButtons) {
        const text = await button.textContent();
        if (text) console.log('Button:', text.trim());
      }
    }

    expect(found).toBe(true);
  });

  test('should switch to Danish when Danish option is selected', async ({ page }) => {
    // Try to find and click Danish language option
    const danishOptions = [
      page.locator('button:has-text("DA")'),
      page.locator('button:has-text("Danish")'),
      page.locator('button:has-text("Dansk")'),
      page.locator('[value="da"]'),
      page.locator('[value="dk"]'),
      page.getByRole('button', { name: /da|danish|dansk/i })
    ];

    let danishSelected = false;
    for (const option of danishOptions) {
      try {
        if (await option.isVisible({ timeout: 1000 })) {
          await option.click();
          danishSelected = true;
          break;
        }
      } catch (e) {
        // Element not found or not clickable
      }
    }

    if (danishSelected) {
      // Wait for language change to take effect
      await page.waitForTimeout(1000);
      
      // Check if any Danish text appears
      const danishTexts = [
        'Kurser', 'Certificeringer', 'Dashboard', 'Hjem', 'Om os',
        'Kontakt', 'Log ind', 'Tilmeld', 'Funktioner'
      ];

      let danishTextFound = false;
      for (const text of danishTexts) {
        const element = page.getByText(text, { exact: false });
        if (await element.isVisible().catch(() => false)) {
          danishTextFound = true;
          break;
        }
      }

      expect(danishTextFound).toBe(true);
    } else {
      // Take screenshot for debugging
      await page.screenshot({ path: 'danish-option-not-found.png', fullPage: true });
      test.fail(true, 'No Danish language option found');
    }
  });

  test('should switch to English when English option is selected', async ({ page }) => {
    // First try to switch to Danish, then back to English
    const englishOptions = [
      page.locator('button:has-text("EN")'),
      page.locator('button:has-text("English")'),
      page.locator('[value="en"]'),
      page.getByRole('button', { name: /en|english/i })
    ];

    let englishSelected = false;
    for (const option of englishOptions) {
      try {
        if (await option.isVisible({ timeout: 1000 })) {
          await option.click();
          englishSelected = true;
          break;
        }
      } catch (e) {
        // Element not found or not clickable
      }
    }

    if (englishSelected) {
      // Wait for language change to take effect
      await page.waitForTimeout(1000);
      
      // Check if English text appears
      const englishTexts = [
        'Courses', 'Certificates', 'Dashboard', 'Features',
        'Home', 'About', 'Contact', 'Login', 'Sign up'
      ];

      let englishTextFound = false;
      for (const text of englishTexts) {
        const element = page.getByText(text, { exact: false });
        if (await element.isVisible().catch(() => false)) {
          englishTextFound = true;
          break;
        }
      }

      expect(englishTextFound).toBe(true);
    } else {
      // Take screenshot for debugging
      await page.screenshot({ path: 'english-option-not-found.png', fullPage: true });
      test.fail(true, 'No English language option found');
    }
  });

  test('should persist language selection across page reloads', async ({ page }) => {
    // Try to switch language first
    const danishButton = page.locator('button:has-text("DA")');
    if (await danishButton.isVisible().catch(() => false)) {
      await danishButton.click();
      await page.waitForTimeout(500);
      
      // Reload page
      await page.reload();
      
      // Check if Danish is still selected
      await page.waitForTimeout(1000);
      const isDanishStillActive = await page.locator('button:has-text("DA")[aria-pressed="true"], button:has-text("DA").active, [data-active="true"]:has-text("DA")').isVisible().catch(() => false);
      
      if (!isDanishStillActive) {
        // Check for Danish text to see if language persisted
        const danishTexts = ['Kurser', 'Certificeringer', 'Dashboard'];
        let persistedDanish = false;
        for (const text of danishTexts) {
          if (await page.getByText(text).isVisible().catch(() => false)) {
            persistedDanish = true;
            break;
          }
        }
        expect(persistedDanish).toBe(true);
      }
    } else {
      test.skip(true, 'No language switcher available to test persistence');
    }
  });

  test('should update URL or localStorage when language changes', async ({ page }) => {
    // Check initial state
    const initialUrl = page.url();
    const initialStorage = await page.evaluate(() => localStorage.getItem('language') || localStorage.getItem('locale'));

    // Try to switch language
    const danishButton = page.locator('button:has-text("DA")');
    if (await danishButton.isVisible().catch(() => false)) {
      await danishButton.click();
      await page.waitForTimeout(500);
      
      // Check if URL changed
      const newUrl = page.url();
      const newStorage = await page.evaluate(() => localStorage.getItem('language') || localStorage.getItem('locale'));
      
      const urlChanged = newUrl !== initialUrl && (newUrl.includes('/da') || newUrl.includes('lang=da'));
      const storageChanged = newStorage !== initialStorage;
      
      expect(urlChanged || storageChanged).toBe(true);
    } else {
      test.skip(true, 'No language switcher available to test state changes');
    }
  });
});