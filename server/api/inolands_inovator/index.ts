import { db } from '../../database';
import { inolands_inovator } from '../../database/schema/inolands_inovator';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { instansi } from '../../database/schema/instansi';
import { instansi_kategori } from '../../database/schema/instansi_kategori';
import { getMethod, readBody, getQuery } from 'h3';
import { eq, desc, asc, and, or, ilike } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const query = getQuery(event);
    
    try {
      let data: any[] = [];
      
      // Get all inovators with optional filtering
      if (query.id_provinsi && typeof query.id_provinsi === 'string') {
        const provId = parseInt(query.id_provinsi.trim());
        
        if (!isNaN(provId)) {          // Get inovators from specific province
          data = await db
            .select({
              id: inolands_inovator.id,
              inovator: inolands_inovator.inovator,
              agency_id_panrb: inolands_inovator.agency_id_panrb,
              id_kabkot: inolands_inovator.id_kabkot,
              id_provinsi: inolands_inovator.id_provinsi,
              longlat: inolands_inovator.longlat,
              alamat: inolands_inovator.alamat,              wilayah: {
                id_provinsi: master_provinsi.id_provinsi,
                nama_provinsi: master_provinsi.nama_provinsi,
                id_kabkot: master_kabupaten.id_kabkot,
                nama_kabkot: master_kabupaten.nama_kabkot
              },
              instansi: {
                id: instansi.id,
                agency_id: instansi.agency_id,
                agency_name: instansi.agency_name,              agency_category_id: instansi.agency_category_id,
                kat_instansi: instansi_kategori.kat_instansi,
              }
            })
            .from(inolands_inovator)
            .leftJoin(master_kabupaten, eq(inolands_inovator.id_kabkot, master_kabupaten.id_kabkot))
            .leftJoin(master_provinsi, eq(inolands_inovator.id_provinsi, master_provinsi.id_provinsi))
            .leftJoin(instansi, eq(inolands_inovator.agency_id_panrb, instansi.agency_id))
            .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
            .where(eq(inolands_inovator.id_provinsi, provId))
            .orderBy(asc(inolands_inovator.inovator));
        }
      } else if (query.id_kabkot && typeof query.id_kabkot === 'string') {
        const kabkotId = parseInt(query.id_kabkot.trim());
        
        if (!isNaN(kabkotId)) {          // Get inovators from specific kabupaten/kota
          data = await db
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
                agency_name: instansi.agency_name,                agency_category_id: instansi.agency_category_id,
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
        }
      } else if (query.search && typeof query.search === 'string') {
        const searchTerm = query.search.trim();
          // Search inovators by name
        data = await db
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
              agency_name: instansi.agency_name,              agency_category_id: instansi.agency_category_id,
              kat_instansi: instansi_kategori.kat_instansi,
            }
          })
          .from(inolands_inovator)
          .leftJoin(master_kabupaten, eq(inolands_inovator.id_kabkot, master_kabupaten.id_kabkot))
          .leftJoin(master_provinsi, eq(inolands_inovator.id_provinsi, master_provinsi.id_provinsi))
          .leftJoin(instansi, eq(inolands_inovator.agency_id_panrb, instansi.agency_id))
          .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
          .where(
            or(
              ilike(inolands_inovator.inovator, `%${searchTerm}%`),
              ilike(inolands_inovator.alamat, `%${searchTerm}%`),
              ilike(master_kabupaten.nama_kabkot, `%${searchTerm}%`),
              ilike(master_provinsi.nama_provinsi, `%${searchTerm}%`),
              ilike(instansi.agency_name, `%${searchTerm}%`),
              ilike(instansi_kategori.kat_instansi, `%${searchTerm}%`)
            )
          )
          .orderBy(asc(inolands_inovator.inovator));
      } else {        // Get all inovators
        data = await db
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
              agency_name: instansi.agency_name,              agency_category_id: instansi.agency_category_id,
              kat_instansi: instansi_kategori.kat_instansi,
            }
          })
          .from(inolands_inovator)
          .leftJoin(master_kabupaten, eq(inolands_inovator.id_kabkot, master_kabupaten.id_kabkot))
          .leftJoin(master_provinsi, eq(inolands_inovator.id_provinsi, master_provinsi.id_provinsi))
          .leftJoin(instansi, eq(inolands_inovator.agency_id_panrb, instansi.agency_id))
          .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
          .orderBy(asc(inolands_inovator.inovator));
      }

      return {
        success: true,
        message: `Found ${data.length} inovator(s)`,
        data: data
      };
        } catch (error) {
      console.error('❌ Error fetching inovators:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      
      // Validate required fields
      if (!body.inovator) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: { error: 'Field inovator is required' }
        });
      }

      const newInovator = await db.insert(inolands_inovator).values({
        inovator: body.inovator,
        agency_id_panrb: body.agency_id_panrb || null,
        id_kabkot: body.id_kabkot || null,
        id_provinsi: body.id_provinsi || null,
        longlat: body.longlat || null,
        alamat: body.alamat || null,
      }).returning();

      return {
        success: true,
        message: 'Inovator created successfully',
        data: newInovator[0]
      };
        } catch (error) {
      console.error('❌ Error creating inovator:', error);
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
