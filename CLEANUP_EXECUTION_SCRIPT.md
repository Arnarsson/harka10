# HARKA Cleanup Execution Script 🧹⚡

**WARNING**: This is the actual execution plan. Follow step-by-step with safety checks.

## 🛡️ PRE-FLIGHT SAFETY CHECKLIST

### ✅ Before You Start:
```bash
# 1. Ensure clean git state
git status  # Should show clean working tree

# 2. Create backup commit
git add .
git commit -m "🚨 BACKUP: Pre-cleanup state - emergency rollback point"

# 3. Create cleanup branch
git checkout -b massive-cleanup-consolidation

# 4. Verify current build works
pnpm run build  # MUST PASS before proceeding

# 5. Test key routes work
curl -I http://localhost:3000/
curl -I http://localhost:3000/learn/dashboard
curl -I http://localhost:3000/sign-in
```

## 🚀 PHASE 1: SAFE IMMEDIATE CLEANUP (Zero Risk)

### Step 1A: Remove Test/Debug Routes
```bash
# Delete obvious test routes
rm -rf app/test-dashboard/
rm -rf app/test-harka/
rm -rf app/test-lang/
rm -rf app/debug-auth/

echo "✅ Test routes deleted"
```

### Step 1B: Clean Root Directory  
```bash
# Create docs structure
mkdir -p docs/planning
mkdir -p docs/components
mkdir -p docs/deployment

# Move planning documents
mv 10X_SCALING_PLAN.md docs/planning/
mv 10X_SUMMARY.md docs/planning/
mv AI_SCALING_STRATEGY.md docs/planning/
mv BUILD_FIX_SUMMARY.md docs/planning/
mv ENTERPRISE_ARCHITECTURE.md docs/planning/
mv ENTERPRISE_FEATURES_ROADMAP.md docs/planning/
mv GLOBAL_LOCALIZATION_STRATEGY.md docs/planning/
mv IMPLEMENTATION_QUICK_WINS.md docs/planning/
mv INFRASTRUCTURE_10X.md docs/planning/
mv INTERACTIVE_FEATURES_STATUS.md docs/planning/
mv MARKETPLACE_ARCHITECTURE.md docs/planning/
mv MOBILE_APP_ARCHITECTURE.md docs/planning/
mv SCRIMBA_FEATURES_IMPLEMENTED.md docs/planning/
mv SCRIMBA_INSPIRED_FEATURES.md docs/planning/

# Move other docs
mv NEXT_STEPS.md docs/planning/
mv PHASE1_COMPLETE.md docs/planning/
mv PHASE1_SUMMARY.md docs/planning/
mv PHASE2_PROGRESS.md docs/planning/
mv PROJECT_README.md docs/planning/
mv MIGRATION_INSTRUCTIONS.md docs/deployment/

echo "✅ Documentation organized"
```

### Step 1C: Remove Debug Scripts
```bash
# Delete test/debug scripts
rm -f analyze-language-switch.js
rm -f check-page.js
rm -f check-render.js
rm -f compare-pages.js
rm -f debug-*.js
rm -f playwright-language-test.js
rm -f quick-test.js
rm -f test-*.js
rm -f verify-*.js
rm -f save-page.js

# Delete generated files
rm -f *.html
rm -f *.log
rm -f current-page.html
rm -f homepage-output.html
rm -f rendered-page.html

echo "✅ Debug scripts removed"
```

### Step 1D: Safety Check
```bash
# Build must still work
pnpm run build
if [ $? -eq 0 ]; then
    echo "✅ Phase 1 SUCCESS - Build still works"
    git add .
    git commit -m "Phase 1: Remove test routes and organize docs"
else
    echo "❌ PHASE 1 FAILED - Build broken, rolling back"
    git checkout .
    exit 1
fi
```

## 🔧 PHASE 2: COMPONENT CONSOLIDATION (Low Risk)

### Step 2A: Delete Unused Dashboard Components
```bash
# Delete confirmed unused dashboard components
rm -f components/dashboard/dashboard-overview.tsx
rm -f components/dashboard/dashboard-overview-minimal.tsx
rm -f components/dashboard/dashboard-overview-enhanced.tsx
rm -f components/dashboard/dashboard-overview-animated.tsx
rm -f components/dashboard/dashboard-layout.tsx  # NOT the one in /layout/
rm -f components/dashboard/dashboard-header.tsx
rm -f components/dashboard/analytics-section.tsx
rm -f components/dashboard/learning-modules.tsx
rm -f components/dashboard/learning-progress.tsx
rm -f components/dashboard/progress-overview.tsx
rm -f components/dashboard/quick-actions.tsx
rm -f components/dashboard/recent-activity.tsx
rm -f components/dashboard/team-analytics.tsx
rm -f components/dashboard/upcoming-deadlines.tsx

echo "✅ Unused dashboard components deleted"
```

