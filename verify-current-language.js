const http = require('http');

async function verifyCurrentLanguage() {
  try {
    const html = await new Promise((resolve, reject) => {
      http.get('http://localhost:3000/', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
    
    console.log('=== LANGUAGE STATE CHECK ===\n');
    
    // Check current language state
    const danishIndicators = [
      'Betroet af 500+ nordiske virksomheder',
      'hurtigere risikovurdering',
      'reduktion i bundet kapital',
      'hastighedsforøgelse i dataanalyse',
      'Fra manuelle inspektioner til intelligent analyse',
      'Hvad vores kunder siger',
      'Ofte stillede spørgsmål',
      'Timer',
      'Værdi',
      'Potentiale'
    ];
    
    const englishIndicators = [
      'Trusted by 500+ Nordic Companies',
      'faster risk assessment',
      'reduction in tied-up capital',
      'speed increase in data analysis',
      'From manual inspections to intelligent analysis',
      'What Our Clients Say',
      'Frequently Asked Questions',
      'Hours',
      'Value',
      'Potential'
    ];
    
    let danishCount = 0;
    let englishCount = 0;
    
    console.log('Danish text found:');
    danishIndicators.forEach(text => {
      if (html.includes(text)) {
        console.log(`✓ ${text}`);
        danishCount++;
      }
    });
    
    console.log('\nEnglish text found:');
    englishIndicators.forEach(text => {
      if (html.includes(text)) {
        console.log(`✓ ${text}`);
        englishCount++;
      }
    });
    
    console.log(`\nSummary:`);
    console.log(`- Danish text elements: ${danishCount}`);
    console.log(`- English text elements: ${englishCount}`);
    
    if (danishCount > 0 && englishCount > 0) {
      console.log('\n⚠ MIXED LANGUAGE CONTENT DETECTED');
      console.log('The page is showing both Danish and English text.');
      console.log('This suggests the language switching is partially working.');
    } else if (danishCount > englishCount) {
      console.log('\n✅ Page is primarily in Danish');
    } else {
      console.log('\n✅ Page is primarily in English');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

verifyCurrentLanguage();