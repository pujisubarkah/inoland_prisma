// lib/db/schema.ts
import { pgTable, serial, timestamp, text } from "drizzle-orm/pg-core";

export const inovasi_LAN = pgTable("inovasi_LAN", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true, precision: 6 }).defaultNow(),
  nama_inovasi: text("nama_inovasi"),
  produk_inovasi: text("produk_inovasi"),
  nama_instansi: text("nama_instansi"),
  deskripsi: text("deskripsi"),
  image_link: text("image_link"),
});
