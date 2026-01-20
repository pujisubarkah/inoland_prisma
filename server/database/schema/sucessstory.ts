// Buat file baru, e.g., lib/db/schema.ts atau sesuai struktur Anda
import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const successStory = pgTable('successstory', {
  id: serial('id').primaryKey(),  // int4, auto increment
  title: text('title').notNull(),  // text
  description: text('description').notNull(),  // text
  impact: text('impact').notNull(),  // text
  imageUrl: text('imageurl'),  // text, nullable
  fullContent: text('fullcontent'),  // text, nullable
  published: boolean('published').default(false),  // bool
  createdAt: timestamp('createdat').defaultNow(),  // timestamp
  updatedAt: timestamp('updatedat').defaultNow(),  // timestamp (manual update, atau gunakan trigger)
});

// Jika perlu auto-update updatedAt, tambahkan di migration atau query