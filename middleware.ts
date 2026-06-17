import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Is Clerk actually configured in this environment? On a preview/demo deploy
// without env vars, clerkMiddleware throws at runtime (MIDDLEWARE_INVOCATION_FAILED).
// In that case we pass requests through instead of 500-ing the whole site.
const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
const sk = process.env.CLERK_SECRET_KEY || ''
const clerkConfigured = Boolean(sk) && Boolean(pk) && !pk.includes('mock')

// Define public routes - accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about', '/pricing', '/contact', '/blog', '/blog/(.*)',
  '/toolkit', '/team', '/workshop',
  '/api/webhook/(.*)', '/api/stripe/(.*)',
  '/sign-in', '/sign-in/(.*)', '/sign-up', '/sign-up/(.*)'
  // REMOVED: '/api/check-role', '/api/direct-upload', '/teacher-access', '/upload-admin'
  // These routes MUST require authentication
])

const isAuthPage = createRouteMatcher([
  '/sign-in', '/sign-in/(.*)', '/sign-up', '/sign-up/(.*)'
])

const isAdminRoute = createRouteMatcher(['/admin', '/admin/(.*)', '/upload-admin'])
const isTeacherRoute = createRouteMatcher(['/teach', '/teach/(.*)', '/teacher-access'])

const protect = clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth()
  const role = ((sessionClaims?.metadata as { role?: string } | undefined)?.role) || 'student'

  // Handle authenticated users on auth pages (prevent loops)
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Admin routes
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Teacher routes - allow both teacher and admin roles
  if (isTeacherRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    if (role !== 'teacher' && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Protect all other routes
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

// Pass-through middleware when Clerk isn't configured (preview deploys).
function passthrough(_req: NextRequest) {
  return NextResponse.next()
}

export default clerkConfigured ? protect : passthrough

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public/).*)',
  ],
}
