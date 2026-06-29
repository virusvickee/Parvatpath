// src/scripts/add-hampta-pass.ts
// Run: npx tsx src/scripts/add-hampta-pass.ts

import mongoose from 'mongoose'
import Trek from '../models/Trek'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI || ''

const hamptaPassTrek = {
  slug: 'hampta-pass-trek',
  name: 'Hampta Pass Trek',
  region: 'Himachal Pradesh',
  subRegion: 'Manali',
  difficulty: 'Moderate',
  duration: { days: 5, nights: 4 },
  maxAltitude: '14,010 ft (4,270 m)',
  startingAltitude: '10,100 ft (3,078 m)',
  startingPrice: 6500,
  bestSeason: ['June', 'July', 'August', 'September'],
  coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  gallery: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
  ],
  rating: 4.8,
  reviewCount: 156,
  isFeatured: true,
  isActive: true,
  highlights: [
    'Cross the majestic Hampta Pass at 14,010 ft',
    'Visit the otherworldly Chandratal (Moon Lake) at 14,100 ft',
    'Trek through Jobra forest & lush valley of Rani Nallah',
    'Camp at Chika, Balu ka Ghera, and Shea Goru campsites',
    'Spectacular views of Indrasan and Deo Tibba peaks',
    'Dramatic change of scenery from green Manali valley to barren Lahaul-Spiti',
  ],
  description: `Hampta Pass Trek is one of the most famous and unique crossovers in Himachal Pradesh. The trek starts from Manali (Jobra) and leads you through lush green meadows, pine forests, and glacial valleys. As you reach the summit of Hampta Pass at 14,010 ft, the landscape dramatically changes to the arid, barren, and high-altitude desert of Lahaul & Spiti. The trek includes a visit to the mesmerizing crescent-shaped Chandratal Lake, before driving back to Manali via the iconic Atal Tunnel.`,
  itinerary: [
    {
      day: 1,
      title: 'Manali to Jobra (Drive) → Trek to Chika',
      description: 'Drive from Manali to Jobra (10 km, ~2 hours). Trek along the Rani Nallah river to Chika campsite (2 km, ~2 hours). Cross scenic valleys and camp at Chika.',
      distance: '10 km drive + 2 km trek',
      altitude: '10,100 ft (3,078 m)',
    },
    {
      day: 2,
      title: 'Chika to Balu Ka Ghera',
      description: 'Trek along the rocky banks and meadows. Cross the Hampta river. Reach the Balu Ka Ghera campsite nestled amidst mountains and glaciers.',
      distance: '8 km trek (5-6 hours)',
      altitude: '11,900 ft (3,627 m)',
    },
    {
      day: 3,
      title: 'Balu Ka Ghera to Shea Goru via Hampta Pass',
      description: 'A steep ascent to the summit of Hampta Pass (14,100 ft). Enjoy breathtaking views of Himalayan peaks (Indrasan, Deo Tibba). Descend to the Shea Goru campsite through snow and rocky terrain.',
      distance: '14 km trek (8-9 hours)',
      altitude: 'Hampta Pass: 14,100 ft | Shea Goru: 12,900 ft',
    },
    {
      day: 4,
      title: 'Shea Goru to Chatru (Trek) → Drive to Chandratal Lake',
      description: 'Trek through river crossings and glacial paths to Chatru campsite (8 km). Drive from Chatru to the mesmerizing crescent-shaped Chandratal Lake (70 km round trip). Return to Chatru for overnight camping.',
      distance: '8 km trek (4-5 hours) + 70 km drive (3-4 hours)',
      altitude: '11,000 ft (3,353 m)',
    },
    {
      day: 5,
      title: 'Chatru to Manali via Atal Tunnel',
      description: 'Scenic drive from Chatru back to Manali via the iconic Atal Tunnel. End of trek.',
      distance: '85 km drive (5-6 hours)',
      altitude: 'Manali: 6,726 ft (2,050 m)',
    },
  ],
  inclusions: [
    'Food as per menu on the trek (Day 1 Lunch to Day 5 Breakfast)',
    'Forest Camping charges and permits',
    'Safety Equipment (Oxygen cylinders, Medical kits)',
    'Hiking Equipment (High-quality tents, sleeping bags, mattress, liner)',
    'Experienced trek guide, cook, helpers, and mules/porters for common luggage',
    'Accommodation in Tents or Homestays',
    'Group Transfers in Tempo Traveller / Bolero / Desire',
    'All currently applicable taxes including service tax',
  ],
  exclusions: [
    'Meals during road journeys',
    'Any kind of Insurance',
    'Any expenses of personal nature',
    'Carriage of personal luggage during the trek',
    'Any private individual transfer costs',
    'Optional tours, extra meals, bottled water, soft drinks, and alcoholic beverages',
  ],
  thingsToBring: [
    'Woolen cap & Gloves',
    'Neck gaiter',
    'Woolen socks (3 pairs)',
    'Quick-dry T-shirts',
    'Backpack & Rain Cover (40-60 Litres)',
    'Trekking shoes (ankle support)',
    'LED Torch',
    'Water Bottle (1-2 Litres)',
    'Fleece jacket or down jacket',
    'Three warm layers (Five in Winter)',
    'Two Trek Pants (One Wear & One Carry)',
    'Thermal innerwear',
    'Sunscreen Lotion (SPF 50/70)',
    'Lip Balm (SPF 30)',
    'Sun cap / Normal cap',
    'Synthetic hand gloves',
    'Raincoat or Poncho',
    'Plastic covers for wet clothes',
    'Sunglasses',
  ],
  seoMeta: {
    title: 'Hampta Pass Trek 2026 — Chandratal Lake, Manali | Parvatpath',
    description: 'Book Hampta Pass Trek from Manali. 5 days crossing Hampta Pass (14,010 ft) into Lahaul-Spiti. Includes Chandratal Lake visit and transport. From ₹6,500.',
  },
}

async function addHamptaPass() {
  await mongoose.connect(MONGODB_URI, { dbName: 'parvatpath' })
  console.log('✅ Connected')

  const result = await Trek.findOneAndUpdate(
    { slug: 'hampta-pass-trek' },
    { $set: hamptaPassTrek },
    { new: true, upsert: true }
  )

  console.log('✅ Hampta Pass Trek seeded successfully!')
  console.log(`   Name: ${result.name}`)
  console.log(`   Price: ₹${result.startingPrice}`)
  console.log(`   Duration: ${result.duration.days}D/${result.duration.nights}N`)
  console.log(`   Altitude: ${result.maxAltitude}`)
  console.log(`   Itinerary days: ${result.itinerary.length}`)
  console.log(`   Inclusions: ${result.inclusions.length} items`)

  process.exit(0)
}

addHamptaPass().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
