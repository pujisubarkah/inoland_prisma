import { pgTable, serial, varchar, timestamp, bigint } from 'drizzle-orm/pg-core'
import { instansi } from './instansi'
import { survey_periode } from './survey_periode'
import { surveyIndicator } from './survey'

export const surveyResponse = pgTable('survey_response', {
  id: serial('id').primaryKey(),

  instansiId: bigint('instansi_id', { mode: 'number' }).notNull(),
  periodeId: bigint('periode_id', { mode: 'number' }).notNull(),

  pengisi: varchar('pengisi', { length: 255 }),
  jabatanPengisi: varchar('jabatan_pengisi', { length: 255 }),

  status: varchar('status', { length: 30 }).default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
})