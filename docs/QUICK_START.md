# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Enter:
   - Project name: `ai-training-platform`
   - Database Password: (generate strong password)
   - Region: (choose closest)
4. Click "Create Project" and wait ~2 minutes

### 2. Get Your Credentials

Once project is created, go to **Settings > API**:

Copy these values:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon public**: `eyJhbGc...` (long string)
- **service_role**: `eyJhbGc...` (different long string)

### 3. Run Setup Script

```bash
./scripts/setup-supabase.sh
```

Paste your credentials when prompted.

### 4. Run Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy ALL contents from `supabase/migrations/20240728000000_initial_schema.sql`
4. Paste and click "RUN"

### 5. Configure Authentication

In Supabase Dashboard:

1. Go to **Authentication > Providers**
2. Enable **Email** provider
3. Go to **Authentication > URL Configuration**
4. Set:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: Add `http://localhost:3000/auth/callback`

### 6. Start Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎯 What's Next?

1. **Stripe Setup** (for payments) - See `docs/SETUP_GUIDE.md`
2. **Deploy to Vercel** - Push to GitHub and import
3. **Custom Domain** - Configure in Vercel

## 🐛 Troubleshooting

### "Invalid API key"
- Double-check credentials in `.env.local`
- Make sure no extra spaces

### "Table not found"
- Run the migration in SQL Editor
- Check for any error messages

### "Auth redirect error"
- Update redirect URLs in Supabase
- Clear browser cookies

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Project Setup Guide](./SETUP_GUIDE.md)