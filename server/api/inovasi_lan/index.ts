// server/api/inovasi_lan/index.ts
import { db } from '../../database';
import { inovasi_LAN } from '../../database/schema/inovasi';
import { desc, count } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    try {
      const query = getQuery(event);
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 20;
      const offset = (page - 1) * limit;

      console.log(`[API] Fetching inovasi_lan list - page: ${page}, limit: ${limit}`);

      // Get total count
      const [totalCount] = await db
        .select({ count: count() })
        .from(inovasi_LAN);

      // Get data with pagination
      const data = await db
        .select()
        .from(inovasi_LAN)
        .orderBy(desc(inovasi_LAN.created_at))
        .limit(limit)
        .offset(offset);

      console.log(`[API] Found ${data.length} inovasi_lan items`);

      return {
        success: true,
        data: data,
        pagination: {
          page,
          limit,
          total: totalCount.count,
          totalPages: Math.ceil(totalCount.count / limit)
        }
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

  if (method === 'POST') {
    try {
      const body = await readBody(event);
      console.log('[API] POST body:', body);

      // Validate required fields
      const { nama_inovasi, produk_inovasi, nama_instansi, deskripsi, image_link } = body;

      if (!nama_inovasi || !produk_inovasi || !nama_instansi) {
        setResponseStatus(event, 400);
        return {
          success: false,
          error: 'Missing required fields',
          message: 'nama_inovasi, produk_inovasi, dan nama_instansi wajib diisi'
        };
      }

      // Insert new inovasi
      const result = await db.insert(inovasi_LAN).values({
        nama_inovasi,
        produk_inovasi,
        nama_instansi,
        deskripsi: deskripsi || null,
        image_link: image_link || null,
      }).returning();

      console.log('[API] Created new inovasi:', result[0]);

      setResponseStatus(event, 201);
      return {
        success: true,
        data: result[0],
        message: 'Inovasi berhasil ditambahkan'
      };

    } catch (error) {
      console.error('[API] POST Error:', error);
      setResponseStatus(event, 500);
      return {
        success: false,
        error: 'Internal server error',
        message: 'Terjadi kesalahan saat menambah inovasi'
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
