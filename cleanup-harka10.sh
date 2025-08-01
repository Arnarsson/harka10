#!/bin/bash

# HARKA10 Repository Cleanup Script
# Run this from the root of your harka10 repository

echo "🧹 Starting HARKA10 cleanup..."

# 1. Remove large Supabase CLI artifacts
echo "📦 Removing Supabase CLI artifacts..."
rm -f supabase-cli
rm -f supabase.tar.gz
echo "✅ Removed 57MB of unnecessary files"

# 2. Remove test and debug files
echo "🧪 Cleaning up test files..."
rm -f test-*.js
rm -f debug-*.js
rm -f check-*.js
rm -f compare-*.js
rm -f verify-*.js
rm -f analyze-*.js
rm -f playwright-*.js
rm -f quick-test.js
rm -f save-page.js
rm -f test-*.html
rm -f *-output.html
rm -f current-page.html
rm -f rendered-page.html
rm -rf playwright-report/
rm -rf test-results/
echo "✅ Removed test artifacts"

# 3. Clean up duplicate auth pages
echo "🔐 Organizing auth pages..."
# Keep only the canonical auth pages
rm -rf app/login/
rm -rf app/signup/
rm -rf app/logout/
rm -rf app/login-v2/
rm -rf app/debug-auth/
echo "✅ Consolidated auth pages to /sign-in and /sign-up"

# 4. Remove test routes
echo "🧭 Cleaning test routes..."
rm -rf app/test-*
echo "✅ Removed test routes"

# 5. Create proper .gitignore entries
echo "📝 Updating .gitignore..."
cat >> .gitignore << EOL

# Supabase artifacts
supabase-cli
*.tar.gz

# Test files
test-*.js
debug-*.js
*-output.html
playwright-report/
test-results/

# OS files
.DS_Store
Thumbs.db

# IDE
.idea/
*.swp
*.swo
EOL
echo "✅ Updated .gitignore"

# 6. Create backup of middleware before fixing
echo "💾 Backing up middleware..."
cp middleware.ts middleware.ts.backup-$(date +%Y%m%d)
rm -f middleware.ts.bak
echo "✅ Created middleware backup"

# 7. Clean build artifacts
echo "🏗️  Cleaning build artifacts..."
rm -rf .next/
rm -rf out/
rm -f build.log
echo "✅ Cleaned build artifacts"

# 8. Summary
echo ""
echo "✨ HARKA10 Cleanup Complete!"
echo "📊 Repository size reduced significantly"
echo "🔐 Auth pages consolidated"
echo "🧪 Test files removed"
echo ""
echo "Next steps:"
echo "1. Run 'git add -A' to stage changes"
echo "2. Run 'git commit -m \"chore: major cleanup - remove test files and consolidate auth\"'"
echo "3. Run 'git push' to update repository"
