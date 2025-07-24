import { db } from '../../database';
import { inolands_inovator } from '../../database/schema/inolands_inovator';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { instansi } from '../../database/schema/instansi';
import { instansi_kategori } from '../../database/schema/instansi_kategori';
import { getMethod, readBody, getRouterParam } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const id = getRouterParam(event, 'id');

  if (!id || isNaN(parseInt(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: { error: 'Valid ID is required' }
    });
  }

  const inovatorId = parseInt(id);

  if (method === 'GET') {
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
        .where(eq(inolands_inovator.id, inovatorId))
        .limit(1);

      if (data.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Inovator not found' }
        });
      }

      return {
        success: true,
        message: 'Inovator found',
        data: data[0]
      };
        } catch (error) {
      console.error('❌ Error fetching inovator:', error);
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event);
      
      // Check if inovator exists
      const existingInovator = await db
        .select({ id: inolands_inovator.id })
        .from(inolands_inovator)
        .where(eq(inolands_inovator.id, inovatorId))
        .limit(1);

      if (existingInovator.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Inovator not found' }
        });
      }

      const updatedInovator = await db
        .update(inolands_inovator)
        .set({
          inovator: body.inovator,
          agency_id_panrb: body.agency_id_panrb,
          id_kabkot: body.id_kabkot,
          id_provinsi: body.id_provinsi,
          longlat: body.longlat,
          alamat: body.alamat,
        })
        .where(eq(inolands_inovator.id, inovatorId))
        .returning();

      return {
        success: true,
        message: 'Inovator updated successfully',
        data: updatedInovator[0]
      };
        } catch (error) {
      console.error('❌ Error updating inovator:', error);
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  if (method === 'DELETE') {
    try {
      // Check if inovator exists
      const existingInovator = await db
        .select({ id: inolands_inovator.id })
        .from(inolands_inovator)
        .where(eq(inolands_inovator.id, inovatorId))
        .limit(1);

      if (existingInovator.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Inovator not found' }
        });
      }

      await db
        .delete(inolands_inovator)
        .where(eq(inolands_inovator.id, inovatorId));

      return {
        success: true,
        message: 'Inovator deleted successfully'
      };
        } catch (error) {
      console.error('❌ Error deleting inovator:', error);
      
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
