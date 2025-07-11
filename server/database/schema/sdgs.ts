import { pgTable, serial, timestamp, smallint, text } from "drizzle-orm/pg-core";

export const sdgs = pgTable("sdgs", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  tujuan_ke: smallint("tujuan_ke"),
  sdgs: text("sdgs"),
  image: text("image"),
});
