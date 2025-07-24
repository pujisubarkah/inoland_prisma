import { db } from '../../database';
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

  const instansiId = parseInt(id);

  if (method === 'GET') {
    try {
      const data = await db
        .select({
          id: instansi.id,
          agency_id: instansi.agency_id,
          agency_name: instansi.agency_name,
          agency_category_id: instansi.agency_category_id,
          kategori: {
            id: instansi_kategori.id,
            kat_instansi: instansi_kategori.kat_instansi,
          }
        })
        .from(instansi)
        .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
        .where(eq(instansi.agency_id, instansiId.toString()))
        .limit(1);

      if (data.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Instansi not found' }
        });
      }

      return {
        success: true,
        message: 'Instansi found',
        data: data[0]
      };
      
    } catch (error) {
      console.error('❌ Error fetching instansi:', error);
      
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }
      
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
      
      // Check if instansi exists
      const existingInstansi = await db
        .select({ id: instansi.id, agency_id: instansi.agency_id })
        .from(instansi)
        .where(eq(instansi.id, instansiId))
        .limit(1);

      if (existingInstansi.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Instansi not found' }
        });
      }

      // Check if new agency_id already exists (if different from current)
      if (body.agency_id && body.agency_id !== existingInstansi[0].agency_id) {
        const duplicateAgency = await db
          .select({ id: instansi.id })
          .from(instansi)
          .where(eq(instansi.agency_id, body.agency_id))
          .limit(1);

        if (duplicateAgency.length > 0) {
          throw createError({
            statusCode: 409,
            statusMessage: 'Conflict',
            data: { error: 'Agency ID already exists' }
          });
        }
      }

      const updatedInstansi = await db
        .update(instansi)
        .set({
          agency_id: body.agency_id,
          agency_name: body.agency_name,
          agency_category_id: body.agency_category_id,
        })
        .where(eq(instansi.id, instansiId))
        .returning();

      return {
        success: true,
        message: 'Instansi updated successfully',
        data: updatedInstansi[0]
      };
      
    } catch (error) {
      console.error('❌ Error updating instansi:', error);
      
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  if (method === 'DELETE') {
    try {
      // Check if instansi exists
      const existingInstansi = await db
        .select({ id: instansi.id })
        .from(instansi)
        .where(eq(instansi.id, instansiId))
        .limit(1);

      if (existingInstansi.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Instansi not found' }
        });
      }

      await db
        .delete(instansi)
        .where(eq(instansi.id, instansiId));

      return {
        success: true,
        message: 'Instansi deleted successfully'
      };
      
    } catch (error) {
      console.error('❌ Error deleting instansi:', error);
      
      if (error && typeof error === 'object' && 'statusCode' in error) {
        throw error;
      }
      
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
