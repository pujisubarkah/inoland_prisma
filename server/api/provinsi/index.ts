// server/api/provinsi/index.ts
import { db } from '../../database';
import { provinsi } from '../../database/schema/provinsi';

export default defineEventHandler(async (event) => {
  try {
    const data = await db.select().from(provinsi);

    // Return data directly without success wrapper
    return data;
    
  } catch (error) {
    // Set HTTP status for errors
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('relation "inovasi_per_provinsi" does not exist')
    ) {
      setResponseStatus(event, 404);
      return {
        message: 'Table not found',
        error: process.env.NODE_ENV === 'development' ? 'Table inovasi_per_provinsi does not exist' : 'Resource not found'
      };
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string' &&
      (error as any).message.includes('connect')
    ) {
      setResponseStatus(event, 503);
      return {
        message: 'Database connection failed',
        error: process.env.NODE_ENV === 'development' ? 'Cannot connect to database' : 'Service temporarily unavailable'
      };
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as any).code === 'ENOTFOUND'
    ) {
      setResponseStatus(event, 503);
      return {
        message: 'Database host not found',
        error: process.env.NODE_ENV === 'development' ? 'Check database host/URL' : 'Service temporarily unavailable'
      };
    }

    setResponseStatus(event, 500);
    return {
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' && typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string'
        ? (error as any).message
        : 'An unexpected error occurred'
    };
  }
});
