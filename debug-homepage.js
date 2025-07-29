const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Enable request interception
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    console.log('Loading:', request.url());
    request.continue();
  });
  
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });
  
  // Get page title
  const title = await page.title();
  console.log('\nPage Title:', title);
  
  // Check for HarkaHero component
  const hasHarkaHero = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class*="harka"], [id*="harka"]');
    return elements.length > 0;
  });
  console.log('Has HarkaHero elements:', hasHarkaHero);
  
  // Get main heading
  const heading = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 ? h1.innerText : 'No H1 found';
  });
  console.log('Main heading:', heading);
  
  // Check for language buttons
  const langButtons = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.filter(btn => 
      btn.innerText.includes('EN') || 
      btn.innerText.includes('DA') ||
      btn.innerHTML.includes('Globe')
    ).map(btn => ({
      text: btn.innerText,
      hasOnClick: !!btn.onclick || btn.hasAttribute('onclick') || !!btn._reactInternalFiber
    }));
  });
  console.log('Language buttons found:', langButtons);
  
  // Get React component tree
  const reactInfo = await page.evaluate(() => {
    const findReactComponent = (el) => {
      for (const key in el) {
        if (key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber')) {
          return el[key];
        }
      }
      return null;
    };
    
    const root = document.getElementById('__next') || document.querySelector('main');
    if (!root) return 'No root found';
    
    const fiber = findReactComponent(root);
    if (!fiber) return 'No React fiber found';
    
    // Try to find component name
    let componentName = 'Unknown';
    if (fiber.elementType && fiber.elementType.name) {
      componentName = fiber.elementType.name;
    } else if (fiber.type && fiber.type.name) {
      componentName = fiber.type.name;
    }
    
    return { componentName, hasFiber: true };
  });
  console.log('React component info:', reactInfo);
  
  await browser.close();
})();