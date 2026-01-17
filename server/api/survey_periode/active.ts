import { db } from '@/server/database'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Get active survey periode
    const [activePeriode] = await db
      .select()
      .from(survey_periode)
      .where(eq(survey_periode.is_active, true))
      .limit(1)

    if (!activePeriode) {
      return {
        success: true,
        data: null,
        message: 'No active survey periode found'
      }
    }

    return {
      success: true,
      data: activePeriode
    }
  } catch (error) {
    console.error('Active survey periode API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})