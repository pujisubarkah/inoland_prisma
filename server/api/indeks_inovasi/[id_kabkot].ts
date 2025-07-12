// server/api/indeks-inovasi/[id_kabkot].ts

import { db } from '../../database';
import { indeks_inovasi } from '../../database/schema/indeks_inovasi';
import { eq, asc } from 'drizzle-orm';
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
      .from(indeks_inovasi)
      .where(eq(indeks_inovasi.id_kabkot, kabkotId))
      .orderBy(asc(indeks_inovasi.indeks_tahun)); // Urutkan berdasarkan tahun ASC

    return {
      success: true,
      data,
      meta: {
        total: data.length,
        filtered_by_kabkot: kabkotId,
        sorted_by: 'tahun ASC',
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('❌ Error fetching indeks inovasi:', error);

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
