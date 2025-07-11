// db/schema/relations/sdgsRelations.ts
import { relations } from "drizzle-orm";
import { sdgs } from "../sdgs";
import { inolands } from "../inolands";

export const sdgsRelations = relations(sdgs, ({ many }) => ({
  inolands: many(inolands, {
    relationName: "inolands_sdgsTosdgs", // sesuai nama relasi di model
  }),
}));
