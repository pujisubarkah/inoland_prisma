// server/api/inovasi_lan/[id].ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  // Validasi ID
  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID tidak valid'
    })
  }

  const inovasiId = parseInt(id)

  try {
    // GET - Mengambil data inovasi LAN berdasarkan ID
    if (method === 'GET') {
      const inovasi = await prisma.inovasi_LAN.findUnique({
        where: { id: inovasiId }
      })

      if (!inovasi) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Inovasi LAN tidak ditemukan'
        })
      }

      return {
        success: true,
        data: inovasi
      }
    }

    // PUT - Update data inovasi LAN berdasarkan ID
    if (method === 'PUT') {
      interface InovasiLANBody {
        nama_inovasi?: string
        produk_inovasi?: string
        nama_instansi?: string
        deskripsi?: string
        image_link?: string
      }
      const body = await readBody<InovasiLANBody>(event)

      // Cek apakah inovasi exists
      const existingInovasi = await prisma.inovasi_LAN.findUnique({
        where: { id: inovasiId }
      })

      if (!existingInovasi) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Inovasi LAN tidak ditemukan'
        })
      }

      // Validasi input (opsional - hanya validate jika ada data)
      if (body.nama_inovasi !== undefined && !body.nama_inovasi.trim()) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama inovasi tidak boleh kosong'
        })
      }

      if (body.nama_instansi !== undefined && !body.nama_instansi.trim()) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama instansi tidak boleh kosong'
        })
      }

      // Update data
      const updatedInovasi = await prisma.inovasi_LAN.update({
        where: { id: inovasiId },
        data: {
          ...(body.nama_inovasi !== undefined && { nama_inovasi: body.nama_inovasi }),
          ...(body.produk_inovasi !== undefined && { produk_inovasi: body.produk_inovasi }),
          ...(body.nama_instansi !== undefined && { nama_instansi: body.nama_instansi }),
          ...(body.deskripsi !== undefined && { deskripsi: body.deskripsi }),
          ...(body.image_link !== undefined && { image_link: body.image_link })
        }
      })

      return {
        success: true,
        message: 'Inovasi LAN berhasil diupdate',
        data: updatedInovasi
      }
    }

    // PATCH - Partial update data inovasi LAN berdasarkan ID
    if (method === 'PATCH') {
      const body = await readBody(event)

      // Cek apakah inovasi exists
      const existingInovasi = await prisma.inovasi_LAN.findUnique({
        where: { id: inovasiId }
      })

      if (!existingInovasi) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Inovasi LAN tidak ditemukan'
        })
      }

      // Filter hanya field yang ada dalam body
      const updateData: { [key: string]: any } = {}
      if (body.nama_inovasi !== undefined) updateData.nama_inovasi = body.nama_inovasi
      if (body.produk_inovasi !== undefined) updateData.produk_inovasi = body.produk_inovasi
      if (body.nama_instansi !== undefined) updateData.nama_instansi = body.nama_instansi
      if (body.deskripsi !== undefined) updateData.deskripsi = body.deskripsi
      if (body.image_link !== undefined) updateData.image_link = body.image_link

      // Jika tidak ada data untuk diupdate
      if (Object.keys(updateData).length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Tidak ada data untuk diupdate'
        })
      }

      const updatedInovasi = await prisma.inovasi_LAN.update({
        where: { id: inovasiId },
        data: updateData
      })

      return {
        success: true,
        message: 'Inovasi LAN berhasil diupdate',
        data: updatedInovasi
      }
    }

    // DELETE - Menghapus data inovasi LAN berdasarkan ID
    if (method === 'DELETE') {
      // Cek apakah inovasi exists
      const existingInovasi = await prisma.inovasi_LAN.findUnique({
        where: { id: inovasiId }
      })

      if (!existingInovasi) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Inovasi LAN tidak ditemukan'
        })
      }

      // Hapus data
      await prisma.inovasi_LAN.delete({
        where: { id: inovasiId }
      })

      return {
        success: true,
        message: 'Inovasi LAN berhasil dihapus',
        data: { id: inovasiId }
      }
    }

    // Method tidak didukung
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })

  } catch (error) {
    console.error('Error in inovasi_lan/[id] API:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    // Handle Prisma errors
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inovasi LAN tidak ditemukan'
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