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

    switch (method) {
      case 'GET':
        const query = getQuery(event)
        const instansiId = query.instansiId as string

        const baseQuery = db
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

        const details = await (instansiId
          ? baseQuery.where(eq(surveyResponse.instansiId, parseInt(instansiId))).orderBy(desc(surveyResponseDetail.createdAt))
          : baseQuery.orderBy(desc(surveyResponseDetail.createdAt)))

        // Group by instansiId first
        const groupedByInstansi: Record<number, any> = {}

        details.forEach(detail => {
          const instId = detail.instansiId
          if (instId !== null && !groupedByInstansi[instId]) {
            groupedByInstansi[instId] = {
              instansi: {
                id: detail.instansiId,
                nama_instansi: detail.instansiNama
              },
              periode: {
                id: detail.periodeId,
                tahun: detail.periodeTahun,
                is_active: detail.periodeIsActive
              },
              components: {}
            }
          }
          if (instId !== null) {
            const componentId = detail.componentId
            if (componentId !== null) {
              if (!groupedByInstansi[instId].components[componentId]) {
                groupedByInstansi[instId].components[componentId] = {
                  component: {
                    id: detail.componentId,
                    kode: detail.componentKode,
                    nama: detail.componentNama
                  },
                  scores: []
                }
              }
              groupedByInstansi[instId].components[componentId].scores.push(detail.skor)
            }
          }
        })

        // Calculate averages and format
        const instansiData = Object.values(groupedByInstansi).map((inst: any) => {
          const components = Object.values(inst.components).map((comp: any) => {
            const total = comp.scores.reduce((a: number, b: number) => a + b, 0)
            comp.averageSkor = total / comp.scores.length
            delete comp.scores
            return comp
          })
          inst.components = components
          return inst
        })

        return {
          success: true,
          data: instansiData
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