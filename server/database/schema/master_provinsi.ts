// db/schema/master_provinsi.ts
import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const master_provinsi = pgTable("master_provinsi", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  id_provinsi: integer("id_provinsi").unique(),
  nama_provinsi: varchar("nama_provinsi", { length: 255 }),
});
