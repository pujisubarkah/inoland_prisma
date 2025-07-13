// server/api/registrasi.post.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dbSchema from '../../database/schema/registrasi'; // Import semua schema
const { users } = dbSchema;

import { hash } from 'bcrypt';
import { z } from 'zod';

// Buat koneksi db + drizzle
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema: dbSchema });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // ✅ Rename schema ke validationSchema agar tidak bentrok
  const validationSchema = z.object({
    nama_lengkap: z.string().optional(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8, "Password minimal 8 karakter"),
    instansi: z.string().optional(),
    role_id: z.number().optional(), // default 2 kalau tidak diisi
  });

  const parsed = validationSchema.safeParse(body);
  if (!parsed.success) {
    return {
      statusCode: 400,
      error: parsed.error.flatten().fieldErrors,
      receivedBody: body, // bisa dihapus kalau tak butuh
    };
  }

  const { nama_lengkap, email, username, password, instansi, role_id } = parsed.data;
  const finalRoleId = role_id ?? 2;

  // 🔍 Cek user sudah ada
  const existingUser = await db.query.users.findFirst({
    where: (u, { or, eq }) =>
      or(eq(u.email, email), eq(u.username, username)),
  });

  if (existingUser) {
    return {
      statusCode: 409,
      message: 'Email atau username sudah digunakan.',
    };
  }

  const hashedPassword = await hash(password, 10);

  await db.insert(users).values({
    nama_lengkap,
    email,
    username,
    password: hashedPassword,
    instansi,
    role_id: finalRoleId,
    is_verified: false,
    created_at: new Date(),
  });

  return {
    statusCode: 201,
    message: 'Registrasi berhasil! Menunggu verifikasi admin.',
  };
});
