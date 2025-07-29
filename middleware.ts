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
  "/login",
  "/signup",
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

export default clerkMiddleware((auth, req) => {
  // Always allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Get auth information
  const { userId, sessionClaims } = auth()

  // Handle admin routes specifically
  if (isAdminRoute(req) && !req.nextUrl.pathname.startsWith('/admin/sign-in')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url))
    }

    // Check if user is admin (you may need to adjust this based on how you store roles)
    const isAdmin = sessionClaims?.metadata?.role === 'admin' || 
                    sessionClaims?.publicMetadata?.role === 'admin'
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // For all other protected routes, require authentication
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (userId && (req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up') || 
                 req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}