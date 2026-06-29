import mongoose, { Schema, Document } from 'mongoose'

export interface ITrek extends Document {
  slug: string
  name: string
  region: string
  subRegion: string
  difficulty: 'Easy' | 'Easy-Moderate' | 'Moderate' | 'Moderate-Difficult' | 'Difficult'
  duration: { days: number; nights: number }
  maxAltitude: string
  startingAltitude?: string
  bestSeason: string[]
  startingPrice: number
  coverImage: string
  gallery: string[]
  rating: number
  reviewCount: number
  isFeatured: boolean
  isActive: boolean
  highlights: string[]
  description: string
  itinerary: {
    day: number
    title: string
    description: string
    distance?: string
    altitude?: string
  }[]
  inclusions: string[]
  exclusions: string[]
  thingsToBring: string[]
  seoMeta?: {
    title: string
    description: string
    ogImage?: string
  }
  createdAt: Date
  updatedAt: Date
}

const TrekSchema = new Schema<ITrek>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    region: { type: String, required: true, default: 'Uttarakhand' },
    subRegion: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['Easy', 'Easy-Moderate', 'Moderate', 'Moderate-Difficult', 'Difficult'],
      required: true,
    },
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    maxAltitude: { type: String, required: true },
    startingAltitude: { type: String },
    bestSeason: [{ type: String }],
    startingPrice: { type: Number, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    highlights: [{ type: String }],
    description: { type: String, required: true },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        distance: String,
        altitude: String,
      },
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    thingsToBring: [{ type: String }],
    seoMeta: {
      title: String,
      description: String,
      ogImage: String,
    },
  },
  { timestamps: true }
)

// Indexes for fast query
TrekSchema.index({ subRegion: 1 })
TrekSchema.index({ difficulty: 1 })
TrekSchema.index({ isFeatured: 1, isActive: 1 })
TrekSchema.index({ startingPrice: 1 })

export default mongoose.models.Trek || mongoose.model<ITrek>('Trek', TrekSchema)
