// server/api/inovasi_lan/[id].ts
import { db } from '../../database';
import { inovasi_LAN } from '../../database/schema/inovasi';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const id = getRouterParam(event, 'id');

  // Validate ID parameter
  if (!id || isNaN(Number(id))) {
    console.log(`[API] Invalid ID parameter: ${id}`);
    setResponseStatus(event, 400);
    return {
      success: false,
      error: 'Invalid ID parameter',
      message: 'ID harus berupa angka yang valid'
    };
  }

  if (method === 'GET') {
    try {
      console.log(`[API] Fetching inovasi_lan with ID: ${id}`);

      // Query single inovasi by ID
      const data = await db
        .select()
        .from(inovasi_LAN)
        .where(eq(inovasi_LAN.id, Number(id)))
        .limit(1);

      if (!data || data.length === 0) {
        console.log(`[API] No inovasi_lan found with ID: ${id}`);
        setResponseStatus(event, 404);
        return {
          success: false,
          error: 'Inovasi not found',
          message: `Inovasi dengan ID ${id} tidak ditemukan di database`
        };
      }

      console.log(`[API] Successfully fetched inovasi: "${data[0].nama_inovasi}" (ID: ${data[0].id})`);

      return {
        success: true,
        data: data[0]
      };

    } catch (error) {
      console.error('[API] GET Error:', error);
      setResponseStatus(event, 500);
      return {
        success: false,
        error: 'Internal server error',
        message: 'Terjadi kesalahan saat mengambil data inovasi'
      };
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event);
      console.log(`[API] Updating inovasi ID ${id} with:`, body);

      // Validate if inovasi exists
      const existing = await db
        .select()
        .from(inovasi_LAN)
        .where(eq(inovasi_LAN.id, Number(id)))
        .limit(1);

      if (!existing || existing.length === 0) {
        setResponseStatus(event, 404);
        return {
          success: false,
          error: 'Inovasi not found',
          message: `Inovasi dengan ID ${id} tidak ditemukan`
        };
      }

      // Update inovasi
      const { nama_inovasi, produk_inovasi, nama_instansi, deskripsi, image_link } = body;

      const result = await db
        .update(inovasi_LAN)
        .set({
          nama_inovasi,
          produk_inovasi,
          nama_instansi,
          deskripsi,
          image_link,
       
        })
        .where(eq(inovasi_LAN.id, Number(id)))
        .returning();

      console.log('[API] Updated inovasi:', result[0]);

      return {
        success: true,
        data: result[0],
        message: 'Inovasi berhasil diperbarui'
      };

    } catch (error) {
      console.error('[API] PUT Error:', error);
      setResponseStatus(event, 500);
      return {
        success: false,
        error: 'Internal server error',
        message: 'Terjadi kesalahan saat memperbarui inovasi'
      };
    }
  }

  if (method === 'DELETE') {
    try {
      console.log(`[API] Deleting inovasi ID: ${id}`);

      // Validate if inovasi exists
      const existing = await db
        .select()
        .from(inovasi_LAN)
        .where(eq(inovasi_LAN.id, Number(id)))
        .limit(1);

      if (!existing || existing.length === 0) {
        setResponseStatus(event, 404);
        return {
          success: false,
          error: 'Inovasi not found',
          message: `Inovasi dengan ID ${id} tidak ditemukan`
        };
      }

      // Delete inovasi
      const result = await db
        .delete(inovasi_LAN)
        .where(eq(inovasi_LAN.id, Number(id)))
        .returning();

      console.log('[API] Deleted inovasi:', result[0]);

      return {
        success: true,
        data: result[0],
        message: 'Inovasi berhasil dihapus'
      };

    } catch (error) {
      console.error('[API] DELETE Error:', error);
      setResponseStatus(event, 500);
      return {
        success: false,
        error: 'Internal server error',
        message: 'Terjadi kesalahan saat menghapus inovasi'
      };
    }
  }

  // Method not allowed
  setResponseStatus(event, 405);
  return {
    success: false,
    error: 'Method not allowed',
    message: `Method ${method} tidak diizinkan`
  };
});