import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
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

// Gunakan Pool untuk connection pooling yang lebih baik
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // maksimum koneksi dalam pool
  idleTimeoutMillis: 30000, // tutup koneksi idle setelah 30 detik
  connectionTimeoutMillis: 2000, // timeout saat mencoba koneksi
})

// Error handling untuk pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

// Export db dengan pool
export const db = drizzle(pool)