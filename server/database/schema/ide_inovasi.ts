import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const ide_inovasi = pgTable("ide_inovasi", {
  id: serial("id").primaryKey(),
  latar_belakang: text("latar_belakang"),
  ide_inovasi: text("ide_inovasi"),
  stakeholder_inovasi: text("stakeholder_inovasi"),
  sumber_daya: text("sumber_daya"),
  penerima_manfaat: text("penerima_manfaat"),
  kebaruan: text("kebaruan"),
  deskripsi_singkat: text("deskripsi_singkat"),
  keterangan: text("keterangan"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
  created_by: integer("created_by"),
});
