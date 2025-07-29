import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/pricing", 
  "/contact",
  "/blog",
  "/blog/(.*)",
  "/sign-in",
  "/sign-in/(.*)",
  "/sign-up",
  "/sign-up/(.*)",
  "/login",
  "/signup",
  "/logout",
  "/admin/sign-in",
  "/api/webhooks/(.*)",
  "/api/stripe/(.*)",
  "/certificates/demo",
  "/demo/(.*)",
  "/toolkit",
  "/team",
  "/workshop"
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isAuthPage = createRouteMatcher([
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up', 
  '/sign-up/(.*)',
  '/login',
  '/signup'
])

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth()
  
  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // Handle admin routes
  if (isAdminRoute(req) && !req.nextUrl.pathname.startsWith('/admin/sign-in')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url))
    }

    const isAdmin = sessionClaims?.metadata?.role === 'admin' || 
                    sessionClaims?.publicMetadata?.role === 'admin'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // For all other routes, require authentication
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}