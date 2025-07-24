import { pgTable, serial, timestamp, text, varchar, integer } from "drizzle-orm/pg-core";
import { sdgs } from "./sdgs";
import { master_provinsi } from "./master_provinsi";
import { master_kabupaten } from "./master_kabupaten";
import { instansi } from "./instansi";
import { inolands_inovator } from "./inolands_inovator";

export const inolands = pgTable("inolands", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  judul_inovasi: text("judul_inovasi"),
  kld: text("kld"),
  urusan: text("urusan"),
  deskripsi: text("deskripsi"),
  tahun: varchar("tahun", { length: 10 }),
  id_provinsi: integer("id_provinsi").references(() => master_provinsi.id_provinsi),
  id_kabkot: integer("id_kabkot").references(() => master_kabupaten.id_kabkot),
  inovator: text("inovator"),
  agency_id_panrb: varchar("agency_id_panrb", { length: 255 }).references(() => instansi.agency_id),
  inovator_id: integer("inovator_id").references(() => inolands_inovator.id),
  sdgs: integer("sdgs").references(() => sdgs.id), // foreign key ke SDGs
});
