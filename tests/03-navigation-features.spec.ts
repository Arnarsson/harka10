import { test, expect } from '@playwright/test';

test.describe('Navigation and Features Access', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to dashboard successfully', async ({ page }) => {
    const dashboardLink = page.locator('a[href="/dashboard"]');
    
    if (await dashboardLink.isVisible()) {
      await dashboardLink.click();
      await page.waitForURL('/dashboard');
      await expect(page).toHaveURL('/dashboard');
      
      // Check if dashboard content loads
      const dashboardContent = page.locator('main, [data-testid="dashboard"], .dashboard');
      await expect(dashboardContent).toBeVisible();
    } else {
      test.fail(true, 'Dashboard link not found in navigation');
    }
  });

  test('should navigate to team page and display team features', async ({ page }) => {
    const teamLink = page.locator('a[href="/team"]');
    
    if (await teamLink.isVisible()) {
      await teamLink.click();
      await page.waitForURL('/team');
      await expect(page).toHaveURL('/team');
      
      // Check for team-specific content
      const teamElements = [
        page.getByText(/team/i),
        page.getByText(/members/i),
        page.getByText(/overview/i),
        page.locator('[data-testid*="team"]'),
        page.locator('.team-overview, .team-members, .team-progress')
      ];

      let teamContentFound = false;
      for (const element of teamElements) {
        if (await element.isVisible().catch(() => false)) {
          teamContentFound = true;
          break;
        }
      }

      expect(teamContentFound).toBe(true);
    } else {
      // Try to navigate directly
      await page.goto('/team');
      
      if (page.url().includes('/team')) {
        // Check if page loads successfully (not 404)
        const errorPage = page.locator('text=404, text="Not Found", text="Page not found"');
        const hasError = await errorPage.isVisible().catch(() => false);
        
        if (!hasError) {
          // Check for team content
          const teamContent = page.locator('main, .team-layout, [data-testid="team"]');
          await expect(teamContent).toBeVisible();
        } else {
          test.fail(true, 'Team page returns 404 error');
        }
      } else {
        test.fail(true, 'Team page not accessible - redirected or failed to load');
      }
    }
  });

  test('should navigate to courses page', async ({ page }) => {
    const coursesLink = page.locator('a[href="/courses"]');
    
    if (await coursesLink.isVisible()) {
      await coursesLink.click();
      await page.waitForURL('/courses');
      await expect(page).toHaveURL('/courses');
      
      // Check for courses content
      const coursesContent = page.locator('main, [data-testid="courses"], .courses');
      await expect(coursesContent).toBeVisible();
    } else {
      await page.goto('/courses');
      
      if (page.url().includes('/courses')) {
        const errorPage = page.locator('text=404, text="Not Found"');
        const hasError = await errorPage.isVisible().catch(() => false);
        expect(hasError).toBe(false);
      }
    }
  });

  test('should navigate to certificates page', async ({ page }) => {
    const certificatesLink = page.locator('a[href="/certificates"]');
    
    if (await certificatesLink.isVisible()) {
      await certificatesLink.click();
      await page.waitForURL('/certificates');
      await expect(page).toHaveURL('/certificates');
      
      // Check for certificates content
      const certificatesContent = page.locator('main, [data-testid="certificates"], .certificates');
      await expect(certificatesContent).toBeVisible();
    } else {
      await page.goto('/certificates');
      
      if (page.url().includes('/certificates')) {
        const errorPage = page.locator('text=404, text="Not Found"');
        const hasError = await errorPage.isVisible().catch(() => false);
        expect(hasError).toBe(false);
      }
    }
  });

  test('should have accessible AI assistant', async ({ page }) => {
    // Look for AI assistant elements
    const aiElements = [
      page.locator('[data-testid="ai-assistant"]'),
      page.locator('.ai-assistant'),
      page.getByText(/AI Assistant/i),
      page.getByText(/Chat/i),
      page.locator('button:has-text("AI")'),
      page.locator('[aria-label*="AI"]'),
      page.locator('.chat-widget'),
      page.locator('.assistant-widget')
    ];

    let aiFound = false;
    for (const element of aiElements) {
      if (await element.isVisible().catch(() => false)) {
        aiFound = true;
        console.log('Found AI assistant element');
        break;
      }
    }

    if (!aiFound) {
      // Try navigating to potential AI routes
      const aiRoutes = ['/ai', '/assistant', '/chat', '/playground'];
      
      for (const route of aiRoutes) {
        await page.goto(route);
        if (page.url().includes(route)) {
          const errorPage = page.locator('text=404, text="Not Found"');
          const hasError = await errorPage.isVisible().catch(() => false);
          
          if (!hasError) {
            aiFound = true;
            break;
          }
        }
      }
    }

    if (!aiFound) {
      await page.screenshot({ path: 'ai-assistant-not-found.png', fullPage: true });
      test.fail(true, 'AI Assistant not found anywhere in the application');
    }

    expect(aiFound).toBe(true);
  });

  test('should display notes and bookmarks system', async ({ page }) => {
    // Look for notes/bookmarks functionality
    const notesElements = [
      page.locator('[data-testid="notes"]'),
      page.locator('[data-testid="bookmarks"]'),
      page.getByText(/Notes/i),
      page.getByText(/Bookmarks/i),
      page.locator('.notes'),
      page.locator('.bookmarks'),
      page.locator('button:has-text("Notes")'),
      page.locator('button:has-text("Bookmarks")')
    ];

    let notesFound = false;
    for (const element of notesElements) {
      if (await element.isVisible().catch(() => false)) {
        notesFound = true;
        console.log('Found notes/bookmarks element');
        break;
      }
    }

    if (!notesFound) {
      // Check in dashboard or other pages
      await page.goto('/dashboard');
      await page.waitForTimeout(1000);
      
      for (const element of notesElements) {
        if (await element.isVisible().catch(() => false)) {
          notesFound = true;
          break;
        }
      }
    }

    if (!notesFound) {
      await page.screenshot({ path: 'notes-bookmarks-not-found.png', fullPage: true });
      console.log('Notes and bookmarks system not found');
    }

    // This might be a less critical feature, so we'll make it a soft assertion
    expect.soft(notesFound).toBe(true);
  });

  test('should have comprehensive dashboard with Phase 2 features', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check if dashboard loads
    const dashboard = page.locator('main, [data-testid="dashboard"], .dashboard');
    await expect(dashboard).toBeVisible();

    // Look for Phase 2 features mentioned in claims
    const phase2Features = [
      'analytics', 'progress', 'overview', 'stats', 'metrics',
      'learning', 'certificates', 'achievements', 'team'
    ];

    let featuresFound = 0;
    for (const feature of phase2Features) {
      const elements = [
        page.getByText(new RegExp(feature, 'i')),
        page.locator(`[data-testid*="${feature}"]`),
        page.locator(`.${feature}`)
      ];

      for (const element of elements) {
        if (await element.isVisible().catch(() => false)) {
          featuresFound++;
          console.log(`Found Phase 2 feature: ${feature}`);
          break;
        }
      }
    }

    console.log(`Found ${featuresFound} out of ${phase2Features.length} Phase 2 features`);
    
    // Expect at least 3 features to be present for a "comprehensive" dashboard
    expect(featuresFound).toBeGreaterThanOrEqual(3);
  });

  test('should have working mobile navigation', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();

    // Look for mobile menu toggle
    const mobileMenuToggle = page.locator('button[aria-label*="menu"], button[aria-label*="navigation"], .mobile-menu-toggle, [data-testid="mobile-menu"]');
    
    if (await mobileMenuToggle.isVisible()) {
      await mobileMenuToggle.click();
      
      // Check if mobile menu opens
      const mobileMenu = page.locator('.mobile-menu, [data-testid="mobile-menu-content"], nav[aria-expanded="true"]');
      await expect(mobileMenu).toBeVisible();
      
      // Check if navigation links are accessible in mobile menu
      const mobileNavLinks = page.locator('.mobile-menu a, [data-testid="mobile-menu-content"] a');
      const linkCount = await mobileNavLinks.count();
      expect(linkCount).toBeGreaterThan(0);
    } else {
      // Check if navigation is still accessible without a mobile menu
      const navLinks = page.locator('nav a, header a');
      const visibleLinks = await navLinks.count();
      expect(visibleLinks).toBeGreaterThan(0);
    }
  });
});