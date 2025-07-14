// server/api/indeks-inovasi.ts

import { db } from '../../database';
import { indeks_inovasi } from '../../database/schema/indeks_inovasi';
import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event);

  try {
    let whereConditions = [];
    
    // Build where conditions based on query parameters
    if (query.provId && typeof query.provId === 'string') {
      const provId = parseInt(query.provId.trim());
      if (!isNaN(provId)) {
        whereConditions.push(eq(indeks_inovasi.id_provinsi, provId));
      }
    }
    
    if (query.kabkotId && typeof query.kabkotId === 'string') {
      const kabkotId = parseInt(query.kabkotId.trim());
      if (!isNaN(kabkotId)) {
        whereConditions.push(eq(indeks_inovasi.id_kabkot, kabkotId));
      }
    }
    
    if (query.level && typeof query.level === 'string') {
      whereConditions.push(eq(indeks_inovasi.level, query.level));
    }
      // Execute query with combined conditions
    let data;
    if (whereConditions.length > 0) {
      data = await db.select().from(indeks_inovasi).where(
        whereConditions.length === 1 ? whereConditions[0] : and(...whereConditions)
      );
    } else {
      // Get all data if no specific filter
      data = await db.select().from(indeks_inovasi);
    }
    
    return {
      success: true,
      data,
      meta: {
        total: data.length,
        timestamp: new Date().toISOString(),
        ...(query.provId && { filtered_by_provinsi: query.provId }),
        ...(query.kabkotId && { filtered_by_kabkot: query.kabkotId }),
        ...(query.level && { filtered_by_level: query.level })
      }
    };
    
  } catch (error) {
    // Specific error handling
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('relation "indeks_inovasi" does not exist')
    ) {
      return {
        success: false,
        message: 'Table not found',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Table indeks_inovasi does not exist' : undefined
      };
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('connect')
    ) {
      return {
        success: false,
        message: 'Database connection failed',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Cannot connect to database' : undefined
      };
    }

    return {
      success: false,
      message: 'Internal Server Error',
      errorDetails: process.env.NODE_ENV === 'development' && typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string'
        ? (error as any).message
        : undefined,
      timestamp: new Date().toISOString()
    };
  }
});
