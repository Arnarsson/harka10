import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserRole, hasPermission, canAccessRoute } from '@/lib/auth/roles'

// Define public routes - accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/blog',
  '/blog/(.*)',
  '/toolkit',
  '/team',
  '/workshop',
  '/api/webhook/(.*)',
  '/api/stripe/(.*)',
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up',
  '/sign-up/(.*)'
])

// Define auth pages - redirect to dashboard if already authenticated
const isAuthPage = createRouteMatcher([
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up',
  '/sign-up/(.*)'
])

// Define admin routes
const isAdminRoute = createRouteMatcher([
  '/admin',
  '/admin/(.*)'
])

// Define teacher routes  
const isTeacherRoute = createRouteMatcher([
  '/teach',
  '/teach/(.*)'
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth()
  const user = userId ? await auth() : null
  
  // 1. Handle authenticated users on auth pages (prevent loops)
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // 2. Handle admin routes with role-based access control
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // Check if user has admin role
    const userRole = getUserRole(user as any)
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/learn/dashboard', req.url))
    }
  }

  // 3. Handle teacher routes with role-based access control
  if (isTeacherRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // Check if user has teacher or admin role
    const userRole = getUserRole(user as any)
    if (userRole !== 'teacher' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/learn/dashboard', req.url))
    }
  }

  // 4. Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // 5. Protect all other routes
  if (!userId) {
    // Store the attempted URL to redirect after login
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public/).*)',
  ],
}
