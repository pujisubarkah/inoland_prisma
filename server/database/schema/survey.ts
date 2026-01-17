import { pgTable, serial, bigint, integer, text, varchar } from 'drizzle-orm/pg-core'

export const surveyComponent = pgTable('survey_component', {
  id: serial('id').primaryKey(),
  kode: varchar('kode', { length: 10 }),
  nama: text('nama'),
  deskripsi: text('deskripsi'),
  urutan: integer('urutan')
})

export const surveyIndicator = pgTable('survey_indicator', {
  id: serial('id').primaryKey(),
  componentId: bigint('component_id', { mode: 'number' })
    .references(() => surveyComponent.id, { onDelete: 'cascade' }),
  kode: varchar('kode', { length: 20 }),
  pertanyaan: text('pertanyaan'),
  urutan: integer('urutan')
})

export const surveyIndicatorOption = pgTable('survey_indicator_option', {
  id: serial('id').primaryKey(),
  indicatorId: bigint('indicator_id', { mode: 'number' })
    .references(() => surveyIndicator.id, { onDelete: 'cascade' }),
  skor: integer('skor'),
  label: text('label'),
  urutan: integer('urutan')
})