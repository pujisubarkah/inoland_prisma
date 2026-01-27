import { db } from '../../database';
import { inovasis } from '../../database/schema/tulisan_inovasi';
import { desc, count } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    try {
      const query = getQuery(event);
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 20;
      const offset = (page - 1) * limit;

      // total count
      const [totalCount] = await db
        .select({ count: count() })
        .from(inovasis);

      const data = await db
        .select()
        .from(inovasis)
        .orderBy(desc(inovasis.created_at))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data,
        pagination: {
          page,
          limit,
          total: totalCount.count,
          totalPages: Math.ceil(totalCount.count / limit)
        }
      };

    } catch (error) {
      console.error('[API] tulisan_inovasi GET Error:', error);
      setResponseStatus(event, 500);
      return { success: false, error: 'Internal server error', message: 'Gagal mengambil daftar inovasi' };
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event);

      const { nama_inovasi, nama_instansi } = body;
      if (!nama_inovasi || !nama_instansi) {
        setResponseStatus(event, 400);
        return { success: false, error: 'Missing required fields', message: 'nama_inovasi dan nama_instansi wajib diisi' };
      }

      const values = {
        created_at: body.created_at || null,
        document_id: body.document_id || null,
        nama_inovasi,
        penggagas: body.penggagas || null,
        deskripsi: body.deskripsi || null,
        nama_instansi,
        unit_instansi: body.unit_instansi || null,
        tahun_inisiasi: body.tahun_inisiasi || null,
        tahun_implementasi: body.tahun_implementasi || null,
        faktor_pendorong: body.faktor_pendorong || null,
        faktor_penghambat: body.faktor_penghambat || null,
        tahapan_proses: body.tahapan_proses || null,
        output: body.output || null,
        outcome: body.outcome || null,
        manfaat: body.manfaat || null,
        prasyarat_replikasi: body.prasyarat_replikasi || null,
        kontak: body.kontak || null,
        sumber: body.sumber || null,
        id_provinsi: body.id_provinsi || null,
        id_kabkot: body.id_kabkot || null,
        published_at: body.published_at || null,
        updated_at: body.updated_at || null,
        created_by_id: body.created_by_id || null,
        updated_by_id: body.updated_by_id || null,
        locale: body.locale || null,
      };

      const result = await db.insert(inovasis).values(values).returning();

      setResponseStatus(event, 201);
      return { success: true, data: result[0], message: 'Inovasi berhasil dibuat' };

    } catch (error) {
      console.error('[API] tulisan_inovasi POST Error:', error);
      setResponseStatus(event, 500);
      return { success: false, error: 'Internal server error', message: 'Gagal menyimpan inovasi' };
    }
  }

  setResponseStatus(event, 405);
  return { success: false, error: 'Method not allowed', message: `Method ${method} tidak diizinkan` };
});
