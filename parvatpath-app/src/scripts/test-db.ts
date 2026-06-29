import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function testConnection() {
  try {
    const { default: connectDB } = await import('../lib/db')
    const { default: Trek } = await import('../models/Trek')
    const { default: Tour } = await import('../models/Tour')
    const { default: Blog } = await import('../models/Blog')

    console.log('Testing connection to MongoDB...')
    await connectDB()
    console.log('✅ Connected successfully!\n')

    // Fetch some basic stats to prove it works
    const trekCount = await Trek.countDocuments()
    const tourCount = await Tour.countDocuments()
    const blogCount = await Blog.countDocuments()

    console.log('📊 Database Stats:')
    console.log(`- Treks: ${trekCount}`)
    console.log(`- Tours: ${tourCount}`)
    console.log(`- Blogs: ${blogCount}`)

    if (trekCount > 0) {
      console.log('\n🔍 Sample Trek Data:')
      const sampleTrek = await Trek.findOne().select('name subRegion difficulty startingPrice')
      console.log(sampleTrek)
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Connection failed:', error)
    process.exit(1)
  }
}

testConnection()
