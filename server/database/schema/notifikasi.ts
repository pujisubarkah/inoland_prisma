import { pgTable, serial, bigint, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const notifikasi = pgTable('notifikasi', {
  id: serial('id').primaryKey(),
  admin_instansi_id: bigint('admin_instansi_id', { mode: 'number' }),
  innovation_idea_id: bigint('innovation_idea_id', { mode: 'number' }),
  type: varchar('type', { length: 255 }),
  title: varchar('title', { length: 255 }),
  message: text('message'),
  status: varchar('status', { length: 255 }),
  created_at: timestamp('created_at', { withTimezone: false }),
  read_at: timestamp('read_at', { withTimezone: false }),
});
// Note: If your DB uses SERIAL/BIGSERIAL for id, Drizzle will allow omitting id on insert.
