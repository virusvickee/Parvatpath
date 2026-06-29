import mongoose, { Schema, Document } from 'mongoose'

export interface IEnquiry extends Document {
  name: string
  email: string
  phone: string
  interestedIn: 'Trek' | 'Tour' | 'Char Dham' | 'Other'
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interestedIn: {
      type: String,
      enum: ['Trek', 'Tour', 'Char Dham', 'Other'],
      default: 'Trek',
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema)
