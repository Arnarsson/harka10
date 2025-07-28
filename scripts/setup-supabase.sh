#!/bin/bash

# Supabase Remote Setup Script
# This script helps you set up a new Supabase project

echo "🚀 Supabase Setup Script"
echo "========================"
echo ""
echo "This script will help you set up a new Supabase project."
echo ""
echo "Prerequisites:"
echo "1. Create a new project at https://app.supabase.com"
echo "2. Get your project credentials from Settings > API"
echo ""
echo "Press Enter to continue..."
read

# Create .env.local file
echo "Creating .env.local file..."
cp .env.example .env.local

echo ""
echo "📝 Please enter your Supabase credentials:"
echo ""

read -p "NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
read -p "NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY
read -p "SUPABASE_SERVICE_ROLE_KEY: " SUPABASE_SERVICE_KEY

# Update .env.local
sed -i "s|your_supabase_project_url|$SUPABASE_URL|g" .env.local
sed -i "s|your_supabase_anon_key|$SUPABASE_ANON_KEY|g" .env.local
sed -i "s|your_supabase_service_role_key|$SUPABASE_SERVICE_KEY|g" .env.local

echo ""
echo "✅ Environment variables updated!"
echo ""
echo "📊 Database Migration"
echo "===================="
echo ""
echo "To run the database migration:"
echo ""
echo "1. Go to your Supabase Dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Create a new query"
echo "4. Copy and paste the contents of:"
echo "   supabase/migrations/20240728000000_initial_schema.sql"
echo "5. Click 'Run' to execute"
echo ""
echo "🔐 Authentication Setup"
echo "======================"
echo ""
echo "1. Go to Authentication > Providers"
echo "2. Enable Email authentication"
echo "3. (Optional) Enable OAuth providers"
echo "4. Update Authentication > URL Configuration:"
echo "   - Site URL: http://localhost:3000"
echo "   - Redirect URLs: http://localhost:3000/auth/callback"
echo ""
echo "Press Enter when you've completed the database migration..."
read

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm install' to install dependencies"
echo "2. Run 'pnpm dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "Happy coding! 🚀"