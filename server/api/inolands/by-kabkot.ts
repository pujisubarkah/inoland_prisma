import { db } from '../../database';
import { inolands } from '../../database/schema/inolands';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id_kabkot = parseInt(query.id_kabkot as string);

  try {
    const result = await db
      .select()
      .from(inolands)
      .where(eq(inolands.id_kabkot, id_kabkot));

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Internal Server Error",
    };
  }
});
