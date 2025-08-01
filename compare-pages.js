const http = require('http');

function checkPage(path, name) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3003${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const checks = {
          hasDanish: data.includes('Fra idé til implementering'),
          hasEnglish: data.includes('From idea to implementation'),
          hasWrongContent: data.includes('AI that delivers'),
          hasGlobe: data.includes('Globe') || data.includes('globe'),
          hasLanguageButton: data.includes('>EN<') || data.includes('>DA<'),
          hasAdmin: data.includes('/admin') && data.includes('Admin')
        };
        
        console.log(`\n${name} (${path}):`);
        Object.entries(checks).forEach(([key, value]) => {
          console.log(`  ${key}: ${value ? '✓' : '✗'}`);
        });
        
        resolve();
      });
    }).on('error', console.error);
  });
}

async function main() {
  console.log('Comparing pages...');
  await checkPage('/', 'Homepage');
  await checkPage('/test-harka', 'Test HarkaHero Page');
}

main();