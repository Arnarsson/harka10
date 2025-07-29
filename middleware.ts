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
  "/sign-up",
  "/admin/sign-in",
  "/api/webhooks/(.*)"
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not public
  if (!isPublicRoute(req)) {
    auth().protect()
  }

  // Handle admin routes
  if (isAdminRoute(req) && !req.nextUrl.pathname.startsWith('/admin/sign-in')) {
    const { userId, sessionClaims } = auth()
    
    if (!userId) {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url))
    }

    // Check if user is admin
    const isAdmin = sessionClaims?.metadata?.role === 'admin'
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Redirect authenticated users away from auth pages
  const { userId, sessionClaims } = auth()
  
  if (userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // Redirect authenticated admin users away from admin auth pages
  if (userId && req.nextUrl.pathname === '/admin/sign-in') {
    const isAdmin = sessionClaims?.metadata?.role === 'admin'
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}