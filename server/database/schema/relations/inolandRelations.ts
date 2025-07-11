// db/schema/inolands.ts (lanjutan)
import { relations } from "drizzle-orm";
import { inolands } from "../inolands"; // Adjust the import path as needed
import { master_provinsi } from "../master_provinsi";
import { master_kabupaten } from "../master_kabupaten";
import { sdgs } from "../sdgs";

export const inolandsRelations = relations(inolands, ({ one }) => ({
  provinsi: one(master_provinsi, {
    fields: [inolands.id_provinsi],
    references: [master_provinsi.id_provinsi],
  }),
  kabupaten: one(master_kabupaten, {
    fields: [inolands.id_kabkot],
    references: [master_kabupaten.id_kabkot],
  }),
  sdgs: one(sdgs, {
    fields: [inolands.sdgs],
    references: [sdgs.id],
    relationName: "inolands_sdgsTosdgs",
  }),
}));
