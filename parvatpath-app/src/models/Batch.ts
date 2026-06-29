import mongoose, { Schema, Document } from 'mongoose'

export interface IBatch extends Document {
  trekId: mongoose.Types.ObjectId
  startDate: Date
  endDate: Date
  price: number
  totalSeats: number
  bookedSeats: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const BatchSchema = new Schema<IBatch>(
  {
    trekId: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    bookedSeats: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// Virtual: available seats
BatchSchema.virtual('availableSeats').get(function () {
  return this.totalSeats - this.bookedSeats
})

BatchSchema.index({ trekId: 1 })
BatchSchema.index({ startDate: 1 })
BatchSchema.index({ isActive: 1 })

export default mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema)
