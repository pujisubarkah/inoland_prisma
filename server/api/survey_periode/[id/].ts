import { db } from '@/server/database'
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
        // Get survey period by ID
        const [period] = await db
          .select()
          .from(survey_periode)
          .where(eq(survey_periode.id, id))

        if (!period) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey period not found'
          })
        }

        return {
          success: true,
          data: period
        }

      case 'PUT':
        // Update survey period
        const body = await readBody(event)
        const { tahun, is_active } = body

        const [updatedPeriod] = await db
          .update(survey_periode)
          .set({
            tahun,
            is_active
          })
          .where(eq(survey_periode.id, id))
          .returning()

        if (!updatedPeriod) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey period not found'
          })
        }

        return {
          success: true,
          data: updatedPeriod,
          message: 'Survey period updated successfully'
        }

      case 'DELETE':
        // Delete survey period
        const [deletedPeriod] = await db
          .delete(survey_periode)
          .where(eq(survey_periode.id, id))
          .returning()

        if (!deletedPeriod) {
          throw createError({
            statusCode: 404,
            statusMessage: 'Survey period not found'
          })
        }

        return {
          success: true,
          message: 'Survey period deleted successfully'
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