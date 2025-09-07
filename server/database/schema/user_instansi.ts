import { pgTable, serial, integer, varchar, text } from 'drizzle-orm/pg-core';

export const user_instansi = pgTable('user_instansi', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'),
  contact_person: varchar('contact_person', { length: 255 }),
  telp: varchar('telp', { length: 255 }),
  created_by: integer('created_by'),
  OPD: text('OPD'),
});
