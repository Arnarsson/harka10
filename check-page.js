const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('=== Page Content Analysis ===\n');
    
    // Check for language switch button
    const hasGlobeIcon = data.includes('Globe') || data.includes('globe');
    const hasLanguageButton = data.includes('>EN<') || data.includes('>DA<');
    console.log('Globe icon found:', hasGlobeIcon);
    console.log('Language button found:', hasLanguageButton);
    
    // Check for content
    const hasDanishHeadline = data.includes('Fra idé til implementering');
    const hasEnglishHeadline = data.includes('From idea to implementation');
    console.log('Danish headline found:', hasDanishHeadline);
    console.log('English headline found:', hasEnglishHeadline);
    
    // Check for admin link
    const hasAdminLink = data.includes('href="/admin"') || data.includes('>Admin<');
    console.log('Admin link found:', hasAdminLink);
    
    // Extract main headline
    const h1Match = data.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      console.log('\nMain headline:', h1Match[1]);
    }
    
    // Check if it's rendering HarkaHero
    const hasHarkaHero = data.includes('From idea to implementation in just 48 hours') || 
                         data.includes('Fra idé til implementering på kun 48 timer');
    console.log('\nHarkaHero component rendered:', hasHarkaHero);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();