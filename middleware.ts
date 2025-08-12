import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
    
    const role = (user?.publicMetadata?.role as string) || 'student'
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/learn/dashboard', req.url))
    }
  }

  // Teacher routes - allow both teacher and admin roles
  if (isTeacherRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
    
    const role = (user?.publicMetadata?.role as string) || 'student'
    if (role !== 'teacher' && role !== 'admin') {
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