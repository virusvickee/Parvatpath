import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name?: string
  email?: string
  phone?: string
  role: 'user' | 'admin'
  otp?: string
  otpExpiry?: Date
  otpAttempts: number
  otpLockUntil?: Date
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, sparse: true },
    phone: { type: String, sparse: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    otp: { type: String, select: false },
    otpExpiry: { type: Date, select: false },
    otpAttempts: { type: Number, default: 0 },
    otpLockUntil: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

UserSchema.index({ email: 1 }, { sparse: true })
UserSchema.index({ phone: 1 }, { sparse: true })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
