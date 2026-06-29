'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type AuthMethod = 'phone' | 'email'
type AuthState = 'idle' | 'sending' | 'otp_sent' | 'verifying'

function LoginInner() {
  const [method, setMethod] = useState<AuthMethod>('phone')
  const [identifier, setIdentifier] = useState('')
  const [name, setName] = useState('') // For first time users
  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState<AuthState>('idle')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/dashboard'
  const { user, refreshUser } = useAuth()

  useEffect(() => {
    if (user) {
      router.replace(redirectUrl)
    }
  }, [user, router, redirectUrl])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('sending')
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(method === 'phone' ? { phone: identifier } : { email: identifier }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('otp_sent')
        setCountdown(60)
      } else {
        setError(data.error || 'Failed to send OTP')
        setStatus('idle')
      }
    } catch {
      setError('Network error')
      setStatus('idle')
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setStatus('verifying')
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [method]: identifier,
          otp,
          name: name || undefined,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        await refreshUser()
        router.push(redirectUrl)
      } else {
        setError(data.error || 'Invalid OTP')
        setStatus('otp_sent')
      }
    } catch {
      setError('Network error')
      setStatus('otp_sent')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="bg-bg-secondary w-full max-w-md p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-bold text-text-primary">
            🏔️ Parvatpath
          </h1>
          <p className="text-text-secondary mt-2">Welcome back to the mountains</p>
        </div>

        {status === 'idle' || status === 'sending' ? (
          <>
            <div className="flex border-b border-gray-800 mb-6">
              <button
                className={`flex-1 pb-3 text-sm font-medium ${
                  method === 'phone' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setMethod('phone')}
              >
                📱 Phone
              </button>
              <button
                className={`flex-1 pb-3 text-sm font-medium ${
                  method === 'email' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => setMethod('email')}
              >
                📧 Email
              </button>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  {method === 'phone' ? 'Mobile Number' : 'Email Address'}
                </label>
                <div className="flex">
                  {method === 'phone' && (
                    <span className="inline-flex items-center px-4 bg-gray-900 border border-r-0 border-gray-700 rounded-l-md text-text-secondary">
                      +91
                    </span>
                  )}
                  <input
                    type={method === 'phone' ? 'tel' : 'email'}
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={method === 'phone' ? '9876543210' : 'you@example.com'}
                    className={`w-full bg-gray-900 border border-gray-700 text-white p-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent ${
                      method === 'phone' ? 'rounded-r-md' : 'rounded-md'
                    }`}
                  />
                </div>
              </div>

              {/* Optional Name field just in case they are new */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">Full Name (Optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Only if you're new here"
                  className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-accent hover:bg-orange-600 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending OTP...' : 'Send OTP →'}
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                OTP sent to {method === 'phone' ? '+91 ' : ''}{identifier}
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setOtp('')
                  setError('')
                }}
                className="text-xs text-accent mt-2 hover:underline"
              >
                Change {method === 'phone' ? 'Number' : 'Email'}
              </button>
            </div>

            <div>
              <label className="block text-sm text-center text-text-secondary mb-2">Enter 6-digit OTP</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-gray-900 border border-gray-700 text-white p-4 rounded-md text-center text-2xl tracking-[1em] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={status === 'verifying' || otp.length !== 6}
              className="w-full bg-accent hover:bg-orange-600 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50"
            >
              {status === 'verifying' ? 'Verifying...' : 'Verify & Login →'}
            </button>

            <div className="text-center">
              <button
                type="button"
                disabled={countdown > 0 || status === 'verifying'}
                onClick={handleSendOTP}
                className="text-sm text-text-secondary disabled:opacity-50 hover:text-white transition-colors"
              >
                {countdown > 0 ? `Resend OTP in 00:${countdown.toString().padStart(2, '0')}` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-text-secondary hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary flex items-center justify-center"><p className="text-text-secondary">Loading...</p></div>}>
      <LoginInner />
    </Suspense>
  )
}
