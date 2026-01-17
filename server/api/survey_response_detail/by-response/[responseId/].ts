import { db } from '@/server/database'
import { surveyResponseDetail } from '@/server/database/schema/survey_response_detail'
// import { surveyIndicator } from '@/server/database/schema/survey_indicator' // Removed as file deleted
// import { surveyComponent } from '@/server/database/schema/survey_component'
import { eq, asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const responseId = parseInt(getRouterParam(event, 'responseId') || '0')

    if (!responseId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Response ID is required'
      })
    }

    // Get all survey response details for a specific response
    const rawDetails = await db
      .select({
        id: surveyResponseDetail.id,
        responseId: surveyResponseDetail.responseId,
        indicatorId: surveyResponseDetail.indicatorId,
        skor: surveyResponseDetail.skor,
        catatan: surveyResponseDetail.catatan,
        createdAt: surveyResponseDetail.createdAt
        // Removed indicator and component fields as surveyIndicator table deleted
      })
      .from(surveyResponseDetail)
      .where(eq(surveyResponseDetail.responseId, responseId))
      // Removed joins to surveyIndicator and surveyComponent as table deleted

    const details = rawDetails.map(row => ({
      id: row.id,
      responseId: row.responseId,
      indicatorId: row.indicatorId,
      skor: row.skor,
      catatan: row.catatan,
      createdAt: row.createdAt
      // Removed indicator object as surveyIndicator table deleted
    }))

    return {
      success: true,
      data: details
    }
  } catch (error) {
    console.error('Survey response details by response ID API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})