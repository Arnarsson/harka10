# Claude Code Instructions for HARKA Project

## Testing Strategy

### Playwright Testing Rules
- **ALWAYS run Playwright tests** when making changes to authentication, routing, or user flows
- **REQUIRED test scenarios** for any auth-related changes:
  1. Unauthenticated user access to protected routes
  2. Authenticated user redirect from auth pages
  3. Sign-in/sign-up flow completion
  4. Middleware route protection
  5. Public route accessibility
- **Test before and after** any middleware, auth component, or routing changes
- **Create new tests** for any new user-facing features
- **Run tests in headless mode** for CI/CD: `pnpm exec playwright test --headed=false`
- **Debug with headed mode** when investigating issues: `pnpm exec playwright test --headed`

### Test Coverage Requirements
- Authentication flows (sign-in, sign-up, logout)
- Protected route access
- Public route access  
- Navigation flows
- Form submissions
- Error handling
- Mobile responsiveness (use Playwright device emulation)

## Code Quality Standards

### Authentication & Security
- **NEVER** expose API keys or secrets in client-side code
- **ALWAYS** validate user authentication on server-side (middleware)
- **USE** proper TypeScript types for auth state
- **IMPLEMENT** proper error boundaries for auth failures
- **TEST** all authentication edge cases

### Performance Optimization
- **USE** Next.js Image component for all images
- **IMPLEMENT** proper loading states and skeleton screens
- **MINIMIZE** client-side JavaScript bundles
- **USE** dynamic imports for heavy components
- **OPTIMIZE** database queries and API calls
- **IMPLEMENT** proper caching strategies

### Code Structure
- **FOLLOW** existing patterns and conventions
- **USE** TypeScript for all new code
- **IMPLEMENT** proper error handling
- **WRITE** self-documenting code with clear variable names
- **AVOID** deeply nested components (max 3 levels)
- **USE** composition over inheritance

### Component Standards
- **CREATE** reusable components in `/components`
- **USE** proper prop types and interfaces
- **IMPLEMENT** loading and error states
- **ENSURE** accessibility (ARIA labels, keyboard navigation)
- **TEST** components in isolation when possible

### API & Data Handling
- **USE** proper HTTP status codes
- **IMPLEMENT** request/response validation
- **HANDLE** network errors gracefully
- **USE** proper data fetching patterns (SWR, React Query, etc.)
- **VALIDATE** all user inputs

## Development Workflow

### Before Making Changes
1. **READ** existing code to understand patterns
2. **CHECK** if similar functionality exists
3. **PLAN** the implementation approach
4. **IDENTIFY** what tests need to be written/updated

### During Development
1. **WRITE** tests for new functionality
2. **RUN** existing tests to ensure no regressions
3. **FOLLOW** TypeScript best practices
4. **IMPLEMENT** proper error handling
5. **ADD** loading states for async operations

### After Changes
1. **RUN** full test suite: `pnpm exec playwright test`
2. **CHECK** build passes: `pnpm run build`
3. **TEST** in multiple browsers/devices
4. **VERIFY** accessibility compliance
5. **CHECK** performance impact

### Testing Commands
```bash
# Run all tests
pnpm exec playwright test

# Run tests with UI
pnpm exec playwright test --ui

# Run specific test file
pnpm exec playwright test auth.spec.ts

# Run tests in headed mode (see browser)
pnpm exec playwright test --headed

# Generate test report
pnpm exec playwright show-report

# Debug specific test
pnpm exec playwright test --debug auth.spec.ts
```

## Project-Specific Rules

### Authentication (Clerk)
- **USE** middleware for route protection
- **AVOID** client-side route guards
- **IMPLEMENT** proper loading states during auth checks
- **TEST** all auth scenarios with Playwright

### UI/UX Standards
- **MAINTAIN** consistent design system
- **USE** Tailwind CSS classes appropriately
- **IMPLEMENT** responsive design (mobile-first)
- **ENSURE** proper contrast ratios and accessibility
- **ADD** proper loading and error states

### Performance Monitoring
- **MONITOR** Core Web Vitals
- **OPTIMIZE** images and assets
- **MINIMIZE** layout shifts
- **IMPLEMENT** efficient data fetching

### Error Handling
- **IMPLEMENT** error boundaries
- **LOG** errors appropriately
- **SHOW** user-friendly error messages
- **HANDLE** network failures gracefully

## Mandatory Checks Before Deployment
1. ✅ All Playwright tests pass
2. ✅ Build completes without errors
3. ✅ TypeScript compilation succeeds
4. ✅ No console errors in browser
5. ✅ Authentication flows work correctly
6. ✅ All routes accessible as intended
7. ✅ Mobile responsiveness verified
8. ✅ Loading states implemented
9. ✅ Error handling tested
10. ✅ Performance metrics acceptable

## Quick Reference Commands
```bash
# Development
pnpm run dev

# Testing
pnpm exec playwright test
pnpm exec playwright test --headed
pnpm exec playwright test --ui

# Building
pnpm run build
pnpm run start

# Linting & Formatting
pnpm run lint
pnpm run format
```

Remember: **Quality > Speed**. Always prioritize working, tested code over quick implementations.