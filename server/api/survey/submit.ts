import { db } from '@/server/database'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { surveyResponseDetail } from '@/server/database/schema/survey_response_detail'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const {
      instansiId,
      periodeId,
      pengisi,
      jabatanPengisi,
      status = 'submitted',
      details // array of { indicatorId, skor, catatan }
    } = body

    if (!instansiId || !periodeId || !details || !Array.isArray(details)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Instansi ID, periode ID, and details array are required'
      })
    }

    // Start transaction
    const result = await db.transaction(async (tx) => {
      // Create survey response
      const [newResponse] = await tx
        .insert(surveyResponse)
        .values({
          instansiId,
          periodeId,
          pengisi,
          jabatanPengisi,
          status
        })
        .returning()

      // Create survey response details
      const responseDetails = details.map(detail => ({
        responseId: newResponse.id,
        indicatorId: detail.indicatorId,
        skor: detail.skor,
        catatan: detail.catatan
      }))

      const insertedDetails = await tx
        .insert(surveyResponseDetail)
        .values(responseDetails)
        .returning()

      return {
        response: newResponse,
        details: insertedDetails
      }
    })

    return {
      success: true,
      data: result,
      message: 'Survey submitted successfully'
    }
  } catch (error) {
    console.error('Submit survey API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})