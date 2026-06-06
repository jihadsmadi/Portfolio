import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, deriveToken } from '@/lib/admin/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const secret = process.env.ADMIN_SECRET
  const password = process.env.ADMIN_PASSWORD
  if (!secret || !password) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const expected = await deriveToken(password, secret)
  if (token !== expected) {
    const res = NextResponse.redirect(new URL('/admin/login', request.url))
    res.cookies.delete(COOKIE_NAME)
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
