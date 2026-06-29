'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface Participant {
  name: string
  age: string
  gender: string
  emergencyContact: string
}

interface SerializedTrek {
  _id: string
  name: string
  slug: string
  [key: string]: unknown
}

interface SerializedBatch {
  _id: string
  price: number
  totalSeats: number
  bookedSeats: number
  startDate: string
  endDate: string
  [key: string]: unknown
}

interface RazorpayResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export default function BookingFlow({ trek, batches }: { trek: SerializedTrek, batches: SerializedBatch[] }) {
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Step 1 State
  const [selectedBatchId, setSelectedBatchId] = useState('')
  const [numParticipants, setNumParticipants] = useState(1)

  // Step 2 State
  const [participants, setParticipants] = useState<Participant[]>([
    { name: user?.name || '', age: '', gender: 'Male', emergencyContact: '' }
  ])
  const [contactEmail, setContactEmail] = useState(user?.email || '')
  const [contactPhone, setContactPhone] = useState(user?.phone || '')

  // Step 3 State
  const [couponCode, setCouponCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')

  // Step 4 State
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance')
  const [loading, setLoading] = useState(false)

  const selectedBatch = batches.find(b => b._id === selectedBatchId)
  const baseAmount = (selectedBatch?.price || 0) * numParticipants
  const afterDiscount = baseAmount - discountAmount
  const gstAmount = Math.round(afterDiscount * 0.05)
  const finalAmount = afterDiscount + gstAmount
  const advanceAmount = Math.round(finalAmount * 0.3)
  const amountToPay = paymentType === 'advance' ? advanceAmount : finalAmount
  const balanceDue = finalAmount - advanceAmount

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  const handleAddParticipant = (change: number) => {
    const newCount = numParticipants + change
    if (newCount < 1) return
    if (selectedBatch && newCount > (selectedBatch.totalSeats - selectedBatch.bookedSeats)) return
    
    setNumParticipants(newCount)
    if (change > 0) {
      setParticipants([...participants, { name: '', age: '', gender: 'Male', emergencyContact: '' }])
    } else {
      setParticipants(participants.slice(0, -1))
    }
  }

  const handleApplyCoupon = async () => {
    setCouponError('')
    try {
      const res = await fetch('/api/coupon/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, orderAmount: baseAmount })
      })
      const data = await res.json()
      if (data.valid) {
        setDiscountAmount(data.discountAmount)
        setCouponApplied(true)
      } else {
        setCouponError(data.error)
      }
    } catch {
      setCouponError('Failed to validate coupon')
    }
  }

