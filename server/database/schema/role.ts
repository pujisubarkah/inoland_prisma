// server/database/schema/role.ts
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const role = pgTable('role', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 100 }),
})
