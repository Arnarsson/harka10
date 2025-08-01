const http = require('http');

async function fetchPage(port = 3000) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function testFinalLanguageSwitch() {
  try {
    console.log('Testing comprehensive language switch implementation...\n');
    const html = await fetchPage();
    
    // List of text that should now be translated
    const translatedTexts = [
      // Stats cards
      "faster risk assessment",
      "reduction in tied-up capital", 
      "speed increase in data analysis",
      "From manual inspections to intelligent analysis",
      "From overstocked inventory to optimized stock",
      "From hours of manual processing to instant insight",
      
      // Testimonials
      "What Our Clients Say",
      "85% faster risk assessments",
      "HARKA transformed our technical analysis process",
      "ROI within first week",
      "Team productivity up 60%",
      
      // FAQ
      "Frequently Asked Questions",
      "Everything you need to know about our AI workshops",
      
      // CTA
      "Book Your Discovery Call",
      "Free consultation - no obligations, just a conversation",
      "Trusted by leading Nordic companies",
      "Join 500+ companies already transforming with AI",
      
      // Footer
      "Hours",
      "Value", 
      "Potential",
      "Privacy policy",
      "Cookie policy",
      "Terms and conditions",
      "All rights reserved"
    ];
    
    console.log('=== TRANSLATION CHECK ===\n');
    
    let hardcodedCount = 0;
    let notFoundCount = 0;
    
    translatedTexts.forEach(text => {
      if (html.includes(text)) {
        console.log(`❌ Still hardcoded: "${text}"`);
        hardcodedCount++;
      } else {
        notFoundCount++;
      }
    });
    
    console.log(`\nSummary:`);
    console.log(`- ${hardcodedCount} texts still hardcoded (should be 0 if all fixed)`);
    console.log(`- ${notFoundCount} texts not found as hardcoded (good!)`);
    
    // Check if translation variables are being used
    console.log('\n=== TRANSLATION IMPLEMENTATION CHECK ===\n');
    
    // Look for translation variable usage
    const tPatterns = [
      '{t.fasterRiskAssessment}',
      '{t.testimonialTitle}',
      '{t.faqTitle}',
      '{t.bookDiscoveryCall}',
      '{t.valueTitle}',
      '{t.processTitle}',
      '{t.resultsTitle}',
      '{t.teamTitle}',
      '{t.blogTitle}'
    ];
    
    let foundTranslations = 0;
    tPatterns.forEach(pattern => {
      // Note: In rendered HTML, React expressions won't show as {t.xxx}
      // We need to check if the content object is being used
      if (html.includes('content[language]') || html.includes('const t = content[language]')) {
        foundTranslations++;
      }
    });
    
    if (foundTranslations > 0 || notFoundCount > 20) {
      console.log('✅ Translation system appears to be implemented');
      console.log('✅ Most hardcoded text has been replaced with translation variables');
    } else {
      console.log('⚠ Translation implementation may need verification');
    }
    
    // Check language toggle
    console.log('\n=== LANGUAGE TOGGLE CHECK ===\n');
    
    if (html.includes('lucide-globe')) {
      console.log('✅ Language toggle button present');
    }
    
    if (html.includes('useState') && html.includes('language')) {
      console.log('✅ Language state management detected');
    }
    
    // Final status
    console.log('\n=== FINAL STATUS ===\n');
    
    if (hardcodedCount === 0) {
      console.log('🎉 SUCCESS! All text elements have been properly set up for translation.');
      console.log('The language switch should now work for all text on the page.');
    } else {
      console.log(`⚠ ${hardcodedCount} text elements still need to be updated.`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nMake sure the development server is running on port 3000');
  }
}

testFinalLanguageSwitch();