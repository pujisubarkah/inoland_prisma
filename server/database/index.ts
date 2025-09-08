import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { beritas } from './schema/berita'
import { inovasi_LAN } from './schema/inovasi'
import { dokumens } from './schema/infografis'
import { provinsi } from './schema/provinsi'
import { master_provinsi } from './schema/master_provinsi'
import { provinsis } from './schema/provinsis'
import { inolands } from './schema/inolands'
import { inolands_inovator } from './schema/inolands_inovator'
import { instansi } from './schema/instansi'
import { instansi_kategori } from './schema/instansi_kategori'
import { indeks_inovasi } from './schema/indeks_inovasi'
import { sdgs } from './schema/sdgs'
import { ide_inovasi } from './schema/ide_inovasi'

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