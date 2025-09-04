const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Analyzing Ethos AI navigation...\n');
  
  await page.goto('https://www.ethos-ai.cc/');
  await page.waitForLoadState('networkidle');
  
  // Get navigation structure
  const navItems = await page.evaluate(() => {
    const items = [];
    
    // Check header navigation
    const headerNav = document.querySelector('header nav');
    if (headerNav) {
      const links = headerNav.querySelectorAll('a');
      links.forEach(link => {
        items.push({
          text: link.textContent.trim(),
          href: link.href,
          type: 'header'
        });
      });
    }
    
    // Check for any primary CTAs
    const buttons = document.querySelectorAll('header button, header a[class*="button"]');
    buttons.forEach(btn => {
      items.push({
        text: btn.textContent.trim(),
        type: 'button'
      });
    });
    
    return items;
  });
  
  console.log('Navigation Structure:');
  console.log('====================');
  navItems.forEach(item => {
    console.log(`- ${item.text} (${item.type})`);
  });
  
  // Analyze visual hierarchy
  const headerStyle = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return null;
    
    const style = window.getComputedStyle(header);
    return {
      background: style.backgroundColor,
      height: style.height,
      position: style.position,
      padding: style.padding
    };
  });
  
  console.log('\nHeader Style:');
  console.log('=============');
  console.log(headerStyle);
  
  // Count total navigation items
  console.log('\nKey Metrics:');
  console.log('============');
  console.log(`Total nav items: ${navItems.filter(i => i.type === 'header').length}`);
  console.log(`CTAs: ${navItems.filter(i => i.type === 'button').length}`);
  
  await browser.close();
})();