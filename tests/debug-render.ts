// Check what's actually rendering
async function debugRender() {
  try {
    const response = await fetch('http://localhost:3000/');
    const html = await response.text();
    
    // Save to file for inspection
    const fs = require('fs');
    fs.writeFileSync('homepage-output.html', html);
    
    // Check for key components
    console.log('Homepage HTML length:', html.length);
    console.log('\nKey content checks:');
    console.log('- Contains "HARKA":', html.includes('HARKA'));
    console.log('- Contains "HarkaHero":', html.includes('HarkaHero'));
    console.log('- Contains "Dashboard" link:', html.includes('Dashboard'));
    console.log('- Contains "Learning" link:', html.includes('Learning'));
    
    // Check if it's rendering the right page
    console.log('\nPage type detection:');
    console.log('- Is landing page:', html.includes('From idea') || html.includes('Fra idé'));
    console.log('- Has navigation:', html.includes('nav') || html.includes('navigation'));
    
    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    console.log('\nPage title:', titleMatch ? titleMatch[1] : 'No title found');
    
    // Check for hydration/client markers
    console.log('\nNext.js markers:');
    console.log('- Has __NEXT_DATA__:', html.includes('__NEXT_DATA__'));
    console.log('- Has React root:', html.includes('__next') || html.includes('root'));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

debugRender();