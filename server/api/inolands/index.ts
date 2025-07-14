
import { db } from '../../database';
import { inolands } from '../../database/schema/inolands';
import { sdgs } from '../../database/schema/sdgs';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { getMethod, readBody, getQuery } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const query = getQuery(event);
      try {
      let data: any[] = [];
      
      if (query.provId && typeof query.provId === 'string') {
        const provId = parseInt(query.provId.trim());
        console.log('🔍 Loading innovations for province ID:', provId);
        
        if (!isNaN(provId)) {
          // Get all innovations from a specific province
          data = await db
            .select({
              id: inolands.id,
              judul_inovasi: inolands.judul_inovasi,
              tahun: inolands.tahun,
              inovator: inolands.inovator,
              deskripsi: inolands.deskripsi,
              id_kabkot: inolands.id_kabkot,
              id_sdgs: inolands.sdgs,
              wilayah: {
                id_provinsi: master_provinsi.id_provinsi,
                nama_provinsi: master_provinsi.nama_provinsi,
                id_kabkot: master_kabupaten.id_kabkot,
                nama_kabkot: master_kabupaten.nama_kabkot
              },
              sdgs: {
                id: sdgs.id,
                tujuan_ke: sdgs.tujuan_ke,
                nama: sdgs.sdgs, // Use 'sdgs' field which contains the name
                image: sdgs.image
              }
            })
            .from(inolands)
            .leftJoin(master_kabupaten, eq(inolands.id_kabkot, master_kabupaten.id_kabkot))
            .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
            .leftJoin(sdgs, eq(inolands.sdgs, sdgs.id))
            .where(eq(master_provinsi.id_provinsi, provId));
            
          console.log('📊 Found', data.length, 'innovations for province ID:', provId);        } else {
          console.log('❌ Invalid province ID provided:', query.provId);
          data = [];
        }
      } else {
        console.log('🔍 Loading all innovations (no province filter)');// Get all innovations if no province filter
        data = await db
          .select({
            id: inolands.id,
            judul_inovasi: inolands.judul_inovasi,
            tahun: inolands.tahun,
            inovator: inolands.inovator,
            deskripsi: inolands.deskripsi,
            id_kabkot: inolands.id_kabkot,
            id_sdgs: inolands.sdgs,
            wilayah: {
              id_provinsi: master_provinsi.id_provinsi,
              nama_provinsi: master_provinsi.nama_provinsi,
              id_kabkot: master_kabupaten.id_kabkot,
              nama_kabkot: master_kabupaten.nama_kabkot
            },
            sdgs: {
              id: sdgs.id,
              tujuan_ke: sdgs.tujuan_ke,
              nama: sdgs.sdgs, // Use 'sdgs' field which contains the name
              image: sdgs.image
            }
          })
          .from(inolands)
          .leftJoin(master_kabupaten, eq(inolands.id_kabkot, master_kabupaten.id_kabkot))
          .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
          .leftJoin(sdgs, eq(inolands.sdgs, sdgs.id));      }
      
      console.log('📊 Total innovations found:', data.length);
      
      return {
        success: true,
        data,
        meta: {
          total: data.length,
          timestamp: new Date().toISOString(),
          ...(query.provId && { filtered_by_provinsi: query.provId })
        }
      };
      
    } catch (error) {
      console.error('Error fetching innovations:', error);
      return {
        success: false,
        message: 'Failed to fetch innovations',
        data: []
      };
    }
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const result = await db.insert(inolands).values(body).returning();
    return result;
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
