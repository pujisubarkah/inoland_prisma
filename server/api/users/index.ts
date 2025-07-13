// file: server/api/users/index.ts

import { db } from '../../database';
import { user } from '../../database/schema/user';

export default defineEventHandler(async () => {
  // Ambil semua user TANPA password
  const users = await db.select({
    id: user.id,
    nama_lengkap: user.nama_lengkap,
    email: user.email,
    username: user.username,
    instansi: user.instansi,
    role_id: user.role_id,
    is_verified: user.is_verified,
    created_at: user.created_at,
  }).from(user)

  return {
  
    data: users,
  }
})