  const handleProceedToPay = async () => {
    setLoading(true)
    try {
      // 1. Create Booking
      const bookRes = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trekId: trek._id,
          batchId: selectedBatchId,
          participants,
          contactEmail,
          contactPhone,
          couponCode: couponApplied ? couponCode : undefined,
          paymentType,
        })
      })
      const bookData = await bookRes.json()
      if (!bookRes.ok) throw new Error(bookData.error)

      // 2. Create Razorpay Order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: bookData.booking.paymentType === 'advance' ? bookData.booking.advancePaid : bookData.booking.finalAmount,
          notes: { bookingId: bookData.booking.bookingId }
        })
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.error)

      // 3. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'Parvatpath',
        description: `${trek.name} Booking`,
        order_id: orderData.order.id,
        handler: async function (response: RazorpayResponse) {
          // 4. Verify Payment
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              bookingId: bookData.booking.bookingId,
            })
          })
          if (verifyRes.ok) {
            router.push(`/booking/confirm?id=${bookData.booking.bookingId}`)
          } else {
            router.push('/booking/failed')
          }
        },
        prefill: {
          name: user?.name,
          email: contactEmail,
          contact: contactPhone,
        },
        theme: { color: '#F97316' },
      }

      const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void; on: (event: string, cb: () => void) => void } }).Razorpay(options)
      rzp.on('payment.failed', function () {
        router.push('/booking/failed')
      })
      rzp.open()
    } catch (err: unknown) {
      alert((err as Error).message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-bg-secondary p-6 rounded-2xl border border-gray-800 shadow-xl">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
              step === i ? 'bg-accent text-white' : step > i ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-500'
            }`}>
              {step > i ? '✓' : i}
            </div>
            <span className="text-xs text-text-secondary hidden sm:block">
              {['Select', 'Participants', 'Coupon', 'Summary', 'Payment'][i-1]}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Select Batch Date</h2>
          <div className="space-y-3">
            {batches.map(b => {
              const available = b.totalSeats - b.bookedSeats
              const isSoldOut = available <= 0
              return (
                <label key={b._id} className={`flex items-center justify-between p-4 rounded-lg border ${
                  selectedBatchId === b._id ? 'border-accent bg-accent/10' : 'border-gray-800 bg-gray-900'
                } ${isSoldOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-600'}`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="batch" 
                      disabled={isSoldOut}
                      checked={selectedBatchId === b._id}
                      onChange={() => setSelectedBatchId(b._id)}
                      className="accent-accent"
                    />
                    <span className="text-white font-medium">
                      {new Date(b.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric'})} &ndash; {new Date(b.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric'})}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-accent">₹{b.price.toLocaleString('en-IN')}</div>
                    <div className={`text-xs ${available < 5 && available > 0 ? 'text-red-500 font-bold' : 'text-text-secondary'}`}>
                      {isSoldOut ? 'Sold Out' : `${available} left`}
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
          
          <div className="border-t border-gray-800 pt-6 mt-6">
            <h3 className="text-lg font-bold text-white mb-4">Number of Participants</h3>
            <div className="flex items-center gap-4">
              <button onClick={() => handleAddParticipant(-1)} className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 text-white">-</button>
              <span className="text-xl font-bold text-white w-8 text-center">{numParticipants}</span>
              <button onClick={() => handleAddParticipant(1)} className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 text-white">+</button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              disabled={!selectedBatchId}
              onClick={handleNext}
              className="bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-md disabled:opacity-50"
            >
              Next: Add Details &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Participant Details</h2>
          
          {participants.map((p, i) => (
            <div key={i} className="bg-gray-900 p-4 rounded-lg space-y-4">
              <h3 className="text-accent font-semibold">Participant {i + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Full Name*" value={p.name} onChange={e => {
                  const newP = [...participants]; newP[i].name = e.target.value; setParticipants(newP);
                }} className="bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-accent" />
                <input required type="number" placeholder="Age*" value={p.age} onChange={e => {
                  const newP = [...participants]; newP[i].age = e.target.value; setParticipants(newP);
                }} className="bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-accent" />
                <select value={p.gender} onChange={e => {
                  const newP = [...participants]; newP[i].gender = e.target.value; setParticipants(newP);
                }} className="bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-accent">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
                <input required placeholder="Emergency Contact*" value={p.emergencyContact} onChange={e => {
                  const newP = [...participants]; newP[i].emergencyContact = e.target.value; setParticipants(newP);
                }} className="bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-accent" />
              </div>
            </div>
          ))}

          <div className="bg-gray-900 p-4 rounded-lg space-y-4 mt-6">
             <h3 className="text-accent font-semibold">Your Contact Details</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="email" placeholder="Email*" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-accent" />
                <input required type="tel" placeholder="Phone*" value={contactPhone} onChange={e => setContactPhone(e.target.value)} className="bg-gray-800 text-white p-3 rounded focus:outline-none focus:ring-1 focus:ring-accent" />
             </div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={handleBack} className="text-text-secondary hover:text-white px-4 py-2">&larr; Back</button>
            <button onClick={handleNext} className="bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-md">
              Next: Apply Coupon &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Apply Coupon (Optional)</h2>
          
          <div className="flex gap-2">
            <input 
              disabled={couponApplied}
              placeholder="Enter Code (e.g. PVPWELCOME)" 
              value={couponCode} 
              onChange={e => setCouponCode(e.target.value.toUpperCase())}
              className="flex-1 bg-gray-900 border border-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-accent uppercase"
            />
            {!couponApplied ? (
               <button onClick={handleApplyCoupon} className="bg-gray-800 hover:bg-gray-700 text-white px-6 rounded-md">Apply</button>
            ) : (
               <button onClick={() => { setCouponApplied(false); setDiscountAmount(0); setCouponCode(''); }} className="bg-red-900/50 hover:bg-red-900 text-red-500 px-6 rounded-md">Remove</button>
            )}
          </div>
          
          {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
          {couponApplied && <p className="text-green-500 text-sm">✅ Coupon applied! ₹{discountAmount.toLocaleString('en-IN')} off</p>}

          <div className="flex justify-between pt-8">
            <button onClick={handleBack} className="text-text-secondary hover:text-white px-4 py-2">&larr; Back</button>
            <button onClick={handleNext} className="bg-accent hover:bg-orange-600 text-white px-6 py-3 rounded-md">
              Next: Review &rarr;
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-heading text-white">Order Summary</h2>
          
          <div className="bg-gray-900 rounded-lg p-6 space-y-4">
             <div className="flex justify-between border-b border-gray-800 pb-4">
               <div>
                 <p className="text-text-secondary text-sm">Trek</p>
                 <p className="text-white font-semibold">{trek.name}</p>
               </div>
               <div className="text-right">
                 <p className="text-text-secondary text-sm">Participants</p>
                 <p className="text-white font-semibold">{numParticipants}</p>
               </div>
             </div>

             <div className="space-y-2 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Base Amount</span>
                  <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-secondary">
                  <span>GST (5%)</span>
                  <span>+₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
             </div>
             
             <div className="flex justify-between text-lg font-bold text-white border-t border-gray-800 pt-4">
                <span>Total Amount</span>
                <span>₹{finalAmount.toLocaleString('en-IN')}</span>
             </div>
          </div>

          <div className="space-y-3">
             <h3 className="font-semibold text-white">Payment Option:</h3>
             <label className={`block p-4 border rounded-lg cursor-pointer ${paymentType === 'advance' ? 'border-accent bg-accent/10' : 'border-gray-800 bg-gray-900'}`}>
                <div className="flex items-center gap-3">
                   <input type="radio" checked={paymentType === 'advance'} onChange={() => setPaymentType('advance')} className="accent-accent" />
                   <div>
                     <span className="font-semibold text-white block">Pay 30% Now (₹{advanceAmount.toLocaleString('en-IN')})</span>
                     <span className="text-xs text-text-secondary">Confirm your slot. Balance ₹{balanceDue.toLocaleString('en-IN')} due 7 days before trek.</span>
                   </div>
                </div>
             </label>
             <label className={`block p-4 border rounded-lg cursor-pointer ${paymentType === 'full' ? 'border-accent bg-accent/10' : 'border-gray-800 bg-gray-900'}`}>
                <div className="flex items-center gap-3">
                   <input type="radio" checked={paymentType === 'full'} onChange={() => setPaymentType('full')} className="accent-accent" />
                   <div>
                     <span className="font-semibold text-white block">Pay Full Amount (₹{finalAmount.toLocaleString('en-IN')})</span>
                     <span className="text-xs text-text-secondary">No pending balance</span>
                   </div>
                </div>
             </label>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={handleBack} className="text-text-secondary hover:text-white px-4 py-2">&larr; Back</button>
            <button 
              onClick={handleProceedToPay} 
              disabled={loading}
              className="bg-accent hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold text-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ₹${amountToPay.toLocaleString('en-IN')} \u2192`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
