import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';



export async function GET(req: Request) {
    try {
        // Ambil query parameter dari URL
        const { searchParams } = new URL(req.url);
        const id_kabkot = searchParams.get("id_kabkot");

        // Pastikan id_kabkot ada di query
        if (!id_kabkot) {
            return NextResponse.json({ error: "id_kabkot diperlukan" }, { status: 400 });
        }

        // Hitung jumlah inovasi untuk id_kabkot tertentu
        const data = await prisma.inolands.count({
            where: { id_kabkot: Number(id_kabkot) }, // Filter berdasarkan id_kabkot
        });

        return NextResponse.json({ id_kabkot, jumlah_inovasi: data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
