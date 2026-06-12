import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Read your MongoDB URI from your .env file
dotenv.config({ path: '.env.local' })

async function cleanDatabase() {
  try {
    console.log('⏳ Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)

    // Tap directly into the raw database to bypass Mongoose rules
    const db = mongoose.connection.db

    console.log('🧹 Scrubbing the age field from all profiles...')
    const result = await db
      .collection('profiles')
      .updateMany({}, { $unset: { age: '' } })

    console.log(
      `✅ Success! Erased the age field from ${result.modifiedCount} profiles.`,
    )
    process.exit(0)
  } catch (error) {
    console.error('🚨 Error:', error)
    process.exit(1)
  }
}

cleanDatabase()
