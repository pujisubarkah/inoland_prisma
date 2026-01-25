import { db } from '@/server/database';
import { inolandAssistanceRequest } from '@/server/database/schema/inoland_assistance_request';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // Ambil semua data
    const data = await db.select().from(inolandAssistanceRequest);
    return { data };
  }

  if (method === 'POST') {
    const body = await readBody(event);
    // Validasi sederhana
    if (!body.instansi || !body.penanggung_jawab || !body.email || !body.jenis_pendampingan) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'Data tidak lengkap' }));
    }
    const [inserted] = await db
      .insert(inolandAssistanceRequest)
      .values({
        instansi: body.instansi,
        penanggung_jawab: body.penanggung_jawab,
        jabatan: body.jabatan,
        email: body.email,
        telepon: body.telepon,
        jenis_pendampingan: body.jenis_pendampingan,
        keterangan: body.keterangan,
        status: 'pending',
        created_at: new Date(),
      })
      .returning();
    return { data: inserted };
  }

  // Method not allowed
  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }));
});