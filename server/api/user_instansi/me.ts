import { user_instansi } from '../../database/schema/user_instansi';
import { user } from '../../database/schema/user';
import { db } from '../../database';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    // Ambil user_id dari query parameter
    const query = getQuery(event);
    const userId = query.user_id;
    
    if (!userId) {
      setResponseStatus(event, 400);
      return { error: 'user_id is required' };
    }
    
    console.log('[GET /api/user_instansi/me] user_id:', userId);
    
    // Get user_instansi data berdasarkan user_id yang login
    const result = await db.select({
      id: user_instansi.id,
      user_id: user_instansi.user_id,
      contact_person: user_instansi.contact_person,
      telp: user_instansi.telp,
      created_by: user_instansi.created_by,
      nama_opd: user_instansi.OPD, // alias OPD menjadi nama_opd
      email: user.email, // ambil email dari table users
      instansi: user.instansi // ambil instansi dari table users
    })
    .from(user_instansi)
    .leftJoin(user, eq(user_instansi.user_id, user.id))
    .where(eq(user_instansi.user_id, Number(userId)));
    
    console.log('[GET /api/user_instansi/me] result:', result);
    
    if (result.length === 0) {
      setResponseStatus(event, 404);
      return { error: 'User instansi not found' };
    }
    
    return result[0]; // Return first match
  }

  // Method not allowed
  setResponseStatus(event, 405);
  return { error: 'Method not allowed' };
});
