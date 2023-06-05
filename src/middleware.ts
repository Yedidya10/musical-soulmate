import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Check if JWT_SECRET and DOMAIN are defined
  if (!process.env.JWT_SECRET || !process.env.DOMAIN) {
    console.error('JWT_SECRET or DOMAIN is not defined')
  }

  try {
    const url = req.nextUrl.clone()
    const { pathname } = req.nextUrl

    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
    })

    // Allow requests to /api/auth or if the user is authenticated
    if (pathname.startsWith('/api/auth') || token) {
      NextResponse.next()
    }

    // Redirect authenticated users from /welcome to /
    if (token && pathname === '/welcome') {
      url.pathname = '/'
      NextResponse.rewrite(url)
    }

    // Redirect unauthenticated users to /welcome
    if (!token && pathname !== '/welcome') {
      url.pathname = '/welcome'
      NextResponse.rewrite(url)
    }
  } catch (error) {
    console.error('Error in middleware:', error)
  }
}
