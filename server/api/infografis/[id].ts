// server/api/infografis/[id].ts
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

  const dokumenId = parseInt(id)

  try {
    // GET - Mengambil data dokumen berdasarkan ID
    if (method === 'GET') {
      const dokumen = await prisma.dokumens.findUnique({
        where: { id: dokumenId }
      })

      if (!dokumen) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Dokumen tidak ditemukan'
        })
      }

      return {
        success: true,
        data: dokumen
      }
    }

    // PUT - Update data dokumen berdasarkan ID (full update)
    if (method === 'PUT') {
      const body = await readBody(event)

      // Cek apakah dokumen exists
      const existingDokumen = await prisma.dokumens.findUnique({
        where: { id: dokumenId }
      })

      if (!existingDokumen) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Dokumen tidak ditemukan'
        })
      }

      // Validasi input
      if (!body.nama || !body.nama.trim()) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Nama dokumen harus diisi'
        })
      }

      if (!body.link || !body.link.trim()) {
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

      if (!body.jenis_dokumen || !body.jenis_dokumen.trim()) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Jenis dokumen harus diisi'
        })
      }

      // Update dokumen
      const updatedDokumen = await prisma.dokumens.update({
        where: { id: dokumenId },
        data: {
          nama: body.nama,
          link: body.link,
          jenis_dokumen: body.jenis_dokumen
        }
      })

      return {
        success: true,
        message: 'Dokumen berhasil diupdate',
        data: updatedDokumen
      }
    }

    // PATCH - Partial update data dokumen berdasarkan ID
    if (method === 'PATCH') {
      const body = await readBody(event)

      // Cek apakah dokumen exists
      const existingDokumen = await prisma.dokumens.findUnique({
        where: { id: dokumenId }
      })

      if (!existingDokumen) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Dokumen tidak ditemukan'
        })
      }

      // Prepare update data - hanya field yang ada dalam body
      const updateData: any = {}

      if (body.nama !== undefined) {
        if (!body.nama.trim()) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Nama dokumen tidak boleh kosong'
          })
        }
        updateData.nama = body.nama
      }

      if (body.link !== undefined) {
        if (!body.link.trim()) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Link dokumen tidak boleh kosong'
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
        updateData.link = body.link
      }

      if (body.jenis_dokumen !== undefined) {
        if (!body.jenis_dokumen.trim()) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Jenis dokumen tidak boleh kosong'
          })
        }
        updateData.jenis_dokumen = body.jenis_dokumen
      }

      // Jika tidak ada data untuk diupdate
      if (Object.keys(updateData).length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Tidak ada data untuk diupdate'
        })
      }

      const updatedDokumen = await prisma.dokumens.update({
        where: { id: dokumenId },
        data: updateData
      })

      return {
        success: true,
        message: 'Dokumen berhasil diupdate',
        data: updatedDokumen
      }
    }

    // DELETE - Menghapus data dokumen berdasarkan ID
    if (method === 'DELETE') {
      // Cek apakah dokumen exists
      const existingDokumen = await prisma.dokumens.findUnique({
        where: { id: dokumenId }
      })

      if (!existingDokumen) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Dokumen tidak ditemukan'
        })
      }

      // Hapus dokumen
      await prisma.dokumens.delete({
        where: { id: dokumenId }
      })

      return {
        success: true,
        message: 'Dokumen berhasil dihapus',
        data: { 
          id: dokumenId,
          nama: existingDokumen.nama 
        }
      }
    }

    // Method tidak didukung
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })

  } catch (error) {
    console.error('Error in infografis/[id] API:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      throw error
    }

    // Handle Prisma errors
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Dokumen tidak ditemukan'
      })
    }

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