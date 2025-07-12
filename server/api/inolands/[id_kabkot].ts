import { db } from '../../database';
import { inolands } from '../../database/schema/inolands';
import { eq } from 'drizzle-orm';
import { setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const { id_kabkot } = event.context.params!;
  const kabkotId = parseInt(id_kabkot);

  if (isNaN(kabkotId)) {
    setResponseStatus(event, 400);
    return {
      success: false,
      message: 'ID kabkot tidak valid',
    };
  }

  try {
    const data = await db
      .select()
      .from(inolands)
      .where(eq(inolands.id_kabkot, kabkotId));

    return {
     
      data,
      meta: {
        total: data.length,
        filtered_by_kabkot: kabkotId,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('❌ Error fetching inolands:', error);

    return {
      success: false,
      message: 'Internal Server Error',
      errorDetails:
        process.env.NODE_ENV === 'development' && error instanceof Error
          ? error.message
          : undefined,
      timestamp: new Date().toISOString(),
    };
  }
});
