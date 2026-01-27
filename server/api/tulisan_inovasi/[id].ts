import { db } from '../../database';
import { inovasis } from '../../database/schema/tulisan_inovasi';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const id = getRouterParam(event, 'id');

  if (!id || isNaN(Number(id))) {
    setResponseStatus(event, 400);
    return { success: false, error: 'Invalid ID', message: 'ID harus berupa angka' };
  }

  if (method === 'GET') {
    try {
      const data = await db.select().from(inovasis).where(eq(inovasis.id, Number(id))).limit(1);
      if (!data || data.length === 0) {
        setResponseStatus(event, 404);
        return { success: false, error: 'Not found', message: `Inovasi dengan ID ${id} tidak ditemukan` };
      }
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('[API] tulisan_inovasi GET by id Error:', error);
      setResponseStatus(event, 500);
      return { success: false, error: 'Internal server error' };
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event);

      const existing = await db.select().from(inovasis).where(eq(inovasis.id, Number(id))).limit(1);
      if (!existing || existing.length === 0) {
        setResponseStatus(event, 404);
        return { success: false, error: 'Not found', message: `Inovasi dengan ID ${id} tidak ditemukan` };
      }

      const result = await db
        .update(inovasis)
        .set({
          created_at: body.created_at ?? existing[0].created_at,
          document_id: body.document_id ?? existing[0].document_id,
          nama_inovasi: body.nama_inovasi ?? existing[0].nama_inovasi,
          penggagas: body.penggagas ?? existing[0].penggagas,
          deskripsi: body.deskripsi ?? existing[0].deskripsi,
          nama_instansi: body.nama_instansi ?? existing[0].nama_instansi,
          unit_instansi: body.unit_instansi ?? existing[0].unit_instansi,
          tahun_inisiasi: body.tahun_inisiasi ?? existing[0].tahun_inisiasi,
          tahun_implementasi: body.tahun_implementasi ?? existing[0].tahun_implementasi,
          faktor_pendorong: body.faktor_pendorong ?? existing[0].faktor_pendorong,
          faktor_penghambat: body.faktor_penghambat ?? existing[0].faktor_penghambat,
          tahapan_proses: body.tahapan_proses ?? existing[0].tahapan_proses,
          output: body.output ?? existing[0].output,
          outcome: body.outcome ?? existing[0].outcome,
          manfaat: body.manfaat ?? existing[0].manfaat,
          prasyarat_replikasi: body.prasyarat_replikasi ?? existing[0].prasyarat_replikasi,
          kontak: body.kontak ?? existing[0].kontak,
          sumber: body.sumber ?? existing[0].sumber,
          id_provinsi: body.id_provinsi ?? existing[0].id_provinsi,
          id_kabkot: body.id_kabkot ?? existing[0].id_kabkot,
          published_at: body.published_at ?? existing[0].published_at,
          updated_at: body.updated_at ?? existing[0].updated_at,
          created_by_id: body.created_by_id ?? existing[0].created_by_id,
          updated_by_id: body.updated_by_id ?? existing[0].updated_by_id,
          locale: body.locale ?? existing[0].locale,
        })
        .where(eq(inovasis.id, Number(id)))
        .returning();

      return { success: true, data: result[0], message: 'Inovasi berhasil diperbarui' };
    } catch (error) {
      console.error('[API] tulisan_inovasi PUT Error:', error);
      setResponseStatus(event, 500);
      return { success: false, error: 'Internal server error' };
    }
  }

  if (method === 'DELETE') {
    try {
      const existing = await db.select().from(inovasis).where(eq(inovasis.id, Number(id))).limit(1);
      if (!existing || existing.length === 0) {
        setResponseStatus(event, 404);
        return { success: false, error: 'Not found', message: `Inovasi dengan ID ${id} tidak ditemukan` };
      }

      const result = await db.delete(inovasis).where(eq(inovasis.id, Number(id))).returning();
      return { success: true, data: result[0], message: 'Inovasi berhasil dihapus' };
    } catch (error) {
      console.error('[API] tulisan_inovasi DELETE Error:', error);
      setResponseStatus(event, 500);
      return { success: false, error: 'Internal server error' };
    }
  }

  setResponseStatus(event, 405);
  return { success: false, error: 'Method not allowed', message: `Method ${method} tidak diizinkan` };
});
