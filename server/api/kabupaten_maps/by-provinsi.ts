import { db } from '../../database';
import { kabupaten_maps } from '../../database/schema/kabupaten_maps';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id_provinsi = parseInt(query.id_provinsi as string);

  try {
    const result = await db
      .select({
        id_kabkot: kabupaten_maps.id_kabkot,
        id_provinsi: kabupaten_maps.id_provinsi,
        nama: kabupaten_maps.nama,
        svg_path: kabupaten_maps.svg_path,
      })
      .from(kabupaten_maps)
      .where(eq(kabupaten_maps.id_provinsi, id_provinsi));

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message ?? "Internal Server Error",
    };
  }
});
