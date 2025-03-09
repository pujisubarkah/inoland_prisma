import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

// ✅ GET: Ambil daftar PDF dengan pagination
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const offset = (page - 1) * limit;

    try {
        const [pdfList, totalCount] = await Promise.all([
            prisma.pdflist.findMany({
                skip: offset,
                take: limit,
            }),
            prisma.pdflist.count(),
        ]);

        return NextResponse.json({
            data: pdfList,
            count: totalCount,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal mengambil data PDF." }, { status: 500 });
    }
}

// ✅ POST: Tambah PDF baru
export async function POST(req: Request) {
    try {
        const { pdf_url, pdf_judul, pdf_kategori, pdf_cover, pdf_publisher } = await req.json();

        if (!pdf_url || !pdf_judul || !pdf_kategori || !pdf_cover || !pdf_publisher) {
            return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
        }

        const newPdf = await prisma.pdflist.create({
            data: { pdf_url, pdf_judul, pdf_kategori, pdf_cover, pdf_publisher },
        });

        return NextResponse.json(newPdf, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal menambahkan PDF." }, { status: 500 });
    }
}