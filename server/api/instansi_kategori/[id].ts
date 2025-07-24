import { db } from '../../database';
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

  const kategoriId = parseInt(id);

  if (method === 'GET') {
    try {
      const data = await db
        .select({
          id: instansi_kategori.id,
          kat_instansi: instansi_kategori.kat_instansi,
        })
        .from(instansi_kategori)
        .where(eq(instansi_kategori.id, kategoriId))
        .limit(1);

      if (data.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Kategori instansi not found' }
        });
      }

      return {
        success: true,
        message: 'Kategori instansi found',
        data: data[0]
      };
      
    } catch (error) {
      console.error('❌ Error fetching kategori instansi:', error);
      
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
      
      // Check if kategori exists
      const existingKategori = await db
        .select({ id: instansi_kategori.id })
        .from(instansi_kategori)
        .where(eq(instansi_kategori.id, kategoriId))
        .limit(1);

      if (existingKategori.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Kategori instansi not found' }
        });
      }

      const updatedKategori = await db
        .update(instansi_kategori)
        .set({
          kat_instansi: body.kat_instansi,
        })
        .where(eq(instansi_kategori.id, kategoriId))
        .returning();

      return {
        success: true,
        message: 'Kategori instansi updated successfully',
        data: updatedKategori[0]
      };
      
    } catch (error) {
      console.error('❌ Error updating kategori instansi:', error);
      
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
      // Check if kategori exists
      const existingKategori = await db
        .select({ id: instansi_kategori.id })
        .from(instansi_kategori)
        .where(eq(instansi_kategori.id, kategoriId))
        .limit(1);

      if (existingKategori.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          data: { error: 'Kategori instansi not found' }
        });
      }

      await db
        .delete(instansi_kategori)
        .where(eq(instansi_kategori.id, kategoriId));

      return {
        success: true,
        message: 'Kategori instansi deleted successfully'
      };
      
    } catch (error) {
      console.error('❌ Error deleting kategori instansi:', error);
      
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
