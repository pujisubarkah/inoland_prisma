import {
  pgTable,
  integer,
  varchar,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const kabupaten_maps = pgTable("kabupaten_maps", {
  id_kabkot: serial("id_kabkot").primaryKey(),
  id_provinsi: integer("id_provinsi"),
  nama: varchar("nama", { length: 255 }),
  svg_path: text("svg_path"),
});
