import { db } from '../../database';
import { inolands } from '../../database/schema/inolands';
import { sdgs } from '../../database/schema/sdgs';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { eq } from 'drizzle-orm';
import { setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const { id_kabkot } = event.context.params!;
  const kabkotId = parseInt(id_kabkot);

  if (isNaN(kabkotId)) {
    setResponseStatus(event, 400);
    return {
      success: false,
      message: 'ID kabkot tidak valid',
    };
  }  try {
    console.log('🔍 Fetching inovasi for kabkot ID:', kabkotId);
    
    const data = await db
      .select({
        // Data utama dari inolands
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
        id_sdgs: inolands.sdgs, // Correct field name from schema        // Referensi SDGs
        sdgs_id: sdgs.id,
        sdgs_tujuan_ke: sdgs.tujuan_ke,
        sdgs_nama: sdgs.sdgs, // Use 'sdgs' field which contains the name
        sdgs_image: sdgs.image,
        // Referensi Provinsi
        nama_provinsi: master_provinsi.nama_provinsi,
        // Referensi Kabupaten/Kota
        nama_kabkot: master_kabupaten.nama_kabkot,
      })
      .from(inolands)
      .leftJoin(sdgs, eq(inolands.sdgs, sdgs.id))
      .leftJoin(master_provinsi, eq(inolands.id_provinsi, master_provinsi.id_provinsi))
      .leftJoin(master_kabupaten, eq(inolands.id_kabkot, master_kabupaten.id_kabkot))
      .where(eq(inolands.id_kabkot, kabkotId));

    console.log('📊 Found', data.length, 'innovations for kabkot ID:', kabkotId);return {
      success: true,
      data: data.map(item => ({
        id: item.id,
        created_at: item.created_at,
        judul_inovasi: item.judul_inovasi,
        kld: item.kld,
        urusan: item.urusan,
        deskripsi: item.deskripsi,
        tahun: item.tahun,
        inovator: item.inovator,
        // Referensi lokasi
        wilayah: {
          id_provinsi: item.id_provinsi,
          nama_provinsi: item.nama_provinsi,
          id_kabkot: item.id_kabkot,
          nama_kabkot: item.nama_kabkot,
        },        // Referensi SDGs
        sdgs: item.sdgs_id ? {
          id: item.sdgs_id,
          tujuan_ke: item.sdgs_tujuan_ke,
          nama: item.sdgs_nama,
          image: item.sdgs_image,
        } : null,
      })),
      meta: {
        total: data.length,
        filtered_by_kabkot: kabkotId,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('❌ Error fetching inolands:', error);

    return {
      success: false,
      message: 'Internal Server Error',
      errorDetails:
        process.env.NODE_ENV === 'development' && error instanceof Error
          ? error.message
          : undefined,
      timestamp: new Date().toISOString(),
    };
  }
});