### Step 2B: Safety Check
```bash
# Build must still work
pnpm run build
if [ $? -eq 0 ]; then
    echo "✅ Phase 2 SUCCESS - Build still works"
    git add .
    git commit -m "Phase 2: Remove unused dashboard components"
else
    echo "❌ PHASE 2 FAILED - Build broken, rolling back"
    git reset --hard HEAD~1
    exit 1
fi
```

## 🗂️ PHASE 3: ROUTE CONSOLIDATION (Medium Risk)

### Step 3A: Create Redirect Routes (Safe)
```bash
# Convert duplicate auth routes to redirects (DON'T DELETE YET)

# Create login redirect
cat > app/login/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function LoginRedirect() {
  redirect('/sign-in')
}
EOF

# Create login-v2 redirect  
cat > app/login-v2/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function LoginV2Redirect() {
  redirect('/sign-in')
}
EOF

# Create signup redirect
cat > app/signup/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function SignupRedirect() {
  redirect('/sign-up')
}
EOF

# Convert main dashboard to redirect (keep the file structure)
cat > app/dashboard/page.tsx << 'EOF'
import { redirect } from 'next/navigation'

export default function DashboardRedirect() {
  redirect('/learn/dashboard')
}
EOF

echo "✅ Redirect routes created"
```

### Step 3B: Test Redirects Work
```bash
# Start dev server and test redirects
echo "🧪 Testing redirects - Start dev server: pnpm run dev"
echo "Then test these URLs manually:"
echo "- http://localhost:3000/login (should redirect to /sign-in)"
echo "- http://localhost:3000/signup (should redirect to /sign-up)"  
echo "- http://localhost:3000/dashboard (should redirect to /learn/dashboard)"
echo ""
read -p "Press Enter when you've confirmed redirects work..."
```

### Step 3C: Safety Check + Commit
```bash
# Build and commit redirect changes
pnpm run build
if [ $? -eq 0 ]; then
    echo "✅ Phase 3A SUCCESS - Redirects working"
    git add .
    git commit -m "Phase 3A: Create redirect routes for consolidation"
else
    echo "❌ PHASE 3A FAILED - Build broken"
    git reset --hard HEAD~1
    exit 1
fi
```

## 🧹 PHASE 4: FINAL CLEANUP (Higher Risk - Optional)

### Step 4A: Delete Route Group (Confusing Structure)
```bash
# Remove confusing (dashboard) route group
rm -rf "app/(dashboard)/"

echo "✅ Confusing route group removed"
```

### Step 4B: Safety Check
```bash
pnpm run build
if [ $? -eq 0 ]; then
    echo "✅ Phase 4 SUCCESS"
    git add .
    git commit -m "Phase 4: Remove confusing route group"
else
    echo "❌ PHASE 4 FAILED - Reverting"
    git reset --hard HEAD~1
fi
```

## 📊 RESULTS SUMMARY

### Execute This Command to See Results:
```bash
echo "=== CLEANUP RESULTS ==="
echo "Routes before/after:"
find app -name "page.tsx" | wc -l
echo "Components before/after:" 
find components -name "*.tsx" | wc -l
echo "Root files before/after:"
ls -1 *.md 2>/dev/null | wc -l
echo "Build status:"
pnpm run build > /dev/null 2>&1 && echo "✅ PASSING" || echo "❌ FAILING"
```

## 🚨 EMERGENCY ROLLBACK

### If Anything Goes Wrong:
```bash
# Nuclear option - go back to beginning
git checkout main
git branch -D massive-cleanup-consolidation

# Or rollback specific phase:
git reset --hard HEAD~1  # Undo last commit
```

## ✅ SUCCESS CRITERIA

### You've succeeded when:
1. Build passes: `pnpm run build` ✅
2. Authentication works: Sign-in/sign-up flows ✅  
3. Dashboard accessible: `/learn/dashboard` loads ✅
4. Redirects work: Old routes redirect to new ones ✅
5. File count reduced significantly ✅

## 🎯 RECOMMENDED APPROACH

### Conservative (Safest):
**Execute Phase 1 only** - removes obvious junk, organizes docs, zero risk

### Moderate (Recommended):
**Execute Phases 1-3A** - includes component cleanup and safe redirects

### Aggressive (Complete):
**Execute all phases** - full cleanup, maximum consolidation

---

**Ready to execute?** Start with Phase 1. Each phase has safety checks and rollback options.