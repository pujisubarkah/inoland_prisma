import { pgTable, serial, timestamp, bigint, integer, text } from 'drizzle-orm/pg-core'
import { surveyResponse } from './survey_response'
import { surveyIndicator } from './survey'

export const surveyResponseDetail = pgTable(
  'survey_response_detail',
  {
    id: serial('id').primaryKey(),

    responseId: bigint('response_id', { mode: 'number' })
      .references(() => surveyResponse.id, { onDelete: 'cascade' }),

    indicatorId: bigint('indicator_id', { mode: 'number' })
      .references(() => surveyIndicator.id),

    skor: integer('skor'),
    catatan: text('catatan'),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
  }
)