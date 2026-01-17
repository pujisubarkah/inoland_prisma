import { db } from '@/server/database'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const instansiId = parseInt(getRouterParam(event, 'instansiId') || '0')

    if (!instansiId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Instansi ID is required'
      })
    }

    // Get all survey responses for a specific instansi
    const responses = await db
      .select({
        id: surveyResponse.id,
        instansiId: surveyResponse.instansiId,
        periodeId: surveyResponse.periodeId,
        pengisi: surveyResponse.pengisi,
        jabatanPengisi: surveyResponse.jabatanPengisi,
        status: surveyResponse.status,
        createdAt: surveyResponse.createdAt,
        periode: {
          id: survey_periode.id,
          tahun: survey_periode.tahun,
          is_active: survey_periode.is_active
        }
      })
      .from(surveyResponse)
      .leftJoin(survey_periode, eq(surveyResponse.periodeId, survey_periode.id))
      .where(eq(surveyResponse.instansiId, instansiId))
      .orderBy(desc(surveyResponse.createdAt))

    return {
      success: true,
      data: responses
    }
  } catch (error) {
    console.error('Survey responses by instansi ID API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})