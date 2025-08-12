# 🧠 HARKA - AI Learning Platform

> Professional AI implementation and learning platform for Danish businesses and individuals.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat&logo=clerk)](https://clerk.com/)

## 🌟 Overview

HARKA is a comprehensive AI learning and implementation platform designed for Danish businesses. It offers AI assessment tools, educational content, and guided implementation processes to help organizations adopt AI technologies effectively.

### Key Value Proposition
**"From idea to implementation in just 48 hours"** - Professional AI implementation services with measurable results.

## ✨ Features

### 🎯 Core Features
- **AI Compass Assessment** - Free AI potential evaluation tool
- **48-Hour Implementation Process** - Structured AI adoption methodology
- **Multi-language Support** - Full Danish and English localization
- **Professional B2B Landing** - Conversion-optimized design
- **Dark/Light Mode** - Sophisticated theme system

### 👥 User Roles & Access
- **Students** - Access learning content and AI Compass
- **Teachers** - Upload content, manage courses, view analytics
- **Admins** - Full platform management, user administration

### 🎨 Design System
- Professional B2B aesthetic
- WCAG 2.2 AA accessibility compliance
- Mobile-first responsive design
- Clean minimalist interface
- Danish corporate design standards

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Clerk account for authentication

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/harka.git
cd harka

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Clerk keys

# Run development server
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional Clerk Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/learn/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/learn/dashboard

# Database (if using)
DATABASE_URL=your_database_url

# Additional API Keys (as needed)
OPENAI_API_KEY=your_openai_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

## 👨‍💼 Admin Access & Role Management

### Setting Up Admin Access

1. **Sign up** for an account on the platform
2. **In Clerk Dashboard**:
   - Go to Users
   - Select your user
   - Click "Edit" → "Public metadata"
   - Add: `{"role": "admin"}`
   - Save changes

3. **Access Admin Panel**:
   - Visit `/admin/quick-access` for all admin links
   - Or directly access `/admin/dashboard`

### Available Roles
- `admin` - Full platform access
- `teacher` - Teaching tools and content management
- `student` - Learning content access (default)

### Development Mode
During development, admin routes are temporarily accessible to all authenticated users. Remove the commented redirect lines in `middleware.ts` before production deployment.

## 📁 Project Structure

```
harka/
├── app/                        # Next.js App Router
│   ├── (dashboard)/           # Protected dashboard routes
│   ├── admin/                 # Admin panel routes
│   ├── api/                   # API routes
│   ├── learn/                 # Learning platform
│   ├── teach/                 # Teacher tools
│   └── globals.css            # Global styles
├── components/                # React components
│   ├── ui/                    # Base UI components
│   ├── landing/               # Landing page components
│   ├── layout/                # Layout components
│   └── [feature]/             # Feature-specific components
├── lib/                       # Utility libraries
│   ├── auth/                  # Authentication helpers
│   ├── i18n/                  # Internationalization
│   └── utils.ts               # General utilities
├── tests/                     # E2E and integration tests
├── middleware.ts              # Route protection
└── tailwind.config.js         # Styling configuration
```

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run start            # Start production server
pnpm run lint             # Run ESLint
pnpm run type-check       # TypeScript type checking

# Testing
pnpm run test             # Run Playwright tests
pnpm run test:ui          # Run tests with UI
```

### Code Quality Standards

- **TypeScript** for all new code
- **ESLint + Prettier** for code formatting
- **Accessibility first** - WCAG 2.2 AA compliance
- **Mobile-first** responsive design
- **Performance optimized** - Core Web Vitals

### Development Workflow

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Develop with tests**: Write tests for new functionality
3. **Run quality checks**: `pnpm run lint && pnpm run type-check`
4. **Test build**: `pnpm run build`
5. **Submit PR**: Include description and testing instructions

## 🧪 Testing

### Test Structure
- `tests/comprehensive.spec.ts` - Full feature testing
- `tests/admin-access.spec.ts` - Admin functionality
- `tests/simple-test.spec.ts` - Quick verification

### Running Tests

```bash
# Install Playwright browsers (first time)
npx playwright install

# Run all tests
pnpm run test

# Run specific test file
npx playwright test tests/admin-access.spec.ts

# Run with UI for debugging
pnpm run test:ui
```

### Test Coverage
- ✅ Landing page functionality
- ✅ Authentication flows
- ✅ Admin access control
- ✅ Language switching
- ✅ Dark mode functionality
- ✅ Responsive design
- ✅ Accessibility compliance

## 🌍 Internationalization

### Supported Languages
- **Danish (da)** - Primary language
- **English (en)** - Secondary language

### Adding Translations

1. Update `lib/i18n/translations.ts`
2. Add keys to both `da` and `en` objects
3. Use in components: `const t = translations[language]`

### Language Switching
- Automatic detection from localStorage
- Manual toggle in header
- Persists across page loads
- Updates all content dynamically

## 🎨 Design System

### Color System
```css
/* Light Mode */
--background: #ffffff
--foreground: #2c3e50
--primary: #4a90e2
--secondary: #f8f9fa

/* Dark Mode */
--background: #0f172a
--foreground: #e2e8f0
--primary: #60a5fa
--secondary: #1e293b
```

### Typography
- **Font**: Inter (system fallback: SF Pro Display, Segoe UI)
- **Scale**: Fluid typography with `clamp()`
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Consistent design tokens
- Accessible focus states
- Smooth animations (respects `prefers-reduced-motion`)
- Mobile-optimized touch targets (44px minimum)

## 📱 Key Routes

### Public Routes
- `/` - Professional B2B landing page
- `/learn/ai-kompas` - AI Compass assessment (lead magnet)
- `/community/power-hour` - Community events
- `/pricing` - Pricing information

### Protected Routes
- `/learn/dashboard` - User dashboard
- `/learn/courses` - Learning content
- `/profile` - User profile management

### Admin Routes
- `/admin/quick-access` - Admin navigation hub
- `/admin/dashboard` - Admin overview
- `/admin/users` - User management
- `/admin/content` - Content management
- `/admin/courses` - Course administration

### Teacher Routes
- `/teach/dashboard` - Teaching analytics
- `/teach/upload` - Content upload
- `/teacher-access` - Teacher portal

## 🚦 Deployment

### Production Checklist

1. **Environment Variables**
   - Set production Clerk keys
   - Configure database connections
   - Add required API keys

2. **Security**
   - Uncomment auth redirects in `middleware.ts`
   - Verify role-based access control
   - Test all authentication flows

3. **Performance**
   - Run `pnpm run build` successfully
   - Verify Lighthouse scores >90
   - Test Core Web Vitals

4. **Content**
   - Update case studies with real data
   - Review all Danish translations
   - Test language switching

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Environment Variables in Production
Set all required environment variables in your deployment platform.

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- Follow existing code style
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed
- Maintain accessibility standards

### Pull Request Process
1. Describe changes clearly
2. Include testing instructions
3. Verify build passes
4. Ensure accessibility compliance
5. Update README if needed

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Getting Help
- Check existing GitHub issues
- Review project documentation
- Contact the development team

### Troubleshooting

**Build Errors**:
```bash
# Clear Next.js cache
rm -rf .next
pnpm run build
```

**Authentication Issues**:
- Verify Clerk environment variables
- Check middleware.ts configuration
- Ensure user roles are set correctly

**Development Server Issues**:
```bash
# Kill existing processes
pkill -f "next dev"
pnpm run dev
```

---

**Built with ❤️ for Danish businesses adopting AI**

For more information, visit our [documentation](./DARK_MODE_AND_UX_IMPROVEMENTS.md) or contact us at contact@harka.dk
