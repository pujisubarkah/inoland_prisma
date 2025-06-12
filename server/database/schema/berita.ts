import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const beritas = pgTable('beritas', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  likes: integer('likes'),
  title: text('title'),
  date: timestamp('date', { withTimezone: true }),
  imageUrl: text('image_url'),
  deskripsi: text('deskripsi').notNull(),
  embedUrl: text('embed_url').notNull(),
});