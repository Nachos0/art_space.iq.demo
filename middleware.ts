import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the admin page
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.includes('/login')) {
    // Check if the user is logged in
    const adminCookie = request.cookies.get('adminLoggedIn')
    const isLoggedIn = adminCookie?.value === 'true'

    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 