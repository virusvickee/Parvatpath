import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import connectDB from '@/lib/db'
import Booking from '@/models/Booking'
import Batch from '@/models/Batch'
import { getAuthUser } from '@/lib/auth'
import { Resend } from 'resend'
import { bookingConfirmationHTML } from '@/lib/email'

interface PopulatedTrek { name: string }
interface PopulatedBatch { startDate: Date; endDate: Date }

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser()
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = await req.json()

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    await connectDB()

    // Update booking
    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      {
        $set: {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: 'paid', // Temporarily hardcoded until we fetch booking first to know if 'advance' or 'full'
          bookingStatus: 'confirmed',
        },
      },
      { new: true }
    ).populate('trekId batchId')

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Fix paymentStatus based on booking.paymentType
    booking.paymentStatus = booking.paymentType === 'advance' ? 'partially_paid' : 'paid'
    await booking.save()

    // Increment batch booked seats
    await Batch.findByIdAndUpdate(booking.batchId, {
      $inc: { bookedSeats: booking.participants.length },
    })

    // Send confirmation email
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Parvatpath <noreply@parvatpath.com>',
        to: booking.contactEmail,
        subject: `Booking Confirmed! ${(booking.trekId as PopulatedTrek).name} — ${booking.bookingId}`,
        html: bookingConfirmationHTML({
          bookingId: booking.bookingId,
          trekName: (booking.trekId as PopulatedTrek).name,
          startDate: new Date((booking.batchId as PopulatedBatch).startDate).toLocaleDateString('en-IN'),
          endDate: new Date((booking.batchId as PopulatedBatch).endDate).toLocaleDateString('en-IN'),
          participants: booking.participants.length,
          amountPaid: booking.advancePaid || booking.finalAmount,
          balanceDue: booking.balanceDue,
          paymentType: booking.paymentType,
        }),
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, bookingId: booking.bookingId })
  } catch (error) {
    console.error('Verify payment error:', error)
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
  }
}
