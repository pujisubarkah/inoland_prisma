import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET: Ambil data inolands berdasarkan id_kabkot
 */
export async function GET(req: Request, { params }: { params: { id_kabkot: string } }) {
    try {
        const { id_kabkot } = params;

        // Pastikan id_kabkot adalah angka sebelum digunakan dalam query
        const data = await prisma.inolands.findMany({
            where: { id_kabkot: Number(id_kabkot) },
            include: {
                master_provinsi: { select: { nama_provinsi: true } },
                master_kabupaten: { select: { nama_kabkot: true } },
                sdgs_relasi: { select: { image: true } },
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
