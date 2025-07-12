import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Definisi tabel kabupatens
export const kabupatens = pgTable('kabupatens', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp('created_at', { withTimezone: true, precision: 6 }).defaultNow().notNull(),
  nama: varchar('nama', { length: 255 }),
  svgPath: varchar('svg_path'),
  idProvinsi: integer('id_provinsi').references(() => masterProvinsis.id),
  idKabkot: integer('id_kabkot').references(() => masterKabupatens.id),
  updatedAt: timestamp('updated_at', { withTimezone: true, precision: 6 }),
})

// Jika Anda ingin menggunakan relasi (relations), tambahkan seperti ini:
export const kabupatenRelations = relations(kabupatens, ({ one }) => ({
  masterKabupaten: one(masterKabupatens, {
    fields: [kabupatens.idKabkot],
    references: [masterKabupatens.id],
  }),
  masterProvinsi: one(masterProvinsis, {
    fields: [kabupatens.idProvinsi],
    references: [masterProvinsis.id],
  }),
}))

// Contoh minimal untuk master_kabupaten
export const masterKabupatens = pgTable('master_kabupaten', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  // tambahkan field lain sesuai kebutuhan
})

export const masterProvinsis = pgTable('master_provinsi', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  // tambahkan field lain sesuai kebutuhan
})
