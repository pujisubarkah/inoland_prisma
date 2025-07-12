import { master_provinsi } from '../../database/schema/master_provinsi'
import { db } from '../../database'

export default defineEventHandler(async (event) => {
  try {
    const data = await db.select().from(master_provinsi)
    return { data }
  } catch (error) {
    return { error: (error as Error).message }
  }
})
