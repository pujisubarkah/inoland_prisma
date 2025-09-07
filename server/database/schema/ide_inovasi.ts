import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const innovationIdeas = pgTable("innovation_ideas", {
  id: serial("id").primaryKey(),
  namaOpd: varchar("nama_opd", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }),
  telp: varchar("telp", { length: 50 }),
  email: varchar("email", { length: 255 }),
  latarBelakang: text("latar_belakang"),
  ideInovasi: text("ide_inovasi"),
  stakeholderInovasi: text("stakeholder_inovasi"),
  sumberDaya: text("sumber_daya"),
  penerimaManfaat: text("penerima_manfaat"),
  deskripsiSingkat: text("deskripsi_singkat"),
  keterangan: text("keterangan"),
  roleId: varchar("role_id", { length: 50 }).default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
