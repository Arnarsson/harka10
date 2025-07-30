const http = require('http');

http.get('http://localhost:3002/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Save to file for analysis
    require('fs').writeFileSync('current-page.html', data);
    
    // Check for key elements
    console.log('=== Page Analysis ===');
    console.log('Page length:', data.length);
    console.log('Has Danish content:', data.includes('Fra idé til implementering'));
    console.log('Has English content:', data.includes('From idea to implementation'));
    console.log('Has Globe icon:', data.includes('Globe') || data.includes('globe'));
    console.log('Has language button EN:', data.includes('>EN<'));
    console.log('Has language button DA:', data.includes('>DA<'));
    console.log('Has Admin link:', data.includes('/admin'));
    console.log('Has Shield icon:', data.includes('Shield') || data.includes('shield'));
    
    // Check for React components
    console.log('\n=== Component Checks ===');
    console.log('Has HarkaHero:', data.includes('HarkaHero'));
    console.log('Has nav element:', data.includes('<nav'));
    console.log('Has button elements:', data.includes('<button'));
    
    // Extract headlines
    const h1s = data.match(/<h1[^>]*>([^<]+)<\/h1>/g);
    if (h1s) {
      console.log('\n=== Headlines found ===');
      h1s.forEach(h1 => console.log(h1));
    } else {
      console.log('\n=== No H1 headlines found ===');
    }
    
    console.log('\nFull HTML saved to current-page.html');
  });
}).on('error', console.error);