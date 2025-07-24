import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const instansi_kategori = pgTable("instansi_kategori", {
  id: serial("id").primaryKey(),
  kat_instansi: varchar("kat_instansi", { length: 255 }),
});