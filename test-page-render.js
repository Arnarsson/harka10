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
    console.log('=== Checking Page Rendering ===\n');
    
    // Check if it's a React error page
    if (data.includes('__next_error')) {
      console.log('ERROR: Next.js error page detected');
    }
    
    // Check for loading state
    if (data.includes('Loading...')) {
      console.log('Page shows Loading state');
    }
    
    // Check what's in the main content area
    const mainMatch = data.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (mainMatch) {
      const mainContent = mainMatch[1].substring(0, 200);
      console.log('Main content preview:', mainContent);
    }
    
    // Check for specific components
    console.log('\nComponent checks:');
    console.log('HarkaHero:', data.includes('HarkaHero') || data.includes('harka-hero'));
    console.log('Has navigation:', data.includes('<nav'));
    console.log('Has buttons:', data.includes('<button'));
    
    // Check for language-specific content
    console.log('\nContent checks:');
    const contentChecks = [
      'Fra idé til implementering',
      'From idea to implementation',
      'Book meeting',
      'Book møde',
      'Method',
      'Metode'
    ];
    
    contentChecks.forEach(text => {
      console.log(`"${text}":`, data.includes(text));
    });
    
    // Save full HTML for inspection
    require('fs').writeFileSync('rendered-page.html', data);
    console.log('\nFull HTML saved to rendered-page.html');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();