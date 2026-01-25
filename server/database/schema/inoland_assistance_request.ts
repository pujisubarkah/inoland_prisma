import { pgTable, bigint, text, varchar, timestamp, serial } from 'drizzle-orm/pg-core';

export const inolandAssistanceRequest = pgTable('inoland_assistance_request', {
  id: serial('id').primaryKey(),
  instansi: text('instansi'),
  penanggung_jawab: text('penanggung_jawab'),
  jabatan: text('jabatan'),
  email: text('email'),
  telepon: text('telepon'),
  jenis_pendampingan: text('jenis_pendampingan'),
  keterangan: text('keterangan'),
  status: varchar('status', { length: 255 }).default('pending'),
  created_at: timestamp('created_at', { withTimezone: true }).notNull(),
});