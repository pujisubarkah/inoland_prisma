import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET: Ambil semua data dari provinsis
 */
export async function GET() {
    try {
        const data = await prisma.provinsis.findMany({
            include: {
                master_provinsi: {
                    select: { nama_provinsi: true },
                },
            },
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
