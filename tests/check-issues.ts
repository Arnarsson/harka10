// Direct check script to debug issues

async function checkIssues() {
  console.log('=== Checking Language Switch and Admin Access ===\n');
  
  try {
    // Check homepage
    console.log('1. Fetching homepage...');
    const response = await fetch('http://localhost:3000/');
    const html = await response.text();
    
    // Check for language switch elements
    console.log('\n2. Language Switch Analysis:');
    const hasGlobeIcon = html.includes('Globe');
    const hasDAText = html.includes('>DA<') || html.includes('DA</');
    const hasENText = html.includes('>EN<') || html.includes('EN</');
    const hasLanguageButton = html.includes('onLanguageChange');
    
    console.log('   - Globe icon found:', hasGlobeIcon);
    console.log('   - DA text found:', hasDAText);
    console.log('   - EN text found:', hasENText);
    console.log('   - onLanguageChange handler:', hasLanguageButton);
    
    // Check Danish content
    const hasDanishContent = html.includes('Fra idé til implementering') || 
                           html.includes('From idea to implementation');
    console.log('   - Content found:', hasDanishContent);
    
    // Check for admin links
    console.log('\n3. Admin Access Analysis:');
    const hasAdminLink = html.includes('href="/admin"') || html.includes('/admin');
    const hasAdminPanel = html.includes('Admin Panel');
    const hasShieldIcon = html.includes('Shield');
    
    console.log('   - Admin link found:', hasAdminLink);
    console.log('   - Admin Panel text:', hasAdminPanel);
    console.log('   - Shield icon found:', hasShieldIcon);
    
    // Check admin sign-in page
    console.log('\n4. Checking Admin Sign-in Page...');
    const adminResponse = await fetch('http://localhost:3000/admin/sign-in');
    const adminHtml = await adminResponse.text();
    
    const hasHarkaAdmin = adminHtml.includes('HARKA Admin');
    const hasClerkSignIn = adminHtml.includes('clerk') || adminHtml.includes('SignIn');
    
    console.log('   - HARKA Admin title:', hasHarkaAdmin);
    console.log('   - Clerk component:', hasClerkSignIn);
    console.log('   - Status:', adminResponse.status);
    
    // Extract button info
    console.log('\n5. Button Analysis:');
    const buttonMatches = html.match(/<button[^>]*>[\s\S]*?<\/button>/g) || [];
    console.log('   - Total buttons found:', buttonMatches.length);
    
    buttonMatches.forEach((button, i) => {
      if (button.includes('DA') || button.includes('EN') || button.includes('Globe')) {
        console.log(`   - Button ${i}:`, button.substring(0, 100) + '...');
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkIssues();