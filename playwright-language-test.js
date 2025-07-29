const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright test for language switch...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Go to homepage
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Wait for page to load
    await page.waitForTimeout(3000);
    
    // Check current content
    const content = await page.content();
    const hasDanish = content.includes('AI der leverer reel forretningsværdi');
    const hasEnglish = content.includes('AI that delivers real business value');
    console.log('Has Danish content:', hasDanish);
    console.log('Has English content:', hasEnglish);
    
    // Look for language button
    const langButton = await page.locator('button:has-text("EN"), button:has-text("DA")').first();
    const langButtonExists = await langButton.count() > 0;
    console.log('Language button exists:', langButtonExists);
    
    if (langButtonExists) {
      const buttonText = await langButton.textContent();
      console.log('Language button text:', buttonText);
      
      // Try to click it
      console.log('Clicking language button...');
      await langButton.click();
      await page.waitForTimeout(1000);
      
      // Check if content changed
      const newContent = await page.content();
      const newHasDanish = newContent.includes('AI der leverer reel forretningsværdi');
      const newHasEnglish = newContent.includes('AI that delivers real business value');
      console.log('After click - Has Danish:', newHasDanish);
      console.log('After click - Has English:', newHasEnglish);
      
      if (hasDanish && newHasEnglish && !newHasDanish) {
        console.log('✅ Language switch works! Changed from Danish to English');
      } else if (hasEnglish && newHasDanish && !newHasEnglish) {
        console.log('✅ Language switch works! Changed from English to Danish');
      } else {
        console.log('❌ Language switch NOT working - content did not change');
      }
    } else {
      console.log('❌ No language button found on page');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
})();