'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function ConfirmInner() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="bg-bg-secondary w-full max-w-lg p-8 rounded-2xl border border-gray-800 shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ✅
        </div>
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-text-secondary mb-6">
          Your Himalayan adventure is set. We&apos;ve sent the confirmation details to your email.
        </p>

        {bookingId && (
          <div className="bg-gray-900 p-4 rounded-lg mb-8 inline-block">
            <span className="text-text-secondary text-sm block mb-1">Booking ID</span>
            <span className="text-accent font-mono font-bold text-xl">{bookingId}</span>
          </div>
        )}

        <div className="text-left bg-gray-900/50 p-6 rounded-lg mb-8 space-y-4">
          <h3 className="font-semibold text-white border-b border-gray-800 pb-2">What&apos;s Next:</h3>
          <ul className="text-sm text-text-secondary space-y-2">
            <li>• Our team will call you 3 days before the trek</li>
            <li>• Pack list will be emailed to you</li>
            <li>• Pickup points will be shared via WhatsApp</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="flex-1 bg-accent hover:bg-orange-600 text-white font-medium py-3 rounded-md transition-colors"
          >
            View My Bookings
          </Link>
          <Link
            href="/treks"
            className="flex-1 border border-gray-700 hover:border-gray-500 text-white font-medium py-3 rounded-md transition-colors"
          >
            Explore More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    }>
      <ConfirmInner />
    </Suspense>
  )
}
