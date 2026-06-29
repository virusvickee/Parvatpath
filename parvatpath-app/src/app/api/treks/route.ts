import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Trek from '@/models/Trek'

export async function GET() {
  try {
    await connectDB()
    const treks = await Trek.find({ isActive: true }).lean()
    return NextResponse.json(treks)
  } catch (error: unknown) {
    console.error('Error fetching treks:', error)
    return NextResponse.json({ error: 'Failed to fetch treks' }, { status: 500 })
  }
}
