import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: NextApiRequest) {
  // Check if JWT_SECRET and DOMAIN are defined
  if (!process.env.JWT_SECRET || !process.env.DOMAIN) {
    console.error('JWT_SECRET or DOMAIN is not defined')
  }

  try {
    // @ts-ignore
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
      return NextResponse.redirect(`${process.env.DOMAIN}/`)
    }

    // Redirect unauthenticated users to /welcome
    // if (!token && pathname !== '/welcome') {
    //   return NextResponse.redirect(`${process.env.DOMAIN}/welcome`)
    // }
  } catch (error) {
    console.error('Error in middleware:', error)
  }
}
