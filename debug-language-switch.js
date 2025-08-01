const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Loading homepage...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  
  // Check if language switch button exists
  const languageButton = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const langButton = buttons.find(btn => btn.textContent?.includes('EN') || btn.textContent?.includes('DA'));
    return {
      exists: !!langButton,
      text: langButton?.textContent || 'Not found',
      hasOnClick: !!langButton?.onclick || langButton?.hasAttribute('onclick')
    };
  });
  
  console.log('Language button:', languageButton);
  
  // Check for Danish content
  const danishContent = await page.evaluate(() => {
    return {
      headline: document.body.textContent?.includes('Fra idé til implementering'),
      englishHeadline: document.body.textContent?.includes('From idea to implementation'),
      currentText: document.querySelector('h1')?.textContent || 'No H1 found'
    };
  });
  
  console.log('Content check:', danishContent);
  
  // Try clicking the language button
  if (languageButton.exists) {
    console.log('Clicking language button...');
    await page.click('button:has-text("EN"), button:has-text("DA")');
    await page.waitForTimeout(500);
    
    const afterClick = await page.evaluate(() => {
      return {
        headline: document.querySelector('h1')?.textContent || 'No H1 found',
        hasDanish: document.body.textContent?.includes('Fra idé til implementering'),
        hasEnglish: document.body.textContent?.includes('From idea to implementation')
      };
    });
    
    console.log('After clicking:', afterClick);
  }
  
  // Check for admin link
  const adminLink = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const admin = links.find(link => link.textContent?.includes('Admin') || link.href?.includes('/admin'));
    return {
      exists: !!admin,
      text: admin?.textContent || 'Not found',
      href: admin?.href || 'Not found'
    };
  });
  
  console.log('Admin link:', adminLink);
  
  await browser.close();
})();