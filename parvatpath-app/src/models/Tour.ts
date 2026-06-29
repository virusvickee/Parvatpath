import mongoose, { Schema, Document } from 'mongoose'

export interface ITour extends Document {
  slug: string
  name: string
  type: 'Leisure' | 'Char Dham' | 'Group' | 'Corporate'
  duration: { days: number; nights: number }
  startingPrice: number
  coverImage: string
  description: string
  itinerary: { day: number; title: string; description: string }[]
  inclusions: string[]
  exclusions: string[]
  isActive: boolean
  seoMeta?: { title: string; description: string }
  createdAt: Date
  updatedAt: Date
}

const TourSchema = new Schema<ITour>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['Leisure', 'Char Dham', 'Group', 'Corporate'],
      required: true,
    },
    duration: { days: Number, nights: Number },
    startingPrice: { type: Number, required: true },
    coverImage: { type: String, required: true },
    description: String,
    itinerary: [{ day: Number, title: String, description: String }],
    inclusions: [String],
    exclusions: [String],
    isActive: { type: Boolean, default: true },
    seoMeta: { title: String, description: String },
  },
  { timestamps: true }
)

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema)
