import { test, expect } from '@playwright/test';

test.describe('Authentication Flow with Clerk/Supabase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login/signup options', async ({ page }) => {
    // Look for authentication links/buttons
    const authElements = [
      page.locator('a[href="/login"]'),
      page.locator('a[href="/signup"]'),
      page.locator('a[href="/auth/login"]'),
      page.locator('a[href="/auth/signup"]'),
      page.getByText(/login/i),
      page.getByText(/sign in/i),
      page.getByText(/sign up/i),
      page.getByText(/register/i),
      page.locator('button:has-text("Login")'),
      page.locator('button:has-text("Sign")'),
      page.locator('[data-testid="auth-button"]'),
      page.locator('.auth-button')
    ];

    let authFound = false;
    for (const element of authElements) {
      if (await element.isVisible().catch(() => false)) {
        authFound = true;
        console.log('Found authentication element:', await element.textContent());
        break;
      }
    }

    expect(authFound).toBe(true);
  });

  test('should navigate to login page', async ({ page }) => {
    const loginLink = page.locator('a[href="/login"], a[href="/auth/login"]');
    
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await page.waitForURL(/.*\/(login|auth\/login).*/);
      
      // Check if login form is present
      const loginForm = page.locator('form, [data-testid="login-form"], .login-form');
      await expect(loginForm).toBeVisible();
      
      // Check for email/password fields
      const emailField = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]');
      const passwordField = page.locator('input[type="password"], input[name="password"]');
      
      await expect(emailField).toBeVisible();
      await expect(passwordField).toBeVisible();
    } else {
      // Try direct navigation
      await page.goto('/login');
      
      if (page.url().includes('/login')) {
        const errorPage = page.locator('text=404, text="Not Found"');
        const hasError = await errorPage.isVisible().catch(() => false);
        
        if (!hasError) {
          const loginForm = page.locator('form, [data-testid="login-form"]');
          await expect(loginForm).toBeVisible();
        }
      } else {
        test.fail(true, 'Login page not accessible');
      }
    }
  });

  test('should navigate to signup page', async ({ page }) => {
    const signupLink = page.locator('a[href="/signup"], a[href="/auth/signup"]');
    
    if (await signupLink.isVisible()) {
      await signupLink.click();
      await page.waitForURL(/.*\/(signup|auth\/signup).*/);
      
      // Check if signup form is present
      const signupForm = page.locator('form, [data-testid="signup-form"], .signup-form');
      await expect(signupForm).toBeVisible();
      
      // Check for common signup fields
      const emailField = page.locator('input[type="email"], input[name="email"]');
      const passwordField = page.locator('input[type="password"], input[name="password"]');
      const nameField = page.locator('input[name="name"], input[name="fullName"], input[name="full_name"]');
      
      await expect(emailField).toBeVisible();
      await expect(passwordField).toBeVisible();
      // Name field might be optional
      if (await nameField.isVisible().catch(() => false)) {
        console.log('Name field found in signup form');
      }
    } else {
      // Try direct navigation
      await page.goto('/signup');
      
      if (page.url().includes('/signup')) {
        const errorPage = page.locator('text=404, text="Not Found"');
        const hasError = await errorPage.isVisible().catch(() => false);
        expect(hasError).toBe(false);
      }
    }
  });

  test('should display proper error handling for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    const emailField = page.locator('input[type="email"], input[name="email"]');
    const passwordField = page.locator('input[type="password"], input[name="password"]');
    const submitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');

    if (await emailField.isVisible() && await passwordField.isVisible() && await submitButton.isVisible()) {
      // Try invalid credentials
      await emailField.fill('invalid@test.com');
      await passwordField.fill('wrongpassword');
      await submitButton.click();
      
      // Wait for error message
      await page.waitForTimeout(2000);
      
      const errorElements = [
        page.locator('.error, .alert-error, [role="alert"]'),
        page.getByText(/invalid/i),
        page.getByText(/error/i),
        page.getByText(/wrong/i),
        page.getByText(/failed/i),
        page.locator('[data-testid="error"]')
      ];

      let errorFound = false;
      for (const element of errorElements) {
        if (await element.isVisible().catch(() => false)) {
          errorFound = true;
          console.log('Found error message:', await element.textContent());
          break;
        }
      }

      expect(errorFound).toBe(true);
    } else {
      test.skip(true, 'Login form not properly set up for testing');
    }
  });

  test('should handle authentication state management', async ({ page }) => {
    // Check if there's any authentication state detection
    const authStateElements = [
      page.locator('[data-testid="auth-state"]'),
      page.locator('.auth-loading'),
      page.locator('.user-profile'),
      page.locator('.authenticated'),
      page.locator('.unauthenticated')
    ];

    let authStateFound = false;
    for (const element of authStateElements) {
      if (await element.isVisible().catch(() => false)) {
        authStateFound = true;
        break;
      }
    }

    if (!authStateFound) {
      // Check for loading states or user menu
      const loadingElements = [
        page.locator('.loading, .spinner, .skeleton'),
        page.locator('[aria-label*="loading"]')
      ];

      for (const element of loadingElements) {
        if (await element.isVisible().catch(() => false)) {
          authStateFound = true;
          break;
        }
      }
    }

    // This is a soft expectation as auth state might not be visible on homepage
    expect.soft(authStateFound).toBe(true);
  });

  test('should protect dashboard route when not authenticated', async ({ page }) => {
    // Try to access dashboard directly without authentication
    await page.goto('/dashboard');
    
    // Check if redirected to login or shows auth required message
    const currentUrl = page.url();
    const isRedirectedToAuth = currentUrl.includes('/login') || currentUrl.includes('/auth') || currentUrl.includes('/signin');
    
    if (!isRedirectedToAuth) {
      // Check if there's an authentication required message
      const authRequiredElements = [
        page.getByText(/login required/i),
        page.getByText(/sign in required/i),
        page.getByText(/authentication required/i),
        page.getByText(/unauthorized/i),
        page.getByText(/access denied/i),
        page.locator('.auth-required'),
        page.locator('[data-testid="auth-required"]')
      ];

      let authRequiredFound = false;
      for (const element of authRequiredElements) {
        if (await element.isVisible().catch(() => false)) {
          authRequiredFound = true;
          break;
        }
      }

      // If dashboard loads without authentication, it might mean auth is not properly implemented
      if (!authRequiredFound) {
        console.log('Warning: Dashboard accessible without authentication');
        await page.screenshot({ path: 'dashboard-no-auth.png', fullPage: true });
      }
    }

    // Either should be redirected to auth or show auth required message
    expect(isRedirectedToAuth || page.url().includes('/unauthorized')).toBe(true);
  });

  test('should show proper loading states during authentication', async ({ page }) => {
    await page.goto('/login');
    
    const emailField = page.locator('input[type="email"], input[name="email"]');
    const passwordField = page.locator('input[type="password"], input[name="password"]');
    const submitButton = page.locator('button[type="submit"], button:has-text("Login")');

    if (await emailField.isVisible() && await passwordField.isVisible() && await submitButton.isVisible()) {
      await emailField.fill('test@example.com');
      await passwordField.fill('testpassword');
      
      // Click submit and immediately check for loading state
      await submitButton.click();
      
      const loadingElements = [
        page.locator('.loading, .spinner, .submitting'),
        page.locator('button[disabled]'),
        page.locator('[aria-busy="true"]'),
        page.getByText(/loading/i),
        page.getByText(/submitting/i)
      ];

      let loadingFound = false;
      for (const element of loadingElements) {
        if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
          loadingFound = true;
          break;
        }
      }

      expect.soft(loadingFound).toBe(true);
    } else {
      test.skip(true, 'Login form not available for loading state testing');
    }
  });
});