import {
  pgTable,
  integer,
  text,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';
import { master_provinsi } from './master_provinsi'; // pastikan path dan nama file sesuai

export const provinsis = pgTable('provinsis', {
  id: integer('id').primaryKey().unique(),
  nama: varchar('nama', { length: 255 }),
  svg_path: text('svg_path'),
  id_provinsi: integer('id_provinsi'),
  created_at: timestamp('created_at', { precision: 6 }),
  updated_at: timestamp('updated_at', { precision: 6 }),
  published_at: timestamp('published_at', { precision: 6 }),
  created_by_id: integer('created_by_id'),
  updated_by_id: integer('updated_by_id'),
  locale: varchar('locale', { length: 255 }),
  Tahun_2019: text('Tahun_2019'),
  Tahun_2020: text('Tahun_2020'),
  Tahun_2021: text('Tahun_2021'),
  Tahun_2022: text('Tahun_2022'),
  Tahun_2023: text('Tahun_2023'),
});
