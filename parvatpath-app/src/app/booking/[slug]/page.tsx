import connectDB from '@/lib/db'
import Trek from '@/models/Trek'
import Batch from '@/models/Batch'
import { notFound } from 'next/navigation'
import BookingFlow from './BookingFlow'

export default async function BookingPage({ params }: { params: { slug: string } }) {
  await connectDB()

  const trek = await Trek.findOne({ slug: params.slug }).lean()
  if (!trek) {
    notFound()
  }

  // Fetch upcoming batches for this trek
  const batches = await Batch.find({
    trekId: trek._id,
    startDate: { $gt: new Date() },
    isActive: true,
  })
    .sort({ startDate: 1 })
    .lean()

  // Serialize IDs for client component
  const serializedTrek = {
    ...trek,
    _id: trek._id.toString(),
  }

  const serializedBatches = batches.map((b: { _id: { toString: () => string }; trekId: { toString: () => string }; startDate: Date; endDate: Date; price: number; totalSeats: number; bookedSeats: number; [key: string]: unknown }) => ({
    ...b,
    _id: b._id.toString(),
    trekId: b.trekId.toString(),
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
  }))

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <BookingFlow trek={serializedTrek} batches={serializedBatches} />
      </div>
    </div>
  )
}
