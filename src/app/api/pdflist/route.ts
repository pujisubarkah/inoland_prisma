import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET: Ambil semua daftar PDF
export async function GET() {
    try {
        const pdfList = await prisma.pdflist.findMany();
        return NextResponse.json(pdfList, { status: 200 });
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
