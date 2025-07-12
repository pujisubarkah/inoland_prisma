// server/api/auth/registrasi.post.ts
import { db } from '@/server/database'
import { user } from '@/server/database/schema/user'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, nama_lengkap, instansi } = body

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await db.insert(user).values({
    email,
    password: hashedPassword,
    nama_lengkap,
    instansi,
    role_id: 2, // default role user biasa
    is_verified: false
  }).returning()

  return {
    message: 'Registrasi berhasil',
    user: newUser[0]
  }
})
