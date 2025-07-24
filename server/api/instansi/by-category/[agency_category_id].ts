import { db } from '../../../database';
import { instansi } from '../../../database/schema/instansi';
import { instansi_kategori } from '../../../database/schema/instansi_kategori';
import { getMethod, getRouterParam } from 'h3';
import { eq, asc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const agency_category_id = getRouterParam(event, 'agency_category_id');

  if (method === 'GET') {
    if (!agency_category_id || isNaN(parseInt(agency_category_id))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: { error: 'Valid category ID is required' }
      });
    }

    const categoryId = parseInt(agency_category_id);

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
        .where(eq(instansi.agency_category_id, categoryId))
        .orderBy(asc(instansi.agency_name));

      return {
        success: true,
        message: `Found ${data.length} instansi in category ID ${categoryId}`,
        data: data
      };
      
    } catch (error) {
      console.error('❌ Error fetching instansi by category:', error);
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
