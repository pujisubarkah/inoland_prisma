import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";

// View di PostgreSQL: pdflist
export const pdflist = pgTable("pdflist", {
  id: integer("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }),
  pdf_url: varchar("pdf_url", { length: 255 }),
  pdf_judul: varchar("pdf_judul", { length: 255 }),
  pdf_kategori: varchar("pdf_kategori", { length: 100 }),
  pdf_cover: varchar("pdf_cover", { length: 255 }),
  pdf_publisher: varchar("pdf_publisher", { length: 100 }),
});




