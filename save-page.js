const http = require('http');
const fs = require('fs');

http.get('http://localhost:3002/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('homepage-output.html', data);
    console.log('Page saved to homepage-output.html');
    
    // Check for specific content
    if (data.length < 1000) {
      console.log('WARNING: Page seems too short!');
      console.log('Length:', data.length);
      console.log('First 500 chars:', data.substring(0, 500));
    }
  });
}).on('error', console.error);