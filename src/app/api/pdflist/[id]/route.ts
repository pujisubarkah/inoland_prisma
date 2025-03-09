import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';



// ✅ GET: Ambil detail PDF berdasarkan ID
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const pdf = await prisma.pdflist.findUnique({ where: { id: Number(id) } });

        if (!pdf) return NextResponse.json({ error: "PDF tidak ditemukan." }, { status: 404 });

        return NextResponse.json(pdf, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Gagal mengambil data PDF." }, { status: 500 });
    }
}
// ✅ PUT: Update PDF berdasarkan ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { pdf_url, pdf_judul, pdf_kategori, pdf_cover, pdf_publisher } = await req.json();

        const updatedPdf = await prisma.pdflist.update({
            where: { id: Number(id) },
            data: { pdf_url, pdf_judul, pdf_kategori, pdf_cover, pdf_publisher },
        });

        return NextResponse.json(updatedPdf, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Gagal mengupdate PDF." }, { status: 500 });
    }
}
// ✅ DELETE: Hapus PDF berdasarkan ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.pdflist.delete({ where: { id: Number(id) } });

        return NextResponse.json({ message: "PDF berhasil dihapus." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal menghapus PDF." }, { status: 500 });
    }
}
