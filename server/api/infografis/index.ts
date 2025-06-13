// server/api/dokumens.ts
import { db } from '../../database';
import { dokumens } from '../../database/schema/infografis';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  try {
    if (method === 'GET') {
      const data = await db.select().from(dokumens);
      return { success: true, data };
    }

    if (method === 'POST') {
      const body = await readBody(event);
      
      // Validasi input
      if (!body.nama || !body.link || !body.jenis_dokumen) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing required fields: nama, link, jenis_dokumen'
        });
      }

      const { created_at, nama, link, jenis_dokumen } = body;

      const inserted = await db
        .insert(dokumens)
        .values({ 
          created_at: created_at ? new Date(created_at) : new Date(), // Default ke sekarang jika tidak ada
          nama, 
          link, 
          jenis_dokumen 
        })
        .returning();

      return { success: true, data: inserted };
    }

    // Method tidak didukung
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not supported'
    });

  } catch (error: any) {
    console.error('[API Error] /infografis:', error);

    // Jika sudah error yang dibuat dengan createError, lempar ulang
    if (error.statusCode) {
      throw error;
    }

    // Error database atau lainnya
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: { error: error.message }
    });
  }
});
