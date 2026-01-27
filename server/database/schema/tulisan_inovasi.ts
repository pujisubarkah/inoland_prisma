import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { master_provinsi } from "./master_provinsi";
import { master_kabupaten } from "./master_kabupaten";

export const inovasis = pgTable("inovasis", {
	id: serial("id").primaryKey(),
	created_at: text("created_at"),
	document_id: text("document_id"),
	nama_inovasi: text("nama_inovasi"),
	penggagas: text("penggagas"),
	deskripsi: text("deskripsi"),
	nama_instansi: text("nama_instansi"),
	unit_instansi: text("unit_instansi"),
	tahun_inisiasi: text("tahun_inisiasi"),
	tahun_implementasi: text("tahun_implementasi"),
	faktor_pendorong: text("faktor_pendorong"),
	faktor_penghambat: text("faktor_penghambat"),
	tahapan_proses: text("tahapan_proses"),
	output: text("output"),
	outcome: text("outcome"),
	manfaat: text("manfaat"),
	prasyarat_replikasi: text("prasyarat_replikasi"),
	kontak: text("kontak"),
	sumber: text("sumber"),
	id_provinsi: integer("id_provinsi").references(() => master_provinsi.id_provinsi),
	id_kabkot: integer("id_kabkot").references(() => master_kabupaten.id_kabkot),
	published_at: text("published_at"),
	updated_at: text("updated_at"),
	created_by_id: text("created_by_id"),
	updated_by_id: text("updated_by_id"),
	locale: text("locale"),
});

