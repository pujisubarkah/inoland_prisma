// server/api/provinsi/index.ts
import { db } from '../../database';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { provinsi } from '../../database/schema/provinsi';
import { provinsis } from '../../database/schema/provinsis';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const data = await db
      .select({
        id: master_provinsi.id_provinsi,
        nama_provinsi: master_provinsi.nama_provinsi,
        jumlah_inovasi: provinsi.jumlah_inovasi,
        svg_path: provinsis.svg_path,
      })
      .from(master_provinsi)
      .leftJoin(provinsi, eq(master_provinsi.id_provinsi, provinsi.id_provinsi))
      .leftJoin(provinsis, eq(master_provinsi.id_provinsi, provinsis.id_provinsi))
      .orderBy(master_provinsi.id_provinsi);

    return data;
  } catch (error) {
    // handler error sama seperti sebelumnya
    setResponseStatus(event, 500);
    return {
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
});
