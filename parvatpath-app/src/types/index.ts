export interface Trek {
  _id: string
  slug: string
  name: string
  region: 'Uttarakhand'
  subRegion: 'Uttarkashi' | 'Chamoli' | 'Rudraprayag' | 'Tehri' | 'Pithoragarh'
  difficulty: 'Easy' | 'Easy-Moderate' | 'Moderate' | 'Moderate-Difficult' | 'Difficult'
  duration: { days: number; nights: number }
  maxAltitude: string
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
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  thingsToBring: string[]
  batches: Batch[]
  seoMeta?: SeoMeta
  groupSize?: { min: number; max: number }
}

export interface Batch {
  _id: string
  startDate: string
  endDate: string
  price: number
  totalSeats: number
  bookedSeats: number
  isActive?: boolean
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  distance?: string
  altitude?: string
}

export interface Blog {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: 'Trek Tips' | 'Gear' | 'Destinations' | 'Safety'
  author: string
  readTime: number
  publishedAt: string
  isPublished: boolean
  seoMeta?: SeoMeta
}

export interface SeoMeta {
  title: string
  description: string
  ogImage?: string
}

export interface Testimonial {
  _id: string
  name: string
  trekName: string
  rating: number
  comment: string
  date: string
  location: string
}

export interface Tour {
  _id: string
  slug: string
  name: string
  type: 'Leisure' | 'Char Dham' | 'Group' | 'Corporate'
  duration: { days: number; nights: number }
  startingPrice: number
  coverImage: string
  description: string
  highlights: string[]
  inclusions: string[]
  exclusions: string[]
  isActive: boolean
}

export type DifficultyLevel = 'Easy' | 'Easy-Moderate' | 'Moderate' | 'Moderate-Difficult' | 'Difficult'
export type Region = 'Uttarakhand' | 'Himachal Pradesh' | 'Kashmir' | 'Nepal' | 'West Bengal'
