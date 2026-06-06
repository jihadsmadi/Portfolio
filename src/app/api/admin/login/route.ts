import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, deriveToken } from '@/lib/admin/auth'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  const correctPassword = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SECRET

  if (!correctPassword || !secret) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (password !== correctPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await deriveToken(correctPassword, secret)

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return response
}
