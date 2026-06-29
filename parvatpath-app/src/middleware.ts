import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Inline verify so we don't import auth.ts (which imports next/headers — server-only)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: string; role: string }
  } catch {
    return null
  }
}

const PROTECTED_ROUTES = ['/dashboard', '/booking']
const ADMIN_ROUTES = ['/admin']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('pvp_token')?.value

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  const isAdmin = ADMIN_ROUTES.some(r => pathname.startsWith(r))

  if (isProtected || isAdmin) {
    if (!token) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (isAdmin && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/booking/:path*', '/admin/:path*'],
}
