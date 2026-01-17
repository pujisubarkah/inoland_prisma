import { db } from '@/server/database'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { instansi } from '@/server/database/schema/instansi'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method

    switch (method) {
      case 'GET':
        // Get all survey responses with related data
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
            },
            periode: {
              id: survey_periode.id,
              tahun: survey_periode.tahun,
              is_active: survey_periode.is_active
            }
          })
          .from(surveyResponse)
          .leftJoin(instansi, eq(surveyResponse.instansiId, instansi.id))
          .leftJoin(survey_periode, eq(surveyResponse.periodeId, survey_periode.id))
          .orderBy(desc(surveyResponse.createdAt))

        return {
          success: true,
          data: responses
        }

      case 'POST':
        // Create new survey response
        const body = await readBody(event)
        const { instansiId, periodeId, pengisi, jabatanPengisi, status } = body

        if (!instansiId || !periodeId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Instansi ID and periode ID are required'
          })
        }

        const [newResponse] = await db
          .insert(surveyResponse)
          .values({
            instansiId,
            periodeId,
            pengisi,
            jabatanPengisi,
            status: status || 'draft'
          })
          .returning()

        return {
          success: true,
          data: newResponse,
          message: 'Survey response created successfully'
        }

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method not allowed'
        })
    }
  } catch (error) {
    console.error('Survey response API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})