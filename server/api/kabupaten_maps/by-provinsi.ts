import { db } from '../../database';
import { kabupaten_maps } from '../../database/schema/kabupaten_maps';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id_provinsi = Number(query.id_provinsi);

  if (!id_provinsi || isNaN(id_provinsi)) {
    setResponseStatus(event, 400);
    return {
      success: false,
      message: "Parameter id_provinsi tidak valid",
      data: [],
    };
  }

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
    setResponseStatus(event, 500);
    return {
      success: false,
      message: err?.message ?? "Internal Server Error",
      data: [],
    };
  }
});
