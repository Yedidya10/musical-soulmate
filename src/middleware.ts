import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Check if JWT_SECRET and DOMAIN are defined
  if (!process.env.JWT_SECRET || !process.env.DOMAIN) {
    console.error('JWT_SECRET or DOMAIN is not defined')
  }

  try {
    const { pathname } = req.nextUrl

    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    })

    // Allow requests to /api/auth or if the user is authenticated
    if (pathname.startsWith('/api/auth') || token) {
      return NextResponse.next()
    }

    // Redirect authenticated users from /welcome to /
    if (token && pathname === '/welcome') {
      return NextResponse.rewrite(new URL('/', req.url))
    }

    // Redirect unauthenticated users to /welcome
    if (!token && pathname !== '/welcome') {
      return NextResponse.rewrite(new URL('/welcome', req.url))
    }
  } catch (error) {
    console.error('Error in middleware:', error)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
