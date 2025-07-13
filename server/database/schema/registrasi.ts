// file: server/database/schema.ts
// server/database/schema.ts
import { pgTable, serial, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nama_lengkap: varchar("nama_lengkap", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  instansi: varchar("instansi", { length: 255 }),
  role_id: integer("role_id").default(2),
  is_verified: boolean("is_verified").default(false),
  created_at: timestamp("created_at", { mode: "date", precision: 6 }).defaultNow(),
});

