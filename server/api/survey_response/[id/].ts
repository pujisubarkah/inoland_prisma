import { db } from '@/server/database'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { instansi } from '@/server/database/schema/instansi'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method
    const id = parseInt(getRouterParam(event, 'id') || '0')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid ID'
      })
    }

    switch (method) {
      case 'GET':
        // Get survey response by ID with related data
        const [response] = await db
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
          .where(eq(surveyResponse.id, id))

        if (!response) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey response not found'
          })
        }

        return {
          success: true,
          data: response
        }

      case 'PUT':
        // Update survey response
        const body = await readBody(event)
        const { instansiId, periodeId, pengisi, jabatanPengisi, status } = body

        const [updatedResponse] = await db
          .update(surveyResponse)
          .set({
            instansiId,
            periodeId,
            pengisi,
            jabatanPengisi,
            status
          })
          .where(eq(surveyResponse.id, id))
          .returning()

        if (!updatedResponse) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey response not found'
          })
        }

        return {
          success: true,
          data: updatedResponse,
          message: 'Survey response updated successfully'
        }

      case 'DELETE':
        // Delete survey response
        const [deletedResponse] = await db
          .delete(surveyResponse)
          .where(eq(surveyResponse.id, id))
          .returning()

        if (!deletedResponse) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey response not found'
          })
        }

        return {
          success: true,
          message: 'Survey response deleted successfully'
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