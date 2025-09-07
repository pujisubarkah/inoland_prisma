import { user_instansi } from '../../database/schema/user_instansi';
import { db } from '../../database';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const id = params && params.id ? Number(params.id) : NaN;
  if (!id) {
    event.res.statusCode = 400;
    return { error: 'Invalid id' };
  }

  if (event.req.method === 'GET') {
    // Get user_instansi by id
    const result = await db.select().from(user_instansi).where(sql`id = ${id}`);
    return result[0] || null;
  }

  if (event.req.method === 'PUT') {
    const body = await readBody(event);
    const updated = await db.update(user_instansi)
      .set({
        contact_person: body.contact_person,
        telp: body.telp,
        created_by: body.created_by ?? null,
        OPD: body.OPD,
      })
      .where(sql`id = ${id}`)
      .returning();
    return updated[0] || null;
  }

  if (event.req.method === 'DELETE') {
    const deleted = await db.delete(user_instansi)
      .where(sql`id = ${id}`)
      .returning();
    return deleted[0] || null;
  }

  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});
