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
  "/debug-auth",
  "/admin/sign-in",
  "/api/webhooks/(.*)",
  "/api/stripe/(.*)",
  "/certificates/demo",
  "/demo/(.*)",
  "/toolkit",
  "/team",
  "/workshop"
])

const isAuthPage = createRouteMatcher([
  '/sign-in',
  '/sign-in/(.*)',
  '/sign-up', 
  '/sign-up/(.*)',
  '/login',
  '/signup'
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const path = req.nextUrl.pathname
  
  // Debug logging
  console.log(`🔍 Middleware: ${path} | UserId: ${userId || 'null'} | Method: ${req.method}`)
  
  // 1. Redirect authenticated users away from auth pages
  if (userId && isAuthPage(req)) {
    console.log(`🔄 Redirecting authenticated user from auth page: ${path}`)
    return NextResponse.redirect(new URL('/learn/dashboard', req.url))
  }

  // 2. Handle admin routes
  if (isAdminRoute(req) && !path.startsWith('/admin/sign-in')) {
    if (!userId) {
      console.log(`🚫 Redirecting unauthenticated user from admin route: ${path}`)
      return NextResponse.redirect(new URL('/admin/sign-in', req.url))
    }
  }

  // 3. Allow public routes
  if (isPublicRoute(req)) {
    console.log(`🌐 Allowing public route: ${path}`)
    return NextResponse.next()
  }

  // 4. Protect all other routes - require authentication
  if (!userId) {
    console.log(`🚫 Redirecting unauthenticated user to sign-in: ${path}`)
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  // 5. Allow authenticated users to access protected routes
  console.log(`✅ Allowing authenticated user to access: ${path}`)
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}