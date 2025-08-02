#!/bin/bash

echo "🚀 HARKA10 Production Deployment Helper"
echo "========================================"

# Check if we're on the production-ready branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "production-ready" ]; then
    echo "⚠️  Warning: You're on branch '$current_branch', not 'production-ready'"
    echo "   Switch to production-ready branch for deployment:"
    echo "   git checkout production-ready"
    exit 1
fi

echo "✅ On production-ready branch"

# Test the build
echo "🔨 Testing production build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Commit them first:"
    git status --short
    exit 1
fi

echo "✅ No uncommitted changes"

# Push latest changes
echo "📤 Pushing latest changes to GitHub..."
git push origin production-ready

echo ""
echo "🎉 Ready for Vercel deployment!"
echo ""
echo "Next steps:"
echo "1. Go to vercel.com and create new project"
echo "2. Select Arnarsson/harka10 repository"
echo "3. Choose 'production-ready' branch"
echo "4. Deploy with default Next.js settings"
echo "5. Configure ethos-ai.cc domain in Vercel dashboard"
echo ""
echo "📋 See DEPLOYMENT.md for detailed instructions"