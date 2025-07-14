import { db } from '../../database';
import { sdgs } from '../../database/schema/sdgs';
import { getMethod } from 'h3';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    try {
      const data = await db
        .select({
          id: sdgs.id,
          tujuan_ke: sdgs.tujuan_ke,
          sdgs: sdgs.sdgs,
          image: sdgs.image
        })
        .from(sdgs)
        .orderBy(sdgs.tujuan_ke);
      
      return {
        success: true,
        data,
        meta: {
          total: data.length,
          timestamp: new Date().toISOString()
        }
      };
      
    } catch (error) {
      console.error('Error fetching SDGS:', error);
      return {
        success: false,
        message: 'Failed to fetch SDGS',
        data: []
      };
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
