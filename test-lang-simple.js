const http = require('http');

function checkPage(callback) {
  http.get('http://localhost:3003', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(data));
  });
}

checkPage((html) => {
  // Check current content
  const hasDanishHeadline = html.includes('Fra idé til implementering');
  const hasEnglishHeadline = html.includes('From idea to implementation');
  const hasDanishButton = html.includes('From strategy to action in 2 days - contact us today');
  const hasValueTitle = html.includes('Værdi udover workshoppen');
  
  console.log('Content analysis:');
  console.log('- Danish headline (Fra idé...):', hasDanishHeadline);
  console.log('- English headline (From idea...):', hasEnglishHeadline); 
  console.log('- Danish CTA button:', hasDanishButton);
  console.log('- Value section in Danish:', hasValueTitle);
  
  // Check if onClick handlers are present
  const hasOnClick = html.includes('onClick');
  console.log('\nLanguage button has onClick:', hasOnClick);
  
  // Check admin visibility
  const hasAdminLink = html.includes('href="/admin"');
  const hasShieldIcon = html.includes('Shield') || html.includes('shield');
  console.log('\nAdmin access:');
  console.log('- Admin link present:', hasAdminLink);
  console.log('- Shield icon present:', hasShieldIcon);
});