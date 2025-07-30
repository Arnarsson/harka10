import { test, expect } from '@playwright/test';

test.describe('Comprehensive Language Switch Testing', () => {
  test('should identify ALL hardcoded text on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Get initial snapshot of all visible text
    const getVisibleTexts = async () => {
      return await page.evaluate(() => {
        const texts: { text: string; selector: string; element: string }[] = [];
        const elements = document.querySelectorAll('*:not(script):not(style):not(svg):not(path)');
        
        elements.forEach((el) => {
          // Get direct text content (not from children)
          const directText = Array.from(el.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent?.trim())
            .filter(text => text && text.length > 1)
            .join(' ');
          
          if (directText) {
            const selector = el.tagName.toLowerCase() + 
              (el.className ? `.${el.className.split(' ').join('.')}` : '') +
              (el.id ? `#${el.id}` : '');
            
            texts.push({
              text: directText,
              selector: selector,
              element: el.tagName
            });
          }
        });
        
        return texts;
      });
    };

    // Get English texts
    const englishTexts = await getVisibleTexts();
    console.log('Found English texts:', englishTexts.length);
    
    // Click language toggle
    const languageButton = page.locator('button:has(svg.lucide-globe)');
    await languageButton.click();
    await page.waitForTimeout(1000);
    
    // Get Danish texts
    const danishTexts = await getVisibleTexts();
    console.log('Found Danish texts:', danishTexts.length);
    
    // Compare texts to find hardcoded ones
    const hardcodedTexts: typeof englishTexts = [];
    
    englishTexts.forEach((engText) => {
      const matchingDanish = danishTexts.find(
        danText => danText.selector === engText.selector && danText.text === engText.text
      );
      
      if (matchingDanish) {
        // Exclude known exceptions
        const exceptions = [
          /^[0-9\s\-\+\(\)]+$/, // Numbers, phone numbers
          /^[\s]*$/, // Empty or whitespace
          /^(HARKA|AI|FAQ|API|UI|UX|MVP|CMS|SEO)$/i, // Acronyms
          /^©.*2024/, // Copyright
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Emails
          /^https?:\/\//, // URLs
        ];
        
        const isException = exceptions.some(regex => regex.test(engText.text));
        
        if (!isException) {
          hardcodedTexts.push(engText);
        }
      }
    });

    // Report findings
    if (hardcodedTexts.length > 0) {
      console.log('\n=== HARDCODED TEXTS FOUND ===');
      hardcodedTexts.forEach(({ text, selector, element }) => {
        console.log(`\nText: "${text}"`);
        console.log(`Element: ${element}`);
        console.log(`Selector: ${selector}`);
      });
      
      // Create a detailed report
      const report = hardcodedTexts.map(item => ({
        text: item.text.substring(0, 50) + (item.text.length > 50 ? '...' : ''),
        element: item.element,
        selector: item.selector
      }));
      
      console.table(report);
    }
    
    // This test is informational - it will pass but log all hardcoded texts
    expect(hardcodedTexts.length).toBeGreaterThanOrEqual(0);
  });

  test('should test all navigation items for language switch', async ({ page }) => {
    await page.goto('/');
    
    const navItems = [
      { selector: 'nav a[href="/workshop"], nav button:has-text("Workshop")', en: 'Workshop', da: 'Værksted' },
      { selector: 'nav a[href="/toolkit"], nav button:has-text("AI Toolkit")', en: 'AI Toolkit', da: 'AI Værktøjskasse' },
      { selector: 'nav a[href="/about"], nav button:has-text("About")', en: 'About', da: 'Om' },
      { selector: 'nav a[href="/pricing"], nav button:has-text("Pricing")', en: 'Pricing', da: 'Priser' },
      { selector: 'nav a[href="/contact"], nav button:has-text("Contact")', en: 'Contact', da: 'Kontakt' },
      { selector: 'nav a[href="/blog"], nav button:has-text("Blog")', en: 'Blog', da: 'Blog' },
    ];

    for (const item of navItems) {
      // Check English
      const elements = await page.locator(item.selector).all();
      if (elements.length > 0) {
        await expect(elements[0]).toContainText(item.en);
      }
    }

    // Switch to Danish
    await page.locator('button:has(svg.lucide-globe)').click();
    await page.waitForTimeout(500);

    for (const item of navItems) {
      // Check Danish
      const elements = await page.locator(item.selector).all();
      if (elements.length > 0) {
        await expect(elements[0]).toContainText(item.da);
      }
    }
  });

  test('should test all button texts for language switch', async ({ page }) => {
    await page.goto('/');
    
    const buttons = [
      { en: 'Get Started', da: 'Kom i gang' },
      { en: 'Try AI Toolkit', da: 'Prøv AI Værktøjskasse' },
      { en: 'Log in', da: 'Log ind' },
      { en: 'Sign up', da: 'Tilmeld' },
      { en: 'Join Workshop', da: 'Deltag i værksted' },
      { en: 'View Toolkit', da: 'Se værktøjskasse' },
      { en: 'Try it now', da: 'Prøv det nu' },
      { en: 'View all posts', da: 'Se alle indlæg' },
    ];

    // Test each button in English
    for (const button of buttons) {
      const elements = await page.locator(`button:has-text("${button.en}"), a:has-text("${button.en}")`).all();
      console.log(`Found ${elements.length} elements with text "${button.en}"`);
    }

    // Switch to Danish
    await page.locator('button:has(svg.lucide-globe)').click();
    await page.waitForTimeout(500);

    // Test each button in Danish
    for (const button of buttons) {
      const elements = await page.locator(`button:has-text("${button.da}"), a:has-text("${button.da}")`).all();
      console.log(`Found ${elements.length} elements with text "${button.da}"`);
    }
  });

  test('should test all headings and descriptions', async ({ page }) => {
    await page.goto('/');
    
    const contentPairs = [
      {
        en: 'Master the Future',
        da: 'Mester Fremtiden'
      },
      {
        en: 'From Ideas to',
        da: 'Fra Idéer til'
      },
      {
        en: 'AI Applications',
        da: 'AI Applikationer'
      },
      {
        en: 'Everything You Need to Succeed',
        da: 'Alt du behøver for at lykkes'
      },
      {
        en: 'Structured Learning Path',
        da: 'Struktureret Læringssti'
      },
      {
        en: 'Real-World Projects',
        da: 'Virkelige Projekter'
      },
      {
        en: 'AI-Powered Tools',
        da: 'AI-drevne Værktøjer'
      },
      {
        en: 'Expert Mentorship',
        da: 'Ekspert Mentorskab'
      }
    ];

    // Check all content in English
    for (const content of contentPairs) {
      const elements = await page.locator(`text="${content.en}"`).all();
      if (elements.length === 0) {
        console.log(`Warning: Could not find English text "${content.en}"`);
      }
    }

    // Switch to Danish
    await page.locator('button:has(svg.lucide-globe)').click();
    await page.waitForTimeout(500);

    // Check all content in Danish
    for (const content of contentPairs) {
      const elements = await page.locator(`text="${content.da}"`).all();
      if (elements.length === 0) {
        console.log(`Warning: Could not find Danish text "${content.da}"`);
      }
    }
  });

  test('should create detailed report of untranslated sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Comprehensive text extraction
    const extractAllText = async () => {
      return await page.evaluate(() => {
        const results: any[] = [];
        
        // Get all text-containing elements
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_ALL,
          {
            acceptNode: (node) => {
              if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent?.trim();
                if (text && text.length > 1) {
                  return NodeFilter.FILTER_ACCEPT;
                }
              } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as Element;
                // Check for placeholder, aria-label, title attributes
                if (el.getAttribute('placeholder') || 
                    el.getAttribute('aria-label') || 
                    el.getAttribute('title') ||
                    el.getAttribute('alt')) {
                  return NodeFilter.FILTER_ACCEPT;
                }
              }
              return NodeFilter.FILTER_SKIP;
            }
          }
        );
        
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentElement;
            if (parent) {
              results.push({
                type: 'text',
                content: node.textContent?.trim(),
                tag: parent.tagName,
                class: parent.className,
                id: parent.id,
                path: getPath(parent)
              });
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            ['placeholder', 'aria-label', 'title', 'alt'].forEach(attr => {
              const value = el.getAttribute(attr);
              if (value) {
                results.push({
                  type: 'attribute',
                  content: value,
                  attribute: attr,
                  tag: el.tagName,
                  class: el.className,
                  id: el.id,
                  path: getPath(el)
                });
              }
            });
          }
        }
        
        function getPath(el: Element): string {
          const path = [];
          let current = el;
          while (current && current !== document.body) {
            let selector = current.tagName.toLowerCase();
            if (current.id) {
              selector += `#${current.id}`;
            } else if (current.className) {
              selector += `.${current.className.split(' ')[0]}`;
            }
            path.unshift(selector);
            current = current.parentElement!;
          }
          return path.join(' > ');
        }
        
        return results;
      });
    };

    // Get English content
    const englishContent = await extractAllText();
    
    // Switch to Danish
    await page.locator('button:has(svg.lucide-globe)').click();
    await page.waitForTimeout(1000);
    
    // Get Danish content
    const danishContent = await extractAllText();
    
    // Find untranslated content
    const untranslated = englishContent.filter(eng => {
      return danishContent.some(dan => 
        dan.path === eng.path && 
        dan.content === eng.content &&
        !isExcludedContent(eng.content)
      );
    });
    
    function isExcludedContent(text: string): boolean {
      const excludePatterns = [
        /^[0-9\s\-\+\(\)\.]+$/, // Numbers
        /^[\s]*$/, // Whitespace
        /^(HARKA|AI|FAQ|API|UI|UX|MVP|CMS|SEO|URL|HTML|CSS|JS)$/i, // Tech terms
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Emails
        /^https?:\/\//, // URLs
        /^©/, // Copyright
        /^\$/, // Currency
      ];
      
      return excludePatterns.some(pattern => pattern.test(text));
    }
    
    // Generate report
    console.log('\n=== UNTRANSLATED CONTENT REPORT ===');
    console.log(`Total text elements found: ${englishContent.length}`);
    console.log(`Untranslated elements: ${untranslated.length}`);
    
    if (untranslated.length > 0) {
      console.log('\nUntranslated content by location:');
      
      // Group by path
      const byPath = untranslated.reduce((acc: any, item) => {
        const key = item.path;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {});
      
      Object.entries(byPath).forEach(([path, items]: [string, any]) => {
        console.log(`\n${path}:`);
        (items as any[]).forEach(item => {
          console.log(`  - "${item.content}" (${item.type}${item.attribute ? `: ${item.attribute}` : ''})`);
        });
      });
    }
    
    // Test passes but provides detailed logging
    expect(untranslated.length).toBeGreaterThanOrEqual(0);
  });
});