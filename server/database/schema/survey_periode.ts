import { pgTable, serial, integer, boolean, timestamp } from 'drizzle-orm/pg-core'

export const survey_periode = pgTable('survey_periode', {
  id: serial('id').primaryKey(),
  tahun: integer('tahun').notNull(),
  is_active: boolean('is_active').default(false),
  created_at: timestamp('created_at', { mode: 'string', withTimezone: true }).defaultNow(),
})