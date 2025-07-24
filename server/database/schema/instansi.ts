import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { instansi_kategori } from "./instansi_kategori";

export const instansi = pgTable("instansi", {
  id: serial("id").primaryKey(),
  agency_id: varchar("agency_id", { length: 255 }),
  agency_name: varchar("agency_name", { length: 500 }),
  agency_category_id: integer("agency_category_id").references(() => instansi_kategori.id),
});