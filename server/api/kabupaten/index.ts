// server/api/kabupaten/index.ts
import { db } from '../../database';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const data = await db
      .select({
        id: master_kabupaten.id,
        id_provinsi: master_kabupaten.id_provinsi,
        nama_kabkot: master_kabupaten.nama_kabkot,
        id_kabkot: master_kabupaten.id_kabkot,
        created_at: master_kabupaten.created_at,
        nama_provinsi: master_provinsi.nama_provinsi, // relasi dari provinsi
      })
      .from(master_kabupaten)
      .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
      .orderBy(master_kabupaten.id);

    return data;
  } catch (error) {
    console.error('Failed to fetch kabupaten:', error);
    setResponseStatus(event, 500);
    return {
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'Unexpected error',
    };
  }
});
