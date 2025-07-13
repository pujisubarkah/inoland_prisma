import { pgTable, varchar, integer, boolean, serial, timestamp } from 'drizzle-orm/pg-core'
import { role } from './role'

export const user = pgTable('users', {
  id: serial('id').primaryKey(),
  nama_lengkap: varchar('nama_lengkap', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  instansi: varchar('instansi', { length: 255 }),
  role_id: integer('role_id').references(() => role.id),
  password: varchar('password', { length: 255 }),
  is_verified: boolean('is_verified'),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  username: varchar('username', { length: 255 }).unique(),
})
