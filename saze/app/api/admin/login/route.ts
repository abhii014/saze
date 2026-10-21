import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const correctPassword = process.env.ADMIN_PASSWORD || 'saze2026'

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' })
      // Set admin session cookie
      response.cookies.set('saze_admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      })
      return response
    }

    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out' })
  response.cookies.delete('saze_admin_auth')
  return response
}
