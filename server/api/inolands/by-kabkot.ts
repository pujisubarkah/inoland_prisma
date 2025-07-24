import { db } from '../../database';
import { inolands } from '../../database/schema/inolands';
import { sdgs } from '../../database/schema/sdgs';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { instansi } from '../../database/schema/instansi';
import { instansi_kategori } from '../../database/schema/instansi_kategori';
import { inolands_inovator } from '../../database/schema/inolands_inovator';
import { eq, desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id_kabkot = parseInt(query.id_kabkot as string);

  if (isNaN(id_kabkot)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: { error: 'Valid kabkot ID is required' }
    });
  }

  try {
    const result = await db
      .select({
        id: inolands.id,
        created_at: inolands.created_at,
        judul_inovasi: inolands.judul_inovasi,
        kld: inolands.kld,
        urusan: inolands.urusan,
        deskripsi: inolands.deskripsi,
        tahun: inolands.tahun,
        inovator: inolands.inovator,
        id_provinsi: inolands.id_provinsi,
        id_kabkot: inolands.id_kabkot,
        id_sdgs: inolands.sdgs,
        agency_id_panrb: inolands.agency_id_panrb,
        inovator_id: inolands.inovator_id,
        wilayah: {
          id_provinsi: master_provinsi.id_provinsi,
          nama_provinsi: master_provinsi.nama_provinsi,
          id_kabkot: master_kabupaten.id_kabkot,
          nama_kabkot: master_kabupaten.nama_kabkot
        },
        sdgs: {
          id: sdgs.id,
          tujuan_ke: sdgs.tujuan_ke,
          nama: sdgs.sdgs,
          image: sdgs.image
        },
        instansi: {
          id: instansi.id,
          agency_id: instansi.agency_id,
          agency_name: instansi.agency_name,
          agency_category_id: instansi.agency_category_id,
          kat_instansi: instansi_kategori.kat_instansi,
        },
        inovator_detail: {
          id: inolands_inovator.id,
          inovator: inolands_inovator.inovator,
          alamat: inolands_inovator.alamat,
          longlat: inolands_inovator.longlat,
        }
      })
      .from(inolands)
      .leftJoin(master_kabupaten, eq(inolands.id_kabkot, master_kabupaten.id_kabkot))
      .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
      .leftJoin(sdgs, eq(inolands.sdgs, sdgs.id))
      .leftJoin(instansi, eq(inolands.agency_id_panrb, instansi.agency_id))
      .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
      .leftJoin(inolands_inovator, eq(inolands.inovator_id, inolands_inovator.id))
      .where(eq(inolands.id_kabkot, id_kabkot))
      .orderBy(desc(inolands.tahun));

    return {
      success: true,
      message: `Found ${result.length} innovations for kabkot ID ${id_kabkot}`,
      data: result,
    };
  } catch (error: any) {
    console.error('❌ Error fetching innovations by kabkot:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: { error: error.message ?? "Internal Server Error" }
    });
  }
});
