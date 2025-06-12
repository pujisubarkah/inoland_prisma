import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { beritas } from './schema/berita'

// Export koneksi tanpa await
export const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

// Jangan gunakan top-level await
export const db = drizzle(client)

// Connect di awal saat server start
async function connectDB() {
  try {
    await client.connect()
    console.log('Database connected')
  } catch (error) {
    console.error('Failed to connect to database', error)
  }
}

connectDB()