// /server/api/artikel/index.ts

import { db } from '@/server/database'
import { articles } from '@/server/database/schema/artikel'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    try {
      const data = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.date))

      return data
    } catch (error) {
      console.error('Error fetching articles:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Gagal mengambil data artikel',
      })
    }
  }

  if (event.req.method === 'POST') {
    try {
      const body = await readBody(event)

      const { title, date, summary, avatar, content } = body

      if (!title || !date || !content) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Field wajib: title, date, content',
        })
      }

      const inserted = await db
        .insert(articles)
        .values({ title, date, summary, avatar, content })
        .returning()

      return inserted[0]
    } catch (error) {
      console.error('Error inserting article:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Gagal menyimpan artikel',
      })
    }
  }
})
