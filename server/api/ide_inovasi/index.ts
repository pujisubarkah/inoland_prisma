// server/api/innovation-ideas.ts
import { db } from '@/server/database';
import { innovationIdeas } from '@/server/database/schema/ide_inovasi';

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === 'GET') {
    // Ambil semua data ide inovasi
    return await db.select().from(innovationIdeas);
  }

  if (method === 'POST') {
    // Tambah data ide inovasi
    const body = await readBody(event);
    const result = await db.insert(innovationIdeas).values(body).returning();
    return result[0];
  }

  return { error: 'Method not allowed' };
});