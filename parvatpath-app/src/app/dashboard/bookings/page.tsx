'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BookingEntry {
  _id: string
  bookingId: string
  bookingStatus: string
  participants: unknown[]
  finalAmount: number
  balanceDue: number
  trekId: { name: string; slug: string; coverImage?: string }
  batchId: { startDate: string; endDate: string }
}

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<BookingEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings/my')
        const data = await res.json()
        if (data.success) {
          setBookings(data.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-heading font-bold text-white">My Bookings</h1>
          <Link href="/dashboard" className="text-text-secondary hover:text-white transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <p className="text-text-secondary text-center py-12">Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <div className="bg-bg-secondary rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-text-secondary">
                <thead className="bg-gray-900 text-xs uppercase text-white">
                  <tr>
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Trek & Dates</th>
                    <th className="px-6 py-4">Participants</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-white">{b.bookingId}</td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium mb-1">{b.trekId.name}</div>
                        <div className="text-xs">
                          {new Date(b.batchId.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric'})} – {new Date(b.batchId.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric'})}
                        </div>
                      </td>
                      <td className="px-6 py-4">{b.participants.length}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">₹{b.finalAmount.toLocaleString('en-IN')}</div>
                        {b.balanceDue > 0 && <div className="text-xs text-orange-500">Bal: ₹{b.balanceDue.toLocaleString('en-IN')}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          b.bookingStatus === 'confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          b.bookingStatus === 'completed' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          b.bookingStatus === 'cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        }`}>
                          {b.bookingStatus.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-bg-secondary p-12 rounded-xl border border-gray-800 text-center">
            <div className="text-4xl mb-4">🏔️</div>
            <h3 className="text-xl font-bold text-white mb-2">No Bookings Yet</h3>
            <p className="text-text-secondary mb-6">You haven&apos;t booked any treks with us yet.</p>
            <Link href="/treks" className="bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors inline-block font-medium">
              Find Your First Trek
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
