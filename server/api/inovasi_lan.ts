// server/api/inovasi_lan.ts
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  try {
    // GET - Mengambil semua data inovasi LAN
    if (method === 'GET') {
      const query = getQuery(event)
      const page = parseInt(query.page as string) || 1
      const limit = parseInt(query.limit as string) || 10
      const search = query.search as string || ''

      const skip = (page - 1) * limit

      // Build where clause untuk pencarian
      const whereClause = search ? {
        OR: [
          { nama_inovasi: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { nama_instansi: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { produk_inovasi: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { deskripsi: { contains: search, mode: Prisma.QueryMode.insensitive } }
        ]
      } : {}

      // Ambil data dengan pagination
      const [inovasiList, total] = await Promise.all([
        prisma.inovasi_LAN.findMany({
          where: whereClause,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' }
        }),
        prisma.inovasi_LAN.count({
          where: whereClause
        })
      ])

      return {
        success: true,
        data: inovasiList,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    }

    // POST - Menambah data inovasi LAN baru
    if (method === 'POST') {
      const body = await readBody(event)
      
      // Validasi input
      if (!body.nama_inovasi) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama inovasi harus diisi'
        })
      }

      if (!body.nama_instansi) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama instansi harus diisi'
        })
      }

      // Buat data baru
      const newInovasi = await prisma.inovasi_LAN.create({
        data: {
          nama_inovasi: body.nama_inovasi,
          produk_inovasi: body.produk_inovasi || null,
          nama_instansi: body.nama_instansi,
          deskripsi: body.deskripsi || null,
          image_link: body.image_link || null
        }
      })

      return {
        success: true,
        message: 'Inovasi LAN berhasil ditambahkan',
        data: newInovasi
      }
    }

    // Method tidak didukung
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })

  } catch (error) {
    console.error('Error in inovasi_lan API:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error as { statusCode: number }
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  } finally {
    await prisma.$disconnect()
  }
})