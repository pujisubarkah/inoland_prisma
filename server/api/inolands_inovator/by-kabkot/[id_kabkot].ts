import { db } from '../../../database';
import { inolands_inovator } from '../../../database/schema/inolands_inovator';
import { master_provinsi } from '../../../database/schema/master_provinsi';
import { master_kabupaten } from '../../../database/schema/master_kabupaten';
import { instansi } from '../../../database/schema/instansi';
import { instansi_kategori } from '../../../database/schema/instansi_kategori';
import { getMethod, getRouterParam } from 'h3';
import { eq, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const id_kabkot = getRouterParam(event, 'id_kabkot');

  if (method === 'GET') {
    if (!id_kabkot || isNaN(parseInt(id_kabkot))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: { error: 'Valid kabkot ID is required' }
      });
    }

    const kabkotId = parseInt(id_kabkot);

    try {      const data = await db
        .select({
          id: inolands_inovator.id,
          inovator: inolands_inovator.inovator,
          agency_id_panrb: inolands_inovator.agency_id_panrb,
          id_kabkot: inolands_inovator.id_kabkot,
          id_provinsi: inolands_inovator.id_provinsi,
          longlat: inolands_inovator.longlat,
          alamat: inolands_inovator.alamat,
          wilayah: {
            id_provinsi: master_provinsi.id_provinsi,
            nama_provinsi: master_provinsi.nama_provinsi,
            id_kabkot: master_kabupaten.id_kabkot,
            nama_kabkot: master_kabupaten.nama_kabkot
          },
          instansi: {
            id: instansi.id,
            agency_id: instansi.agency_id,
            agency_name: instansi.agency_name,
            agency_category_id: instansi.agency_category_id,
            kat_instansi: instansi_kategori.kat_instansi,
          }
        })
        .from(inolands_inovator)
        .leftJoin(master_kabupaten, eq(inolands_inovator.id_kabkot, master_kabupaten.id_kabkot))
        .leftJoin(master_provinsi, eq(inolands_inovator.id_provinsi, master_provinsi.id_provinsi))
        .leftJoin(instansi, eq(inolands_inovator.agency_id_panrb, instansi.agency_id))
        .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
        .where(eq(inolands_inovator.id_kabkot, kabkotId))
        .orderBy(asc(inolands_inovator.inovator));

      return {
        success: true,
        message: `Found ${data.length} inovator(s) in kabupaten/kota ID ${kabkotId}`,
        data: data
      };
        } catch (error) {
      console.error('❌ Error fetching inovators by kabkot:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  // Method not allowed
  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  });
});
