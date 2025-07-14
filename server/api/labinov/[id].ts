import { db } from '../../database';
import { labinov } from '../../database/schema/labinov';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { getMethod, readBody } from 'h3';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID parameter is required'
    });
  }

  const numericId = parseInt(id);
  if (isNaN(numericId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid ID format'
    });
  }

  if (method === 'GET') {
    try {
      // Get specific labinov record with kabupaten and provinsi names
      const data = await db
        .select({
          id: labinov.id,
          created_at: labinov.created_at,
          id_kabkot: labinov.id_kabkot,
          DRUMP_UP: labinov.DRUMP_UP,
          DIAGNOSE: labinov.DIAGNOSE,
          DESAIN: labinov.DESAIN,
          DELIVER_LAUNCHING: labinov.DELIVER_LAUNCHING,
          DELIVER_MONITORING: labinov.DELIVER_MONITORING,
          DISPLAY: labinov.DISPLAY,
          HASIL_AKHIR: labinov.HASIL_AKHIR,
          session: labinov.session,
          kabupaten: {
            id_kabkot: master_kabupaten.id_kabkot,
            nama_kabkot: master_kabupaten.nama_kabkot,
            id_provinsi: master_kabupaten.id_provinsi
          },
          provinsi: {
            id_provinsi: master_provinsi.id_provinsi,
            nama_provinsi: master_provinsi.nama_provinsi
          }
        })
        .from(labinov)
        .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
        .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
        .where(eq(labinov.id, numericId));

      if (data.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Labinov record not found'
        });
      }

      return {
        success: true,
        data: data[0]
      };

    } catch (error) {
      console.error('Error fetching labinov record:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch labinov record'
      });
    }

  } else if (method === 'PUT') {
    try {
      const body = await readBody(event);

      // Update labinov record
      const updatedLabinov = await db
        .update(labinov)
        .set({
          id_kabkot: body.id_kabkot,
          DRUMP_UP: body.DRUMP_UP,
          DIAGNOSE: body.DIAGNOSE,
          DESAIN: body.DESAIN,
          DELIVER_LAUNCHING: body.DELIVER_LAUNCHING,
          DELIVER_MONITORING: body.DELIVER_MONITORING,
          DISPLAY: body.DISPLAY,
          HASIL_AKHIR: body.HASIL_AKHIR,
          session: body.session,
        })
        .where(eq(labinov.id, numericId))
        .returning();

      if (updatedLabinov.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Labinov record not found'
        });
      }

      return {
        success: true,
        data: updatedLabinov[0],
        message: 'Labinov record updated successfully'
      };

    } catch (error) {
      console.error('Error updating labinov record:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update labinov record'
      });
    }

  } else if (method === 'DELETE') {
    try {
      // Delete labinov record
      const deletedLabinov = await db
        .delete(labinov)
        .where(eq(labinov.id, numericId))
        .returning();

      if (deletedLabinov.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Labinov record not found'
        });
      }

      return {
        success: true,
        data: deletedLabinov[0],
        message: 'Labinov record deleted successfully'
      };

    } catch (error) {
      console.error('Error deleting labinov record:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete labinov record'
      });
    }

  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    });
  }
});
