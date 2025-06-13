// lib/db/schema.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const dokumens = pgTable('dokumens', {
  id: serial('id').primaryKey(),
  created_at: timestamp('created_at', { precision: 6 }),
  nama: text('nama'),
  link: text('link'),
  jenis_dokumen: text('jenis_dokumen'),
});
