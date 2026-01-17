import { db } from '@/server/database'
import { surveyResponseDetail } from '@/server/database/schema/survey_response_detail'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { surveyIndicator, surveyComponent } from '@/server/database/schema/survey'
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
        // Get survey response detail by ID with related data
        const [result] = await db
          .select({
            id: surveyResponseDetail.id,
            responseId: surveyResponseDetail.responseId,
            indicatorId: surveyResponseDetail.indicatorId,
            skor: surveyResponseDetail.skor,
            catatan: surveyResponseDetail.catatan,
            createdAt: surveyResponseDetail.createdAt,
            responseDataId: surveyResponse.id,
            responseStatus: surveyResponse.status,
            indicatorDataId: surveyIndicator.id,
            indicatorKode: surveyIndicator.kode,
            indicatorPertanyaan: surveyIndicator.pertanyaan,
            componentId: surveyComponent.id,
            componentKode: surveyComponent.kode,
            componentNama: surveyComponent.nama
          })
          .from(surveyResponseDetail)
          .leftJoin(surveyResponse, eq(surveyResponseDetail.responseId, surveyResponse.id))
          .leftJoin(surveyIndicator, eq(surveyResponseDetail.indicatorId, surveyIndicator.id))
          .leftJoin(surveyComponent, eq(surveyIndicator.componentId, surveyComponent.id))
          .where(eq(surveyResponseDetail.id, id))

        if (!result) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey response detail not found'
          })
        }

        return {
          success: true,
          data: result
        }

      case 'PUT':
        // Update survey response detail
        const body = await readBody(event)
        const { responseId, indicatorId, skor, catatan } = body

        const [updatedDetail] = await db
          .update(surveyResponseDetail)
          .set({
            responseId,
            indicatorId,
            skor,
            catatan
          })
          .where(eq(surveyResponseDetail.id, id))
          .returning()

        if (!updatedDetail) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey response detail not found'
          })
        }

        return {
          success: true,
          data: updatedDetail,
          message: 'Survey response detail updated successfully'
        }

      case 'DELETE':
        // Delete survey response detail
        const [deletedDetail] = await db
          .delete(surveyResponseDetail)
          .where(eq(surveyResponseDetail.id, id))
          .returning()

        if (!deletedDetail) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey response detail not found'
          })
        }

        return {
          success: true,
          message: 'Survey response detail deleted successfully'
        }

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method not allowed'
        })
    }
  } catch (error) {
    console.error('Survey response detail API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})