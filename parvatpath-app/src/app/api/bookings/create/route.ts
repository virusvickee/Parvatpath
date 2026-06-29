import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Booking from '@/models/Booking'
import Trek from '@/models/Trek'
import Batch from '@/models/Batch'
import Coupon from '@/models/Coupon'
import { getAuthUser } from '@/lib/auth'

function generateBookingId(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  return `PVP-${year}-${random}`
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser()
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const {
      trekId,
      batchId,
      participants,
      contactEmail,
      contactPhone,
      couponCode,
      paymentType, // 'advance' | 'full'
    } = body

    // Validate trek and batch
    const trek = await Trek.findById(trekId)
    const batch = await Batch.findById(batchId)

    if (!trek || !batch) {
      return NextResponse.json({ error: 'Trek or batch not found' }, { status: 404 })
    }

    // Check seat availability
    const availableSeats = batch.totalSeats - batch.bookedSeats
    if (participants.length > availableSeats) {
      return NextResponse.json(
        { error: `Only ${availableSeats} seats available` },
        { status: 400 }
      )
    }

    // Calculate pricing
    const baseAmount = batch.price * participants.length
    let discountAmount = 0

    // Apply coupon
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        expiry: { $gt: new Date() },
        $expr: { $lt: ['$usedCount', '$maxUses'] },
      })

      if (coupon && baseAmount >= coupon.minOrderAmount) {
        discountAmount =
          coupon.discountType === 'flat'
            ? coupon.value
            : Math.round((baseAmount * coupon.value) / 100)

        await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } })
      }
    }

    const afterDiscount = baseAmount - discountAmount
    const gstAmount = Math.round(afterDiscount * 0.05) // 5% GST
    const finalAmount = afterDiscount + gstAmount

    const advancePaid = paymentType === 'advance' ? Math.round(finalAmount * 0.3) : finalAmount
    const balanceDue = paymentType === 'advance' ? finalAmount - advancePaid : 0

    // Create booking
    const booking = await Booking.create({
      bookingId: generateBookingId(),
      userId: auth.userId,
      trekId,
      batchId,
      participants,
      contactEmail,
      contactPhone,
      totalAmount: baseAmount,
      discountAmount,
      gstAmount,
      finalAmount,
      advancePaid,
      balanceDue,
      paymentType,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      couponCode: couponCode || undefined,
    })

    return NextResponse.json({
      success: true,
      booking: {
        bookingId: booking.bookingId,
        _id: booking._id,
        finalAmount,
        advancePaid,
        balanceDue,
        paymentType,
      },
    })
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
