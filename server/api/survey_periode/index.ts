import { db } from '@/server/database'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method

    switch (method) {
      case 'GET':
        // Get all survey periods
        const periods = await db
          .select()
          .from(survey_periode)
          .orderBy(desc(survey_periode.created_at))

        return {
          success: true,
          data: periods
        }

      case 'POST':
        // Create new survey period
        const body = await readBody(event)
        const { tahun, is_active } = body

        if (!tahun) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Tahun is required'
          })
        }

        const [newPeriod] = await db
          .insert(survey_periode)
          .values({
            tahun,
            is_active: is_active || false
          })
          .returning()

        return {
          success: true,
          data: newPeriod,
          message: 'Survey period created successfully'
        }

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method not allowed'
        })
    }
  } catch (error) {
    console.error('Survey periode API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})