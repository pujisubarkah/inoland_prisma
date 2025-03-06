import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Group by id_provinsi dan hitung jumlah inovasi
        const data = await prisma.inolands.groupBy({
            by: ["id_provinsi"],
            _count: { id: true }, // Hitung jumlah inovasi per provinsi
        });

        // Ubah format output menjadi { id_provinsi, jumlah_inovasi }
        const result = data.map((item) => ({
            id_provinsi: item.id_provinsi,
            jumlah_inovasi: item._count.id,
        }));

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
