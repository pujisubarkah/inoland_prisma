// Create a new file: server/api/response/[id].ts
// filepath: c:\Users\user\Documents\inoland_prisma\server\api\response\[id].ts
import { db } from '@/server/database'
import { surveyResponseDetail } from '@/server/database/schema/survey_response_detail'
import { surveyResponse } from '@/server/database/schema/survey_response'
import { surveyIndicator, surveyComponent } from '@/server/database/schema/survey'
import { instansi } from '@/server/database/schema/instansi'
import { survey_periode } from '@/server/database/schema/survey_periode'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    const method = event.node.req.method
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Response ID is required'
      })
    }

    switch (method) {
      case 'GET':
        const dbQuery = db
          .select({
            id: surveyResponseDetail.id,
            responseId: surveyResponseDetail.responseId,
            indicatorId: surveyResponseDetail.indicatorId,
            skor: surveyResponseDetail.skor,
            catatan: surveyResponseDetail.catatan,
            createdAt: surveyResponseDetail.createdAt,
            responseIdJoin: surveyResponse.id,
            responsePengisi: surveyResponse.pengisi,
            responseJabatanPengisi: surveyResponse.jabatanPengisi,
            responseStatus: surveyResponse.status,
            responseCreatedAt: surveyResponse.createdAt,
            instansiId: surveyResponse.instansiId,
            periodeId: surveyResponse.periodeId,
            instansiNama: instansi.agency_name,
            periodeTahun: survey_periode.tahun,
            periodeIsActive: survey_periode.is_active,
            indicatorIdJoin: surveyIndicator.id,
            indicatorKode: surveyIndicator.kode,
            indicatorPertanyaan: surveyIndicator.pertanyaan,
            componentId: surveyComponent.id,
            componentKode: surveyComponent.kode,
            componentNama: surveyComponent.nama
          })
          .from(surveyResponseDetail)
          .leftJoin(surveyResponse, eq(surveyResponseDetail.responseId, surveyResponse.id))
          .leftJoin(instansi, eq(surveyResponse.instansiId, instansi.id))
          .leftJoin(survey_periode, eq(surveyResponse.periodeId, survey_periode.id))
          .leftJoin(surveyIndicator, eq(surveyResponseDetail.indicatorId, surveyIndicator.id))
          .leftJoin(surveyComponent, eq(surveyIndicator.componentId, surveyComponent.id))
          .where(eq(surveyResponse.id, parseInt(id)))

        const details = await dbQuery.orderBy(desc(surveyResponseDetail.createdAt))

        // Get response info (assuming one response per id)
        const responseInfo = details.length > 0 ? {
          id: details[0].responseIdJoin,
          instansiId: details[0].instansiId,
          periodeId: details[0].periodeId,
          pengisi: details[0].responsePengisi,
          jabatanPengisi: details[0].responseJabatanPengisi,
          status: details[0].responseStatus,
          createdAt: details[0].responseCreatedAt,
          instansi: {
            id: details[0].instansiId,
            nama_instansi: details[0].instansiNama
          },
          periode: {
            id: details[0].periodeId,
            tahun: details[0].periodeTahun,
            is_active: details[0].periodeIsActive
          }
        } : null

        // Group details by componentId
        const groupedByComponent: Record<number, any> = {}

        details.forEach(detail => {
          const componentId = detail.componentId
          if (componentId !== null && !groupedByComponent[componentId]) {
            groupedByComponent[componentId] = {
              component: {
                id: detail.componentId,
                kode: detail.componentKode,
                nama: detail.componentNama
              },
              details: [],
              scores: []
            }
          }
          if (componentId !== null) {
            groupedByComponent[componentId].details.push({
              id: detail.id,
              indicatorId: detail.indicatorId,
              skor: detail.skor,
              catatan: detail.catatan,
              createdAt: detail.createdAt,
              indicator: {
                id: detail.indicatorIdJoin,
                kode: detail.indicatorKode,
                pertanyaan: detail.indicatorPertanyaan
              }
            })
            groupedByComponent[componentId].scores.push(detail.skor)
          }
        })

        // Calculate average skor per component
        const components = Object.values(groupedByComponent).map((comp: any) => {
          const total = comp.scores.reduce((a: number, b: number) => a + b, 0)
          comp.averageSkor = total / comp.scores.length
          delete comp.scores
          return comp
        })

        return {
          success: true,
          data: {
            response: responseInfo,
            components: components
          }
        }

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Method not allowed'
        })
    }
  } catch (error) {
    console.error('Response API error:', error)
    throw error
  }
})