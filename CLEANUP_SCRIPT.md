# 🧹 HARKA10 Repository Cleanup Script

## ⚠️ CRITICAL: Large Files to Remove Immediately

The repository contains **57MB+ of unnecessary files** that must be removed:

### Large Binary Files (57MB total)
```bash
# Remove these immediately:
rm supabase-cli                    # 42MB
rm supabase.tar.gz                # 15MB
```

### Debug and Test Files to Remove (30+ files)
```bash
# Language debugging files
rm analyze-language-switch.js
rm debug-language-switch.js
rm debug-homepage.js
rm test-*-language-*.js
rm test-*-final*.js
rm test-*-simple.js
rm test-*-click.js
rm test-*-harka-*.js
rm test-*-render.js
rm playwright-language-test.js
rm verify-*.js

# Output files
rm current-page.html
rm homepage-output.html
rm rendered-page.html
rm test-language-switch.html

# Utility scripts
rm check-*.js
rm compare-*.js
rm quick-test.js
rm save-page.js

# Build logs
rm build.log

# Backup files
rm middleware.ts.bak
```

## 🚀 One-Command Cleanup

Create and run this cleanup script:

```bash
#!/bin/bash
echo "🧹 Cleaning up HARKA10 repository..."

# Remove large files
echo "Removing large binary files..."
rm -f supabase-cli supabase.tar.gz

# Remove test and debug files
echo "Removing test files..."
rm -f analyze-language-switch.js
rm -f debug-language-switch.js
rm -f debug-homepage.js
rm -f test-*.js
rm -f playwright-language-test.js
rm -f verify-*.js
rm -f check-*.js
rm -f compare-*.js
rm -f quick-test.js
rm -f save-page.js

# Remove output files
echo "Removing output files..."
rm -f current-page.html
rm -f homepage-output.html
rm -f rendered-page.html
rm -f test-language-switch.html

# Remove build logs and backups
echo "Removing logs and backups..."
rm -f build.log
rm -f middleware.ts.bak

# Remove test directories if empty
echo "Cleaning up empty directories..."
rmdir test-results 2>/dev/null || true
rmdir playwright-report 2>/dev/null || true

echo "✅ Repository cleanup complete!"
echo "Repository size reduced by ~57MB"

# Show what's left in root
echo "📁 Remaining files in root:"
ls -la | grep -v "^d"
```

## 📊 Before vs After

### Before Cleanup (Current State)
- **Size**: ~60MB
- **Files**: 40+ unnecessary files
- **Issues**: Slow cloning, unprofessional appearance

### After Cleanup (Target State)
- **Size**: ~3MB
- **Files**: Clean, organized structure
- **Benefits**: Fast cloning, professional repository

## 🎯 What to Keep

### Essential Files
```
✅ package.json & package-lock.json
✅ tsconfig.json
✅ tailwind.config.ts
✅ next.config.mjs
✅ components.json
✅ .env.local.example
✅ .gitignore
✅ LICENSE
```

### Documentation (Keep & Update)
```
✅ PROJECT_README.md (update)
✅ CLAUDE.md (update)
✅ PHASE2_PROGRESS.md (current)
✅ NEXT_STEPS.md (update)
```

### Code Directories
```
✅ app/
✅ components/
✅ lib/
✅ styles/
✅ public/
✅ supabase/
✅ hooks/
✅ docs/
```

## 🔄 Post-Cleanup Actions

1. **Update .gitignore**
```bash
# Add to .gitignore to prevent future issues
echo "# Debug and test files" >> .gitignore
echo "test-*.js" >> .gitignore
echo "debug-*.js" >> .gitignore
echo "*.html" >> .gitignore
echo "build.log" >> .gitignore
echo "*.tar.gz" >> .gitignore
echo "supabase-cli" >> .gitignore
```

2. **Git Cleanup**
```bash
git add -A
git commit -m "🧹 Major cleanup: Remove 57MB of unnecessary files

- Remove supabase-cli (42MB) and supabase.tar.gz (15MB)
- Remove 30+ debug and test files
- Clean up root directory structure
- Optimize repository for professional presentation

Repository size reduced from ~60MB to ~3MB"
```

3. **Update README.md**
   - Replace current README.md with PROJECT_README.md content
   - Remove Supabase CLI documentation
   - Add proper HARKA10 project description

## ⚡ Implementation Commands

```bash
# 1. Create cleanup script
cat > cleanup-harka10.sh << 'EOF'
[paste cleanup script above]
EOF

# 2. Make it executable
chmod +x cleanup-harka10.sh

# 3. Run cleanup
./cleanup-harka10.sh

# 4. Git cleanup
git add -A
git commit -m "🧹 Major cleanup: Remove 57MB unnecessary files"

# 5. Update README
mv PROJECT_README.md README.md
git add README.md
git commit -m "📝 Update README with proper project description"
```

## 🎉 Expected Results

After cleanup:
- ✅ **Professional repository** appearance
- ✅ **Fast cloning** and downloading
- ✅ **Clear project structure**
- ✅ **Reduced storage costs**
- ✅ **Better developer experience**

This cleanup is **critical** for making HARKA10 a professional, production-ready project!