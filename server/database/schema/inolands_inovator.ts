import { pgTable, serial, text, integer, varchar } from "drizzle-orm/pg-core";
import { master_provinsi } from "./master_provinsi";
import { master_kabupaten } from "./master_kabupaten";
import { instansi } from "./instansi";

export const inolands_inovator = pgTable("inolands_inovator", {
  id: serial("id").primaryKey(),
  inovator: text("inovator"),
  agency_id_panrb: varchar("agency_id_panrb", { length: 255 }).references(() => instansi.agency_id),
  id_kabkot: integer("id_kabkot").references(() => master_kabupaten.id_kabkot),
  id_provinsi: integer("id_provinsi").references(() => master_provinsi.id_provinsi),
  longlat: text("longlat"),
  alamat: text("alamat"),
});