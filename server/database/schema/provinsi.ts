import { pgTable, integer, bigint } from "drizzle-orm/pg-core";

// View di PostgreSQL: provinsi
export const provinsi = pgTable("provinsi", {
  id_provinsi: integer("id_provinsi"),
  jumlah_inovasi: bigint("jumlah_inovasi", { mode: "number" }),
});


