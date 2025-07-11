// server/api/provinsi/index.ts
import { db } from '../../database';
import { kabkot } from '../../database/schema/kabkot';
import { eq, inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event);

  try {
    let data;
    
    // Check if we have specific IDs to filter
    if (query.ids && typeof query.ids === 'string') {
      const idsArray = query.ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
      
      if (idsArray.length > 0) {
        // Query with ID filter
        data = await db.select().from(kabkot).where(
          idsArray.length === 1 
            ? eq(kabkot.Id_kabkot, idsArray[0])
            : inArray(kabkot.Id_kabkot, idsArray)
        );
      } else {
        data = await db.select().from(kabkot);
      }
    } else {
      data = await db.select().from(kabkot);
    }
    
    return {
      success: true,
      data,
      meta: {
        total: data.length,
        timestamp: new Date().toISOString(),
        ...(query.ids && { filtered_by_ids: query.ids })
      }
    };
    
  } catch (error) {
    // Specific error handling
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('relation "kabkot" does not exist')
    ) {
      return {
        success: false,
        message: 'Table not found',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Table kabkot does not exist' : undefined
      };
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('relation "inovasi_per_provinsi" does not exist')
    ) {
      return {
        success: false,
        message: 'Table not found',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Table inovasi_per_provinsi does not exist' : undefined
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
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as any).code === 'ENOTFOUND'
    ) {
      return {
        success: false,
        message: 'Database host not found',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Check database host/URL' : undefined
      };
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('authentication')
    ) {
      return {
        success: false,
        message: 'Database authentication failed',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Check database credentials' : undefined
      };
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('timeout')
    ) {
      return {
        success: false,
        message: 'Database timeout',
        errorDetails: process.env.NODE_ENV === 'development' ? 'Query execution timeout' : undefined
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
