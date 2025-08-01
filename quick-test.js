const http = require('http');

http.get('http://localhost:3002/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Danish content:', data.includes('Fra idé til implementering'));
    console.log('English content:', data.includes('From idea to implementation'));
    console.log('Has Globe:', data.includes('Globe'));
    console.log('Has Admin:', data.includes('/admin'));
    
    const h1 = data.match(/<h1[^>]*>([^<]+)/);
    console.log('H1:', h1 ? h1[1] : 'Not found');
  });
}).on('error', console.error);