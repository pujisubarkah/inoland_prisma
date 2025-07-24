import { db } from '../../database';
import { instansi } from '../../database/schema/instansi';
import { instansi_kategori } from '../../database/schema/instansi_kategori';
import { getMethod, readBody, getQuery } from 'h3';
import { eq, asc, ilike, or } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    const query = getQuery(event);
    
    try {
      let data: any[] = [];
      
      if (query.agency_category_id && typeof query.agency_category_id === 'string') {
        const categoryId = parseInt(query.agency_category_id.trim());
        
        if (!isNaN(categoryId)) {
          // Get instansi by category
          data = await db
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
        }
      } else if (query.search && typeof query.search === 'string') {
        const searchTerm = query.search.trim();
        
        // Search instansi by agency_id, agency_name, or category
        data = await db
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
          .where(
            or(
              ilike(instansi.agency_id, `%${searchTerm}%`),
              ilike(instansi.agency_name, `%${searchTerm}%`),
              ilike(instansi_kategori.kat_instansi, `%${searchTerm}%`)
            )
          )
          .orderBy(asc(instansi.agency_name));
      } else {
        // Get all instansi
        data = await db
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
          .orderBy(asc(instansi.agency_name));
      }

      return {
        success: true,
        message: `Found ${data.length} instansi`,
        data: data
      };
      
    } catch (error) {
      console.error('❌ Error fetching instansi:', error);
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
      if (!body.agency_id || !body.agency_name) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: { error: 'Fields agency_id and agency_name are required' }
        });
      }

      // Check if agency_id already exists
      const existingAgency = await db
        .select({ id: instansi.id })
        .from(instansi)
        .where(eq(instansi.agency_id, body.agency_id))
        .limit(1);

      if (existingAgency.length > 0) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Conflict',
          data: { error: 'Agency ID already exists' }
        });
      }

      const newInstansi = await db.insert(instansi).values({
        agency_id: body.agency_id,
        agency_name: body.agency_name,
        agency_category_id: body.agency_category_id || null,
      }).returning();

      return {
        success: true,
        message: 'Instansi created successfully',
        data: newInstansi[0]
      };
        } catch (error) {
      console.error('❌ Error creating instansi:', error);
      
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
