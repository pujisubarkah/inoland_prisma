import { db } from '../../database'
import { user } from '../../database/schema/user'
import { eq } from 'drizzle-orm'
import { getRouterParam, readBody, getMethod } from 'h3'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const idParam = getRouterParam(event, 'id')
  const id = Number(idParam)

  if (isNaN(id)) {
    return {
      statusCode: 400,
      message: 'ID tidak valid',
    }
  }

  if (method === 'GET') {
    const result = await db
      .select({
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        username: user.username,
        instansi: user.instansi,
        role_id: user.role_id,
        is_verified: user.is_verified,
        created_at: user.created_at,
      })
      .from(user)
      .where(eq(user.id, id))

    if (result.length === 0) {
      return {
        statusCode: 404,
        message: 'User tidak ditemukan',
      }
    }

    return {
      statusCode: 200,
      data: result[0],
    }
  }

  if (method === 'PUT') {
    const body = await readBody(event)

    await db
      .update(user)
      .set({
        nama_lengkap: body.nama_lengkap,
        email: body.email,
        username: body.username,
        instansi: body.instansi,
        role_id: body.role_id,
        is_verified: body.is_verified,
      })
      .where(eq(user.id, id))

    return {
      statusCode: 200,
      message: 'User berhasil diperbarui',
    }
  }

  if (method === 'DELETE') {
    await db.delete(user).where(eq(user.id, id))

    return {
      statusCode: 200,
      message: 'User berhasil dihapus',
    }
  }

  return {
    statusCode: 405,
    message: 'Metode tidak diizinkan',
  }
})
