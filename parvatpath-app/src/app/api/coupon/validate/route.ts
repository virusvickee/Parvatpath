import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Coupon from '@/models/Coupon'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { code, orderAmount } = await req.json()

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiry: { $gt: new Date() },
    })

    if (!coupon) {
      return NextResponse.json({ valid: false, error: 'Invalid or expired coupon' })
    }

    if (coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, error: 'Coupon usage limit reached' })
    }

    if (orderAmount < coupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        error: `Minimum order amount ₹${coupon.minOrderAmount.toLocaleString('en-IN')} required`,
      })
    }

    const discountAmount =
      coupon.discountType === 'flat'
        ? coupon.value
        : Math.round((orderAmount * coupon.value) / 100)

    return NextResponse.json({
      valid: true,
      discountAmount,
      coupon: { code: coupon.code, discountType: coupon.discountType, value: coupon.value },
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'Failed to validate coupon' })
  }
}
