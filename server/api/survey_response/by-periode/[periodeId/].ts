import { db } from '@/server/database'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { instansi } from '@/server/database/schema/instansi'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const periodeId = parseInt(getRouterParam(event, 'periodeId') || '0')

    if (!periodeId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Periode ID is required'
      })
    }

    // Get all survey responses for a specific periode
    const responses = await db
      .select({
        id: surveyResponse.id,
        instansiId: surveyResponse.instansiId,
        periodeId: surveyResponse.periodeId,
        pengisi: surveyResponse.pengisi,
        jabatanPengisi: surveyResponse.jabatanPengisi,
        status: surveyResponse.status,
        createdAt: surveyResponse.createdAt,
        instansi: {
          id: instansi.id,
          nama_instansi: instansi.agency_name
        }
      })
      .from(surveyResponse)
      .leftJoin(instansi, eq(surveyResponse.instansiId, instansi.id))
      .where(eq(surveyResponse.periodeId, periodeId))
      .orderBy(desc(surveyResponse.createdAt))

    return {
      success: true,
      data: responses
    }
  } catch (error) {
    console.error('Survey responses by periode ID API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})