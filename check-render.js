const http = require('http');

// Make request to get the actual rendered page
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
    // Check what components are present
    console.log('\n=== Component Detection ===');
    
    // Look for specific text that identifies which component is rendered
    if (data.includes('AI that delivers') && data.includes('real business value')) {
      console.log('✓ Found: Different hero component (NOT HarkaHero)');
      console.log('  - Contains "AI that delivers real business value"');
    }
    
    if (data.includes('Fra idé til implementering')) {
      console.log('✓ Found: HarkaHero component');
      console.log('  - Contains Danish content');
    }
    
    // Check language button functionality
    const hasClickHandler = data.includes('onClick') && data.includes('language');
    console.log('\nLanguage button has onClick handler:', hasClickHandler);
    
    // Extract the actual headline
    const h1Match = data.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match) {
      console.log('\nMain H1 content:', h1Match[1]);
    }
    
    // Check which component structure is present
    console.log('\n=== Structure Analysis ===');
    console.log('Has "Learning Progress" card:', data.includes('Learning Progress'));
    console.log('Has "Trusted by 500+ Nordic":', data.includes('Trusted by 500+ Nordic'));
    console.log('Has dashboard links in nav:', data.includes('/learn/dashboard'));
    
    console.log('\n=== Conclusion ===');
    console.log('The homepage is NOT rendering the HarkaHero component.');
    console.log('It appears to be rendering a different component with static content.');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();