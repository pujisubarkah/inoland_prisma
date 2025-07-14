import {
  pgTable,
  integer,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { master_kabupaten } from "./master_kabupaten";

export const labinov = pgTable("labinov", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow(),
  id_kabkot: integer("Id_kabkot").references(() => master_kabupaten.id_kabkot),
  DRUMP_UP: integer("DRUMP_UP"),
  DIAGNOSE: integer("DIAGNOSE"),
  DESAIN: integer("DESAIN"),
  DELIVER_LAUNCHING: integer("DELIVER_LAUNCHING"),
  DELIVER_MONITORING: integer("DELIVER_MONITORING"),
  DISPLAY: integer("DISPLAY"),
  HASIL_AKHIR: integer("HASIL_AKHIR"),
  session: integer("session"),
});

export type Labinov = typeof labinov.$inferSelect;
export type NewLabinov = typeof labinov.$inferInsert;
