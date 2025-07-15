// /server/database/schema/articles.ts

import { pgTable, text, uuid, varchar, date, timestamp } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  date: date('date').notNull(),
  summary: text('summary'),
  avatar: text('avatar'), // URL gambar
  content: text('content').notNull(), // bisa HTML, markdown, atau rich text
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
