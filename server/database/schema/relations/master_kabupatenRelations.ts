// db/schema/master_kabupaten.ts
import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
// Update the import path if the file is in a different directory, for example:
import { master_provinsi } from "../master_provinsi";
// Or ensure that 'master_provinsi.ts' exists in the same directory as this file.

export const master_kabupaten = pgTable("master_kabupaten", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  id_provinsi: integer("id_provinsi").references(() => master_provinsi.id_provinsi),
  id_kabkot: integer("id_kabkot").unique(),
  nama_kabkot: varchar("nama_kabkot", { length: 255 }),
});
