import { test, expect } from '@playwright/test';

test.describe('HARKA10 Quick Assessment - Claimed vs Actual Features', () => {
  let assessmentResults: any = {};

  test.beforeAll(async () => {
    assessmentResults = {
      basicFunctionality: false,
      languageSwitching: false,
      teamFeatures: false,
      aiAssistant: false,
      notesBookmarks: false,
      mobileResponsive: false,
      authentication: false,
      phase2Dashboard: false,
      errors: []
    };
  });

  test('Quick Assessment: Basic App Loading', async ({ page }) => {
    try {
      await page.goto('/', { timeout: 10000 });
      
      // Check if page loads
      const title = await page.title();
      const hasContent = await page.locator('body').isVisible();
      
      if (hasContent && title) {
        assessmentResults.basicFunctionality = true;
        console.log('✅ Basic app loading: WORKS');
      } else {
        console.log('❌ Basic app loading: FAILED');
        assessmentResults.errors.push('App does not load properly');
      }
    } catch (error) {
      console.log('❌ Basic app loading: ERROR -', error);
      assessmentResults.errors.push(`App loading error: ${error}`);
    }
  });

  test('Quick Assessment: Language Switching', async ({ page }) => {
    try {
      await page.goto('/');
      
      // Look for language switcher elements
      const languageSwitchers = [
        'button:has-text("EN")',
        'button:has-text("DA")', 
        'button:has-text("Danish")',
        'button:has-text("English")',
        '[data-testid="language-switcher"]',
        'select[name*="lang"]'
      ];

      let found = false;
      for (const selector of languageSwitchers) {
        if (await page.locator(selector).isVisible().catch(() => false)) {
          found = true;
          break;
        }
      }

      if (found) {
        assessmentResults.languageSwitching = true;
        console.log('✅ Language switching: FOUND');
      } else {
        console.log('❌ Language switching: NOT FOUND');
        assessmentResults.errors.push('No language switcher found anywhere');
      }
    } catch (error) {
      console.log('❌ Language switching: ERROR -', error);
      assessmentResults.errors.push(`Language switching error: ${error}`);
    }
  });

  test('Quick Assessment: Team Features Navigation', async ({ page }) => {
    try {
      await page.goto('/');
      
      // Check for team link in navigation
      const teamLink = page.locator('a[href="/team"]');
      const hasTeamLink = await teamLink.isVisible().catch(() => false);
      
      if (hasTeamLink) {
        await teamLink.click();
        await page.waitForURL('/team', { timeout: 5000 });
        
        const teamContent = await page.locator('main, .team-layout, [data-testid="team"]').isVisible().catch(() => false);
        
        if (teamContent) {
          assessmentResults.teamFeatures = true;
          console.log('✅ Team features: ACCESSIBLE');
        } else {
          console.log('❌ Team features: PAGE LOADS BUT NO CONTENT');
          assessmentResults.errors.push('Team page loads but has no visible content');
        }
      } else {
        // Try direct navigation
        await page.goto('/team');
        if (page.url().includes('/team')) {
          const hasError = await page.locator('text=404, text="Not Found"').isVisible().catch(() => false);
          if (!hasError) {
            assessmentResults.teamFeatures = true;
            console.log('✅ Team features: ACCESSIBLE (direct navigation)');
          } else {
            console.log('❌ Team features: 404 ERROR');
            assessmentResults.errors.push('Team page returns 404 error');
          }
        } else {
          console.log('❌ Team features: NOT ACCESSIBLE');
          assessmentResults.errors.push('Team page not accessible - no link and no direct access');
        }
      }
    } catch (error) {
      console.log('❌ Team features: ERROR -', error);
      assessmentResults.errors.push(`Team features error: ${error}`);
    }
  });

  test('Quick Assessment: AI Assistant', async ({ page }) => {
    try {
      await page.goto('/');
      
      // Look for AI assistant triggers
      const aiTriggers = [
        'button:has-text("AI")',
        '[data-testid="ai-assistant"]',
        'button[aria-label*="AI"]',
        'a[href="/ai"]',
        'a[href="/assistant"]',
        'a[href="/playground"]'
      ];

      let aiFound = false;
      for (const selector of aiTriggers) {
        if (await page.locator(selector).isVisible().catch(() => false)) {
          aiFound = true;
          break;
        }
      }

      if (!aiFound) {
        // Try navigating to AI routes
        const aiRoutes = ['/ai', '/assistant', '/chat', '/playground'];
        for (const route of aiRoutes) {
          await page.goto(route);
          if (page.url().includes(route)) {
            const hasError = await page.locator('text=404').isVisible().catch(() => false);
            if (!hasError) {
              aiFound = true;
              break;
            }
          }
        }
      }

      if (aiFound) {
        assessmentResults.aiAssistant = true;
        console.log('✅ AI Assistant: FOUND');
      } else {
        console.log('❌ AI Assistant: NOT FOUND');
        assessmentResults.errors.push('No AI assistant functionality found');
      }
    } catch (error) {
      console.log('❌ AI Assistant: ERROR -', error);
      assessmentResults.errors.push(`AI Assistant error: ${error}`);
    }
  });

  test('Quick Assessment: Notes and Bookmarks', async ({ page }) => {
    try {
      await page.goto('/');
      
      // Look for notes/bookmarks
      const notesSelectors = [
        'button:has-text("Notes")',
        'button:has-text("Bookmarks")',
        '[data-testid="notes"]',
        '[data-testid="bookmarks"]',
        '.notes',
        '.bookmarks'
      ];

      let notesFound = false;
      for (const selector of notesSelectors) {
        if (await page.locator(selector).isVisible().catch(() => false)) {
          notesFound = true;
          break;
        }
      }

      // Also check dashboard
      if (!notesFound) {
        await page.goto('/dashboard');
        for (const selector of notesSelectors) {
          if (await page.locator(selector).isVisible().catch(() => false)) {
            notesFound = true;
            break;
          }
        }
      }

      if (notesFound) {
        assessmentResults.notesBookmarks = true;
        console.log('✅ Notes & Bookmarks: FOUND');
      } else {
        console.log('❌ Notes & Bookmarks: NOT FOUND');
        assessmentResults.errors.push('No notes and bookmarks system found');
      }
    } catch (error) {
      console.log('❌ Notes & Bookmarks: ERROR -', error);
      assessmentResults.errors.push(`Notes & Bookmarks error: ${error}`);
    }
  });

  test('Quick Assessment: Mobile Responsive', async ({ page }) => {
    try {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const body = await page.locator('body').boundingBox();
      const hasOverflow = body && body.width > 375;
      
      if (!hasOverflow) {
        assessmentResults.mobileResponsive = true;
        console.log('✅ Mobile Responsive: WORKS');
      } else {
        console.log('❌ Mobile Responsive: OVERFLOW DETECTED');
        assessmentResults.errors.push('Content overflows on mobile viewport');
      }
    } catch (error) {
      console.log('❌ Mobile Responsive: ERROR -', error);
      assessmentResults.errors.push(`Mobile responsive error: ${error}`);
    }
  });

  test('Quick Assessment: Authentication', async ({ page }) => {
    try {
      await page.goto('/');
      
      // Look for auth elements
      const authSelectors = [
        'a[href="/login"]',
        'a[href="/signup"]',
        'button:has-text("Login")',
        'button:has-text("Sign")'
      ];

      let authFound = false;
      for (const selector of authSelectors) {
        if (await page.locator(selector).isVisible().catch(() => false)) {
          authFound = true;
          break;
        }
      }

      if (authFound) {
        assessmentResults.authentication = true;
        console.log('✅ Authentication: FOUND');
      } else {
        console.log('❌ Authentication: NOT FOUND');
        assessmentResults.errors.push('No authentication system found');
      }
    } catch (error) {
      console.log('❌ Authentication: ERROR -', error);
      assessmentResults.errors.push(`Authentication error: ${error}`);
    }
  });

  test('Quick Assessment: Phase 2 Dashboard Features', async ({ page }) => {
    try {
      await page.goto('/dashboard');
      
      const phase2Features = ['analytics', 'progress', 'overview', 'stats', 'team'];
      let featuresFound = 0;

      for (const feature of phase2Features) {
        const hasFeature = await page.getByText(new RegExp(feature, 'i')).isVisible().catch(() => false) ||
                          await page.locator(`[data-testid*="${feature}"]`).isVisible().catch(() => false) ||
                          await page.locator(`.${feature}`).isVisible().catch(() => false);
        
        if (hasFeature) {
          featuresFound++;
        }
      }

      if (featuresFound >= 3) {
        assessmentResults.phase2Dashboard = true;
        console.log(`✅ Phase 2 Dashboard: COMPREHENSIVE (${featuresFound}/${phase2Features.length} features)`);
      } else {
        console.log(`❌ Phase 2 Dashboard: LIMITED (${featuresFound}/${phase2Features.length} features)`);
        assessmentResults.errors.push(`Dashboard missing most Phase 2 features (only ${featuresFound}/${phase2Features.length})`);
      }
    } catch (error) {
      console.log('❌ Phase 2 Dashboard: ERROR -', error);
      assessmentResults.errors.push(`Phase 2 Dashboard error: ${error}`);
    }
  });

  test.afterAll(async () => {
    console.log('\n=== HARKA10 ASSESSMENT RESULTS ===\n');
    
    const results = [
      ['Basic App Loading', assessmentResults.basicFunctionality],
      ['Language Switching', assessmentResults.languageSwitching],
      ['Team Features', assessmentResults.teamFeatures],
      ['AI Assistant', assessmentResults.aiAssistant],
      ['Notes & Bookmarks', assessmentResults.notesBookmarks],
      ['Mobile Responsive', assessmentResults.mobileResponsive],
      ['Authentication', assessmentResults.authentication],
      ['Phase 2 Dashboard', assessmentResults.phase2Dashboard]
    ];

    let workingCount = 0;
    let totalCount = results.length;

    for (const [feature, working] of results) {
      const status = working ? '✅ WORKING' : '❌ NOT WORKING';
      console.log(`${feature}: ${status}`);
      if (working) workingCount++;
    }

    console.log(`\nOVERALL SCORE: ${workingCount}/${totalCount} features working (${Math.round(workingCount/totalCount*100)}%)\n`);

    if (assessmentResults.errors.length > 0) {
      console.log('SPECIFIC ISSUES FOUND:');
      assessmentResults.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    console.log('\n=== SUMMARY ===');
    if (workingCount >= 6) {
      console.log('🟢 RESULT: Most claimed features are working');
    } else if (workingCount >= 4) {
      console.log('🟡 RESULT: Some claimed features are working');
    } else {
      console.log('🔴 RESULT: Most claimed features are NOT working');
    }

    // Specifically address user's concerns
    if (!assessmentResults.languageSwitching) {
      console.log('\n⚠️  USER CONCERN CONFIRMED: Language switching is NOT working');
    }
    
    if (!assessmentResults.teamFeatures) {
      console.log('⚠️  USER CONCERN CONFIRMED: Team features are NOT visible/accessible');
    }
  });
});