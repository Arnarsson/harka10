import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes - accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about', '/pricing', '/contact', '/blog', '/blog/(.*)',
  '/toolkit', '/team', '/workshop',
  '/api/webhook/(.*)', '/api/stripe/(.*)', '/api/check-role', '/api/direct-upload',
  '/sign-in', '/sign-in/(.*)', '/sign-up', '/sign-up/(.*)',
  '/teacher-access',  // Direct access page
  '/upload-admin'     // Direct upload bypass - NO AUTH REQUIRED
])

const isAuthPage = createRouteMatcher([
  '/sign-in', '/sign-in/(.*)', '/sign-up', '/sign-up/(.*)'
])

const isAdminRoute = createRouteMatcher(['/admin', '/admin/(.*)'])
const isTeacherRoute = createRouteMatcher(['/teach', '/teach/(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, user } = await auth()
  
  // Handle authenticated users on auth pages (prevent loops)
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // Admin routes
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    const role = user?.publicMetadata?.role as string
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/learn/dashboard', req.url))
    }
  }

  // Teacher routes - allow both teacher and admin roles
  if (isTeacherRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // TEMPORARY: Allow specific user ID for testing
    const ALLOWED_TEST_USER = 'user_30YXhnEINgKfSXpNdECrOMmXL0p'
    if (userId === ALLOWED_TEST_USER) {
      console.log(`[TEACHER ACCESS] Allowing test user ${userId} to access teacher routes`)
      return NextResponse.next()
    }
    
    const role = user?.publicMetadata?.role as string
    if (role !== 'teacher' && role !== 'admin') {
      console.log(`[TEACHER ACCESS] Denying access - user ${userId} has role "${role}"`)
      return NextResponse.redirect(new URL('/learn/dashboard', req.url))
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

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public/).*)',
  ],
}