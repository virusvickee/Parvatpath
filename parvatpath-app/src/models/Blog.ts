import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: 'Trek Tips' | 'Gear' | 'Destinations' | 'Safety'
  author: string
  readTime: number
  isPublished: boolean
  publishedAt: Date
  seoMeta?: { title: string; description: string; ogImage?: string }
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: {
      type: String,
      enum: ['Trek Tips', 'Gear', 'Destinations', 'Safety'],
      required: true,
    },
    author: { type: String, required: true },
    readTime: { type: Number, default: 5 },
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    seoMeta: { title: String, description: String, ogImage: String },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
