import { db } from '@/server/database'
import { pdflist } from '@/server/database/schema/pdflist'
import { desc, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 12
  const offset = (page - 1) * limit

  // Ambil total count
  const [{ count: totalCount }] = await db
    .select({ count: count(pdflist.id) })
    .from(pdflist)

  // Ambil data paginated
  const data = await db
    .select()
    .from(pdflist)
    .orderBy(desc(pdflist.id))
    .limit(limit)
    .offset(offset)

  return {
    data,
    count: Number(totalCount)
  }
})