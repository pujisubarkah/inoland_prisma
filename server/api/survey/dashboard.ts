import { db } from '@/server/database'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { surveyResponseDetail } from '@/server/database/schema/survey_response_detail'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { instansi } from '@/server/database/schema/instansi'
import { eq, sql, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Get active periode
    const [activePeriode] = await db
      .select()
      .from(survey_periode)
      .where(eq(survey_periode.is_active, true))
      .limit(1)

    // Get total responses count
    const [totalResponses] = await db
      .select({ count: sql<number>`count(*)` })
      .from(surveyResponse)

    // Get responses by status
    const statusStats = await db
      .select({
        status: surveyResponse.status,
        count: sql<number>`count(*)`
      })
      .from(surveyResponse)
      .groupBy(surveyResponse.status)

    // Get responses by periode
    const periodeStats = await db
      .select({
        periodeId: surveyResponse.periodeId,
        tahun: survey_periode.tahun,
        count: sql<number>`count(*)`
      })
      .from(surveyResponse)
      .leftJoin(survey_periode, eq(surveyResponse.periodeId, survey_periode.id))
      .groupBy(surveyResponse.periodeId, survey_periode.tahun)
      .orderBy(desc(survey_periode.tahun))

    // Get average scores by component (if active periode exists)
    let componentStats: Array<{
      componentId: number
      componentName: string
      avgScore: number
      responseCount: number
    }> = []
    // Commented out as survey_indicator table deleted
    // if (activePeriode) {
    //   componentStats = await db
    //     .select({
    //       componentId: sql<number>`sc.id`,
    //       componentName: sql<string>`sc.nama`,
    //       avgScore: sql<number>`avg(srd.skor)`,
    //       responseCount: sql<number>`count(distinct sr.id)`
    //     })
    //     .from(surveyResponseDetail)
    //     .innerJoin(surveyResponse, eq(surveyResponseDetail.responseId, surveyResponse.id))
    //     .innerJoin(sql`survey_indicator si`, eq(surveyResponseDetail.indicatorId, sql`si.id`))
    //     .innerJoin(sql`survey_component sc`, eq(sql`si.component_id`, sql`sc.id`))
    //     .where(eq(surveyResponse.periodeId, activePeriode.id))
    //     .groupBy(sql`sc.id`, sql`sc.nama`)
    //     .orderBy(sql`sc.urutan`)
    // }

    // Get recent responses
    const recentResponses = await db
      .select({
        id: surveyResponse.id,
        pengisi: surveyResponse.pengisi,
        status: surveyResponse.status,
        createdAt: surveyResponse.createdAt,
        instansi: {
          nama_instansi: instansi.agency_name
        },
        periode: {
          tahun: survey_periode.tahun
        }
      })
      .from(surveyResponse)
      .leftJoin(instansi, eq(surveyResponse.instansiId, instansi.id))
      .leftJoin(survey_periode, eq(surveyResponse.periodeId, survey_periode.id))
      .orderBy(desc(surveyResponse.createdAt))
      .limit(5)

    return {
      success: true,
      data: {
        activePeriode,
        totalResponses: totalResponses.count,
        statusStats,
        periodeStats,
        componentStats,
        recentResponses
      }
    }
  } catch (error) {
    console.error('Survey dashboard API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})