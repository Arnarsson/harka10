// Simple test to check homepage component
const fs = require('fs');

// Read the app/page.tsx
const pageContent = fs.readFileSync('/root/repo/app/page.tsx', 'utf8');
console.log('=== app/page.tsx content ===');
console.log(pageContent);

// Check if there are any other page files
const { execSync } = require('child_process');
console.log('\n=== All page.tsx files ===');
const pageFiles = execSync('find /root/repo -name "page.tsx" | head -20').toString();
console.log(pageFiles);

// Check the build output
console.log('\n=== Checking .next directory ===');
try {
  const buildFiles = execSync('find /root/repo/.next -name "*page*" -type f | grep -E "(app|pages)" | head -10').toString();
  console.log(buildFiles);
} catch (e) {
  console.log('No .next directory or error:', e.message);
}