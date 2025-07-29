const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Check for HarkaHero content
    const hasHarkaHero = data.includes('AI der leverer reel forretningsværdi');
    const hasLanguageButton = data.includes('Globe') && (data.includes('EN') || data.includes('DA'));
    const hasOnClick = data.includes('onLanguageChange') || data.includes('onClick');
    
    console.log('Homepage Analysis:');
    console.log('- Has HarkaHero Danish content:', hasHarkaHero);
    console.log('- Has language button:', hasLanguageButton);
    console.log('- Has onClick handlers:', hasOnClick);
    
    // Extract main heading
    const h1Match = data.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      console.log('- Main heading:', h1Match[1]);
    }
    
    // Check for console logs
    if (data.includes('LandingPage mounted')) {
      console.log('- Component mounted successfully');
    }
    
    // Save a snippet for inspection
    const fs = require('fs');
    fs.writeFileSync('/tmp/homepage-check.html', data);
    console.log('\nFull HTML saved to /tmp/homepage-check.html');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();