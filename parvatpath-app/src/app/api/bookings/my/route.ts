import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Booking from '@/models/Booking'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const auth = await getAuthUser()
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const bookings = await Booking.find({ userId: auth.userId })
      .populate('trekId', 'name slug coverImage')
      .populate('batchId', 'startDate endDate price')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ success: true, data: bookings })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
