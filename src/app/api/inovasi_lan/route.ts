import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // Pastikan path ini sesuai dengan lokasi prisma client Anda

// ✅ GET: Ambil semua inovasi
export async function getAllInovasi() {
  try {
    const inovasiList = await prisma.inovasi_LAN.findMany(); // Mengambil semua data inovasi
    return NextResponse.json(inovasiList, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil data inovasi." }, { status: 500 });
  }
}

// ✅ GET: Ambil daftar inovasi dengan pagination
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = (page - 1) * limit;

  try {
    const [inovasiList, totalCount] = await Promise.all([
      prisma.inovasi_LAN.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.inovasi_LAN.count(),
    ]);

    return NextResponse.json({
      data: inovasiList,
      total: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / limit),
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengambil data inovasi." }, { status: 500 });
  }
}