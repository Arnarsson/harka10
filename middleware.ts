import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes - accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about', '/pricing', '/contact', '/blog', '/blog/(.*)',
  '/toolkit', '/team', '/workshop',
  '/api/webhook/(.*)', '/api/stripe/(.*)',
  '/sign-in', '/sign-in/(.*)', '/sign-up', '/sign-up/(.*)',
  // AI Compass is a lead magnet - publicly accessible
  '/learn/ai-kompas', '/learn/ai-kompas/(.*)', 
  '/api/ai-kompas/(.*)',
  // Community Power Hour - publicly accessible
  '/community/power-hour',
  // Demo routes
  '/demo', '/demo/(.*)'
  // REMOVED: '/api/check-role', '/api/direct-upload', '/teacher-access', '/upload-admin'
  // These routes MUST require authentication
])

const isAuthPage = createRouteMatcher([
  '/sign-in', '/sign-in/(.*)', '/sign-up', '/sign-up/(.*)'
])

const isAdminRoute = createRouteMatcher(['/admin', '/admin/(.*)', '/upload-admin'])
const isTeacherRoute = createRouteMatcher(['/teach', '/teach/(.*)', '/teacher-access'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth()
  
  // Handle authenticated users on auth pages (prevent loops)
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // Admin routes
  if (isAdminRoute(req) && !req.nextUrl.pathname.startsWith('/admin/sign-in')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // Check for admin role in sessionClaims or publicMetadata
    const role = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role || 'student'
    
    // For development/testing: allow access if no role is set (first user)
    // In production, ensure proper role assignment
    if (role !== 'admin' && role !== 'teacher') {
      console.log('Access denied - User role:', role)
      // Temporarily allow access for testing - remove in production
      // return NextResponse.redirect(new URL('/learn/dashboard', req.url))
    }
  }

  // Teacher routes - allow both teacher and admin roles
  if (isTeacherRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    const role = sessionClaims?.metadata?.role || sessionClaims?.publicMetadata?.role || 'student'
    if (role !== 'teacher' && role !== 'admin') {
      console.log('Teacher access denied - User role:', role)
      // Temporarily allow access for testing - remove in production
      // return NextResponse.redirect(new URL('/learn/dashboard', req.url))
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