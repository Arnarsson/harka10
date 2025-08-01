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

async function testLanguageSwitch() {
  try {
    console.log('Testing language switch implementation...\n');
    const html = await fetchPage();
    
    // List of all hardcoded text found that should be translated
    const hardcodedTexts = [
      // Stats and testimonials
      "faster risk assessment",
      "reduction in tied-up capital", 
      "speed increase in data analysis",
      "What Our Clients Say",
      "85% faster risk assessments",
      "HARKA transformed our technical analysis process. What used to take our experts hours now takes minutes.",
      "Companies grown",
      "Course participants and employees trained",
      "98% Satisfaction Rate",
      "500+ Companies Trained",
      
      // FAQ section
      "Frequently Asked Questions",
      "Everything you need to know about our AI workshops",
      "How realistic is the \"ROI within first week\" claim?",
      "What exactly happens in the 48-hour workshop?",
      "What if our team has no technical background?",
      "How do you ensure GDPR compliance with AI tools?",
      "What support do we get after the workshop?",
      "How much does the workshop cost and what's included?",
      
      // CTA and misc
      "Book Your Discovery Call",
      "Free consultation - no obligations, just a conversation",
      "Trusted by leading Nordic companies",
      "Join Workshop",
      "View Toolkit",
      "Try it now",
      "View all articles",
      "All rights reserved",
      
      // Results section
      "Results that speak for themselves",
      "In just 48 hours, our customers have achieved significant business breakthroughs.",
      "From manual inspections to intelligent analysis",
      "From overstocked inventory to optimized stock",
      "From hours of manual processing to instant insight",
      
      // Process section
      "The result: From strategy to action in 48 hours",
      "Day 1: Opportunities & Prototypes",
      "Day 2: Implementation & Handover",
      
      // Team section
      "Meet the two experts who, in just 48 hours, transform your company's AI potential into practical solutions and concrete results.",
      
      // Blog section
      "Latest Insights",
      "Explore our latest thoughts and insights on AI implementation, business transformation, and achieving practical results.",
      
      // Value proposition
      "AI implementation: From months to hours",
      "Most companies struggle to convert AI promises into business value. We do it differently.",
      "Traditional AI implementations take months or years. HARKA delivers usable solutions in just 48 hours.",
      "Competency transfer from day one",
      
      // Case study
      "Service reports required many hours of manual entry per report.",
      "Risk analyses of turbo systems took days to complete.",
      "Capital was tied up in older spare parts without inventory overview.",
      
      // Footer
      "Quick Links",
      "Stay updated with",
      "Learn directly from",
      "Ready to start your journey",
      "Featured Blog Posts"
    ];
    
    console.log('=== HARDCODED TEXT ANALYSIS ===\n');
    console.log('Checking for hardcoded text that needs translation...\n');
    
    let foundCount = 0;
    let missingCount = 0;
    
    hardcodedTexts.forEach(text => {
      if (html.includes(text)) {
        console.log(`❌ FOUND: "${text}"`);
        foundCount++;
      } else {
        missingCount++;
      }
    });
    
    console.log(`\n\nSummary:`);
    console.log(`- Found ${foundCount} hardcoded texts that need translation`);
    console.log(`- ${missingCount} texts not found (might already be translated or not on this page)`);
    
    // Check if language toggle is implemented
    console.log('\n\n=== LANGUAGE TOGGLE IMPLEMENTATION ===\n');
    
    if (html.includes('content[language]')) {
      console.log('✅ Language-based content switching is implemented');
      
      // Count how many translations are properly implemented
      const translationPattern = /content\[language\]\./g;
      const matches = html.match(translationPattern) || [];
      console.log(`✅ Found ${matches.length} properly translated text elements`);
    } else {
      console.log('❌ Language-based content switching NOT found');
    }
    
    // Check specific sections
    console.log('\n\n=== SECTION-BY-SECTION ANALYSIS ===\n');
    
    const sections = [
      { name: 'Navigation', keywords: ['Workshop', 'AI Toolkit', 'About', 'Pricing'] },
      { name: 'Hero', keywords: ['Master the Future', 'From Ideas to', 'Get Started'] },
      { name: 'Features', keywords: ['Everything You Need', 'Structured Learning'] },
      { name: 'Results', keywords: ['faster risk assessment', '85%', '75%'] },
      { name: 'Testimonials', keywords: ['What Our Clients Say', 'Maritime Company'] },
      { name: 'FAQ', keywords: ['Frequently Asked Questions', 'How realistic'] },
      { name: 'Footer', keywords: ['Company', 'Support', 'All rights reserved'] }
    ];
    
    sections.forEach(section => {
      const found = section.keywords.filter(keyword => html.includes(keyword));
      if (found.length > 0) {
        console.log(`${section.name}: Found ${found.length}/${section.keywords.length} expected elements`);
        if (found.length < section.keywords.length) {
          console.log(`  Missing: ${section.keywords.filter(k => !html.includes(k)).join(', ')}`);
        }
      } else {
        console.log(`${section.name}: ❌ No expected elements found`);
      }
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nMake sure the development server is running on port 3000');
    console.log('Run: pnpm run dev');
  }
}

testLanguageSwitch();