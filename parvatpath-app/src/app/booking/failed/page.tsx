'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BookingFailedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="bg-bg-secondary w-full max-w-lg p-8 rounded-2xl border border-gray-800 shadow-2xl text-center">
        <div className="w-20 h-20 bg-red-900/30 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
          ❌
        </div>
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Payment Failed
        </h1>
        <p className="text-text-secondary mb-8">
          Don&apos;t worry — your booking slot is held for 15 minutes. You can try the payment again.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.back()}
            className="w-full bg-accent hover:bg-orange-600 text-white font-medium py-3 rounded-md transition-colors"
          >
            Retry Payment
          </button>
          
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi, my payment failed for a booking. Can you help me?`}
            target="_blank"
            className="w-full bg-[#25D366] hover:bg-[#20b958] text-white font-medium py-3 rounded-md transition-colors flex justify-center items-center gap-2"
          >
            💬 Contact on WhatsApp
          </Link>
        </div>
      </div>
    </div>
  )
}
