import { pgTable, integer, bigint } from "drizzle-orm/pg-core";
import Id from "~/server/api/berita/[id]";

// View di PostgreSQL: provinsi
export const kabkot = pgTable("kabkot", {
  id_provinsi: integer("id_provinsi"),
  Id_kabkot: integer("id_kabkot"),
  jumlah_inovasi: bigint("jumlah_inovasi", { mode: "number" }),
});
