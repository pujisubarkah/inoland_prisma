import { PrismaClient } from '@prisma/client'
import { getMethod, readBody, createError, getRouterParam } from '#imports'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id') // Ambil ID dari URL

  if (!id || isNaN(Number(id))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }

  try {
    switch (method) {
      case 'GET':
        // GET /api/berita/:id
        const berita = await prisma.beritas.findUnique({
          where: { id: parseInt(id) }
        })

        if (!berita) {
          throw createError({ statusCode: 404, statusMessage: 'Berita not found' })
        }

        return { success: true, data: berita }

      case 'PUT':
        // PUT /api/berita/:id
        const updateData = await readBody(event)
        const updatedBerita = await prisma.beritas.update({
          where: { id: parseInt(id) },
          data: {
            title: updateData.title,
            deskripsi: updateData.deskripsi,
            image_url: updateData.image_url,
            embed_url: updateData.embed_url,
            likes: updateData.likes,
            date: updateData.date ? new Date(updateData.date) : undefined
          }
        })
        return { success: true, data: updatedBerita }

      case 'DELETE':
        // DELETE /api/berita/:id
        await prisma.beritas.delete({
          where: { id: parseInt(id) }
        })
        return { success: true, message: 'Berita deleted successfully' }

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