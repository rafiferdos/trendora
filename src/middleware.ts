import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from './services/AuthService'

type Role = keyof typeof roleBasedPrivateRoutes

const authRoutes = ['/login', '/register']

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/dashboard/, /^\/checkout/], // Routes requiring user authentication
  admin: [/^\/admin/],
}

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl

  const userInfo = await getCurrentUser()

  // If user is not logged in and trying to access a protected route
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next()
    } else if (
      roleBasedPrivateRoutes.user.some((pattern) => pattern.test(pathname)) ||
      roleBasedPrivateRoutes.admin.some((pattern) => pattern.test(pathname))
    ) {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url),
      )
    }
  }

  // If user is logged in with a specific role
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role]
    if (routes.some((route) => route.test(pathname))) {
      return NextResponse.next()
    }
  }
  // For non-protected routes, allow access
  if (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/user') &&
    !pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/checkout')
  ) {
    return NextResponse.next()
  }

  // Redirect unauthorized users to home page
  return NextResponse.redirect(new URL('/', request.url))
}

// Configure middleware to only run on protected routes
export const config = {
  matcher: [
    '/admin',
    '/admin/:page*',
    '/user',
    '/user/:page*',
    '/dashboard',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/checkout',
    '/checkout/:path*',
  ],
}
