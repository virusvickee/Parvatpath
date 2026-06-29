import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Tour from '@/models/Tour'

export async function GET() {
  try {
    await connectDB()
    const tours = await Tour.find({ isActive: true }).lean()
    return NextResponse.json(tours)
  } catch (error: unknown) {
    console.error('Error fetching tours:', error)
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 })
  }
}
