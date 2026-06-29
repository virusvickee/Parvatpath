import mongoose, { Schema, Document } from 'mongoose'

export interface ICoupon extends Document {
  code: string
  discountType: 'flat' | 'percent'
  value: number
  minOrderAmount: number
  maxUses: number
  usedCount: number
  expiry: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountType: { type: String, enum: ['flat', 'percent'], required: true },
    value: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    maxUses: { type: Number, required: true },
    usedCount: { type: Number, default: 0 },
    expiry: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema)
