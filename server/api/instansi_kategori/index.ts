import { db } from '../../database';
import { instansi_kategori } from '../../database/schema/instansi_kategori';
import { getMethod, readBody, getQuery } from 'h3';
import { eq, asc, ilike } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const query = getQuery(event);
    
    try {
      let data: any[] = [];
      
      if (query.search && typeof query.search === 'string') {
        const searchTerm = query.search.trim();
        
        // Search kategori instansi by name
        data = await db
          .select({
            id: instansi_kategori.id,
            kat_instansi: instansi_kategori.kat_instansi,
          })
          .from(instansi_kategori)
          .where(ilike(instansi_kategori.kat_instansi, `%${searchTerm}%`))
          .orderBy(asc(instansi_kategori.kat_instansi));
      } else {
        // Get all kategori instansi
        data = await db
          .select({
            id: instansi_kategori.id,
            kat_instansi: instansi_kategori.kat_instansi,
          })
          .from(instansi_kategori)
          .orderBy(asc(instansi_kategori.kat_instansi));
      }

      return {
        success: true,
        message: `Found ${data.length} kategori instansi`,
        data: data
      };
      
    } catch (error) {
      console.error('❌ Error fetching kategori instansi:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' }
      });
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      
      // Validate required fields
      if (!body.kat_instansi) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: { error: 'Field kat_instansi is required' }
        });
      }

      const newKategori = await db.insert(instansi_kategori).values({
        kat_instansi: body.kat_instansi,
      }).returning();

      return {
        success: true,
        message: 'Kategori instansi created successfully',
        data: newKategori[0]
      };
      
    } catch (error) {
      console.error('❌ Error creating kategori instansi:', error);
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
