import { db } from '../../database';
import { labinov } from '../../database/schema/labinov';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { getMethod, readBody, getQuery } from 'h3';
import { eq, desc, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method === 'GET') {
    const query = getQuery(event);
    
    try {
      let data: any[] = [];
      
      // Handle different query scenarios
      if (query.provId && typeof query.provId === 'string') {
        const provId = parseInt(query.provId.trim());
        if (!isNaN(provId)) {
          // Get all labinov records from a specific province
          data = await db
            .select({
              id: labinov.id,
              created_at: labinov.created_at,
              id_kabkot: labinov.id_kabkot,
              DRUMP_UP: labinov.DRUMP_UP,
              DIAGNOSE: labinov.DIAGNOSE,
              DESAIN: labinov.DESAIN,
              DELIVER_LAUNCHING: labinov.DELIVER_LAUNCHING,
              DELIVER_MONITORING: labinov.DELIVER_MONITORING,
              DISPLAY: labinov.DISPLAY,
              HASIL_AKHIR: labinov.HASIL_AKHIR,
              session: labinov.session,
              kabupaten: {
                id_kabkot: master_kabupaten.id_kabkot,
                nama_kabkot: master_kabupaten.nama_kabkot,
                id_provinsi: master_kabupaten.id_provinsi
              },
              provinsi: {
                id_provinsi: master_provinsi.id_provinsi,
                nama_provinsi: master_provinsi.nama_provinsi
              }
            })
            .from(labinov)
            .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
            .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
            .where(eq(master_provinsi.id_provinsi, provId))
            .orderBy(desc(labinov.created_at));
        }
      } else if (query.kabkotId && typeof query.kabkotId === 'string') {
        const kabkotId = parseInt(query.kabkotId.trim());
        if (!isNaN(kabkotId)) {
          // Get all labinov records from a specific kabupaten
          data = await db
            .select({
              id: labinov.id,
              created_at: labinov.created_at,
              id_kabkot: labinov.id_kabkot,
              DRUMP_UP: labinov.DRUMP_UP,
              DIAGNOSE: labinov.DIAGNOSE,
              DESAIN: labinov.DESAIN,
              DELIVER_LAUNCHING: labinov.DELIVER_LAUNCHING,
              DELIVER_MONITORING: labinov.DELIVER_MONITORING,
              DISPLAY: labinov.DISPLAY,
              HASIL_AKHIR: labinov.HASIL_AKHIR,
              session: labinov.session,
              kabupaten: {
                id_kabkot: master_kabupaten.id_kabkot,
                nama_kabkot: master_kabupaten.nama_kabkot,
                id_provinsi: master_kabupaten.id_provinsi
              },
              provinsi: {
                id_provinsi: master_provinsi.id_provinsi,
                nama_provinsi: master_provinsi.nama_provinsi
              }
            })
            .from(labinov)
            .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
            .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
            .where(eq(labinov.id_kabkot, kabkotId))
            .orderBy(desc(labinov.created_at));
        }
      } else if (query.session && typeof query.session === 'string') {
        const session = parseInt(query.session.trim());
        if (!isNaN(session)) {
          // Get all labinov records from a specific session
          data = await db
            .select({
              id: labinov.id,
              created_at: labinov.created_at,
              id_kabkot: labinov.id_kabkot,
              DRUMP_UP: labinov.DRUMP_UP,
              DIAGNOSE: labinov.DIAGNOSE,
              DESAIN: labinov.DESAIN,
              DELIVER_LAUNCHING: labinov.DELIVER_LAUNCHING,
              DELIVER_MONITORING: labinov.DELIVER_MONITORING,
              DISPLAY: labinov.DISPLAY,
              HASIL_AKHIR: labinov.HASIL_AKHIR,
              session: labinov.session,
              kabupaten: {
                id_kabkot: master_kabupaten.id_kabkot,
                nama_kabkot: master_kabupaten.nama_kabkot,
                id_provinsi: master_kabupaten.id_provinsi
              },
              provinsi: {
                id_provinsi: master_provinsi.id_provinsi,
                nama_provinsi: master_provinsi.nama_provinsi
              }
            })
            .from(labinov)
            .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
            .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
            .where(eq(labinov.session, session))
            .orderBy(desc(labinov.created_at));
        }
      } else {
        // Get all labinov records
        data = await db
          .select({
            id: labinov.id,
            created_at: labinov.created_at,
            id_kabkot: labinov.id_kabkot,
            DRUMP_UP: labinov.DRUMP_UP,
            DIAGNOSE: labinov.DIAGNOSE,
            DESAIN: labinov.DESAIN,
            DELIVER_LAUNCHING: labinov.DELIVER_LAUNCHING,
            DELIVER_MONITORING: labinov.DELIVER_MONITORING,
            DISPLAY: labinov.DISPLAY,
            HASIL_AKHIR: labinov.HASIL_AKHIR,
            session: labinov.session,
            kabupaten: {
              id_kabkot: master_kabupaten.id_kabkot,
              nama_kabkot: master_kabupaten.nama_kabkot,
              id_provinsi: master_kabupaten.id_provinsi
            },
            provinsi: {
              id_provinsi: master_provinsi.id_provinsi,
              nama_provinsi: master_provinsi.nama_provinsi
            }
          })
          .from(labinov)
          .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
          .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
          .orderBy(desc(labinov.created_at));
      }

      return {
        success: true,
        data: data,
        count: data.length
      };

    } catch (error) {
      console.error('Error fetching labinov data:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch labinov data'
      });
    }

  } else if (method === 'POST') {
    try {
      const body = await readBody(event);
      
      // Validate required fields
      if (!body.id_kabkot) {
        throw createError({
          statusCode: 400,
          statusMessage: 'id_kabkot is required'
        });
      }

      // Insert new labinov record
      const newLabinov = await db.insert(labinov).values({
        id_kabkot: body.id_kabkot,
        DRUMP_UP: body.DRUMP_UP || null,
        DIAGNOSE: body.DIAGNOSE || null,
        DESAIN: body.DESAIN || null,
        DELIVER_LAUNCHING: body.DELIVER_LAUNCHING || null,
        DELIVER_MONITORING: body.DELIVER_MONITORING || null,
        DISPLAY: body.DISPLAY || null,
        HASIL_AKHIR: body.HASIL_AKHIR || null,
        session: body.session || null,
      }).returning();

      return {
        success: true,
        data: newLabinov[0],
        message: 'Labinov record created successfully'
      };

    } catch (error) {
      console.error('Error creating labinov record:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create labinov record'
      });
    }

  } else if (method === 'PUT') {
    try {
      const body = await readBody(event);
      
      // Validate required fields
      if (!body.id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'id is required for update'
        });
      }

      // Update labinov record
      const updatedLabinov = await db
        .update(labinov)
        .set({
          id_kabkot: body.id_kabkot,
          DRUMP_UP: body.DRUMP_UP,
          DIAGNOSE: body.DIAGNOSE,
          DESAIN: body.DESAIN,
          DELIVER_LAUNCHING: body.DELIVER_LAUNCHING,
          DELIVER_MONITORING: body.DELIVER_MONITORING,
          DISPLAY: body.DISPLAY,
          HASIL_AKHIR: body.HASIL_AKHIR,
          session: body.session,
        })
        .where(eq(labinov.id, body.id))
        .returning();

      if (updatedLabinov.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Labinov record not found'
        });
      }

      return {
        success: true,
        data: updatedLabinov[0],
        message: 'Labinov record updated successfully'
      };

    } catch (error) {
      console.error('Error updating labinov record:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update labinov record'
      });
    }

  } else if (method === 'DELETE') {
    try {
      const query = getQuery(event);
      
      if (!query.id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'id is required for delete'
        });
      }

      const id = parseInt(query.id as string);
      if (isNaN(id)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid id format'
        });
      }

      // Delete labinov record
      const deletedLabinov = await db
        .delete(labinov)
        .where(eq(labinov.id, id))
        .returning();

      if (deletedLabinov.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Labinov record not found'
        });
      }

      return {
        success: true,
        data: deletedLabinov[0],
        message: 'Labinov record deleted successfully'
      };

    } catch (error) {
      console.error('Error deleting labinov record:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete labinov record'
      });
    }

  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    });
  }
});
