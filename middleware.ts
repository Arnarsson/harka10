import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
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
  ],
  // Routes that require authentication
  ignoredRoutes: [
    "/api/webhooks/(.*)"
  ],
  // Admin routes
  beforeAuth: (auth, req) => {
    // Handle admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Admin routes should redirect to admin sign-in
      if (!auth().userId && !req.nextUrl.pathname.startsWith('/admin/sign-in')) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/admin/sign-in'
          }
        })
      }
    }
  },
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(new URL('/sign-in', req.url))
    }

    // Check if user is admin for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const isAdmin = auth.sessionClaims?.metadata?.role === 'admin'
      if (!isAdmin) {
        return Response.redirect(new URL('/', req.url))
      }
    }

    // Redirect authenticated users away from auth pages
    if (auth.userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
      return Response.redirect(new URL('/learn/dashboard', req.url))
    }

    // Redirect authenticated admin users away from admin auth pages
    if (auth.userId && req.nextUrl.pathname === '/admin/sign-in') {
      const isAdmin = auth.sessionClaims?.metadata?.role === 'admin'
      if (isAdmin) {
        return Response.redirect(new URL('/admin/dashboard', req.url))
      }
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}