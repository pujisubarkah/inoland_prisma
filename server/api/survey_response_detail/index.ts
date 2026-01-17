import { db } from '@/server/database'
import { surveyResponseDetail } from '@/server/database/schema/survey_response_detail'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { surveyIndicator, surveyComponent } from '@/server/database/schema/survey'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method

    switch (method) {
      case 'GET':
        // Get all survey response details with related data
        const details = await db
          .select({
            id: surveyResponseDetail.id,
            responseId: surveyResponseDetail.responseId,
            indicatorId: surveyResponseDetail.indicatorId,
            skor: surveyResponseDetail.skor,
            catatan: surveyResponseDetail.catatan,
            createdAt: surveyResponseDetail.createdAt,
            responseIdJoin: surveyResponse.id,
            responseStatus: surveyResponse.status,
            indicatorIdJoin: surveyIndicator.id,
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
          .orderBy(desc(surveyResponseDetail.createdAt))

        const formattedDetails = details.map(detail => ({
          id: detail.id,
          responseId: detail.responseId,
          indicatorId: detail.indicatorId,
          skor: detail.skor,
          catatan: detail.catatan,
          createdAt: detail.createdAt,
          response: {
            id: detail.responseIdJoin,
            status: detail.responseStatus
          },
          indicator: {
            id: detail.indicatorIdJoin,
            kode: detail.indicatorKode,
            pertanyaan: detail.indicatorPertanyaan,
            component: {
              id: detail.componentId,
              kode: detail.componentKode,
              nama: detail.componentNama
            }
          }
        }))

        return {
          success: true,
          data: formattedDetails
        }

      case 'POST':
        // Create new survey response detail
        const body = await readBody(event)
        const { responseId, indicatorId, skor, catatan } = body

        if (!responseId || !indicatorId) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Response ID and indicator ID are required'
          })
        }

        const [newDetail] = await db
          .insert(surveyResponseDetail)
          .values({
            responseId,
            indicatorId,
            skor,
            catatan
          })
          .returning()

        return {
          success: true,
          data: newDetail,
          message: 'Survey response detail created successfully'
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