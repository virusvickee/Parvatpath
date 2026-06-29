import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'
import { generateOTP } from '@/lib/auth'
import { sendOTPviaSMS, sendOTPviaEmail } from '@/lib/otp'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { phone, email } = await req.json()

    if (!phone && !email) {
      return NextResponse.json({ error: 'Phone or email required' }, { status: 400 })
    }

    // Check if user is locked out
    const existingUser = await User.findOne(phone ? { phone } : { email })
    if (existingUser?.otpLockUntil && existingUser.otpLockUntil > new Date()) {
      const minutesLeft = Math.ceil((existingUser.otpLockUntil.getTime() - Date.now()) / 60000)
      return NextResponse.json(
        { error: `Too many attempts. Try again in ${minutesLeft} minutes.` },
        { status: 429 }
      )
    }

    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Upsert user
    await User.findOneAndUpdate(
      phone ? { phone } : { email },
      {
        $set: { otp, otpExpiry, otpAttempts: 0 },
        $setOnInsert: { role: 'user', isVerified: false },
      },
      { upsert: true, new: true }
    )

    // Send OTP
    if (phone) {
      await sendOTPviaSMS(phone, otp)
    } else {
      await sendOTPviaEmail(email!, otp)
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
