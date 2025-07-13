import { db } from '@/server/database'
import { pdflist } from '@/server/database/schema/pdflist'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) {
    setResponseStatus(event, 400)
    return { message: 'ID tidak valid' }
  }

  if (event.method === 'GET') {
    // Ambil data by ID
    const [item] = await db.select().from(pdflist).where(eq(pdflist.id, id))
    if (!item) {
      setResponseStatus(event, 404)
      return { message: 'Data tidak ditemukan' }
    }
    return item
  }

  if (event.method === 'PUT') {
    const body = await readBody(event)
    await db.update(pdflist)
      .set(body)
      .where(eq(pdflist.id, id))
    return { message: 'Data berhasil diupdate' }
  }

  if (event.method === 'DELETE') {
    await db.delete(pdflist).where(eq(pdflist.id, id))
    return { message: 'Data berhasil dihapus' }
  }

  setResponseStatus(event, 405)
  return { message: 'Metode tidak diizinkan' }
})