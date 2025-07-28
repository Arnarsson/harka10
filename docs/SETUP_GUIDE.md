# AI Training Platform - Production Setup Guide

## Prerequisites
- Node.js 18+ and pnpm
- Supabase account
- Stripe account
- OpenRouter API account
- Vercel account (for deployment)

## Step 1: Create New Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project with these settings:
   - **Project Name**: ai-training-platform
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine to start

3. Once created, go to Settings > API and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Setup Database Schema

1. In Supabase Dashboard, go to SQL Editor
2. Copy and paste the contents of `/supabase/migrations/001_initial_schema.sql`
3. Click "Run" to execute the migration

## Step 3: Configure Authentication

1. In Supabase Dashboard, go to Authentication > Providers
2. Enable Email authentication
3. (Optional) Enable OAuth providers:
   - Google: Add Client ID and Secret
   - GitHub: Add Client ID and Secret

4. Configure Auth settings:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: 
     ```
     https://your-domain.com/auth/callback
     http://localhost:3000/auth/callback
     ```

## Step 4: Stripe Setup

1. Create products in Stripe Dashboard:
   ```
   Free Plan - $0/month
   Pro Plan - $29/month
   Team Plan - $99/month
   ```

2. Copy Price IDs for each plan
3. Create webhook endpoint:
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
   - Events to listen:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

## Step 5: Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in all values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs
STRIPE_PRICE_ID_FREE=price_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_TEAM=price_...

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Step 6: Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

## Step 7: Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.local`
4. Deploy!

## Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Test Stripe subscription flow
- [ ] Verify database connections
- [ ] Set up monitoring (Vercel Analytics)
- [ ] Configure custom domain
- [ ] Enable Vercel Edge Config for feature flags
- [ ] Set up error tracking (Sentry)
- [ ] Configure backup strategy

## Security Considerations

1. **API Routes**: All protected by Supabase Auth
2. **Database**: Row Level Security (RLS) enabled
3. **Secrets**: Never commit `.env.local`
4. **CORS**: Configure allowed origins
5. **Rate Limiting**: Implement on AI endpoints

## Monitoring & Analytics

1. **Vercel Analytics**: Automatic with deployment
2. **Supabase Dashboard**: Database metrics
3. **Stripe Dashboard**: Revenue metrics
4. **Custom Analytics**: Track in `analytics_events` table

## Support

For issues or questions:
- Supabase: [Discord](https://discord.supabase.com)
- Stripe: [Support](https://support.stripe.com)
- Vercel: [Support](https://vercel.com/support)