const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Loading homepage...');
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle0' });
  
  // Get initial state
  const initialState = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const langButton = Array.from(document.querySelectorAll('button')).find(btn => 
      btn.textContent?.includes('EN') || btn.textContent?.includes('DA')
    );
    return {
      h1Text: h1?.textContent || 'No H1 found',
      langButtonText: langButton?.textContent?.trim() || 'No lang button',
      hasH1WithDanish: h1?.textContent?.includes('Fra idé'),
      hasH1WithEnglish: h1?.textContent?.includes('From idea')
    };
  });
  
  console.log('Initial state:', initialState);
  
  // Try to click the language button
  try {
    await page.click('button:has-text("EN"), button:has-text("DA")');
    await page.waitForTimeout(1000);
    
    const afterClick = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const langButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent?.includes('EN') || btn.textContent?.includes('DA')
      );
      return {
        h1Text: h1?.textContent || 'No H1 found',
        langButtonText: langButton?.textContent?.trim() || 'No lang button',
        hasH1WithDanish: h1?.textContent?.includes('Fra idé'),
        hasH1WithEnglish: h1?.textContent?.includes('From idea')
      };
    });
    
    console.log('After clicking:', afterClick);
    console.log('Language changed:', initialState.h1Text !== afterClick.h1Text);
    
  } catch (e) {
    console.error('Error clicking button:', e.message);
  }
  
  await browser.close();
})();