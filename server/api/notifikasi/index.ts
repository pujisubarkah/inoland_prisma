import { notifikasi } from '../../database/schema/notifikasi';
import { db } from '../../database';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Get all notifications
    const result = await db.select().from(notifikasi);
    return result;
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event);
    // Insert new notification
    const {
      admin_instansi_id,
      innovation_idea_id,
      type,
      title,
      message,
      status,
      created_at,
      read_at
    } = body;
    const inserted = await db.insert(notifikasi).values({
      id: undefined, // Set to undefined if your DB auto-generates, or provide a value if needed
      admin_instansi_id,
      innovation_idea_id,
      type,
      title,
      message,
      status,
      created_at: created_at ?? new Date(),
      read_at: read_at ?? null,
    }).returning();
    return inserted[0];
  }

  // Method not allowed
  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});
