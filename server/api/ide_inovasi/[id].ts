import { db } from '@/server/database';
import { innovationIdeas } from '@/server/database/schema/ide_inovasi';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const id = event.context.params?.id;

  if (!id) return { error: 'ID is required' };

  if (method === 'GET') {
    // Ambil data ide inovasi berdasarkan ID
    const data = await db.select().from(innovationIdeas).where(eq(innovationIdeas.id, Number(id)));
    return data[0] || null;
  }

  if (method === 'POST') {
    // Tidak digunakan untuk [id], bisa dihapus atau return error
    return { error: 'POST not allowed on this endpoint' };
  }

  return { error: 'Method not allowed' };
});
