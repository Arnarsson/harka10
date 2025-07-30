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

async function analyzeLanguageSwitch() {
  try {
    console.log('Fetching homepage content...\n');
    const html = await fetchPage();
    
    // Extract all visible text using regex patterns
    const textPatterns = [
      // Button and link text
      /<button[^>]*>([^<]+)<\/button>/g,
      /<a[^>]*>([^<]+)<\/a>/g,
      
      // Headings
      /<h[1-6][^>]*>([^<]+)<\/h[1-6]>/g,
      
      // Paragraphs and spans
      /<p[^>]*>([^<]+)<\/p>/g,
      /<span[^>]*>([^<]+)<\/span>/g,
      
      // List items
      /<li[^>]*>([^<]+)<\/li>/g,
      
      // Labels
      /<label[^>]*>([^<]+)<\/label>/g,
      
      // Divs with direct text
      /<div[^>]*>([^<>]{2,})<\/div>/g,
    ];
    
    const foundTexts = new Set();
    
    textPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const text = match[1].trim();
        if (text && text.length > 1 && !text.match(/^[\s\d]+$/)) {
          foundTexts.add(text);
        }
      }
    });
    
    // Also look for text in nested structures
    const nestedPattern = />([^<>]{2,})</g;
    let match;
    while ((match = nestedPattern.exec(html)) !== null) {
      const text = match[1].trim();
      if (text && text.length > 1 && !text.match(/^[\s\d]+$/) && !text.includes('{') && !text.includes('}')) {
        foundTexts.add(text);
      }
    }
    
    console.log('=== ALL VISIBLE TEXT FOUND ON HOMEPAGE ===\n');
    
    // Categorize texts
    const texts = Array.from(foundTexts).sort();
    
    // Known translations
    const translations = {
      'Workshop': 'Værksted',
      'AI Toolkit': 'AI Værktøjskasse',
      'About': 'Om',
      'Pricing': 'Priser',
      'Contact': 'Kontakt',
      'Blog': 'Blog',
      'Log in': 'Log ind',
      'Sign up': 'Tilmeld',
      'Master the Future': 'Mester Fremtiden',
      'From Ideas to': 'Fra Idéer til',
      'AI Applications': 'AI Applikationer',
      'Get Started': 'Kom i gang',
      'Try AI Toolkit': 'Prøv AI Værktøjskasse',
      'Everything You Need to Succeed': 'Alt du behøver for at lykkes',
      'Join Workshop': 'Deltag i værksted',
      'View Toolkit': 'Se værktøjskasse',
      'Company': 'Virksomhed',
      'Support': 'Support',
      'Resources': 'Ressourcer',
      'Legal': 'Juridisk',
      'Privacy Policy': 'Privatlivspolitik',
      'Terms of Service': 'Servicevilkår',
      'Contact Us': 'Kontakt Os',
      'Documentation': 'Dokumentation',
      'FAQ': 'FAQ',
    };
    
    console.log('Texts with translations available:');
    texts.forEach(text => {
      if (translations[text]) {
        console.log(`✓ "${text}" → "${translations[text]}"`);
      }
    });
    
    console.log('\n\nTexts that might need translation:');
    texts.forEach(text => {
      if (!translations[text] && !text.match(/^(HARKA|AI|FAQ|API|©|2024|EN|DA)/)) {
        console.log(`✗ "${text}"`);
      }
    });
    
    // Check for language toggle button
    console.log('\n\n=== LANGUAGE TOGGLE ANALYSIS ===');
    
    if (html.includes('lucide-globe')) {
      console.log('✓ Language toggle button found (Globe icon)');
    } else {
      console.log('✗ Language toggle button NOT found');
    }
    
    // Check for language state
    if (html.includes('useState') && html.includes('language')) {
      console.log('✓ Language state management detected');
    }
    
    // Look for onClick handlers
    const onClickPattern = /onClick[=:]\s*{\s*\(\)\s*=>\s*setLanguage/;
    if (onClickPattern.test(html)) {
      console.log('✓ Language toggle onClick handler found');
    } else {
      console.log('⚠ Language toggle onClick handler not visible in HTML (normal for React)');
    }
    
    // Check for hardcoded vs dynamic text
    console.log('\n\n=== HARDCODED TEXT ANALYSIS ===');
    
    // Look for content object usage
    const contentUsagePattern = /content\[language\]\./g;
    const contentMatches = html.match(contentUsagePattern);
    if (contentMatches) {
      console.log(`✓ Found ${contentMatches.length} uses of content[language] pattern`);
    }
    
    // Look for specific hardcoded English text that should be dynamic
    const hardcodedPatterns = [
      'Join our exclusive workshop',
      'Learn directly from',
      'Ready to start your journey',
      'Featured Blog Posts',
      'Stay updated with',
      'Quick Links',
      'All rights reserved',
    ];
    
    console.log('\nChecking for potentially hardcoded text:');
    hardcodedPatterns.forEach(pattern => {
      if (html.includes(pattern)) {
        console.log(`⚠ Found hardcoded text: "${pattern}"`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nMake sure the development server is running on port 3000');
    console.log('Run: pnpm run dev');
  }
}

analyzeLanguageSwitch();