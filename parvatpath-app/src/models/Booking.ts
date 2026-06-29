import mongoose, { Schema, Document } from 'mongoose'

export interface IBooking extends Document {
  bookingId: string
  userId: mongoose.Types.ObjectId
  trekId: mongoose.Types.ObjectId
  batchId: mongoose.Types.ObjectId
  participants: {
    name: string
    age: number
    gender: string
    emergencyContact: string
  }[]
  contactEmail: string
  contactPhone: string
  totalAmount: number
  discountAmount: number
  gstAmount: number
  finalAmount: number
  advancePaid: number
  balanceDue: number
  paymentType: 'advance' | 'full'
  paymentStatus: 'pending' | 'paid' | 'partially_paid' | 'refunded'
  bookingStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  couponCode?: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  refundId?: string
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, unique: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    trekId: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
    batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
    participants: [
      {
        name: String,
        age: Number,
        gender: String,
        emergencyContact: String,
      },
    ],
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    advancePaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },
    paymentType: { type: String, enum: ['advance', 'full'], required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'partially_paid', 'refunded'],
      default: 'pending',
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    couponCode: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    refundId: String,
  },
  { timestamps: true }
)

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
