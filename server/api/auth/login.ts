// server/api/auth/login.post.ts
import { db } from '@/server/database'
import { user } from '@/server/database/schema/user'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const [foundUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, email))

  if (!foundUser || !foundUser.password) {
    setResponseStatus(event, 401)
    return { message: 'Email tidak ditemukan' }
  }

  const isMatch = await bcrypt.compare(password, foundUser.password)

  if (!isMatch) {
    setResponseStatus(event, 401)
    return { message: 'Password salah' }
  }

  // Simpan ke session / cookie (Nuxt Auth minimal bisa pakai H3 `setCookie`)
  setCookie(event, 'session_token', String(foundUser.id), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 hari
  })

  return {
    message: 'Login berhasil',
    user: {
      id: foundUser.id,
      email: foundUser.email,
      nama_lengkap: foundUser.nama_lengkap,
      instansi: foundUser.instansi,
      role_id: foundUser.role_id
    }
  }
})
