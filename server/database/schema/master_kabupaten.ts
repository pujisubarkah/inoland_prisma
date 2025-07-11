// db/schema/master_kabupaten.ts
import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { master_provinsi } from "./master_provinsi";

export const master_kabupaten = pgTable("master_kabupaten", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  id_provinsi: integer("id_provinsi").references(() => master_provinsi.id_provinsi),
  id_kabkot: integer("id_kabkot").unique(),
  nama_kabkot: varchar("nama_kabkot", { length: 255 }),
});
