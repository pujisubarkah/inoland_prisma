// server/api/kabupaten/[id_provinsi].ts
import { db } from '../../database';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { kabupatens } from '../../database/schema/kabupatens';
import { inolands } from '../../database/schema/inolands';
import { eq, sql } from 'drizzle-orm';
import { setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const { id_provinsi } = event.context.params!;
    const provinsiId = parseInt(id_provinsi);

    if (isNaN(provinsiId)) {
      setResponseStatus(event, 400);
      return { message: 'Parameter id_provinsi tidak valid' };
    }

    const data = await db
      .select({
        id: master_kabupaten.id,
        id_kabkot: master_kabupaten.id_kabkot,
        nama_kabkot: master_kabupaten.nama_kabkot,
        id_provinsi: master_kabupaten.id_provinsi,
     
        jumlah_inovasi: sql<number>`COUNT(${inolands.id})`.as("jumlah_inovasi"),
        svg_path: kabupatens.svgPath, // 🎯 SVG dari kabupatens
      })
      .from(master_kabupaten)
      .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id))
      .leftJoin(inolands, eq(master_kabupaten.id_kabkot, inolands.id_kabkot))
      .leftJoin(kabupatens, eq(master_kabupaten.id_kabkot, kabupatens.idKabkot)) // 🎯 join ke kabupatens
      .where(eq(master_kabupaten.id_provinsi, provinsiId))
      .groupBy(
        master_kabupaten.id,
        master_kabupaten.id_kabkot,
        master_kabupaten.nama_kabkot,
        master_kabupaten.id_provinsi,
        master_provinsi.nama_provinsi,
        kabupatens.svgPath
      )
      .orderBy(master_kabupaten.id);

    return data;
  } catch (error) {
    console.error('❌ Gagal ambil kabupaten:', error);
    setResponseStatus(event, 500);
    return {
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : 'Unexpected error',
    };
  }
});
