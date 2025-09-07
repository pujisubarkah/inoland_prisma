import { user_instansi } from '../../../database/schema/user_instansi';
import { user } from '../../../database/schema/user';
import { db } from '../../../database';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  const userId = params && params.userId ? Number(params.userId) : NaN;
  
  if (!userId) {
    event.res.statusCode = 400;
    return { error: 'Invalid user ID' };
  }

  if (event.req.method === 'GET') {
    // Get user_instansi by user_id with join ke table users
    const result = await db.select({
      id: user_instansi.id,
      user_id: user_instansi.user_id,
      contact_person: user_instansi.contact_person,
      telp: user_instansi.telp,
      created_by: user_instansi.created_by,
      nama_opd: user_instansi.OPD,
      email: user.email,
      instansi: user.instansi
    })
    .from(user_instansi)
    .leftJoin(user, eq(user_instansi.user_id, user.id))
    .where(eq(user_instansi.user_id, userId));
    
    console.log('[GET /api/user_instansi/by-user/' + userId + '] result:', result);
    return result[0] || null;
  }

  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});
