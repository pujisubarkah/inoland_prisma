import { db } from '../../database';
import { labinov } from '../../database/schema/labinov';
import { master_kabupaten } from '../../database/schema/master_kabupaten';
import { master_provinsi } from '../../database/schema/master_provinsi';
import { getMethod, getQuery } from 'h3';
import { eq, count, avg, sum, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    });
  }

  const query = getQuery(event);

  try {
    let aggregateData: any = {};

    // Get total count of records
    const totalRecords = await db
      .select({ count: count() })
      .from(labinov);

    aggregateData.totalRecords = totalRecords[0]?.count || 0;

    // Get count by province if specified
    if (query.provId && typeof query.provId === 'string') {
      const provId = parseInt(query.provId.trim());
      if (!isNaN(provId)) {
        const provinceStats = await db
          .select({
            provinsi_nama: master_provinsi.nama_provinsi,
            total_records: count(),
            avg_drump_up: avg(labinov.DRUMP_UP),
            avg_diagnose: avg(labinov.DIAGNOSE),
            avg_desain: avg(labinov.DESAIN),
            avg_deliver_launching: avg(labinov.DELIVER_LAUNCHING),
            avg_deliver_monitoring: avg(labinov.DELIVER_MONITORING),
            avg_display: avg(labinov.DISPLAY),
            avg_hasil_akhir: avg(labinov.HASIL_AKHIR),
          })
          .from(labinov)
          .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
          .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
          .where(eq(master_provinsi.id_provinsi, provId))
          .groupBy(master_provinsi.id_provinsi, master_provinsi.nama_provinsi);

        aggregateData.provinceStats = provinceStats[0] || null;
      }
    }

    // Get statistics by session
    const sessionStats = await db
      .select({
        session: labinov.session,
        count: count(),
        avg_drump_up: avg(labinov.DRUMP_UP),
        avg_diagnose: avg(labinov.DIAGNOSE),
        avg_desain: avg(labinov.DESAIN),
        avg_deliver_launching: avg(labinov.DELIVER_LAUNCHING),
        avg_deliver_monitoring: avg(labinov.DELIVER_MONITORING),
        avg_display: avg(labinov.DISPLAY),
        avg_hasil_akhir: avg(labinov.HASIL_AKHIR),
      })
      .from(labinov)
      .groupBy(labinov.session)
      .orderBy(labinov.session);

    aggregateData.sessionStats = sessionStats;

    // Get top performing kabupaten (by average hasil_akhir)
    const topKabupaten = await db
      .select({
        kabupaten_nama: master_kabupaten.nama_kabkot,
        provinsi_nama: master_provinsi.nama_provinsi,
        avg_hasil_akhir: avg(labinov.HASIL_AKHIR),
        total_records: count(),
      })
      .from(labinov)
      .leftJoin(master_kabupaten, eq(labinov.id_kabkot, master_kabupaten.id_kabkot))
      .leftJoin(master_provinsi, eq(master_kabupaten.id_provinsi, master_provinsi.id_provinsi))
      .groupBy(
        master_kabupaten.id_kabkot,
        master_kabupaten.nama_kabkot,
        master_provinsi.nama_provinsi
      )
      .orderBy(sql`avg(${labinov.HASIL_AKHIR}) DESC`)
      .limit(10);

    aggregateData.topKabupaten = topKabupaten;

    // Get overall averages
    const overallStats = await db
      .select({
        avg_drump_up: avg(labinov.DRUMP_UP),
        avg_diagnose: avg(labinov.DIAGNOSE),
        avg_desain: avg(labinov.DESAIN),
        avg_deliver_launching: avg(labinov.DELIVER_LAUNCHING),
        avg_deliver_monitoring: avg(labinov.DELIVER_MONITORING),
        avg_display: avg(labinov.DISPLAY),
        avg_hasil_akhir: avg(labinov.HASIL_AKHIR),
        total_drump_up: sum(labinov.DRUMP_UP),
        total_diagnose: sum(labinov.DIAGNOSE),
        total_desain: sum(labinov.DESAIN),
        total_deliver_launching: sum(labinov.DELIVER_LAUNCHING),
        total_deliver_monitoring: sum(labinov.DELIVER_MONITORING),
        total_display: sum(labinov.DISPLAY),
        total_hasil_akhir: sum(labinov.HASIL_AKHIR),
      })
      .from(labinov);

    aggregateData.overallStats = overallStats[0] || {};

    return {
      success: true,
      data: aggregateData
    };

  } catch (error) {
    console.error('Error fetching labinov statistics:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch labinov statistics'
    });
  }
});
