import { db } from '@/server/database'
import { surveyComponent, surveyIndicator, surveyIndicatorOption } from '@/server/database/schema/survey'
import { eq, asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // Get all components with their indicators and options in a single query
    const componentsWithData = await db
      .select({
        // Component fields
        componentId: surveyComponent.id,
        componentKode: surveyComponent.kode,
        componentNama: surveyComponent.nama,
        componentDeskripsi: surveyComponent.deskripsi,
        componentUrutan: surveyComponent.urutan,
        // Indicator fields
        indicatorId: surveyIndicator.id,
        indicatorComponentId: surveyIndicator.componentId,
        indicatorKode: surveyIndicator.kode,
        indicatorPertanyaan: surveyIndicator.pertanyaan,
        indicatorUrutan: surveyIndicator.urutan,
        // Option fields
        optionId: surveyIndicatorOption.id,
        optionIndicatorId: surveyIndicatorOption.indicatorId,
        optionSkor: surveyIndicatorOption.skor,
        optionLabel: surveyIndicatorOption.label,
        optionUrutan: surveyIndicatorOption.urutan
      })
      .from(surveyComponent)
      .leftJoin(surveyIndicator, eq(surveyComponent.id, surveyIndicator.componentId))
      .leftJoin(surveyIndicatorOption, eq(surveyIndicator.id, surveyIndicatorOption.indicatorId))
      .orderBy(
        asc(surveyComponent.urutan),
        asc(surveyIndicator.urutan),
        asc(surveyIndicatorOption.urutan)
      )

    // Group the data by component, then by indicator
    const componentMap = new Map()

    componentsWithData.forEach(row => {
      const componentKey = row.componentId

      if (!componentMap.has(componentKey)) {
        componentMap.set(componentKey, {
          id: row.componentId,
          kode: row.componentKode,
          nama: row.componentNama,
          deskripsi: row.componentDeskripsi,
          urutan: row.componentUrutan,
          indicators: new Map()
        })
      }

      const component = componentMap.get(componentKey)

      if (row.indicatorId) {
        const indicatorKey = row.indicatorId

        if (!component.indicators.has(indicatorKey)) {
          component.indicators.set(indicatorKey, {
            id: row.indicatorId,
            componentId: row.indicatorComponentId,
            kode: row.indicatorKode,
            pertanyaan: row.indicatorPertanyaan,
            urutan: row.indicatorUrutan,
            options: []
          })
        }

        const indicator = component.indicators.get(indicatorKey)

        if (row.optionId) {
          indicator.options.push({
            id: row.optionId,
            indicatorId: row.optionIndicatorId,
            skor: row.optionSkor,
            label: row.optionLabel,
            urutan: row.optionUrutan
          })
        }
      }
    })

    // Convert maps to arrays
    const result = Array.from(componentMap.values()).map(component => ({
      ...component,
      indicators: Array.from(component.indicators.values())
    }))

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Survey structure API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})