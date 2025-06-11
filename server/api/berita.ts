import { PrismaClient } from '@prisma/client'
import { getMethod, readBody, createError } from '#imports'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    switch (method) {
      case 'GET':
        // GET /api/berita - Semua berita
        const query = getQuery(event)
        const beritas = await prisma.beritas.findMany({
          orderBy: { created_at: 'desc' },
          take: query.limit ? parseInt(query.limit as string) : undefined,
          skip: query.offset ? parseInt(query.offset as string) : undefined
        })
        return { success: true, data: beritas }

      case 'POST':
        // POST /api/berita - Buat baru
        const body = await readBody(event)
        const newBerita = await prisma.beritas.create({
          data: {
            title: body.title,
            deskripsi: body.deskripsi,
            image_url: body.image_url,
            embed_url: body.embed_url,
            likes: body.likes || 0,
            date: body.date ? new Date(body.date) : new Date(),
            created_at: new Date()
          }
        })
        return { success: true, data: newBerita }

      default:
        throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal Server Error'
    })
  } finally {
    await prisma.$disconnect()
  }
})