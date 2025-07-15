// /server/api/artikel/[id].ts

import { db } from '@/server/database'
import { articles } from '@/server/database/schema/artikel'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID artikel diperlukan' })
  }

  const method = event.req.method

  try {
    if (method === 'GET') {
      const result = await db
        .select()
        .from(articles)
        .where(eq(articles.id, id))
        .limit(1)

      if (!result.length) {
        throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
      }

      return result[0]
    }

    if (method === 'PUT') {
      const body = await readBody(event)
      const updated = await db
        .update(articles)
        .set({
          title: body.title,
          date: body.date,
          summary: body.summary,
          avatar: body.avatar,
          content: body.content,
        })
        .where(eq(articles.id, id))
        .returning()

      return updated[0]
    }

    if (method === 'DELETE') {
      await db.delete(articles).where(eq(articles.id, id))
      return { success: true, message: 'Artikel berhasil dihapus' }
    }
  } catch (error) {
    console.error(`Error handling ${method} artikel:`, error)
    return createError({
      statusCode: 500,
      statusMessage: `Gagal memproses ${method} artikel`,
    })
  }
})
