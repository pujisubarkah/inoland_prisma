import { relations } from "drizzle-orm";
import { master_kabupaten } from "./master_kabupatenRelations";
import { master_provinsi } from "../master_provinsi"; // Adjust the path if needed
// import { inolands } from "./inolands"; // <-- Commented out because module not found

export const master_provinsiRelations = relations(master_provinsi, ({ many }) => ({
  master_kabupaten: many(master_kabupaten),
  // inolands: many(inolands), // <-- Commented out because module not found
}));
