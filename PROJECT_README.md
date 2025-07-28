# AI Training Platform

A modern, minimalistic AI training platform built with Next.js, Supabase, and Stripe.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/arnarssons-projects/v0-crypto-dashboard)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm
- Supabase account
- Stripe account (for payments)

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo>
   cd <your-repo>
   pnpm install
   ```

2. **Environment setup**
   - `.env.local` is already configured with the Supabase instance
   - Update Stripe keys if you want to use your own

3. **Database migration**
   - Follow the instructions in `scripts/run-migration.md`
   - Run the migration in your Supabase SQL Editor

4. **Start development**
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utilities and configurations
├── supabase/         # Database migrations
├── docs/             # Documentation
└── scripts/          # Setup scripts
```

## 🎯 Features

- **Learning Management**: Track progress through AI training modules
- **Team Collaboration**: Manage teams and share progress
- **Analytics Dashboard**: Monitor learning metrics
- **AI Playground**: Experiment with prompts
- **Subscription Management**: Stripe integration for payments

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **AI**: OpenRouter API

## 📚 Documentation

- [Quick Start Guide](./docs/QUICK_START.md)
- [Production Setup](./docs/SETUP_GUIDE.md)
- [Database Schema](./supabase/migrations/)

## 🔧 Development

```bash
# Run development server
pnpm dev

# Run linting
pnpm lint

# Build for production
pnpm build
```

## 🚢 Deployment

Deploy to Vercel:
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

## 📝 License

Private project - All rights reserved