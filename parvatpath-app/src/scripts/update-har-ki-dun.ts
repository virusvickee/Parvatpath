// src/scripts/update-har-ki-dun.ts
// Run: npx tsx src/scripts/update-har-ki-dun.ts

import mongoose from 'mongoose'
import Trek from '../models/Trek'

const MONGODB_URI = process.env.MONGODB_URI || ''

async function updateHarKiDun() {
  await mongoose.connect(MONGODB_URI, { dbName: 'parvatpath' })
  console.log('✅ Connected')

  const result = await Trek.findOneAndUpdate(
    { slug: 'har-ki-dun-trek' },
    {
      $set: {
        name: 'Har Ki Dun Trek',
        region: 'Uttarakhand',
        subRegion: 'Uttarkashi',
        difficulty: 'Moderate',
        duration: { days: 7, nights: 6 },
        maxAltitude: '11,958 ft (3,645 m)',
        startingAltitude: '6,300 ft (1,920 m)',
        startingPrice: 9999,
        bestSeason: ['April', 'May', 'June', 'September', 'October'],
        highlights: [
          'Valley of Gods — mythological Mahabharata connection',
          'Ancient Osla village, 500+ year old historic route',
          'Views of Swargarohini, Bandarpunch, Black Peak',
          'Govind Wildlife Sanctuary — rich flora and fauna',
          'Pickup from Dehradun Railway Station included',
        ],
        description: `Har Ki Dun Trek lies within the Govind Wildlife Sanctuary and National Park. Situated in the Himalayas, this trek offers enchanting beauty, a bracing climate, and lush green meadows. Har Ki Dun Trek is often referred to as the "Valley of Gods." It sits at an altitude of 11,958 ft (3,645 m) and follows a historic route that is over 500 years old. The cradle-shaped hanging valley offers stunning views of Swargarohini, Bandarpunch, and Black Peak.`,
        itinerary: [
          {
            day: 1,
            title: 'Dehradun to Sankri',
            description: 'Drive from Dehradun Railway Station to Sankri (190 km by Tempo Traveller). Check in to hotel. Rest and trek briefing.',
            distance: '190 km drive',
            altitude: '6,300 ft (1,920 m)',
          },
          {
            day: 2,
            title: 'Sankri to Taluka → Trek to Osla Village',
            description: 'Drive 12 km to Taluka (1 hour). Begin trek through Supin river valley. Cross lush meadows and dense forests to reach the ancient Osla village.',
            distance: '13 km trek + 12 km drive',
            altitude: '8,530 ft (2,600 m)',
          },
          {
            day: 3,
            title: 'Osla to Kalkatidhar',
            description: 'Trek through rhododendron and oak forests. Gradual ascent to Kalkatidhar campsite with open mountain views.',
            distance: '6 km trek',
            altitude: '10,500 ft (3,200 m)',
          },
          {
            day: 4,
            title: 'Kalkatidhar → Har Ki Dun Valley → Return to Kalkatidhar',
            description: 'Trek to the breathtaking Har Ki Dun Valley (3,566 m). Explore the valley floor and surrounding peaks. Return to Kalkatidhar camp.',
            distance: '12 km round trip',
            altitude: '11,700 ft (3,566 m)',
          },
          {
            day: 5,
            title: 'Kalkatidhar to Osla Village',
            description: 'Descend back through the forest trail to Osla village. Enjoy the valley views on the way down.',
            distance: '6 km trek',
            altitude: '8,530 ft (2,600 m)',
          },
          {
            day: 6,
            title: 'Osla to Taluka → Drive to Sankri',
            description: 'Trek down to Taluka (13 km, 4-5 hours). Drive back to Sankri (12 km). Overnight stay at Sankri hotel.',
            distance: '13 km trek + 12 km drive',
            altitude: '6,300 ft (1,920 m)',
          },
          {
            day: 7,
            title: 'Sankri to Dehradun — Departure',
            description: 'Early morning drive back to Dehradun (190 km by Tempo Traveller, 8-10 hours). Drop at Dehradun Railway Station.',
            distance: '190 km drive',
            altitude: '2,100 ft (640 m)',
          },
        ],
        inclusions: [
          'Transport: Dehradun Railway Station to Dehradun (Tempo Traveller / Bolero Taxi)',
          'Forest Permit and entrance fees',
          'Accommodation in hotel at Sankri (best available)',
          'Accommodation in tents on twin share basis on trek',
          'All meals: Breakfast, Lunch, Tea, Coffee, Snacks, Soup and Dinner',
          'High quality tents',
          'Sleeping bags, Mattress, Liner',
          'Separate toilet tents (Ladies and Gents)',
          'Dining Tent and Dining Table',
          'Kitchen team',
          'Radio Walkie Talkie for communication',
          'Experienced Trek Leader and Technical Guide',
          'Medical Kit and Oxygen Cylinders',
          'Crampons and Gaiters',
        ],
        exclusions: [
          'Food during pick and drop transfer',
          'Porter/mule charges',
          'Personal expenses',
          'Travel insurance (strongly recommended)',
          'Anything not mentioned in inclusions',
        ],
        thingsToBring: [
          'Backpack (50-60 litre)',
          'Rain cover for backpack',
          'Water bottle (2L)',
          'Toilet paper and wipes',
          'Fleece jackets and thermals',
          'Hiking/trekking shoes (ankle support)',
          'LED torch with extra batteries',
          'Mosquito and insect repellent',
          'Thermal inner wear',
          'Warm clothes and woolen cap',
        ],
        seoMeta: {
          title: 'Har Ki Dun Trek 2026 — Valley of Gods, Uttarakhand | Parvatpath',
          description: 'Book Har Ki Dun Trek from Dehradun. 7 days in the mythological Valley of Gods. Govind Wildlife Sanctuary, 11,958 ft. From ₹9,999. Pickup from Dehradun Railway Station.',
        },
      },
    },
    { new: true }
  )

  if (result) {
    console.log('✅ Har Ki Dun Trek updated successfully!')
    console.log(`   Name: ${result.name}`)
    console.log(`   Price: ₹${result.startingPrice}`)
    console.log(`   Duration: ${result.duration.days}D/${result.duration.nights}N`)
    console.log(`   Altitude: ${result.maxAltitude}`)
    console.log(`   Itinerary days: ${result.itinerary.length}`)
    console.log(`   Inclusions: ${result.inclusions.length} items`)
  } else {
    console.log('❌ Trek not found — check slug "har-ki-dun-trek" in DB')
  }

  process.exit(0)
}

updateHarKiDun().catch((err) => {
  console.error('❌ Error:', err)
  process.exit(1)
})
