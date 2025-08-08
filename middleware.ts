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
  const { userId, sessionClaims } = await auth()
  
  // Handle authenticated users on auth pages (prevent loops)
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // Admin routes
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // Use sessionClaims for role checking (more reliable than publicMetadata)
    const role = sessionClaims?.metadata?.role || sessionClaims?.role as string
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/learn/dashboard', req.url))
    }
  }

  // Teacher routes - allow both teacher and admin roles
  if (isTeacherRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    // Use sessionClaims for role checking
    const role = sessionClaims?.metadata?.role || sessionClaims?.role as string
    if (role !== 'teacher' && role !== 'admin') {
      // Log for debugging
      console.log(`[TEACHER ACCESS] User ${userId} denied - role: ${role}`)
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