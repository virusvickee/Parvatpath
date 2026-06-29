import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Blog from '@/models/Blog'

export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({ isPublished: true }).lean()
    return NextResponse.json(blogs)
  } catch (error: unknown) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
