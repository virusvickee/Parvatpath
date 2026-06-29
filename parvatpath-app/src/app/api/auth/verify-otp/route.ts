import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { phone, email, otp, name } = await req.json()

    const user = await User.findOne(phone ? { phone } : { email }).select('+otp +otpExpiry')

    if (!user) {
      return NextResponse.json({ error: 'User not found. Please request OTP first.' }, { status: 404 })
    }

    // Check lockout
    if (user.otpLockUntil && user.otpLockUntil > new Date()) {
      return NextResponse.json({ error: 'Account temporarily locked. Try again later.' }, { status: 429 })
    }

    // Check expiry
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 400 })
    }

    // Check OTP
    if (user.otp !== otp) {
      user.otpAttempts = (user.otpAttempts || 0) + 1
      if (user.otpAttempts >= 3) {
        user.otpLockUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 min lockout
      }
      await user.save()
      const attemptsLeft = 3 - user.otpAttempts
      return NextResponse.json(
        { error: attemptsLeft > 0 ? `Invalid OTP. ${attemptsLeft} attempts left.` : 'Account locked for 15 minutes.' },
        { status: 400 }
      )
    }

    // OTP valid — clear and update user
    user.otp = undefined
    user.otpExpiry = undefined
    user.otpAttempts = 0
    user.otpLockUntil = undefined
    user.isVerified = true
    if (name && !user.name) user.name = name
    await user.save()

    // Issue JWT
    const token = await signToken({ userId: user._id.toString(), role: user.role })

    const response = NextResponse.json({
      success: true,
      user: { _id: user._id, name: user.name, phone: user.phone, email: user.email, role: user.role },
    })

    response.cookies.set('pvp_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
