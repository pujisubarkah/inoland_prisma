import { db } from '@/server/database';
import { inolandAssistanceRequest } from '@/server/database/schema/inoland_assistance_request';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  const method = event.node.req.method;

  if (isNaN(id)) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'ID tidak valid' }));
  }

  if (method === 'GET') {
    const data = await db
      .select()
      .from(inolandAssistanceRequest)
      .where(eq(inolandAssistanceRequest.id, id));
    if (!data.length) {
      return sendError(event, createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan' }));
    }
    return { data: data[0] };
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    const [updated] = await db
      .update(inolandAssistanceRequest)
      .set({
        instansi_id: body.instansi_id,
        response_id: body.response_id,
        fokus_pendampingan: body.fokus_pendampingan,
        catatan: body.catatan,
        status: body.status,
        created_at: body.created_at ? new Date(body.created_at) : new Date(),
      })
      .where(eq(inolandAssistanceRequest.id, id))
      .returning();
    return { data: updated };
  }

  if (method === 'DELETE') {
    const [deleted] = await db
      .delete(inolandAssistanceRequest)
      .where(eq(inolandAssistanceRequest.id, id))
      .returning();
    return { data: deleted };
  }

  return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }));
});