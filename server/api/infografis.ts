// server/api/infografis.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    // GET - Mengambil semua data dokumen/infografis
    if (method === 'GET') {
      const query = getQuery(event)
      const page = parseInt(query.page as string) || 1
      const limit = parseInt(query.limit as string) || 10
      const search = query.search as string || ''
      const jenis = query.jenis as string || ''

      const skip = (page - 1) * limit

      // Build where clause untuk pencarian dan filter
      const whereClause: any = {}

      if (search) {
        whereClause.OR = [
          { nama: { contains: search, mode: 'insensitive' } },
          { jenis_dokumen: { contains: search, mode: 'insensitive' } }
        ]
      }

      if (jenis) {
        whereClause.jenis_dokumen = { contains: jenis, mode: 'insensitive' }
      }

      // Ambil data dengan pagination
      const [dokumenList, total] = await Promise.all([
        prisma.dokumens.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' }
        }),
        prisma.dokumens.count({
          where: whereClause
        })
      ])

      return {
        success: true,
        data: dokumenList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    }

    // POST - Menambah dokumen/infografis baru
    if (method === 'POST') {
      const body = await readBody(event)
      
      // Validasi input
      if (!body.nama) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama dokumen harus diisi'
        })
      }

      if (!body.link) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Link dokumen harus diisi'
        })
      }

      // Validasi format URL
      try {
        new URL(body.link)
      } catch {
        throw createError({
          statusCode: 400,
          statusMessage: 'Format link tidak valid'
        })
      }

      if (!body.jenis_dokumen) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Jenis dokumen harus diisi'
        })
      }

      // Buat dokumen baru
      const newDokumen = await prisma.dokumens.create({
        data: {
          nama: body.nama,
          link: body.link,
          jenis_dokumen: body.jenis_dokumen,
          created_at: new Date()
        }
      })

      return {
        success: true,
        message: 'Dokumen berhasil ditambahkan',
        data: newDokumen
      }
    }

    // Method tidak didukung
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })

  } catch (error) {
    console.error('Error in infografis API:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    // Handle Prisma errors
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Dokumen dengan nama tersebut sudah ada'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  } finally {
    await prisma.$disconnect()
  }
})